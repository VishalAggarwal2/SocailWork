import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { userId } = req.nextUrl.query;

    // Validate userId
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Fetch events registered by the user
    const registrations = await prisma.registeredEvent.findMany({
      where: {
        userId
      },
      include: {
        event: true // Include event details
      }
    });

    return NextResponse.json(registrations.map(reg => reg.event), { status: 200 });
  } catch (error) {
    console.error('Error fetching registered events:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
