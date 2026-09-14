export interface IcsImportEvent {
  title: string;
  date: string; // YYYY-MM-DD
  time?: string; // HH:mm
  description?: string;
  location?: string;
}

const MAX_OCCURRENCES = 200;

function unfold(text: string): string[] {
  const raw = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  const out: string[] = [];
  for (const line of raw) {
    if ((line.startsWith(' ') || line.startsWith('\t')) && out.length) {
      out[out.length - 1] += line.slice(1);
    } else {
      out.push(line);
    }
  }
  return out;
}

function unescapeText(s: string): string {
  return s.replace(/\\n/gi, '\n').replace(/\\,/g, ',').replace(/\\;/g, ';').replace(/\\\\/g, '\\');
}

function parseIcsDate(value: string): { date: string; time?: string } | null {
  const v = value.trim();
  // DATE: YYYYMMDD
  let m = v.match(/^(\d{4})(\d{2})(\d{2})$/);
  if (m) return { date: `${m[1]}-${m[2]}-${m[3]}` };
  // DATETIME: YYYYMMDDTHHMMSS(Z or offset)
  m = v.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(?:\d{2})?(Z|[+-]\d{4})?$/);
  if (m) {
    if (m[6] === 'Z') {
      const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]));
      const p = (n: number) => String(n).padStart(2, '0');
      return {
        date: `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())}`,
        time: `${p(d.getUTCHours())}:${p(d.getUTCMinutes())}`,
      };
    }
    return { date: `${m[1]}-${m[2]}-${m[3]}`, time: `${m[4]}:${m[5]}` };
  }
  const d = new Date(v);
  if (isNaN(d.getTime())) return null;
  const p = (n: number) => String(n).padStart(2, '0');
  return { date: `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}` };
}

function parseRrule(value: string): { freq: string; interval: number; count?: number; until?: string } | null {
  const parts = Object.fromEntries(value.split(';').map((p) => {
    const i = p.indexOf('=');
    return i < 0 ? [p, ''] : [p.slice(0, i).toUpperCase(), p.slice(i + 1)];
  }));
  if (!parts.FREQ) return null;
  const until = parts.UNTIL ? parseIcsDate(parts.UNTIL)?.date : undefined;
  return {
    freq: parts.FREQ.toUpperCase(),
    interval: Math.max(1, parseInt(parts.INTERVAL || '1', 10) || 1),
    count: parts.COUNT ? parseInt(parts.COUNT, 10) || undefined : undefined,
    until,
  };
}

function shift(dateStr: string, freq: string, n: number): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  if (freq === 'DAILY') dt.setDate(dt.getDate() + n);
  else if (freq === 'WEEKLY') dt.setDate(dt.getDate() + 7 * n);
  else if (freq === 'MONTHLY') dt.setMonth(dt.getMonth() + n);
  else return dateStr; // YEARLY and others: expand as yearly fallback
  if (freq !== 'DAILY' && freq !== 'WEEKLY' && freq !== 'MONTHLY') dt.setFullYear(dt.getFullYear() + n);
  const p = (x: number) => String(x).padStart(2, '0');
  return `${dt.getFullYear()}-${p(dt.getMonth() + 1)}-${p(dt.getDate())}`;
}

export function parseIcs(text: string): IcsImportEvent[] {
  const lines = unfold(text);
  const events: IcsImportEvent[] = [];
  let cur: Record<string, string> | null = null;

  const flush = () => {
    const c = cur;
    cur = null;
    if (!c) return;
    const startRaw = c.DTSTART;
    const summary = c.SUMMARY?.trim();
    if (!startRaw || !summary) return;
    const start = parseIcsDate(startRaw);
    if (!start) return;
    const base: IcsImportEvent = {
      title: unescapeText(summary).slice(0, 200),
      date: start.date,
      time: start.time,
      description: c.DESCRIPTION ? unescapeText(c.DESCRIPTION) : undefined,
      location: c.LOCATION ? unescapeText(c.LOCATION) : undefined,
    };
    // ponytail: RRULE expanded client-side into single dates, lets server stay dumb
    const rrule = c.RRULE ? parseRrule(c.RRULE) : null;
    if (!rrule) {
      events.push(base);
      return;
    }
    const limit = Math.min(rrule.count || MAX_OCCURRENCES, MAX_OCCURRENCES);
    for (let i = 0; i < limit; i++) {
      const date = shift(base.date, rrule.freq, i * rrule.interval);
      if (rrule.until && date > rrule.until) break;
      events.push({ ...base, date });
    }
  };

  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') cur = {};
    else if (line === 'END:VEVENT') flush();
    else if (cur) {
      const i = line.indexOf(':');
      if (i < 0) continue;
      let key = line.slice(0, i);
      const value = line.slice(i + 1);
      key = key.split(';')[0].toUpperCase();
      if (key === 'DTSTART' || key === 'SUMMARY' || key === 'DESCRIPTION' || key === 'LOCATION' || key === 'RRULE') {
        cur[key] = (cur[key] ? cur[key] + '\n' : '') + value;
      }
    }
  }
  return events;
}
