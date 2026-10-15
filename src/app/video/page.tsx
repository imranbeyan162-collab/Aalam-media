'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { Video, ExternalLink, Sparkles, PlayCircle, ShieldCheck } from 'lucide-react';

export default function VideoPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-gray-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              AALAM MEDIA BROADCASTS
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              Wiirtuu Viidiyoo (Video Channel Hub)
            </h1>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 mt-2">
          Sagantaalee viidiyoo, qophiilee da'awaa, fi marii hayyoota Islaamaa kallattiin chaanaalota keenya irraa hordofaa.
        </p>
      </div>

      {/* Official Notice Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#06180F] via-gray-950 to-gray-900 border border-emerald-800/80 shadow-2xl space-y-3">
        <div className="flex items-center gap-2.5 text-emerald-400 text-xs font-bold uppercase tracking-wider font-mono">
          <ShieldCheck className="w-4 h-4" />
          <span>Chaanaalota Miidiyaa Hawaasaa Kallattii</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          Viidiyoowwan Aalam Media Hunda Kallattiin Daawwadhaa
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-3xl">
          Tamsaasa qophiilee viidiyoo, marii staadiyoo, fi sagantaalee barnoota Islaamaa qulqullina olaanaan chaanaalota YouTube, TikTok, fi Facebook keenya irratti maxxanfamu. Chaanaalota kanaan nu hordofaa.
        </p>
      </div>

      {/* Official Channel Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* YouTube */}
        <div className="rounded-3xl bg-gray-950 border border-gray-800 p-6 flex flex-col justify-between space-y-5 hover:border-red-600/70 transition shadow-xl group">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-red-600/10 border border-red-600/30 flex items-center justify-center text-red-500 group-hover:scale-105 transition">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </div>
            <div>
              <span className="text-[10px] font-mono text-red-400 uppercase font-bold">Official Channel</span>
              <h3 className="text-lg font-bold text-white">YouTube Channel</h3>
              <p className="text-xs text-gray-500 font-mono">@AalamMedia-cc8lij</p>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Sagantaalee guutuu, da'awaa bal'aa, kutaalee podcast fi qophiilee barnootaa YouTube irratti daawwadhaa.
            </p>
          </div>

          <a
            href="https://www.youtube.com/@AalamMedia-cc8lij"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition shadow-md"
          >
            <span>YouTube Irratti Daawwadhaa</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* TikTok */}
        <div className="rounded-3xl bg-gray-950 border border-gray-800 p-6 flex flex-col justify-between space-y-5 hover:border-emerald-500/70 transition shadow-xl group">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-gray-900 border border-gray-700 flex items-center justify-center text-white group-hover:scale-105 transition">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
            </div>
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Short Videos</span>
              <h3 className="text-lg font-bold text-white">TikTok Channel</h3>
              <p className="text-xs text-gray-500 font-mono">@aalammedia1</p>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Qophiilee gaggabaaboo, qajeelfama jireenyaa, fi yaadachiisa amantii yeroo yeroodhaan TikTok irratti hordofaa.
            </p>
          </div>

          <a
            href="https://www.tiktok.com/@aalammedia1"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition shadow-md"
          >
            <span>TikTok Irratti Hordofaa</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Facebook */}
        <div className="rounded-3xl bg-gray-950 border border-gray-800 p-6 flex flex-col justify-between space-y-5 hover:border-blue-500/70 transition shadow-xl group">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-600/30 flex items-center justify-center text-blue-500 group-hover:scale-105 transition">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </div>
            <div>
              <span className="text-[10px] font-mono text-blue-400 uppercase font-bold">Community & Live</span>
              <h3 className="text-lg font-bold text-white">Facebook Page</h3>
              <p className="text-xs text-gray-500 font-mono">Aalam Media</p>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Tamsaasa kallattii (Live Broadcast), oduu haaraa, fi marii hirmaattotaa Facebook keenya irratti hordofaa.
            </p>
          </div>

          <a
            href="https://www.facebook.com/share/1JPeH4t9nW/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition shadow-md"
          >
            <span>Facebook Irratti Hordofaa</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Authentic Studio Media Showcase */}
      <div className="p-8 rounded-3xl bg-gray-950 border border-gray-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>Istaadiyoo fi Wiirtuu Qophii Aalam Media</span>
          </h3>
          <Link href="/gallery" className="text-xs text-emerald-400 hover:underline">
            Kuusaa Suuraa Hunda Ilaali &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-800">
            <img src="/images/aalam-media-1.jpg" alt="Aalam Media Studio" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
              <span className="text-xs font-bold text-white">Istaadiyoo Qophii Sagantaalee</span>
            </div>
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-800">
            <img src="/images/aalam-media-4.jpg" alt="Aalam Media Recording" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
              <span className="text-xs font-bold text-white">Wiirtuu Tamsaasa Oduu</span>
            </div>
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-800">
            <img src="/images/aalam-media-3.jpg" alt="Aalam Media Production" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
              <span className="text-xs font-bold text-white">Qophii Da'awaa fi Barnoota</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
