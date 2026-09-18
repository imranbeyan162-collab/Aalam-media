import { NextResponse } from 'next/server';
import { getDb, persistDb } from '@/lib/db';

export async function GET() {
  const db = getDb();
  return NextResponse.json(db.members);
}

export async function POST(req: Request) {
  const db = getDb();
  const body = await req.json();

  const newMember = {
    id: 'mem-' + Date.now(),
    fullName: body.fullName,
    email: body.email,
    phone: body.phone,
    city: body.city,
    country: body.country || 'Itoophiyaa',
    preferredLanguage: body.preferredLanguage || 'Afaan Oromoo',
    membershipType: body.membershipType || 'Regular Member',
    areaOfInterest: body.areaOfInterest || '',
    message: body.message || '',
    status: 'ACTIVE',
    createdAt: new Date().toISOString()
  };

  db.members.unshift(newMember as any);
  persistDb();

  return NextResponse.json(newMember, { status: 201 });
}
