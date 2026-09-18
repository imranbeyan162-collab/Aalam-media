'use client';

import React from 'react';
import Link from 'next/link';
import { Flame } from 'lucide-react';

interface BreakingNewsProps {
  items: { id: string; text: string; link?: string; active?: boolean }[];
  active?: boolean;
}

export default function BreakingNewsTicker({ items, active = true }: BreakingNewsProps) {
  if (!active || !items || items.length === 0) return null;

  return (
    <div className="w-full bg-[#1A0A0A] border-y border-red-950/80 flex items-center overflow-hidden py-2 px-3 shadow-inner">
      <div className="flex items-center gap-1.5 bg-red-600 text-white font-black text-xs px-3 py-1 rounded-md uppercase tracking-wider shrink-0 z-10 shadow-sm">
        <Flame className="w-3.5 h-3.5 fill-white animate-bounce" />
        <span>Oduu Ariifachiisaa</span>
      </div>

      <div className="flex-1 overflow-hidden ml-3 relative">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-xs font-medium text-gray-200">
          {items.map((item, idx) => (
            <span key={item.id || idx} className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              {item.link ? (
                <Link href={item.link} className="hover:text-red-400 hover:underline transition">
                  {item.text}
                </Link>
              ) : (
                <span>{item.text}</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
