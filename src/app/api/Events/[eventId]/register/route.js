import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId } = body;
    const { eventId } = req.nextUrl.query;

    // Basic validation
    if (!userId || !eventId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Register user for the event
    const registration = await prisma.registeredEvent.create({
      data: {
        user: {
          connect: { id: userId }
        },
        event: {
          connect: { id: eventId }
        }
      }
    });

    return NextResponse.json(registration, { status: 201 });
  } catch (error) {
    console.error('Error registering user for event:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
