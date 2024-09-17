import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
export async function GET(req) {

    return NextResponse.json({ message: 'run succ ..' }, { status: 500 });
}
