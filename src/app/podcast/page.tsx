'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import ImageSlot from '@/components/ui/ImageSlot';
import { initialPodcasts } from '@/lib/data/seed';
import { Radio, Video, Play, Pause, Calendar, Clock, User, Mic } from 'lucide-react';

export default function PodcastPage() {
  const { t } = useLanguage();
  const [activeEp, setActiveEp] = useState(initialPodcasts[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-gray-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              AALAM MEDIA PRODUCTIONS
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              Aalam Podcast
            </h1>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-2xl">
          Marii fi gaaf-deebii hayyoota, ulamaa'ota fi hogganoota hawaasaa waliin. Sagantaa qorannoo, seenaa fi barnoota ammayyaa.
        </p>
      </div>

      {/* Featured Active Episode Showcase */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#061B11] via-gray-900 to-[#0A0F0D] border border-emerald-800 shadow-2xl space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <ImageSlot meta={activeEp.coverImage} aspect="square" className="rounded-2xl shadow-2xl" />
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 font-bold border border-emerald-800">
                Kutaa #{activeEp.episodeNumber}
              </span>
              <span className="text-gray-400">· {activeEp.date} · {activeEp.duration}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              {activeEp.title}
            </h2>

            <div className="p-4 rounded-xl bg-gray-950/80 border border-gray-800 text-xs text-gray-300 space-y-1.5">
              <p className="flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-400" />
                <span><strong>Keessummaa (Guest):</strong> {activeEp.guest}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mic className="w-4 h-4 text-emerald-400" />
                <span><strong>Qopheessaa (Host):</strong> {activeEp.host}</span>
              </p>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed">
              {activeEp.description}
            </p>

            {/* Listen / Watch player triggers */}
            <div className="pt-2 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition shadow-lg"
                >
                  {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlayingAudio ? 'Dhaabi (Pause Audio)' : 'Dhaggeeffadhaa (Listen Audio)'}</span>
                </button>

                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent('Aalam Media Podcast ' + activeEp.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 border border-emerald-800 text-gray-200 font-bold px-5 py-2.5 rounded-xl text-xs transition"
                >
                  <Video className="w-4 h-4 text-red-500" />
                  <span>Daawwadhaa (Watch on YouTube)</span>
                </a>
              </div>

              {/* Simulated Audio Player Waveform */}
              {isPlayingAudio && (
                <div className="p-4 rounded-xl bg-gray-950 border border-emerald-800/80 space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
                    <span className="text-emerald-400 font-bold">Taphaati jira...</span>
                    <span>04:12 / {activeEp.duration}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-1/4 animate-pulse"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Episode Archive List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white uppercase tracking-wider border-l-4 border-emerald-500 pl-3">
          Kutaalee Hunda (All Episodes)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {initialPodcasts.map((ep) => (
            <div
              key={ep.id}
              onClick={() => { setActiveEp(ep); setIsPlayingAudio(false); }}
              className={`cursor-pointer p-4 rounded-2xl border transition flex gap-4 ${activeEp.id === ep.id ? 'bg-emerald-950/40 border-emerald-600 shadow-lg' : 'bg-gray-900 border-gray-800 hover:border-gray-700'}`}
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-xl overflow-hidden bg-gray-950">
                <img src={ep.coverImage.url} alt={ep.title} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1 flex-1">
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40">
                  Kutaa #{ep.episodeNumber}
                </span>
                <h4 className="font-bold text-sm text-white line-clamp-2">{ep.title}</h4>
                <p className="text-xs text-gray-400 line-clamp-1">{ep.guest}</p>
                <span className="text-[11px] text-gray-500 font-mono block">{ep.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
