import fs from 'fs';
import path from 'path';
import { 
  initialArticles, 
  initialBreakingNews, 
  initialScholars, 
  initialPodcasts, 
  initialVideos, 
  initialAudios, 
  initialAlbums, 
  initialHegere, 
  initialAds, 
  initialMembers, 
  initialErrorReports 
} from './data/seed';
import { Article, MemberRecord, Advertisement, ErrorReport, CommentItem } from './types';

export interface DatabaseSchema {
  articles: Article[];
  breakingNews: typeof initialBreakingNews;
  breakingTickerActive: boolean;
  scholars: typeof initialScholars;
  podcasts: typeof initialPodcasts;
  videos: typeof initialVideos;
  audios: typeof initialAudios;
  albums: typeof initialAlbums;
  hegere: typeof initialHegere;
  ads: Advertisement[];
  members: MemberRecord[];
  errorReports: ErrorReport[];
  comments: CommentItem[];
  subscribers: { email: string; date: string }[];
}

let dbInstance: DatabaseSchema | null = null;
const dbFilePath = path.join(process.cwd(), 'data', 'db.json');

function initDb(): DatabaseSchema {
  if (dbInstance) return dbInstance;

  try {
    if (fs.existsSync(dbFilePath)) {
      const raw = fs.readFileSync(dbFilePath, 'utf8');
      dbInstance = JSON.parse(raw);
      return dbInstance!;
    }
  } catch (err) {
    console.warn('Could not read db.json, initializing with default seed data:', err);
  }

  dbInstance = {
    articles: initialArticles,
    breakingNews: initialBreakingNews,
    breakingTickerActive: true,
    scholars: initialScholars,
    podcasts: initialPodcasts,
    videos: initialVideos,
    audios: initialAudios,
    albums: initialAlbums,
    hegere: initialHegere,
    ads: initialAds,
    members: initialMembers,
    errorReports: initialErrorReports,
    comments: [
      {
        id: 'com-1',
        articleId: 'art-1',
        name: 'Mustafa Hassan',
        email: 'mustafa@example.com',
        content: 'Baga gammaddan! Aalam Mediaf carraa gaarii hawwina.',
        createdAt: '2026-09-15T10:12:00Z',
        isApproved: true
      }
    ],
    subscribers: [
      { email: 'reader1@example.com', date: '2026-09-14' },
      { email: 'member@aalammedia.com', date: '2026-09-15' }
    ]
  };

  saveDb();
  return dbInstance;
}

function saveDb() {
  if (!dbInstance) return;
  try {
    const dir = path.dirname(dbFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dbFilePath, JSON.stringify(dbInstance, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving db.json:', err);
  }
}

export const getDb = (): DatabaseSchema => initDb();
export const persistDb = () => saveDb();
