import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch all events
    const events = await prisma.event.findMany();

    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


async function POST({ title, location }) {
  try {
    const events = await prisma.event.findMany({
      where: {
        AND: [
          title ? { title: { contains: title, mode: 'insensitive' } } : {},
          location ? { ngo: { location: { contains: location, mode: 'insensitive' } } } : {},
        ]
      },
      include: {
        ngo: true, // to ensure location is fetched as part of the ngo relation
      }
    });

    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}
