'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import ImageSlot from '@/components/ui/ImageSlot';
import { initialAlbums } from '@/lib/data/seed';
import { Camera, Calendar, MapPin, X, UploadCloud, ExternalLink, Sparkles, FileText, Info } from 'lucide-react';
import { MediaItem } from '@/lib/types';

export default function GalleryPage() {
  const { t } = useLanguage();
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<MediaItem | null>(null);
  const [uploadedPhotos, setUploadedPhotos] = useState<MediaItem[]>([]);

  useEffect(() => {
    // 1. Check localStorage first for instant client feedback
    try {
      const saved = localStorage.getItem('aalam_media_uploads');
      if (saved) {
        const parsed: MediaItem[] = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const imagesOnly = parsed.filter(m => m.type === 'image' && m.published !== false);
          setUploadedPhotos(imagesOnly);
        }
      }
    } catch (e) {}

    // 2. Sync with server API
    fetch('/api/media')
      .then(res => res.ok ? res.json() : [])
      .then((data: MediaItem[]) => {
        if (Array.isArray(data)) {
          const imagesOnly = data.filter(m => m.type === 'image' && m.published !== false);
          setUploadedPhotos(prev => {
            const map = new Map<string, MediaItem>();
            imagesOnly.forEach(item => map.set(item.id, item));
            prev.forEach(item => {
              if (!map.has(item.id)) map.set(item.id, item);
            });
            return Array.from(map.values());
          });
        }
      })
      .catch(() => {});
  }, []);

  const openLightbox = (url: string, photo?: MediaItem) => {
    setLightboxImg(url);
    setSelectedPhoto(photo || null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-gray-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
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
            Suuraalee istaadiyoo, qophiilee eebbaa, seenaa fi aadaa Oromoo ibsa gahaa waliin suuraadhaan qindaa'an.
          </p>
        </div>

        <Link
          href="/admin/media"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition shadow-lg self-start sm:self-center active:scale-95"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Suuraa Haaraa Ol Fe'i &rarr;</span>
        </Link>
      </div>

      {/* 1. RECENTLY PUBLISHED UPLOADED PHOTOS (Live from Admin Uploads with Descriptions) */}
      {uploadedPhotos.length > 0 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0A1810] to-gray-950 border-2 border-emerald-600/70 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800/60 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                KUUSAA HAARAA · LIVE PUBLISHED PHOTOS ({uploadedPhotos.length})
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                Suuraalee Haaraa Maxxanfaman (Published Photos & Stories)
              </h3>
              <p className="text-xs text-gray-300 mt-1">
                Suuraalee haaraa ibsa mataa isaanii waliin kallattiin weebsaayitii irratti maxxanfaman.
              </p>
            </div>

            <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-700 self-start sm:self-center">
              ● Online & Live
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {uploadedPhotos.map((p) => (
              <div
                key={p.id}
                onClick={() => openLightbox(p.url, p)}
                className="cursor-pointer group relative overflow-hidden rounded-2xl border border-emerald-900/60 hover:border-emerald-500 bg-gray-900 transition duration-300 shadow-xl flex flex-col justify-between"
              >
                <div className="aspect-square overflow-hidden bg-black flex items-center justify-center relative">
                  <img
                    src={p.url}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white font-bold text-xs backdrop-blur-[1px]">
                    Guddisii Dubbisi &rarr;
                  </div>
                </div>

                {/* Card Info & Custom Description */}
                <div className="p-3.5 bg-gray-950 border-t border-gray-800 space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-bold text-white truncate max-w-[170px]" title={p.title}>
                        {p.title}
                      </h4>
                      <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800 shrink-0">
                        LIVE
                      </span>
                    </div>

                    {/* Custom Description Render */}
                    {p.description ? (
                      <p className="text-[11px] text-gray-300 line-clamp-3 leading-relaxed">
                        {p.description}
                      </p>
                    ) : (
                      <p className="text-[10px] text-gray-500 italic">
                        Ibsi dabalataa hin kennamne.
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-gray-900 flex items-center justify-between text-[10px] text-gray-500 font-mono">
                    <span>{new Date(p.createdAt).toLocaleDateString()}</span>
                    <span>{p.size}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. CURATED ALBUMS GRID */}
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
                onClick={() => openLightbox(alb.coverImage.url || '')}
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
                  onClick={() => openLightbox(p.url || '')}
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

      {/* Lightbox Modal with Full Description Display */}
      {lightboxImg && (
        <div 
          onClick={() => {
            setLightboxImg(null);
            setSelectedPhoto(null);
          }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in overflow-y-auto"
        >
          <button
            onClick={() => {
              setLightboxImg(null);
              setSelectedPhoto(null);
            }}
            className="fixed top-6 right-6 text-white p-2.5 rounded-full bg-gray-900/80 hover:bg-gray-800 border border-gray-700 z-50"
          >
            <X className="w-6 h-6" />
          </button>

          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full my-auto space-y-4"
          >
            <div className="rounded-2xl overflow-hidden bg-black border border-gray-800 flex items-center justify-center max-h-[70vh]">
              <img 
                src={lightboxImg} 
                alt="Lightbox view" 
                className="max-w-full max-h-[70vh] object-contain" 
              />
            </div>

            {/* If selected photo has custom description, show it in rich card */}
            {selectedPhoto && (
              <div className="p-6 rounded-2xl bg-gray-950 border border-gray-800 text-left space-y-2 shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-2">
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {selectedPhoto.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-gray-400 font-mono">
                    <span>{new Date(selectedPhoto.createdAt).toLocaleDateString()}</span>
                    <span>·</span>
                    <span>{selectedPhoto.size}</span>
                  </div>
                </div>

                {selectedPhoto.description ? (
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider block">
                      Ibsa Suuraa (Description):
                    </span>
                    <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                      {selectedPhoto.description}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 italic">
                    Ibsi dabalataa suuraa kanaaf hin kennamne.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
