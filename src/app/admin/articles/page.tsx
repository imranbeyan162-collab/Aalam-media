'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useArticles } from '@/lib/articlesStore';
import { Article } from '@/lib/types';
import { 
  PlusCircle, 
  Trash2, 
  Eye, 
  CheckCircle, 
  AlertTriangle, 
  RotateCcw,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function AdminArticlesPage() {
  const { articles, deleteArticle, updateArticleStatus, resetToDefaults } = useArticles();
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const filtered = statusFilter === 'ALL'
    ? articles
    : articles.filter(a => a.status === statusFilter);

  const confirmDelete = () => {
    if (!articleToDelete) return;
    deleteArticle(articleToDelete.id);
    setFeedbackMessage(`Oduun "${articleToDelete.headline}" milkaa'inaan haqameera.`);
    setArticleToDelete(null);
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
            EDITORIAL NEWS MANAGER
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Gulaallii fi To'annoo Oduu (Articles)
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Barruulee weebsaayitii irratti maxxanfaman to'adhaa, haaraa dabaladhaa, ykn kan duraanii haqaatii sirreessaa.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/articles/new"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-lg transition active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Barruu Haaraa Barreessi</span>
          </Link>
        </div>
      </div>

      {/* SUCCESS NOTIFICATION */}
      {feedbackMessage && (
        <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-600 text-emerald-300 text-xs font-bold flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{feedbackMessage}</span>
          </div>
          <button onClick={() => setFeedbackMessage(null)} className="text-xs text-gray-400 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {articleToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#111814] border-2 border-red-900/80 rounded-3xl p-6 space-y-4 shadow-2xl animate-fade-in">
            <div className="flex items-center gap-3 text-red-400">
              <div className="w-10 h-10 rounded-full bg-red-950 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Oduu Kana Haquu Barbaadduu?</h3>
                <p className="text-xs text-gray-400">Tarkaanfiin kun weebsaayitii irraa balleessa.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-950 border border-gray-800 space-y-1">
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">{articleToDelete.category}</span>
              <h4 className="text-xs font-bold text-white line-clamp-2">{articleToDelete.headline}</h4>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setArticleToDelete(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-gray-900 hover:bg-gray-800 text-gray-300 transition"
              >
                Dhiisi (Cancel)
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white transition flex items-center gap-1.5 shadow"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Eeyyee, Haqi (Yes, Delete)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Tabs & Stats */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-800 pb-3 text-xs">
        <div className="flex items-center gap-2">
          {['ALL', 'PUBLISHED', 'EDITOR_REVIEW', 'DRAFT'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg transition font-mono font-semibold ${statusFilter === st ? 'bg-emerald-600 text-white shadow' : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'}`}
            >
              {st} {st === 'ALL' ? `(${articles.length})` : `(${articles.filter(a => a.status === st).length})`}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            if (confirm('Oduuwwan gara qophii jalqabaatti (default seed) deebisuu barbaadduu?')) {
              resetToDefaults();
              setFeedbackMessage('Oduun hundi gara qophii jalqabaatti deebi\'eera.');
            }
          }}
          className="text-[11px] font-mono text-gray-400 hover:text-amber-400 flex items-center gap-1 transition"
          title="Reset to default seed data"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Gara Jalqabaatti Deebisi</span>
        </button>
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-gray-950 border border-gray-800 space-y-3">
          <p className="text-gray-400 text-sm">Barruun tokkollee hin jiru.</p>
          <Link
            href="/admin/articles/new"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-4 py-2 rounded-xl text-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Barruu Haaraa Maxxansaa</span>
          </Link>
        </div>
      )}

      {/* Article Table */}
      {filtered.length > 0 && (
        <div className="rounded-2xl bg-gray-950 border border-gray-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-[#080E0B] text-gray-400 uppercase font-mono text-[10px] border-b border-gray-800">
                <tr>
                  <th className="p-3.5">Suuraa & Mata-Duree</th>
                  <th className="p-3.5">Ramaddii</th>
                  <th className="p-3.5">Barreessaa</th>
                  <th className="p-3.5">Haala (Status)</th>
                  <th className="p-3.5 text-right">Tarkaanfii (Actions)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/80">
                {filtered.map((art) => (
                  <tr key={art.id} className="hover:bg-gray-900/50 transition">
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={art.featuredImage?.url || '/images/aalam-media-1.jpg'}
                          alt={art.headline}
                          className="w-12 h-9 rounded object-cover border border-gray-800 shrink-0"
                        />
                        <div className="max-w-md">
                          <span className="font-bold text-white block line-clamp-1 hover:text-emerald-400 transition">
                            {art.headline}
                          </span>
                          <span className="text-[11px] text-gray-500 font-mono">
                            {new Date(art.publishedAt).toLocaleDateString()} · {art.slug}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 font-mono text-emerald-400 font-medium whitespace-nowrap">
                      {art.category}
                    </td>
                    <td className="p-3.5 text-gray-300 whitespace-nowrap">
                      {art.author.name}
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                        art.status === 'PUBLISHED' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                        art.status === 'EDITOR_REVIEW' ? 'bg-blue-950 text-blue-400 border border-blue-800' :
                        'bg-gray-800 text-gray-400'
                      }`}>
                        {art.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {/* View link */}
                        <Link
                          href={`/news/${art.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white transition"
                          title="View on site"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>

                        {/* Status Toggle */}
                        {art.status !== 'PUBLISHED' ? (
                          <button
                            onClick={() => updateArticleStatus(art.id, 'PUBLISHED')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-[11px] font-bold transition"
                          >
                            Maxxansi
                          </button>
                        ) : (
                          <button
                            onClick={() => updateArticleStatus(art.id, 'DRAFT')}
                            className="px-2 py-1 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-400 text-[11px] transition"
                            title="Unpublish to draft"
                          >
                            Dhaabi
                          </button>
                        )}

                        {/* DELETE BUTTON (Requested by user) */}
                        <button
                          onClick={() => setArticleToDelete(art)}
                          className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-900/50 text-red-400 hover:text-red-300 transition"
                          title="Haqi (Delete this article)"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
