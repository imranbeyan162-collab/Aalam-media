'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import ImageSlot from '@/components/ui/ImageSlot';
import { initialAlbums } from '@/lib/data/seed';
import { Camera, Calendar, MapPin, X } from 'lucide-react';

export default function GalleryPage() {
  const { t } = useLanguage();
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="border-b border-gray-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              AALAM PHOTO ARCHIVE
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              Kuusaa Suuraa (Photo Gallery)
            </h1>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 mt-2">
          Suuraalee istaadiyoo, qophiilee eebbaa, seenaa fi aadaa Oromoo suuraadhaan qindaa'an.
        </p>
      </div>

      {/* Albums Grid */}
      <div className="space-y-8">
        {initialAlbums.map((alb) => (
          <div key={alb.id} className="p-6 rounded-3xl bg-gray-950 border border-gray-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800/80 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">{alb.category}</span>
                <h3 className="text-xl font-bold text-white">{alb.title}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{alb.caption}</p>
              </div>
              <div className="text-xs text-gray-400 font-mono space-y-0.5 text-right sm:text-left">
                <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-emerald-500" /><span>{alb.location}</span></div>
                <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-emerald-500" /><span>{alb.date}</span></div>
              </div>
            </div>

            {/* Photos Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div
                onClick={() => setLightboxImg(alb.coverImage.url || '')}
                className="cursor-pointer group relative overflow-hidden rounded-xl border border-gray-800"
              >
                <img src={alb.coverImage.url} alt={alb.title} className="w-full h-48 object-cover group-hover:scale-105 transition duration-300" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white font-bold text-xs">
                  Guddisii Ilaali
                </div>
              </div>

              {alb.photos.map((p, idx) => (
                <div
                  key={idx}
                  onClick={() => setLightboxImg(p.url || '')}
                  className="cursor-pointer group relative overflow-hidden rounded-xl border border-gray-800"
                >
                  <img src={p.url} alt={p.alt} className="w-full h-48 object-cover group-hover:scale-105 transition duration-300" />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white font-bold text-xs">
                    Guddisii Ilaali
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxImg(null)}
            className="absolute top-6 right-6 text-white p-2 rounded-full bg-gray-900/80 hover:bg-gray-800"
          >
            <X className="w-6 h-6" />
          </button>
          <img src={lightboxImg} alt="Lightbox" className="max-w-full max-h-[85vh] rounded-xl shadow-2xl object-contain" />
        </div>
      )}
    </div>
  );
}
