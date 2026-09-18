'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import ImageSlot from '@/components/ui/ImageSlot';
import { initialArticles } from '@/lib/data/seed';
import { Search, Clock, ThumbsUp, Eye, Filter } from 'lucide-react';

export default function NewsArchivePage() {
  const { t } = useLanguage();
  const [selectedCat, setSelectedCat] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'Hunda (All)' },
    { id: 'Oduu Biyyoolessaa', label: 'Oduu Biyyoolessaa' },
    { id: 'Oduu Muslimaa', label: 'Oduu Muslimaa' },
    { id: 'Oduu Addunyaalessaa', label: 'Oduu Addunyaalessaa' },
    { id: 'Seenaa Ulamaa’otaa', label: "Seenaa Ulamaa'otaa" },
    { id: 'Barnoota Islaamaa', label: 'Barnoota Islaamaa' },
    { id: 'Hegere (Imala)', label: 'Hegere (Imala)' }
  ];

  const filteredArticles = initialArticles.filter(art => {
    const matchesCat = selectedCat === 'all' || art.category === selectedCat;
    const matchesSearch = !searchTerm.trim() || 
      art.headline.toLowerCase().includes(searchTerm.toLowerCase()) || 
      art.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-gray-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
            AALAM MEDIA NEWSROOM
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Kuusaa Oduu & Barruulee
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Oduu biyya keessaa, addunyaa Muslimaa fi addunyaalessaa dhugaa fi qulqullinaan.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Oduu barbaadaa..."
            className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2">
        <Filter className="w-3.5 h-3.5 text-gray-500 shrink-0" />
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCat(c.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 ${selectedCat === c.id ? 'bg-emerald-600 text-white font-bold' : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((art) => (
          <div key={art.id} className="aalam-news-card rounded-2xl overflow-hidden flex flex-col justify-between">
            <div>
              <Link href={`/news/${art.slug}`}>
                <ImageSlot meta={art.featuredImage} aspect="video" className="rounded-none border-0" />
              </Link>
              <div className="p-5 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <span className="text-emerald-400 font-bold">{art.category}</span>
                  <span>{new Date(art.publishedAt).toLocaleDateString()}</span>
                </div>
                <Link href={`/news/${art.slug}`} className="block font-bold text-lg text-white hover:text-emerald-400 transition leading-snug">
                  {art.headline}
                </Link>
                <p className="text-xs text-gray-300 line-clamp-3 leading-relaxed">
                  {art.subtitle}
                </p>
              </div>
            </div>

            <div className="p-5 pt-2 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400">
              <span className="font-medium text-gray-300">{art.author.name}</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-emerald-400">
                  <ThumbsUp className="w-3 h-3" />
                  {art.reactions.like}
                </span>
                <Link href={`/news/${art.slug}`} className="text-emerald-400 font-bold hover:underline">
                  Dubbisi &rarr;
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
