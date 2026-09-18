'use client';

import React from 'react';
import { ImageSlotMeta } from '@/lib/types';
import { Image as ImageIcon } from 'lucide-react';

interface ImageSlotProps {
  meta?: ImageSlotMeta;
  aspect?: 'video' | 'square' | 'wide' | 'tall';
  className?: string;
  fallbackLabel?: string;
}

export default function ImageSlot({ 
  meta, 
  aspect = 'video', 
  className = '',
  fallbackLabel = '[IMAGE SLOT / UPLOAD AREA]'
}: ImageSlotProps) {
  const aspectClasses = {
    video: 'aspect-video',
    square: 'aspect-square',
    wide: 'aspect-[21/9]',
    tall: 'aspect-[3/4]'
  };

  const hasUrl = meta?.url && meta.url.trim().length > 0;

  return (
    <figure className={`relative overflow-hidden rounded-xl bg-gray-900 border border-gray-800 flex flex-col ${className}`}>
      <div className={`relative w-full ${aspectClasses[aspect]} overflow-hidden group flex items-center justify-center bg-gray-950`}>
        {hasUrl ? (
          <img
            src={meta.url}
            alt={meta.alt || 'Aalam Media Image'}
            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center text-gray-400">
            <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center mb-2 text-emerald-400">
              <ImageIcon className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40">
              {fallbackLabel}
            </span>
            {meta?.alt && (
              <p className="text-xs text-gray-400 mt-2 font-medium max-w-xs">{meta.alt}</p>
            )}
          </div>
        )}
      </div>

      {(meta?.caption || meta?.credit || meta?.source) && (
        <figcaption className="px-3 py-2 text-xs bg-gray-900/90 text-gray-400 border-t border-gray-800/80 flex flex-wrap items-center justify-between gap-2">
          {meta.caption && (
            <span className="italic text-gray-300 line-clamp-1">{meta.caption}</span>
          )}
          <div className="flex items-center gap-2 text-[11px] text-gray-500 font-mono shrink-0">
            {meta.credit && <span>Suuraa: <strong className="text-gray-400">{meta.credit}</strong></span>}
            {meta.source && <span className="border-l border-gray-700 pl-2">Madda: {meta.source}</span>}
          </div>
        </figcaption>
      )}
    </figure>
  );
}
