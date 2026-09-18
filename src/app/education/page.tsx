'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { BookOpen, CheckCircle } from 'lucide-react';

export default function EducationPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'quran' | 'hadith' | 'fiqh' | 'aqeedah' | 'tafsir'>('quran');

  const topics = {
    quran: {
      title: "Qur'aana Qulqulluu (Holy Qur'an)",
      desc: "Qaraatii, qajeelfama tajwiidaa, fi xiinxala aayatoota Qur'aanaa ammayyaa.",
      lessons: [
        "Seensa Barnoota Tajwiidaa fi Makhrajoota Qubee",
        "Xiinxala Suuraa Al-Faatihaa fi Eebba Ishee",
        "Qur'aana fi Saayinsii Ammayyaa"
      ]
    },
    hadith: {
      title: "Hadiisa Nabiyyii (Sunnah & Hadith)",
      desc: "Hadiisota filatamoo amala, jireenya maatii fi qajeelfama hawaasummaa barsiisan.",
      lessons: [
        "Hadiisota 40 kan Imaamu An-Nawawii",
        "Amala Safu-Qabeessa Hadiisa Irraa Barannu",
        "Qajeelfama Daldala fi Hojii Qajeelaa"
      ]
    },
    fiqh: {
      title: "Fiqhii (Islamic Jurisprudence)",
      desc: "Seera fi heera amantaa: Salaata, Zakaah, Sooma, fi dhimmoota jireenya guyyuu.",
      lessons: [
        "Bu'uura Qulqullinaa fi Salaataa",
        "Sirna Zakaah fi Gumaacha Dinagdee",
        "Marii Dhimmoota Fiqhii Yeroo Ammaa"
      ]
    },
    aqeedah: {
      title: "Aqiidaa (Islamic Creed)",
      desc: "Tawhiida qulqulluu, amantee garaa, fi tasgabbii lubbuu argachuu.",
      lessons: [
        "Ruknilee Iimaanaa Jaha (6)",
        "Tawhiida fi Bu'aa Isaa Jireenya Namaa Keessatti",
        "Shakkii fi Gaaffilee Yeroo Deebisuu"
      ]
    },
    tafsir: {
      title: "Tafsiira (Qur'anic Exegesis)",
      desc: "Hiikaa fi ergaa gadi fageenya aayatoota Qur'aanaa afaan Oromootiin.",
      lessons: [
        "Tafsiira Juz' Ammaa",
        "Seenaa Nabiyyootaa Qur'aana Keessatti",
        "Heera Hawaasummaa Suuraa Al-Hujuraat"
      ]
    }
  };

  const current = topics[activeTab];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="border-b border-gray-800 pb-6">
        <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
          AALAM ISLAMIC EDUCATION ACADEMY
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Barnoota Islaamaa
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-2">
          Barnoota bu'uura amantaa, heera fi seera jireenya hawaasaa qulqullina olaanaadhaan.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {(['quran', 'hadith', 'fiqh', 'aqeedah', 'tafsir'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition capitalize ${activeTab === tab ? 'bg-emerald-600 text-white shadow-lg' : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'}`}
          >
            {tab === 'quran' && "📖 Qur'aana"}
            {tab === 'hadith' && '📜 Hadiisa'}
            {tab === 'fiqh' && '⚖️ Fiqhii'}
            {tab === 'aqeedah' && '🌱 Aqiidaa'}
            {tab === 'tafsir' && '🔍 Tafsiira'}
          </button>
        ))}
      </div>

      {/* Active Topic Content */}
      <div className="p-8 rounded-3xl bg-gray-950 border border-emerald-900/60 space-y-6">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 uppercase font-mono">
            Kutaa Barnootaa
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">{current.title}</h2>
          <p className="text-sm text-gray-300">{current.desc}</p>
        </div>

        <div className="space-y-3 pt-4 border-t border-gray-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Darsiilee Qophaa'an:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {current.lessons.map((lesson, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-gray-900 border border-gray-800 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs font-medium text-gray-200">{lesson}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
