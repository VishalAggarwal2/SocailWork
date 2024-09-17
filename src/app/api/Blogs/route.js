import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    console.log("called .......");
    const body = await req.json();
  
    const { title, description, userId } = body;
  
    // Basic validation
    if (!title || !description || !userId) {
      console.log("error here");
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
  
    // Create a new blog in the database
    const blog = await prisma.blog.create({
      data: {
        title,
        description,
        user: {
          connect: { id: userId }, // Link the blog to the user
        },
      },
    });
  
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}



// Handler for fetching all blogs by a specific user
export async function GET(req) {
    try {
      const url = new URL(req.url);
      const userId = url.searchParams.get('userId');
    
      if (!userId) {
        return NextResponse.json({ error: 'Missing userId query parameter' }, { status: 400 });
      }
    
      // Fetch all blogs created by the user
      const blogs = await prisma.blog.findMany({
        where: {
          userId: userId,
        },
      });
  
      // Return the blogs as JSON
      return NextResponse.json(blogs, { status: 200 });
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }