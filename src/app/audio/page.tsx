'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { Radio, Mic, Volume2, ArrowRight, ShieldCheck, Headphones } from 'lucide-react';

export default function AudioPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
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
              Sagalee & Barnoota (Audio Hub)
            </h1>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 mt-2">
          Gabaasa oduu sagaleen qophaa'e, darsiilee fi barnoota Islaamaa, qaraatii Qur'aanaa qulqulluu.
        </p>
      </div>

      {/* Official Audio Hub Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#06180F] via-gray-950 to-gray-900 border border-emerald-800/80 shadow-2xl space-y-4">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-mono uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Tamsaasa Sagalee Qulqullina Olaanaa</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
          Sagantaalee fi Darsiilee Sagalee Kallattiin
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl">
          Wiirtuun tamsaasa sagalee Aalam Media qaraatii Qur'aanaa, darsiilee Fiqhii fi Aqiidaa, fi kutaalee podcast sagaleen qopheessaa jira. Sagantaaleen haaraa qophii xumuratan asirratti kallattiin tamsaafamu.
        </p>
      </div>

      {/* Primary Audio Hub Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Aalam Podcast Studio Card */}
        <div className="p-6 rounded-3xl bg-gray-950 border border-gray-800 space-y-4 flex flex-col justify-between hover:border-emerald-600 transition shadow-xl group">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 border border-emerald-600/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition">
              <Mic className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Staadiyoo Marii</span>
              <h3 className="text-xl font-bold text-white">Aalam Podcast Studio</h3>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Kutaalee podcast marii hayyoota Islaamaa, qophii sagaleen qindaa'e, fi gaaf-deebii adda addaa staadiyoo podcast irraa hordofaa.
            </p>
          </div>

          <Link
            href="/podcast"
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition shadow"
          >
            <span>Kutaalee Podcast Dhaggeeffadhaa</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Studio Recitation & Lectures Hub */}
        <div className="p-6 rounded-3xl bg-gray-950 border border-gray-800 space-y-4 flex flex-col justify-between hover:border-emerald-600 transition shadow-xl group">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-600/10 border border-amber-600/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">Qaraatii & Darsii</span>
              <h3 className="text-xl font-bold text-white">Qur'aana & Darsiilee Islaamaa</h3>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Qaraatii qulqulluu Qur'aana kabajamaa fi darsiilee gama afaaniin qophaa'an weebsaayitii irratti dhiyoota tamsaafamuuf qophiirra jiru.
            </p>
          </div>

          <Link
            href="/education"
            className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition shadow"
          >
            <span>Barnoota Islaamaa Ilaali</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Production Studio Photos */}
      <div className="p-8 rounded-3xl bg-gray-950 border border-gray-800 space-y-4">
        <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span>Wiirtuu Sagalee fi Istaadiyoo Aalam Media</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-800">
            <img src="/images/founder-misbah.jpg" alt="Misbah Sheikh Husein" className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <div>
                <span className="text-xs font-bold text-white block">Misbah Sheikh Husein</span>
                <span className="text-[11px] text-gray-300">CEO & Founder — Aalam Media</span>
              </div>
            </div>
          </div>

          <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-800">
            <img src="/images/aalam-media-10.jpg" alt="Aalam Podcast Studio" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <div>
                <span className="text-xs font-bold text-white block">Aalam Podcast Studio</span>
                <span className="text-[11px] text-gray-300">Wiirtuu Marii fi Tamsaasa Sagalee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
