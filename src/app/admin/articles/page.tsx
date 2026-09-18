'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { initialArticles } from '@/lib/data/seed';
import { Article } from '@/lib/types';
import { FileText, PlusCircle, CheckCircle, Clock, AlertCircle, Edit, Trash2 } from 'lucide-react';

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filtered = statusFilter === 'ALL'
    ? articles
    : articles.filter(a => a.status === statusFilter);

  const updateStatus = (id: string, newStatus: Article['status']) => {
    setArticles(articles.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
            EDITORIAL WORKFLOW ENGINE
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Gulaallii fi Maxxansa Oduu (Articles)
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Sadarkaa: <strong>Reporter &rarr; Draft &rarr; Editor Review &rarr; Correction &rarr; Publish</strong>
          </p>
        </div>

        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Barruu Haaraa Barreessi</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-800 pb-3 text-xs font-semibold">
        {['ALL', 'PUBLISHED', 'EDITOR_REVIEW', 'DRAFT', 'CORRECTION'].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 rounded-lg transition font-mono ${statusFilter === st ? 'bg-emerald-600 text-white' : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'}`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Article Table */}
      <div className="rounded-2xl bg-gray-950 border border-gray-800 overflow-hidden">
        <table className="w-full text-left text-xs text-gray-300">
          <thead className="bg-gray-900 text-gray-400 uppercase font-mono text-[10px]">
            <tr>
              <th className="p-3.5">Mata-Duree (Headline)</th>
              <th className="p-3.5">Ramaddii</th>
              <th className="p-3.5">Barreessaa</th>
              <th className="p-3.5">Haala (Status)</th>
              <th className="p-3.5 text-right">Tarkaanfii (Actions)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filtered.map((art) => (
              <tr key={art.id} className="hover:bg-gray-900/60 transition">
                <td className="p-3.5">
                  <span className="font-bold text-white block max-w-sm line-clamp-1">{art.headline}</span>
                  <span className="text-[11px] text-gray-500 font-mono">{art.slug}</span>
                </td>
                <td className="p-3.5 font-mono text-emerald-400">{art.category}</td>
                <td className="p-3.5">{art.author.name}</td>
                <td className="p-3.5">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                    art.status === 'PUBLISHED' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                    art.status === 'EDITOR_REVIEW' ? 'bg-blue-950 text-blue-400 border border-blue-800' :
                    art.status === 'CORRECTION' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                    'bg-gray-800 text-gray-400'
                  }`}>
                    {art.status}
                  </span>
                </td>
                <td className="p-3.5 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    {art.status !== 'PUBLISHED' && (
                      <button
                        onClick={() => updateStatus(art.id, 'PUBLISHED')}
                        className="px-2 py-1 rounded bg-emerald-700 hover:bg-emerald-600 text-white text-[11px] font-bold"
                      >
                        Approve & Publish
                      </button>
                    )}
                    {art.status === 'PUBLISHED' && (
                      <button
                        onClick={() => updateStatus(art.id, 'EDITOR_REVIEW')}
                        className="px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 text-[11px]"
                      >
                        Unpublish
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
