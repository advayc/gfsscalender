import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

/* eslint-disable @typescript-eslint/no-explicit-any */

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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const clubId = searchParams.get('clubId');
  const events = await prisma.event.findMany({
    where: clubId ? { clubId } : undefined,
    orderBy: { date: 'asc' }
  });
  return NextResponse.json(events);
}

export async function POST(req: NextRequest) {
  if (!isAuthorizedDevFallback(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const { title, description, date, time, clubId, recurrence, location, isSacPriority } = body;
  if (!title || !date || !clubId) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  try {
    // If recurrence provided, expand
    const created: any[] = [];
    if (recurrence?.frequency === 'weekly') {
      const interval = recurrence.interval || 1;
      const max = recurrence.count || 52;
      let current = new Date(date);
      let count = 0;
      const until = recurrence.until ? new Date(recurrence.until) : undefined;
      
      // Create the first event to get the recurring event ID
      const firstEvent = await prisma.event.create({
        data: {
          title,
          description,
          location,
          date: current,
          time,
          clubId,
          isSacPriority: isSacPriority || false,
          recurrenceFrequency: 'WEEKLY',
          recurrenceInterval: interval,
          recurrenceCount: recurrence.count,
          recurrenceUntil: recurrence.until ? new Date(recurrence.until) : undefined,
          recurringEventId: null // This is the original event
        }
      });
      created.push(firstEvent);
      
      // Create subsequent events with the first event's ID as recurringEventId
      current = new Date(current.getTime() + interval * 7 * 24 * 60 * 60 * 1000);
      count++;
      
      while (count < max) {
        if (until && current > until) break;
        const e = await prisma.event.create({
          data: {
            title,
            description,
            location,
            date: current,
            time,
            clubId,
            isSacPriority: isSacPriority || false,
            recurrenceFrequency: 'WEEKLY',
            recurrenceInterval: interval,
            recurrenceCount: recurrence.count,
            recurrenceUntil: recurrence.until ? new Date(recurrence.until) : undefined,
            recurringEventId: firstEvent.id
          }
        });
        created.push(e);
        current = new Date(current.getTime() + interval * 7 * 24 * 60 * 60 * 1000);
        count++;
      }
      return NextResponse.json(created, { status: 201 });
    } else {
      const event = await prisma.event.create({
  data: { title, description, location, date: new Date(date), time, clubId, isSacPriority: isSacPriority || false }
      });
      return NextResponse.json(event, { status: 201 });
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!isAuthorizedDevFallback(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const { id, ...updates } = body;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  try {
    if (updates.date) updates.date = new Date(updates.date);
    
    // Find the event to check if it's recurring
    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    
    const isRecurring = event.recurringEventId || event.recurrenceFrequency;
    
    if (isRecurring) {
      // Update all events in the recurring series
      const recurringEventId = event.recurringEventId || event.id;
      
      await prisma.event.updateMany({
        where: {
          OR: [
            { id: recurringEventId },
            { recurringEventId: recurringEventId }
          ]
        },
        data: updates
      });
      
      // Return the updated original event
      const updatedEvent = await prisma.event.findUnique({ where: { id: recurringEventId } });
      return NextResponse.json(updatedEvent);
    } else {
      // Update only the single event
      const updatedEvent = await prisma.event.update({ where: { id }, data: updates });
      return NextResponse.json(updatedEvent);
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorizedDevFallback(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const deleteAllFuture = searchParams.get('deleteAllFuture') === 'true';
  
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  
  try {
    if (deleteAllFuture) {
      // Find the original recurring event
      const event = await prisma.event.findUnique({ where: { id } });
      if (!event) return NextResponse.json({ error: 'Event not found' }, { status: 404 });
      
      const recurringEventId = event.recurringEventId || event.id;
      
      // Delete all events in this recurring series
      await prisma.event.deleteMany({
        where: {
          OR: [
            { id: recurringEventId },
            { recurringEventId: recurringEventId }
          ]
        }
      });
      
      return NextResponse.json({ success: true, message: 'All future occurrences deleted' });
    } else {
      // Delete only this specific event
      await prisma.event.delete({ where: { id } });
      return NextResponse.json({ success: true, message: 'Event deleted' });
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
