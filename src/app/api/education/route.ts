import { NextResponse } from 'next/server';
import { getDb, persistDb } from '@/lib/db';
import { EducationLesson, EducationSector } from '@/lib/types';
import { initialEducationLessons } from '@/lib/data/seed';

const SECTOR_LABELS: Record<EducationSector, string> = {
  fiqh: 'Fiqhii (Islamic Jurisprudence)',
  quran: "Qur'aana Qulqulluu (Holy Qur'an)",
  hadith: 'Hadiisa Nabiyyii (Hadith & Sunnah)',
  aqeedah: 'Aqiidaa (Islamic Creed)',
  tafsir: "Tafsiira (Qur'anic Exegesis)",
  history: 'Seenaa fi Aadaa Islaamaa (Islamic History)'
};

export async function GET(req: Request) {
  try {
    const db = getDb();
    if (!db.educationLessons || db.educationLessons.length === 0) {
      db.educationLessons = initialEducationLessons;
      persistDb();
    }

    const { searchParams } = new URL(req.url);
    const sector = searchParams.get('sector');

    let lessons = db.educationLessons;
    if (sector && sector !== 'all') {
      lessons = lessons.filter(l => l.sector === sector);
    }

    return NextResponse.json(lessons);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch lessons' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const db = getDb();
    if (!db.educationLessons) {
      db.educationLessons = initialEducationLessons;
    }

    const body = await req.json();

    if (!body.title || !body.content) {
      return NextResponse.json({ error: 'Mata-duree fi qabiyyeen barnootaa barbaachisaadha.' }, { status: 400 });
    }

    const sector: EducationSector = body.sector || 'fiqh';
    const sectorLabel = SECTOR_LABELS[sector] || body.sectorLabel || 'Fiqhii (Islamic Jurisprudence)';

    const newLesson: EducationLesson = {
      id: 'edu-' + Date.now(),
      title: body.title.trim(),
      sector: sector,
      sectorLabel: sectorLabel,
      arabicText: body.arabicText?.trim() || '',
      content: body.content.trim(),
      authorName: body.authorName?.trim() || 'Ustaz (Islamic Education Sector)',
      audioUrl: body.audioUrl?.trim() || '',
      videoUrl: body.videoUrl?.trim() || '',
      imageUrl: body.imageUrl?.trim() || '',
      publishedAt: new Date().toISOString(),
      published: body.published !== undefined ? body.published : true
    };

    db.educationLessons = [newLesson, ...db.educationLessons];
    persistDb();

    return NextResponse.json(newLesson, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to create lesson' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing lesson id' }, { status: 400 });
    }

    const db = getDb();
    if (db.educationLessons) {
      db.educationLessons = db.educationLessons.filter(l => l.id !== id);
      persistDb();
    }

    return NextResponse.json({ success: true, deletedId: id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to delete lesson' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const db = getDb();
    if (!db.educationLessons) {
      db.educationLessons = initialEducationLessons;
    }

    const body = await req.json();
    const { id, title, sector, arabicText, content, authorName, published } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing lesson id' }, { status: 400 });
    }

    const existingIndex = db.educationLessons.findIndex(l => l.id === id);
    if (existingIndex === -1) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    const existing = db.educationLessons[existingIndex];
    const updatedSector = (sector || existing.sector) as EducationSector;

    const updated: EducationLesson = {
      ...existing,
      title: title !== undefined ? title.trim() : existing.title,
      sector: updatedSector,
      sectorLabel: SECTOR_LABELS[updatedSector] || existing.sectorLabel,
      arabicText: arabicText !== undefined ? arabicText.trim() : existing.arabicText,
      content: content !== undefined ? content.trim() : existing.content,
      authorName: authorName !== undefined ? authorName.trim() : existing.authorName,
      published: published !== undefined ? published : existing.published
    };

    db.educationLessons[existingIndex] = updated;
    persistDb();

    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to update lesson' }, { status: 500 });
  }
}
