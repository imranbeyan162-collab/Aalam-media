'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { initialAudios } from '@/lib/data/seed';
import { Play, Pause, Volume2, Mic, Calendar, Clock, Radio } from 'lucide-react';

export default function AudioPage() {
  const { t } = useLanguage();
  const [currentAudio, setCurrentAudio] = useState(initialAudios[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="border-b border-gray-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg">
            <Radio className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              AALAM AUDIO NETWORK
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              Sagalee (Audio & Lectures)
            </h1>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 mt-2">
          Gabaasa oduu sagaleen qophaa'e, darsiilee fi barnoota Islaamaa, qaraatii Qur'aanaa qulqulluu.
        </p>
      </div>

      {/* Featured Persistent Audio Player Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#06180F] via-gray-900 to-gray-950 border border-emerald-800/80 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
              {currentAudio.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">{currentAudio.title}</h2>
            <p className="text-xs text-gray-400">Lallabaa / Gabaasaa: <strong className="text-gray-200">{currentAudio.speaker}</strong></p>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-2xl text-xs transition shadow-xl"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            <span>{isPlaying ? 'Dhaabi (Pause)' : 'Dhaggeeffadhaa (Play)'}</span>
          </button>
        </div>

        {/* Audio Progress Bar */}
        <div className="pt-2 space-y-1 font-mono text-xs text-gray-400">
          <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden">
            <div className={`h-full bg-emerald-500 ${isPlaying ? 'w-1/3 animate-pulse' : 'w-0'}`}></div>
          </div>
          <div className="flex justify-between text-[11px]">
            <span>{isPlaying ? '08:45' : '00:00'}</span>
            <span>{currentAudio.duration}</span>
          </div>
        </div>
      </div>

      {/* Audio Track List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white uppercase tracking-wider border-l-4 border-emerald-500 pl-3">
          Kuusaa Sagalee (All Audio Broadcasts)
        </h3>

        <div className="space-y-3">
          {initialAudios.map((aud) => (
            <div
              key={aud.id}
              onClick={() => { setCurrentAudio(aud); setIsPlaying(true); }}
              className={`cursor-pointer p-4 rounded-xl border transition flex items-center justify-between gap-4 ${currentAudio.id === aud.id ? 'bg-emerald-950/40 border-emerald-600 shadow-md' : 'bg-gray-900 border-gray-800 hover:border-gray-700'}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-950 border border-gray-800 flex items-center justify-center text-emerald-400">
                  {currentAudio.id === aud.id && isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">{aud.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                    <span className="text-emerald-400">{aud.category}</span>
                    <span>·</span>
                    <span>{aud.speaker}</span>
                  </div>
                </div>
              </div>

              <span className="text-xs font-mono text-gray-500 shrink-0">
                {aud.duration}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
