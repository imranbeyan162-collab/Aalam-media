'use client';

import { useState, useEffect } from 'react';
import { initialArticles } from '@/lib/data/seed';
import { Article } from '@/lib/types';

const STORAGE_KEY = 'aalam_articles_v2';
const EVENT_NAME = 'aalam_articles_updated';

// Helper to get articles safely
export function getStoredArticles(): Article[] {
  if (typeof window === 'undefined') {
    return initialArticles;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialArticles));
      return initialArticles;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return initialArticles;
  } catch (err) {
    console.error('Error reading stored articles:', err);
    return initialArticles;
  }
}

// Helper to save articles
export function saveStoredArticles(articles: Article[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
    window.dispatchEvent(new Event(EVENT_NAME));
  } catch (err) {
    console.error('Error saving articles:', err);
  }
}

// Add a new article
export function addArticle(data: {
  headline: string;
  subtitle: string;
  category: string;
  language?: string;
  isBreaking?: boolean;
  isFeatured?: boolean;
  imageUrl?: string;
  imageAlt?: string;
  imageCaption?: string;
  imageCredit?: string;
  imageSource?: string;
  authorName?: string;
  content: string;
  tags?: string;
  status?: Article['status'];
}): Article {
  const current = getStoredArticles();
  const slug = data.headline
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-') + '-' + Date.now().toString().slice(-4);

  const newArticle: Article = {
    id: 'art-' + Date.now(),
    slug: slug || 'oduu-' + Date.now(),
    headline: data.headline,
    subtitle: data.subtitle || data.headline,
    category: data.category || 'Oduu Biyyoolessaa',
    language: (data.language as any) || 'om',
    isBreaking: !!data.isBreaking,
    isFeatured: data.isFeatured !== undefined ? data.isFeatured : true,
    featuredImage: {
      url: data.imageUrl || '/images/aalam-media-1.jpg',
      alt: data.imageAlt || data.headline,
      caption: data.imageCaption || data.headline,
      credit: data.imageCredit || 'Aalam Media Newsroom',
      source: data.imageSource || 'Aalam Media'
    },
    author: {
      name: data.authorName || 'Misbah Sheikh Husein',
      role: 'CEO & Founder / Editor'
    },
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    content: data.content || data.subtitle || '',
    tags: data.tags ? data.tags.split(',').map(t => t.trim()) : [data.category || 'Oduu'],
    status: data.status || 'PUBLISHED',
    reactions: { like: 0, love: 0, insightful: 0, respect: 0 },
    views: 1
  };

  const updated = [newArticle, ...current];
  saveStoredArticles(updated);

  // Sync with API in background
  try {
    fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newArticle)
    }).catch(() => {});
  } catch (_) {}

  return newArticle;
}

// Delete an article by ID
export function deleteArticle(id: string): boolean {
  const current = getStoredArticles();
  const updated = current.filter(a => a.id !== id);
  saveStoredArticles(updated);

  // Sync with API in background
  try {
    fetch(`/api/articles?id=${encodeURIComponent(id)}`, {
      method: 'DELETE'
    }).catch(() => {});
  } catch (_) {}

  return true;
}

// Update an article status
export function updateArticleStatus(id: string, status: Article['status']): void {
  const current = getStoredArticles();
  const updated = current.map(a => a.id === id ? { ...a, status } : a);
  saveStoredArticles(updated);
}

// React hook for live syncing across all pages
export function useArticles(): {
  articles: Article[];
  addArticle: typeof addArticle;
  deleteArticle: typeof deleteArticle;
  updateArticleStatus: typeof updateArticleStatus;
  resetToDefaults: () => void;
} {
  const [articles, setArticles] = useState<Article[]>(initialArticles);

  useEffect(() => {
    // Initial load from localStorage
    setArticles(getStoredArticles());

    // Listen to changes across components
    const handleUpdate = () => {
      setArticles(getStoredArticles());
    };

    window.addEventListener(EVENT_NAME, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(EVENT_NAME, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const resetToDefaults = () => {
    saveStoredArticles(initialArticles);
  };

  return {
    articles,
    addArticle,
    deleteArticle,
    updateArticleStatus,
    resetToDefaults
  };
}
