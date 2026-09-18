'use client';

import React, { useState } from 'react';
import { initialAds } from '@/lib/data/seed';
import { Advertisement } from '@/lib/types';
import { Megaphone, Plus, Trash2, CheckCircle } from 'lucide-react';

export default function AdminAdsPage() {
  const [ads, setAds] = useState<Advertisement[]>(initialAds);

  const toggleStatus = (id: string) => {
    setAds(ads.map(a => a.id === id ? { ...a, status: a.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' } : a));
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">
            MONETIZATION & SPONSORSHIPS
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Sirna Beeksisaa (Ad System)</h1>
          <p className="text-xs text-gray-400 mt-1">
            Placements: Homepage, Article, Category, Mobile, Desktop.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ads.map((ad) => (
          <div key={ad.id} className="p-6 rounded-2xl bg-gray-950 border border-gray-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase">
                {ad.placement} Slot
              </span>
              <button
                onClick={() => toggleStatus(ad.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${ad.status === 'ACTIVE' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-gray-800 text-gray-400'}`}
              >
                {ad.status}
              </button>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">{ad.advertiserName}</h3>
              <span className="text-xs text-gray-400 font-mono">Daldala: {ad.startDate} &rarr; {ad.endDate}</span>
            </div>

            {ad.image?.url && (
              <img src={ad.image.url} alt={ad.advertiserName} className="w-full h-32 object-cover rounded-xl" />
            )}

            <div className="pt-2 border-t border-gray-800 flex items-center justify-between text-xs text-gray-400 font-mono">
              <span>{ad.impressions} Views</span>
              <span>{ad.clicks} Clicks</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
