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
    id: body.id || 'art-' + Date.now(),
    slug: body.slug || body.headline.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    headline: body.headline,
    subtitle: body.subtitle || body.headline,
    category: body.category || 'Oduu Biyyoolessaa',
    language: body.language || 'om',
    isBreaking: !!body.isBreaking,
    isFeatured: body.isFeatured !== undefined ? body.isFeatured : true,
    featuredImage: body.featuredImage || {
      url: body.imageUrl || '/images/aalam-media-1.jpg',
      alt: body.imageAlt || body.headline,
      caption: body.imageCaption || body.headline,
      credit: body.imageCredit || 'Aalam Media Newsroom',
      source: body.imageSource || 'Aalam Media'
    },
    author: body.author || {
      name: body.authorName || 'Misbah Sheikh Husein',
      role: 'CEO & Founder / Editor'
    },
    publishedAt: body.publishedAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    content: body.content || '',
    tags: body.tags ? (Array.isArray(body.tags) ? body.tags : body.tags.split(',').map((t: string) => t.trim())) : ['Oduu'],
    status: body.status || 'PUBLISHED',
    reactions: body.reactions || { like: 0, love: 0, insightful: 0, respect: 0 },
    views: body.views || 1
  };

  db.articles = [newArticle as any, ...db.articles.filter(a => a.id !== newArticle.id)];
  persistDb();

  return NextResponse.json(newArticle, { status: 201 });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Missing article id' }, { status: 400 });
  }

  const db = getDb();
  db.articles = db.articles.filter(a => a.id !== id);
  persistDb();

  return NextResponse.json({ success: true, deletedId: id });
}
