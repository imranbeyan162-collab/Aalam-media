'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  BookOpen, 
  Search, 
  CheckCircle2, 
  User, 
  Clock, 
  Share2, 
  Copy, 
  Check, 
  X, 
  Lock, 
  Sparkles, 
  Scale, 
  Scroll, 
  Eye, 
  ArrowRight
} from 'lucide-react';
import { EducationLesson, EducationSector } from '@/lib/types';
import { initialEducationLessons } from '@/lib/data/seed';

const SECTORS: { id: EducationSector | 'all'; label: string; icon: string; desc: string; color: string }[] = [
  { id: 'all', label: 'Hunda (All)', icon: '✨', desc: 'Darsiilee fi barnoota hundumaa.', color: 'border-emerald-600/40 text-emerald-400 bg-emerald-950/30' },
  { id: 'fiqh', label: 'Fiqhii', icon: '⚖️', desc: 'Heera fi seera amantaa: Salaata, Zakaah, Sooma, Qulqullina.', color: 'border-amber-600/40 text-amber-400 bg-amber-950/30' },
  { id: 'quran', label: "Qur'aana", icon: '📖', desc: "Qaraatii, Tajwiida, fi xiinxala aayatoota Qur'aanaa.", color: 'border-emerald-600/40 text-emerald-400 bg-emerald-950/30' },
  { id: 'hadith', label: 'Hadiisa', icon: '📜', desc: 'Hadiisota Nabiyyii (SAW), amala gaarii fi qajeelfama jireenyaa.', color: 'border-sky-600/40 text-sky-400 bg-sky-950/30' },
  { id: 'aqeedah', label: 'Aqiidaa', icon: '🌱', desc: 'Tawhiida qulqulluu, bu\'uura iimaanaa fi tasgabbii lubbuu.', color: 'border-teal-600/40 text-teal-400 bg-teal-950/30' },
  { id: 'tafsir', label: 'Tafsiira', icon: '🔍', desc: 'Hiikaa fi ergaa gadi fageenya aayatoota Qur\'aanaa afaan Oromootiin.', color: 'border-purple-600/40 text-purple-400 bg-purple-950/30' },
  { id: 'history', label: 'Seenaa', icon: '🏛️', desc: 'Seenaa Nabiyyootaa, Sahaabotaa fi gumaacha dhalootaa.', color: 'border-rose-600/40 text-rose-400 bg-rose-950/30' }
];

function EducationContent() {
  const searchParams = useSearchParams();
  const initialSub = searchParams.get('sub') || searchParams.get('sector') || 'all';

  const [activeTab, setActiveTab] = useState<string>(initialSub);
  const [lessons, setLessons] = useState<EducationLesson[]>(initialEducationLessons);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedLesson, setSelectedLesson] = useState<EducationLesson | null>(null);
  const [copiedArabic, setCopiedArabic] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/education');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setLessons(data);
        }
      }
    } catch (err) {
      // Fallback already populated
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLessons = lessons.filter(l => {
    const matchesSector = activeTab === 'all' || l.sector === activeTab;
    const matchesSearch = searchQuery.trim() === '' || 
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.arabicText && l.arabicText.includes(searchQuery)) ||
      (l.authorName && l.authorName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSector && matchesSearch;
  });

  const activeSectorInfo = SECTORS.find(s => s.id === activeTab) || SECTORS[0];

  const handleCopyArabic = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedArabic(true);
    setTimeout(() => setCopiedArabic(false), 2000);
  };

  const handleShareLesson = (lesson: EducationLesson) => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/education?sub=${lesson.sector}&id=${lesson.id}`;
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-800 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800 uppercase font-mono tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Aalam Islamic Education Academy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display">
            Barnoota Islaamaa
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-2xl leading-relaxed">
            Darsiilee Fiqhii, Qur'aana, Hadiisa, Aqiidaa fi Seenaa Islaamaa qulqullina olaanaadhaan 
            Ulamaa'otaa fi Barsiisota gurguddoo dhalootaa irraa qophaa'an.
          </p>
        </div>

        {/* Ustaz Portal Login Button */}
        <Link
          href="/admin/education"
          className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-gray-900 hover:bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 hover:text-emerald-200 text-xs font-bold transition shadow-lg shrink-0 self-start md:self-end"
        >
          <Lock className="w-4 h-4 text-emerald-400" />
          <span>Seensa Ustaza (Ustaz Admin Login)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 2. Search & Sector Navigation Tabs */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Darsii, mata-duree, ykn maqa Ustaza barbaadi..."
            className="w-full bg-gray-950 border border-gray-800 focus:border-emerald-500 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none transition shadow"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-xs"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sector Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {SECTORS.map((sec) => {
            const isActive = activeTab === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveTab(sec.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold transition ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-lg ring-2 ring-emerald-500/50'
                    : 'bg-gray-950 text-gray-400 hover:text-white border border-gray-800 hover:border-gray-700'
                }`}
              >
                <span>{sec.icon}</span>
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Active Sector Overview Banner */}
      <div className="p-6 rounded-3xl bg-gray-950 border border-emerald-950/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xl">{activeSectorInfo.icon}</span>
            <h2 className="text-xl font-bold text-white">{activeSectorInfo.label}</h2>
          </div>
          <p className="text-xs text-gray-400">{activeSectorInfo.desc}</p>
        </div>
        <div className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-xl self-start sm:self-center">
          Darsiilee: {filteredLessons.length}
        </div>
      </div>

      {/* 4. Lessons Grid */}
      {filteredLessons.length === 0 ? (
        <div className="p-12 rounded-3xl bg-gray-950 border border-gray-800 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-gray-600 mx-auto" />
          <h3 className="text-base font-bold text-gray-300">Darsiin hin argamne</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Kutaa kana keessatti darsiin yeroo ammaa hin jiru yookiin barbaachi keessan hin argamne.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <article
              key={lesson.id}
              className="bg-gray-950 border border-gray-800/80 hover:border-emerald-600/60 rounded-3xl p-6 flex flex-col justify-between transition group hover:shadow-xl hover:-translate-y-0.5"
            >
              <div className="space-y-4">
                {/* Sector Badge + Date */}
                <div className="flex items-center justify-between text-[11px]">
                  <span className="px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-mono">
                    {lesson.sectorLabel || lesson.sector}
                  </span>
                  <span className="text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(lesson.publishedAt).toLocaleDateString('om-ET', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                {/* Lesson Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition leading-snug">
                  {lesson.title}
                </h3>

                {/* Arabic Verse / Hadith Snippet */}
                {lesson.arabicText && (
                  <div className="p-3.5 rounded-2xl bg-[#0B150F] border border-emerald-950/60 text-right">
                    <p className="font-arabic text-emerald-200 text-sm leading-relaxed line-clamp-2" dir="rtl">
                      {lesson.arabicText}
                    </p>
                  </div>
                )}

                {/* Afaan Oromoo Content Preview */}
                <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                  {lesson.content}
                </p>
              </div>

              {/* Card Footer: Ustaz Author + Action */}
              <div className="pt-5 mt-4 border-t border-gray-800/80 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-emerald-950 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-gray-300 truncate">
                    {lesson.authorName || 'Ustaz'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedLesson(lesson)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-900 group-hover:bg-emerald-600 text-gray-300 group-hover:text-white text-xs font-bold transition shadow shrink-0"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Dubbisi</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* 5. Scholar / Ustaz Contributor Notice */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-gray-950 to-gray-950 border border-emerald-900/60 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">
            KUTAA BARSIISOTAA FI ULAMAA'OTAA
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Barnoota Islaamaa Maxxansuu Barbaadduu?
          </h2>
          <p className="text-xs text-gray-400 max-w-xl">
            Wiirtuu addaa barsiisotaa fi Ustazootaaf qophaa'e fayyadamuun darsiilee Fiqhii, Qur'aanaa, 
            Hadiisaa fi Aqiidaa hawaasa biraan gahaa.
          </p>
        </div>

        <Link
          href="/admin/education"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition shadow-lg shrink-0"
        >
          <Lock className="w-4 h-4" />
          <span>Wiirtuu Ustaza Seenaa</span>
        </Link>
      </div>

      {/* 6. FULL LESSON READER MODAL */}
      {selectedLesson && (
        <div 
          onClick={() => setSelectedLesson(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-950 border border-gray-800 rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-800 flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono">
                    {selectedLesson.sectorLabel || selectedLesson.sector}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(selectedLesson.publishedAt).toLocaleDateString('om-ET', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {selectedLesson.title}
                </h2>
                <div className="flex items-center gap-2 text-xs text-gray-400 pt-1">
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Qopheessaan: <strong className="text-gray-200">{selectedLesson.authorName || 'Ustaz'}</strong></span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedLesson(null)}
                className="p-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              {/* Arabic Calligraphy Section */}
              {selectedLesson.arabicText && (
                <div className="p-6 rounded-2xl bg-[#09130D] border border-emerald-900/60 space-y-3 relative">
                  <div className="flex items-center justify-between text-xs text-emerald-400 border-b border-emerald-950/80 pb-2">
                    <span className="font-mono text-[11px] uppercase tracking-wider">Aayata / Hadiisa (Arabic)</span>
                    <button
                      type="button"
                      onClick={() => handleCopyArabic(selectedLesson.arabicText!)}
                      className="inline-flex items-center gap-1 text-[11px] hover:text-emerald-300 font-medium transition"
                    >
                      {copiedArabic ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedArabic ? 'Garagalchameera' : 'Waraabi (Copy)'}</span>
                    </button>
                  </div>
                  <p className="font-arabic text-emerald-100 text-lg sm:text-xl leading-loose text-right" dir="rtl">
                    {selectedLesson.arabicText}
                  </p>
                </div>
              )}

              {/* Lesson Text */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">
                  Ibsa fi Qabiyyee Darsichaa (Explanation)
                </h3>
                <div className="text-sm sm:text-base text-gray-200 leading-relaxed whitespace-pre-line space-y-4">
                  {selectedLesson.content}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-gray-800 bg-gray-950 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleShareLesson(selectedLesson)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 text-xs font-bold border border-gray-800 transition"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedLink ? 'Liankiin Garagalchameera!' : 'Darsii Kana Qoodi (Share)'}</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedLesson(null)}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow"
              >
                Cufi (Close)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function EducationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#070C09] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin"></div>
      </div>
    }>
      <EducationContent />
    </Suspense>
  );
}
