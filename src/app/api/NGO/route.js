import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function POST(req) {
  try {
    const body = await req.json();
  
    const { name, description, field, location, email, website, locationLink, logo, photos, ratings } = body;
  
    // Basic validation
    if (!name || !description || !field || !location || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Ensure photos is an array
    const photosArray = Array.isArray(photos) ? photos : [photos];

    const ngo = await prisma.ngo.create({
      data: {
        name,
        description,
        field,
        location,
        email,
        website,
        locationLink,
        logo,
        photos: photosArray,
        ratings: parseInt(ratings),  // Convert ratings to integer if needed
      },
    });
  
    return NextResponse.json(ngo, { status: 201 });
  } catch (error) {
    console.error('Error creating NGO:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req) {
    try {
      // Fetch all NGOs from the database
      const ngos = await prisma.ngo.findMany();
  
      // Return the NGOs as JSON
      return NextResponse.json(ngos, { status: 200 });
    } catch (error) {
      console.error('Error fetching NGOs:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }



  