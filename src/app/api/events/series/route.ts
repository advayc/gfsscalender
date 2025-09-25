import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

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
  // For production, implement proper authorization
  const auth = req.headers.get('authorization');
  if (!auth) return false;
  const token = auth.replace('Bearer ', '').trim();
  const stored = process.env.ADMIN_PASSWORD_HASH;
  if (!stored) return false;
  return bcrypt.compareSync(token, stored);
}

// Bulk delete events in a series
export async function DELETE(req: NextRequest) {
  if (!isAuthorizedDevFallback(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title');
  const clubId = searchParams.get('clubId');
  const frequency = searchParams.get('frequency');
  
  if (!title || !clubId || !frequency) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }
  
  try {
    // Find all events in the series
    const events = await prisma.event.findMany({
      where: {
        title,
        clubId,
        OR: [
          { recurrenceFrequency: frequency.toUpperCase() },
          // For JSON field queries, we need to use raw SQL or a different approach
          // For now, let's use the recurrenceFrequency field as primary
        ]
      }
    });
    
    // Delete all events in the series
    const deletePromises = events.map((event: any) => 
      prisma.event.delete({ where: { id: event.id } })
    );
    
    await Promise.all(deletePromises);
    
    return NextResponse.json({ 
      success: true, 
      deletedCount: events.length 
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// Bulk update events in a series
export async function PATCH(req: NextRequest) {
  if (!isAuthorizedDevFallback(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const body = await req.json();
  const { title, clubId, frequency, updates } = body;
  
  if (!title || !clubId || !frequency || !updates) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }
  
  try {
    // Find all events in the series
    const events = await prisma.event.findMany({
      where: {
        title,
        clubId,
        OR: [
          { recurrenceFrequency: frequency.toUpperCase() },
          // For JSON field queries, we need to use the recurrenceFrequency field as primary
        ]
      }
    });
    
    // Update all events in the series (excluding date to maintain recurrence pattern)  
    const { date, ...safeUpdates } = updates;
    
    const updatePromises = events.map((event: any) => 
      prisma.event.update({ 
        where: { id: event.id }, 
        data: safeUpdates 
      })
    );
    
    const updatedEvents = await Promise.all(updatePromises);
    
    return NextResponse.json({ 
      success: true, 
      updatedCount: updatedEvents.length,
      events: updatedEvents
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}