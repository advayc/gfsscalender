import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
import bcrypt from 'bcrypt';

function isAuthorized(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (!auth) return false;
  const token = auth.replace('Bearer ', '').trim();
  const stored = process.env.ADMIN_PASSWORD_HASH;
  if (!stored) return false;
  return bcrypt.compareSync(token, stored);
}

function isAuthorizedDevFallback(req: NextRequest) {
  if (process.env.NODE_ENV !== 'production') {
    const devPass = process.env.DEV_ADMIN_PASSWORD;
    if (devPass) {
      const auth = req.headers.get('authorization');
      if (!auth) return false;
      const token = auth.replace('Bearer ', '').trim();
      return token === devPass;
    }
    console.warn('DEV_ADMIN_PASSWORD not set; allowing all requests in development');
    return true;
  }
  const stored = process.env.ADMIN_PASSWORD_HASH;
  if (!stored) return false;
  return isAuthorized(req);
}

type ImportType = 'clubs' | 'events';

/**
 * Request: multipart/form-data with fields:
 * - type: 'clubs' | 'events'
 * - file: File (CSV)
 * - dryRun: '1' | '0' (optional, default '1')
 * - defaults: optional JSON string with default values for missing fields
 * - headerMap: optional JSON mapping incoming header -> expected field
 */
export async function POST(req: NextRequest) {
  if (!isAuthorizedDevFallback(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const form = await req.formData();
  const type = (form.get('type') as string)?.toLowerCase() as ImportType;
  const dryRun = (form.get('dryRun') as string) ?? '1';
  const file = form.get('file');
  const defaultsRaw = form.get('defaults') as string | null;
  const headerMapRaw = form.get('headerMap') as string | null;

  if (!file || !(file instanceof File)) return NextResponse.json({ error: 'Missing file' }, { status: 400 });
  if (type !== 'clubs' && type !== 'events') return NextResponse.json({ error: 'Invalid type' }, { status: 400 });

  const text = await file.text();

  // Lightweight CSV parse (duplicate minimal logic here to avoid ESM import issues in route)
  const parseCsv = (input: string): { headers: string[]; rows: Record<string,string>[] } => {
    const lines = input.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n').filter(l => l.trim().length > 0);
    if (lines.length === 0) return { headers: [], rows: [] };
    const parseLine = (line: string): string[] => {
      const result: string[] = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (inQuotes) {
          if (char === '"') {
            if (line[i + 1] === '"') { current += '"'; i++; } else { inQuotes = false; }
          } else { current += char; }
        } else {
          if (char === ',') { result.push(current); current = ''; }
          else if (char === '"') { inQuotes = true; }
          else { current += char; }
        }
      }
      result.push(current);
      return result.map(v => v.trim());
    };
    const headers = parseLine(lines[0]).map(h => h.replace(/^\uFEFF/, ''));
    const rows = lines.slice(1).map(line => {
      const cols = parseLine(line);
      const row: Record<string, string> = {};
      headers.forEach((h, idx) => { row[h] = cols[idx] ?? ''; });
      return row;
    });
    return { headers, rows };
  };

  const { headers: _csvHeaders, rows } = parseCsv(text);
  const headerMap = headerMapRaw ? (JSON.parse(headerMapRaw) as Record<string,string>) : {};
  type ClubDefaults = { name?: string; slug?: string; color?: string };
  type EventDefaults = { title?: string; date?: string; clubId?: string; time?: string; description?: string; location?: string };
  const defaultsUnknown = defaultsRaw ? JSON.parse(defaultsRaw) as unknown : undefined;

  const mapValue = (row: Record<string,string>, keys: string[]): string => {
    for (const k of keys) {
      const actual = headerMap[k] ?? k;
      if (row[actual] != null && row[actual] !== '') return row[actual];
    }
    return '';
  };

  if (type === 'clubs') {
    // Expect: name [, slug] [, color]
    const prepared = rows.map(r => {
      const name = mapValue(r, ['name', 'club_name']);
      const slug = mapValue(r, ['slug']);
      const color = mapValue(r, ['color']);
      return { name, slug, color };
    });

    const missingRequired = prepared
      .map((p, idx) => ({ index: idx, missing: ['name'].filter(f => !(p as Record<string, unknown>)[f] && !(defaults as Record<string, unknown>)[f]) }))
      .filter(m => m.missing.length > 0);

    const summary = { total: prepared.length, missing: missingRequired.length, missingRows: missingRequired };
    if (dryRun === '1') return NextResponse.json({ type, summary, sample: prepared.slice(0, 5) });

    // finalize
    const created = [] as unknown[];
    const defaults = (defaultsUnknown as ClubDefaults) || {};
    for (const p of prepared) {
      const name: string | undefined = p.name || defaults.name;
      if (!name) continue;
      const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const finalSlug: string = p.slug?.trim() || defaults.slug || slugify(name);
      const color: string = (p.color?.trim() || defaults.color || '#007AFF');
      try {
        const c = await prisma.club.create({ data: { name, slug: finalSlug, color } });
        created.push(c);
      } catch {
        // skip duplicates
      }
    }
    return NextResponse.json({ type, created: created.length });
  }

  if (type === 'events') {
    // Expect: title, date [, time, clubId or clubSlug or clubName, description, location]
    const prepared = rows.map(r => {
      const title = mapValue(r, ['title', 'event', 'name']);
      const date = mapValue(r, ['date', 'day']);
      const time = mapValue(r, ['time']);
      const description = mapValue(r, ['description', 'desc']);
      const location = mapValue(r, ['location', 'loc']);
      const clubId = mapValue(r, ['clubId', 'club_id', 'club']);
      const clubSlug = mapValue(r, ['clubSlug', 'club_slug', 'clubslug', 'club_slug']);
      const clubName = mapValue(r, ['clubName', 'club_name']);
      return { title, date, time, description, location, clubId, clubSlug, clubName };
    });

    const missingRequired = prepared
      .map((p, idx) => ({
        index: idx,
        missing: ['title', 'date'].filter(f => !(p as Record<string, unknown>)[f] && !(defaults as Record<string, unknown>)[f])
      }))
      .filter(m => m.missing.length > 0);

    // Lookup clubs for mapping by slug or name
    const clubs = await prisma.club.findMany();
    const slugToId = new Map<string, string>(clubs.map((c: { slug: string; id: string }) => [c.slug.toLowerCase(), c.id]));
    const nameToId = new Map<string, string>(clubs.map((c: { name: string; id: string }) => [c.name.toLowerCase(), c.id]));

    const resolved = prepared.map(p => {
      let resolvedClubId = p.clubId?.trim();
      if (!resolvedClubId && p.clubSlug) resolvedClubId = slugToId.get(p.clubSlug.toLowerCase()) || '';
      if (!resolvedClubId && p.clubName) resolvedClubId = nameToId.get(p.clubName.toLowerCase()) || '';
      return { ...p, clubId: resolvedClubId };
    });

    const stillMissingClub = resolved
      .map((p, idx) => ({ index: idx, missing: ['clubId'].filter(f => !(p as Record<string, unknown>)[f] && !(defaults as Record<string, unknown>)[f]) }))
      .filter(m => m.missing.length > 0);

    const summary = {
      total: prepared.length,
      missing: missingRequired.length + stillMissingClub.length,
      missingRows: [...missingRequired, ...stillMissingClub]
    };

    if (dryRun === '1') {
      return NextResponse.json({ type, summary, sample: resolved.slice(0, 5) });
    }

    // finalize
    let created = 0;
    const defaults = (defaultsUnknown as EventDefaults) || {};
    for (const p of resolved) {
      const title: string | undefined = p.title || defaults.title;
      const dateStr: string | undefined = p.date || defaults.date;
      const clubId: string | undefined = p.clubId || defaults.clubId;
      if (!title || !dateStr || !clubId) continue;

      const data: {
        title: string;
        date: Date;
        clubId: string;
        time: string | null;
        description: string | null;
        location: string | null;
      } = {
        title,
        date: new Date(dateStr),
        clubId,
        time: (p.time || defaults.time || null),
        description: (p.description || defaults.description || null),
        location: (p.location || defaults.location || null)
      };
      try {
        await prisma.event.create({ data });
        created++;
      } catch {
        // skip errors for now
      }
    }
    return NextResponse.json({ type, created });
  }

  return NextResponse.json({ error: 'Unsupported type' }, { status: 400 });
}

