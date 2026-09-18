import { NextResponse } from 'next/server';
import { getDb, persistDb } from '@/lib/db';

export async function GET() {
  const db = getDb();
  return NextResponse.json(db.articles);
}

export async function POST(req: Request) {
  const db = getDb();
  const body = await req.json();

  const newArticle = {
    id: 'art-' + Date.now(),
    slug: body.headline.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    headline: body.headline,
    subtitle: body.subtitle,
    category: body.category || 'Oduu Biyyoolessaa',
    language: body.language || 'om',
    isBreaking: !!body.isBreaking,
    isFeatured: !!body.isFeatured,
    featuredImage: {
      url: body.imageUrl || '',
      alt: body.imageAlt || body.headline,
      caption: body.imageCaption || '',
      credit: body.imageCredit || 'Aalam Media',
      source: body.imageSource || 'Internal'
    },
    author: {
      name: body.authorName || 'Misbah Sheikh Husein',
      role: 'Staff Reporter'
    },
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    content: body.content,
    tags: body.tags ? body.tags.split(',').map((t: string) => t.trim()) : [],
    status: body.status || 'EDITOR_REVIEW',
    reactions: { like: 0, love: 0, insightful: 0, respect: 0 },
    views: 0
  };

  db.articles.unshift(newArticle as any);
  persistDb();

  return NextResponse.json(newArticle, { status: 201 });
}
