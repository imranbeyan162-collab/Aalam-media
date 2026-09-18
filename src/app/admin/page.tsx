'use client';

import React from 'react';
import Link from 'next/link';
import { initialArticles, initialBreakingNews, initialMembers, initialAds, initialErrorReports } from '@/lib/data/seed';
import { 
  FileText, 
  Flame, 
  Users, 
  Megaphone, 
  AlertCircle, 
  Eye, 
  ArrowUpRight, 
  PlusCircle, 
  CheckCircle2 
} from 'lucide-react';

export default function AdminDashboardPage() {
  const publishedCount = initialArticles.filter(a => a.status === 'PUBLISHED').length;
  const draftCount = initialArticles.filter(a => a.status !== 'PUBLISHED').length;

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
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-lg transition"
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
          <div className="text-2xl font-black text-white font-mono">{publishedCount}</div>
          <span className="text-[11px] text-emerald-400 font-mono">100% Google News Ready</span>
        </div>

        <div className="p-5 rounded-2xl bg-gray-950 border border-gray-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Miseensota Galmaa'an</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{initialMembers.length}</div>
          <Link href="/admin/members" className="text-[11px] text-blue-400 hover:underline">
            Ilaali & CSV dhaan Baasi &rarr;
          </Link>
        </div>

        <div className="p-5 rounded-2xl bg-gray-950 border border-gray-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Beeksisa Hojiirra Jiru</span>
            <Megaphone className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{initialAds.length}</div>
          <span className="text-[11px] text-purple-400 font-mono">4,850 impressions</span>
        </div>

        <div className="p-5 rounded-2xl bg-gray-950 border border-gray-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Gabaasa Dogoggoraa</span>
            <AlertCircle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{initialErrorReports.length}</div>
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
              Oduu Dhiyootti Maxxanfaman
            </h3>
            <Link href="/admin/articles" className="text-xs text-emerald-400 hover:underline">
              Hunda Gulaali &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {initialArticles.slice(0, 4).map((art) => (
              <div key={art.id} className="p-3 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">{art.category}</span>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{art.headline}</h4>
                  <span className="text-[11px] text-gray-400 font-mono">{art.author.name} · {art.views} views</span>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 shrink-0 font-mono">
                  {art.status}
                </span>
              </div>
            ))}
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
