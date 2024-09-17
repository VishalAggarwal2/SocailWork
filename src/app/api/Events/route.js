import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    console.log(req.body);
    console.info("Received POST request");
    const body = await req.json();
    const { title, description, startDate, endDate, status,ngoId } = body;
    const url = new URL(req.url);
   

    console.info("Request body:", { title, description, startDate, endDate, status, ngoId });

    // Basic validation
    if (!title || !description || !startDate || !endDate || !status || !ngoId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create a new event
    const event = await prisma.event.create({
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status,
        ngo: {
          connect: { id: ngoId }
        }
      }
    });

    console.info("Event created successfully:", event);
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    console.info("Received GET request");
    const url = new URL(req.url);
    const ngoId = url.searchParams.get('ngoId');

    console.info("NGO ID:", ngoId);

    // Validate ngoId
    if (!ngoId) {
      return NextResponse.json({ error: 'NGO ID is required' }, { status: 400 });
    }

    // Fetch events for the NGO
    const events = await prisma.event.findMany({
      where: {
        ngoId
      }
    });

    console.info("Fetched events:", events);
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
