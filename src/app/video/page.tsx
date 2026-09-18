'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import ImageSlot from '@/components/ui/ImageSlot';
import { initialVideos } from '@/lib/data/seed';
import { Video, Play, Filter, Share2 } from 'lucide-react';

export default function VideoPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState(initialVideos[0]);

  const categories = [
    'All',
    'Latest Videos',
    'Islamic Videos',
    'News Videos',
    'Interviews',
    'Aalam Podcast (video)',
    'Short Videos'
  ];

  const filteredVideos = activeTab === 'All'
    ? initialVideos
    : initialVideos.filter(v => v.category === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="border-b border-gray-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              AALAM VIDEO HUB
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              Viidiyoo (Video Library)
            </h1>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 mt-2">
          Sagantaalee viidiyoo kallattiin tamsaafaman, qophii da'awaa, gaaf-deebii fi oduu suuraa.
        </p>
      </div>

      {/* Main Video Player Screen */}
      <div className="p-4 sm:p-6 rounded-3xl bg-gray-950 border border-gray-800 space-y-4 shadow-2xl">
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center">
          {/* Support YouTube / TikTok / direct upload preview */}
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/videoseries?list=PL_example"
            title={selectedVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-400 font-mono uppercase bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-800/40">
              {selectedVideo.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">{selectedVideo.title}</h2>
            <span className="text-xs text-gray-400 font-mono">{selectedVideo.publishedAt} · {selectedVideo.duration}</span>
          </div>

          <a
            href="https://www.youtube.com/@AalamMedia-cc8lij"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 hover:bg-red-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition"
          >
            <Video className="w-4 h-4" />
            <span>YouTube irratti hordofaa</span>
          </a>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-800 pb-3">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveTab(c)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${activeTab === c ? 'bg-emerald-600 text-white' : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'}`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredVideos.map((vid) => (
          <div
            key={vid.id}
            onClick={() => setSelectedVideo(vid)}
            className="cursor-pointer rounded-2xl bg-gray-900 border border-gray-800 overflow-hidden hover:border-emerald-600 transition group flex flex-col justify-between"
          >
            <div className="relative">
              <ImageSlot meta={vid.thumbnail} aspect="video" className="rounded-none border-0" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-80 group-hover:opacity-100 transition">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                  <Play className="w-5 h-5 ml-0.5 fill-white" />
                </div>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/80 font-mono text-[11px] text-white px-2 py-0.5 rounded">
                {vid.duration}
              </span>
            </div>
            <div className="p-4 space-y-1.5">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">{vid.category}</span>
              <h4 className="font-bold text-sm text-white line-clamp-2 leading-snug">{vid.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
