import { NextResponse } from 'next/server';
import { getDb, persistDb } from '@/lib/db';

export async function GET() {
  const db = getDb();
  return NextResponse.json(db.errorReports);
}

export async function POST(req: Request) {
  const db = getDb();
  const body = await req.json();

  const newReport = {
    id: 'err-' + Date.now(),
    articleId: body.articleId,
    articleTitle: body.articleTitle,
    reporterName: body.reporterName,
    reporterEmail: body.reporterEmail,
    details: body.details,
    status: 'PENDING',
    createdAt: new Date().toISOString()
  };

  db.errorReports.unshift(newReport as any);
  persistDb();

  return NextResponse.json(newReport, { status: 201 });
}
