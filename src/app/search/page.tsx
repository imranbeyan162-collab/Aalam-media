'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { initialArticles } from '@/lib/data/seed';
import ImageSlot from '@/components/ui/ImageSlot';
import { Search, Filter, Calendar } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams?.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(q);
  const [selectedCat, setSelectedCat] = useState('All');

  useEffect(() => {
    if (q) setSearchTerm(q);
  }, [q]);

  const results = initialArticles.filter((art) => {
    const term = searchTerm.toLowerCase().trim();
    const matchesTerm = !term ||
      art.headline.toLowerCase().includes(term) ||
      art.subtitle.toLowerCase().includes(term) ||
      art.author.name.toLowerCase().includes(term) ||
      art.tags.some(t => t.toLowerCase().includes(term)) ||
      art.content.toLowerCase().includes(term);

    const matchesCat = selectedCat === 'All' || art.category === selectedCat;
    return matchesTerm && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-gray-800 pb-6">
        <h1 className="text-3xl font-black text-white">
          Barbaadi (Full-Site Search)
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Barruulee, Ulamaa'ota, sagantaalee fi oduu Aalam Media barbaadaa.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Mee jecha ykn mata-duree barbaaddan galchaa..."
            className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <select
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
          className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
        >
          <option value="All">Ramaddii Hunda (All Categories)</option>
          <option value="Oduu Biyyoolessaa">Oduu Biyyoolessaa</option>
          <option value="Oduu Muslimaa">Oduu Muslimaa</option>
          <option value="Oduu Addunyaalessaa">Oduu Addunyaalessaa</option>
          <option value="Seenaa Ulamaa’otaa">Seenaa Ulamaa’otaa</option>
          <option value="Barnoota Islaamaa">Barnoota Islaamaa</option>
        </select>
      </div>

      <div>
        <span className="text-xs text-gray-400 font-mono">
          Bu'aa barbaadaa: <strong>{results.length}</strong> argaman
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((art) => (
          <div key={art.id} className="aalam-news-card rounded-2xl overflow-hidden p-4 space-y-3">
            <ImageSlot meta={art.featuredImage} aspect="video" />
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">{art.category}</span>
              <Link href={`/news/${art.slug}`} className="block font-bold text-sm text-white hover:text-emerald-400 line-clamp-2">
                {art.headline}
              </Link>
              <p className="text-xs text-gray-400 line-clamp-2">{art.subtitle}</p>
            </div>
            <div className="pt-2 border-t border-gray-800 flex items-center justify-between text-[11px] text-gray-500 font-mono">
              <span>{art.author.name}</span>
              <span>{new Date(art.publishedAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-xs text-gray-400">Barbaadaa jira...</div>}>
      <SearchContent />
    </Suspense>
  );
}
