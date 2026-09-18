'use client';

import React from 'react';
import { Advertisement } from '@/lib/types';

interface AdSlotProps {
  ad?: Advertisement;
  placement?: 'Homepage' | 'Article' | 'Category' | 'Mobile' | 'Desktop';
  className?: string;
}

export default function AdSlot({ ad, placement = 'Homepage', className = '' }: AdSlotProps) {
  return (
    <div className={`w-full my-6 p-4 rounded-xl bg-gray-950 border border-gray-800 flex flex-col items-center justify-center text-center relative overflow-hidden ${className}`}>
      {/* Required distinction: Sponsored badge */}
      <span className="absolute top-2 right-2 text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-gray-800 text-gray-400 border border-gray-700">
        Beeksisa / Sponsored
      </span>

      {ad?.image?.url ? (
        <a href={ad.link || '#'} target="_blank" rel="noopener noreferrer" className="block w-full">
          <img
            src={ad.image.url}
            alt={ad.advertiserName || 'Advertisement'}
            className="w-full max-h-40 sm:max-h-52 object-cover rounded-lg"
          />
          <span className="block text-xs text-gray-400 mt-2 font-medium">
            {ad.advertiserName}
          </span>
        </a>
      ) : (
        <div className="py-6 px-4 flex flex-col items-center">
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest bg-emerald-950/60 border border-emerald-800/40 px-3 py-1 rounded-md mb-2">
            [ADVERTISEMENT PLACEMENT - {placement.toUpperCase()}]
          </span>
          <p className="text-xs text-gray-400 max-w-sm">
            Dhaabbata ykn tajaajila keessan Aalam Media irratti beeksisuuf nu qunnamaa: 
            <strong className="text-gray-300 ml-1 font-mono">0915636302 / misbahsheikhhusein@gmail.com</strong>
          </p>
        </div>
      )}
    </div>
  );
}
