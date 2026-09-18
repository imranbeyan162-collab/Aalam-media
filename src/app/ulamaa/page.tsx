'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { initialScholars } from '@/lib/data/seed';
import { BookOpen, Award } from 'lucide-react';

export default function UlamaaPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="border-b border-gray-800 pb-6">
        <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
          STARS OF ISLAM — SCHOLAR ARCHIVE
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Seenaa Ulamaa’otaa (Urjilee Islaamaa)
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-2">
          Ulamaa'ota gurguddoo seenaa keessatti beekumsa, nagaa fi amantaa Islaamaa dhalootaaf dabarsan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialScholars.map((sch) => (
          <div key={sch.id} className="p-6 rounded-2xl bg-gray-900 border border-gray-800 space-y-4 hover:border-emerald-500 transition">
            <div className="w-14 h-14 rounded-2xl bg-emerald-950 border border-emerald-700 flex items-center justify-center text-emerald-400 font-bold text-xl">
              {sch.name.charAt(0)}
            </div>

            <div>
              <span className="text-xs text-emerald-400 font-mono">{sch.era}</span>
              <h3 className="text-xl font-bold text-white mt-0.5">{sch.name}</h3>
              <p className="text-xs text-gray-400 font-medium">{sch.title}</p>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              {sch.bio}
            </p>

            <div className="pt-3 border-t border-gray-800 space-y-1.5">
              <span className="text-xs font-bold text-emerald-400 block">Gumaacha Guddaa:</span>
              <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                {sch.keyContributions.map((contrib, idx) => (
                  <li key={idx}>{contrib}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
