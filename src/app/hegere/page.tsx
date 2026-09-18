'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n';
import ImageSlot from '@/components/ui/ImageSlot';
import { initialHegere } from '@/lib/data/seed';
import { Compass, MapPin, Calendar, Quote } from 'lucide-react';

export default function HegerePage() {
  const { t } = useLanguage();
  const story = initialHegere[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="border-b border-gray-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-lg">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              AALAM TRAVEL & EXPLORATION
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              Hegere (Imala Hundeeffamaa)
            </h1>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-2xl">
          Hundeeffamaan Aalam Media Misbah Sheikh Husein iddoowwan seena qabeeyyii, aadaa fi jireenya hawaasaa daawwachuun mudannoo isaa dhalootaaf dhiyeessa.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6">
          <ImageSlot meta={story.coverImage} aspect="video" className="shadow-2xl" />
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center gap-3 text-xs text-amber-400 font-mono">
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{story.destination}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{story.date}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
            {story.title}
          </h2>

          <p className="text-sm text-gray-300 leading-relaxed">
            {story.summary}
          </p>

          {/* Founder Quote */}
          <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-800/40 relative space-y-2">
            <Quote className="w-6 h-6 text-amber-500/40 absolute top-3 right-3" />
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              Yaada Misbah Sheikh Husein:
            </span>
            <p className="text-xs sm:text-sm text-gray-200 italic leading-relaxed">
              "{story.founderNotes}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
