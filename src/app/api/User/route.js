import { NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = 'sankalpissocialclub'; 
export async function GET(req) {
    try {

      const url = new URL(req.url);
      const email = url.searchParams.get('email');
      const password = url.searchParams.get('password');
    
      // Basic validation
      if (!email || !password) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }
    
      // Find the user by email
      const user = await prisma.user.findUnique({
        where: { email },
      });
    
      // Check if the user exists and password matches
      if (!user || user.password !== password) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }
    
      // Generate a JWT token
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    
      // Return the token
      return NextResponse.json({ token, userId:user.id }, { status: 200 });
    } catch (error) {
      console.error('Error during authentication:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }

export async function POST(req) {
    try {
      const body = await req.json();
  
      const { firstname, lastname, email, password, gender, phone, address } = body;
  
      // Basic validation
      if (!firstname || !lastname || !email || !password) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }
  
      // Create a new user in the database
      const user = await prisma.user.create({
        data: {
          firstname,
          lastname,
          email,
          password, // Note: In a real application, you'd want to hash the password before saving it
          gender,
          phone,
          address,
        },
      });
  
      return NextResponse.json(user, { status: 201 });
    } catch (error) {
      console.error('Error creating user:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
  