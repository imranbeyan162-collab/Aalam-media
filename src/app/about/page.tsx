'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n';
import ImageSlot from '@/components/ui/ImageSlot';
import { ShieldCheck, Target, Eye, Award, CheckCircle, MapPin, Phone, Mail } from 'lucide-react';

export default function AboutPage() {
  const { t } = useLanguage();

  const values = [
    { title: 'Amanamummaa (Honesty & Integrity)', desc: 'Oduu fi odeeffannoo hunda amanamaa fi qulqullinaan dhiyeessuu.' },
    { title: 'Dhugaa (Truth)', desc: 'Dhugaa jiru qofa hawaasaaf ibsuu; loogii fi soba irraa fagaachuu.' },
    { title: 'Itti Gaafatamummaa (Accountability)', desc: 'Ergaa tamsaafamu hundaaf hawaasa fi seera duratti itti gaafatamummaa fudhachuu.' },
    { title: 'Beekumsa (Knowledge)', desc: 'Barnoota Islaamaa fi aadaa bal\'aa dhaloota beekumsaan ijaaru dhiyeessuu.' },
    { title: 'Hawaasummaa (Community & Unity)', desc: 'Tokkummaa, nagaa fi wal-danda\'uu hawaasaa cimsuu.' },
    { title: 'Ogummaa (Professionalism)', desc: 'Qajeelfama gaazexeessummaa ammayyaa fi safuu ogummaa hordofuu.' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title */}
      <div className="text-center space-y-3">
        <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
          AALAM MEDIA OFFICIAL PROFILE
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Waa'ee Aalam Media (About Us)
        </h1>
        <p className="text-xs sm:text-sm text-emerald-400 font-medium italic">
          "{t('brand.slogan')}"
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 rounded-3xl bg-gray-950 border border-gray-800 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Ergama Keenya (Our Mission)</h2>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Hawaasa keenyaaf odeeffannoo amansiisaa, barnoota Islaamaa qulqullina olaanaa qabu, fi aadaa Oromoo gabbisuun dhaloota beekumsa, safuu fi amanamummaan ijaarame horachuu.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-gray-950 border border-gray-800 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Mul'ata Keenya (Our Vision)</h2>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Gaanfa Afrikaa fi addunyaa irratti miidiyaa Islaamaa fi hawaasummaa ammayyaa, walaba, fi dhiibbaa gaarii uumuu danda'u ta'uun adda durummaan beekamuu.
          </p>
        </div>
      </div>

      {/* Core Values (Mandated 6 values) */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white border-l-4 border-emerald-500 pl-3">
          Dudhaalee Bu'uuraa (Our Core Values)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {values.map((v, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-gray-900 border border-gray-800 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400">0{idx + 1}.</span>
              <h3 className="text-sm font-bold text-white">{v.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FOUNDER & CEO BIO & PHOTO SLOT (Misbah Sheikh Husein) */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-[#06180F] via-gray-950 to-[#0A0F0D] border border-emerald-800 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4">
            <ImageSlot
              meta={{
                url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
                alt: 'Misbah Sheikh Husein - CEO & Founder',
                caption: 'Misbah Sheikh Husein',
                credit: 'Aalam Media Founder Archive',
                source: 'Official Portrait'
              }}
              aspect="tall"
              className="rounded-2xl shadow-xl"
            />
          </div>

          <div className="md:col-span-8 space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 uppercase">
              Hoggannaa & Hundeeffamaa
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Misbah Sheikh Husein
            </h2>
            <p className="text-xs text-emerald-400 font-medium">
              CEO & Founder — Aalam Media
            </p>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Misbah Sheikh Husein hundeeffamaa fi hoggantoota duraa Aalam Media yoo ta'an, magaalaa Adaamaa irraa ka'uun miidiyaa ammayyaa sadarkaa addunyaalessaatti qophaa'e kana bu'uureessaniiru. Isaan barnoota Islaamaa bal'isuu, seenaa fi aadaa Oromoo guddisuu, fi hawaasaaf sagalee dhugaa ta'uuf kutannoo guddaadhaan socho'u.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs text-gray-400 font-mono">
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-emerald-400" /> Adaamaa, Oromiyaa</span>
              <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-emerald-400" /> 0915636302 / 0712025283</span>
              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-emerald-400" /> misbahsheikhhusein@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
