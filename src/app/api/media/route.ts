import { NextResponse } from 'next/server';
import { getDb, persistDb } from '@/lib/db';
import { MediaItem } from '@/lib/types';

export async function GET() {
  const db = getDb();
  if (!db.mediaUploads) {
    db.mediaUploads = [];
  }
  return NextResponse.json(db.mediaUploads);
}

export async function POST(req: Request) {
  try {
    const db = getDb();
    if (!db.mediaUploads) {
      db.mediaUploads = [];
    }

    const body = await req.json();

    const newItem: MediaItem = {
      id: body.id || 'media-' + Date.now(),
      title: body.title || 'Untitled Media',
      description: body.description?.trim() || '',
      fileName: body.fileName || 'file',
      type: body.type || 'image',
      size: body.size || '1.0 MB',
      url: body.url || '',
      createdAt: body.createdAt || new Date().toISOString(),
      published: body.published !== undefined ? body.published : true
    };

    // Unshift to top of media list
    db.mediaUploads = [newItem, ...db.mediaUploads.filter(m => m.id !== newItem.id)];
    persistDb();

    return NextResponse.json(newItem, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to upload media' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing media id' }, { status: 400 });
    }

    const db = getDb();
    if (db.mediaUploads) {
      db.mediaUploads = db.mediaUploads.filter(m => m.id !== id);
      persistDb();
    }

    return NextResponse.json({ success: true, deletedId: id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to delete media' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, published, title, description } = body;
    if (!id) {
      return NextResponse.json({ error: 'Missing media id' }, { status: 400 });
    }

    const db = getDb();
    if (db.mediaUploads) {
      const item = db.mediaUploads.find(m => m.id === id);
      if (item) {
        if (published !== undefined) item.published = published;
        if (title !== undefined) item.title = title.trim();
        if (description !== undefined) item.description = description.trim();
        persistDb();
        return NextResponse.json(item);
      }
    }

    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to update media status' }, { status: 500 });
  }
}

