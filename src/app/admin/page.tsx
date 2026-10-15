'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useArticles } from '@/lib/articlesStore';
import { initialMembers, initialAds, initialErrorReports } from '@/lib/data/seed';
import { 
  FileText, 
  Flame, 
  Users, 
  Megaphone, 
  AlertCircle, 
  PlusCircle, 
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { articles, deleteArticle } = useArticles();
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [membersCount, setMembersCount] = useState<number>(initialMembers.length);
  const [adsCount, setAdsCount] = useState<number>(initialAds.length);
  const [adsImpressions, setAdsImpressions] = useState<number>(0);
  const [errorReportsCount, setErrorReportsCount] = useState<number>(initialErrorReports.length);

  React.useEffect(() => {
    // Check if real members exist in API / localStorage
    fetch('/api/members')
      .then(res => res.ok ? res.json() : [])
      .then((data: any[]) => {
        if (Array.isArray(data)) {
          setMembersCount(data.length);
        }
      })
      .catch(() => {});

    // Check localStorage for active ads and error reports
    try {
      const savedAds = localStorage.getItem('aalam_media_ads');
      if (savedAds) {
        const parsed = JSON.parse(savedAds);
        if (Array.isArray(parsed)) {
          setAdsCount(parsed.length);
          const totalImp = parsed.reduce((sum, ad) => sum + (ad.impressions || 0), 0);
          setAdsImpressions(totalImp);
        }
      }
      const savedErrors = localStorage.getItem('aalam_media_errors');
      if (savedErrors) {
        const parsed = JSON.parse(savedErrors);
        if (Array.isArray(parsed)) {
          setErrorReportsCount(parsed.length);
        }
      }
    } catch (e) {}
  }, []);

  const publishedArticles = articles.filter(a => a.status === 'PUBLISHED');
  const recentArticles = articles.slice(0, 5);

  const confirmDelete = (id: string) => {
    deleteArticle(id);
    setDeleteTargetId(null);
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Newsroom Executive Dashboard</h1>
          <p className="text-xs text-gray-400 mt-1">
            Haala waliigalaa tamsaasa oduu, miseensota, beeksisa, fi gabaasa dogoggoraa Aalam Media.
          </p>
        </div>

        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-lg transition active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Barruu Haaraa Barreessi &rarr;</span>
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-gray-950 border border-gray-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Oduu Maxxanfame</span>
            <FileText className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{publishedArticles.length}</div>
          <span className="text-[11px] text-emerald-400 font-mono">100% Google News Ready</span>
        </div>

        <div className="p-5 rounded-2xl bg-gray-950 border border-gray-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Miseensota Galmaa'an</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{membersCount}</div>
          <Link href="/admin/members" className="text-[11px] text-blue-400 hover:underline">
            Ilaali & CSV dhaan Baasi &rarr;
          </Link>
        </div>

        <div className="p-5 rounded-2xl bg-gray-950 border border-gray-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Beeksisa Hojiirra Jiru</span>
            <Megaphone className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{adsCount}</div>
          <span className="text-[11px] text-purple-400 font-mono">
            {adsImpressions === 0 ? '0 impressions' : `${adsImpressions.toLocaleString()} impressions`}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-gray-950 border border-gray-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Gabaasa Dogoggoraa</span>
            <AlertCircle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{errorReportsCount}</div>
          <Link href="/admin/errors" className="text-[11px] text-amber-400 hover:underline">
            Sirreessi (Review Queue) &rarr;
          </Link>
        </div>
      </div>

      {/* Editorial Flow & Recent News Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 p-6 rounded-2xl bg-gray-950 border border-gray-800 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              ODUU DHIYOOTTI MAXXANFAMAN ({articles.length})
            </h3>
            <Link href="/admin/articles" className="text-xs text-emerald-400 hover:underline">
              Hunda Gulaali &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {recentArticles.map((art) => (
              <div key={art.id} className="p-3.5 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-between gap-4 group hover:border-gray-700 transition">
                <div className="flex items-center gap-3 overflow-hidden">
                  <img
                    src={art.featuredImage?.url || '/images/aalam-media-1.jpg'}
                    alt={art.headline}
                    className="w-12 h-10 rounded-lg object-cover shrink-0 border border-gray-800"
                  />
                  <div className="space-y-0.5 overflow-hidden">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">{art.category}</span>
                    <h4 className="text-xs font-bold text-white truncate max-w-sm">{art.headline}</h4>
                    <span className="text-[11px] text-gray-400 font-mono block">
                      {art.author.name} · {new Date(art.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono">
                    {art.status}
                  </span>

                  <Link
                    href={`/news/${art.slug}`}
                    target="_blank"
                    className="p-1.5 rounded-lg bg-gray-950 hover:bg-gray-800 text-gray-400 hover:text-white transition"
                    title="Ilaali (View on site)"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>

                  {/* Quick Delete */}
                  {deleteTargetId === art.id ? (
                    <div className="flex items-center gap-1 bg-red-950/80 border border-red-800 rounded-lg p-1 animate-fade-in">
                      <span className="text-[10px] text-red-300 px-1 font-bold">Haquu?</span>
                      <button
                        onClick={() => confirmDelete(art.id)}
                        className="px-1.5 py-0.5 bg-red-600 text-white text-[10px] font-bold rounded"
                      >
                        Eeyyee
                      </button>
                      <button
                        onClick={() => setDeleteTargetId(null)}
                        className="px-1.5 py-0.5 bg-gray-800 text-gray-300 text-[10px] rounded"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteTargetId(art.id)}
                      className="p-1.5 rounded-lg bg-gray-950 hover:bg-red-950/80 text-gray-500 hover:text-red-400 transition"
                      title="Haqi (Delete article)"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {articles.length === 0 && (
              <p className="text-xs text-gray-500 text-center py-4">Oduun tokkollee hin jiru.</p>
            )}
          </div>
        </div>

        {/* Quick Ticker Switch Status */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-gray-950 border border-gray-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-red-400">
              <Flame className="w-5 h-5" />
              <h3 className="text-sm font-bold text-white">Breaking News Ticker</h3>
            </div>
            <p className="text-xs text-gray-300">
              Tamsaasa oduu ariifachiisaa weebsaayitii irratti ifatti mul'atu to'achuuf.
            </p>
            <div className="p-3 rounded-xl bg-gray-900 border border-gray-800 text-xs text-gray-300 font-mono">
              Status: <strong className="text-emerald-400">ACTIVE (ON)</strong>
            </div>
          </div>

          <Link
            href="/admin/breaking"
            className="w-full text-center bg-gray-900 hover:bg-gray-800 border border-gray-700 text-white font-bold py-2 rounded-xl text-xs transition"
          >
            Mata-Duree Ticker Jijjiiri &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
