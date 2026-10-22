'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Scale, 
  Scroll, 
  Sparkles, 
  Search, 
  Plus, 
  CheckCircle2, 
  Trash2, 
  Edit3, 
  Eye, 
  ExternalLink, 
  FileText, 
  User, 
  X,
  Compass,
  AlertCircle
} from 'lucide-react';
import { EducationLesson, EducationSector } from '@/lib/types';

const SECTORS: { id: EducationSector; label: string; icon: string; desc: string }[] = [
  { id: 'fiqh', label: 'Fiqhii (Islamic Jurisprudence)', icon: '⚖️', desc: 'Seera amantaa: Salaata, Zakaah, Sooma, Qulqullina, fi kkf.' },
  { id: 'quran', label: "Qur'aana Qulqulluu (Holy Qur'an)", icon: '📖', desc: 'Qaraatii, Tajwiida, fi xiinxala aayatoota Qur\'aanaa.' },
  { id: 'hadith', label: 'Hadiisa Nabiyyii (Hadith & Sunnah)', icon: '📜', desc: 'Hadiisota Nabiyyii (SAW), amala, fi qajeelfama jireenyaa.' },
  { id: 'aqeedah', label: 'Aqiidaa (Islamic Creed)', icon: '🌱', desc: 'Tawhiida qulqulluu, bu\'uura iimaanaa, fi tasgabbii amantee.' },
  { id: 'tafsir', label: "Tafsiira (Qur'anic Exegesis)", icon: '🔍', desc: 'Hiikaa fi ergaa gadi fageenya aayatoota Qur\'aanaa.' },
  { id: 'history', label: 'Seenaa fi Aadaa Islaamaa', icon: '🏛️', desc: 'Seenaa Nabiyyootaa, Sahaabotaa, fi Ulamaa\'ota biyya keenyaa.' }
];

export default function AdminEducationPage() {
  const [lessons, setLessons] = useState<EducationLesson[]>([]);
  const [filterSector, setFilterSector] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form State for New Lesson
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [sector, setSector] = useState<EducationSector>('fiqh');
  const [arabicText, setArabicText] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [authorName, setAuthorName] = useState<string>('Ustaz Ahmed Nur');
  const [mediaUrl, setMediaUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Edit State
  const [editingLesson, setEditingLesson] = useState<EducationLesson | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [viewingLesson, setViewingLesson] = useState<EducationLesson | null>(null);

  // Fetch Lessons from API
  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/education');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setLessons(data);
          try {
            localStorage.setItem('aalam_education_lessons', JSON.stringify(data));
          } catch (e) {}
        }
      }
    } catch (e) {
      // Fallback to localStorage
      try {
        const cached = localStorage.getItem('aalam_education_lessons');
        if (cached) setLessons(JSON.parse(cached));
      } catch (err) {}
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);
    const sectorObj = SECTORS.find(s => s.id === sector);
    const newLessonData = {
      title: title.trim(),
      sector,
      sectorLabel: sectorObj?.label || 'Fiqhii',
      arabicText: arabicText.trim(),
      content: content.trim(),
      authorName: authorName.trim() || 'Ustaz (Islamic Education)',
      mediaUrl: mediaUrl.trim(),
      published: true
    };

    try {
      const res = await fetch('/api/education', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLessonData)
      });

      if (res.ok) {
        const created = await res.json();
        const updated = [created, ...lessons];
        setLessons(updated);
        try {
          localStorage.setItem('aalam_education_lessons', JSON.stringify(updated));
        } catch (e) {}

        // Reset form
        setTitle('');
        setArabicText('');
        setContent('');
        setMediaUrl('');
        setIsFormOpen(false);
        setSuccessMsg('Darsiin haaraan milkaa\'inaan maxxanfamee fuula /education irratti dhiyaateera!');
        setTimeout(() => setSuccessMsg(null), 4000);
      }
    } catch (err) {
      console.error('Error creating lesson', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLesson) return;

    try {
      const res = await fetch('/api/education', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingLesson)
      });

      if (res.ok) {
        const updated = await res.json();
        setLessons(lessons.map(l => l.id === updated.id ? updated : l));
        setEditingLesson(null);
        setSuccessMsg('Darsiin milkaa\'inaan sirreeffameera!');
        setTimeout(() => setSuccessMsg(null), 3000);
      }
    } catch (err) {
      console.error('Error updating lesson', err);
    }
  };

  const handleDeleteLesson = async (id: string) => {
    try {
      const res = await fetch(`/api/education?id=${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        const updated = lessons.filter(l => l.id !== id);
        setLessons(updated);
        try {
          localStorage.setItem('aalam_education_lessons', JSON.stringify(updated));
        } catch (e) {}
        setDeleteTargetId(null);
        setSuccessMsg('Darsiin haqameera.');
        setTimeout(() => setSuccessMsg(null), 3000);
      }
    } catch (err) {
      console.error('Error deleting lesson', err);
    }
  };

  // Filter lessons
  const filteredLessons = lessons.filter(l => {
    const matchesSector = filterSector === 'all' || l.sector === filterSector;
    const matchesQuery = !searchQuery || 
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      l.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.authorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSector && matchesQuery;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              ISLAMIC EDUCATION SECTOR CONTROL
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Wiirtuu Barnoota Islaamaa (Islamic Education Portal)
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Darsiilee Fiqhii, Qur'aanaa, Hadiisaa, Aqiidaa, fi Tafsiiraa qopheessaa, gulaalaa, fi kallattiin fuula <strong className="text-emerald-400">/education</strong> irratti maxxansaa.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/education"
            target="_blank"
            className="inline-flex items-center gap-1.5 bg-gray-900 hover:bg-gray-800 border border-emerald-700/60 text-emerald-400 font-bold px-3 py-2 rounded-xl text-xs transition shadow active:scale-95"
          >
            <Eye className="w-4 h-4" />
            <span>Fuula /education Ilaali &rarr;</span>
          </Link>
          <button
            type="button"
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition shadow active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>{isFormOpen ? 'Cufi' : '+ Darsii Haaraa Barreessi'}</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-950 border border-emerald-600 text-emerald-300 text-xs font-bold flex items-center justify-between shadow-xl animate-fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg(null)} className="text-emerald-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* PUBLISH NEW LESSON FORM */}
      {isFormOpen && (
        <form onSubmit={handleCreateLesson} className="p-6 sm:p-8 rounded-3xl bg-gray-950 border-2 border-emerald-600/70 shadow-2xl space-y-5 animate-fade-in">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">⚖️</span>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Darsii Haaraa Maxxansi (Publish New Islamic Lesson)
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              Education Sector Only
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Sector Dropdown */}
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">
                Kutaa Barnootaa (Sector / Knowledge Branch) *
              </label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value as EducationSector)}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-bold"
              >
                {SECTORS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.icon} {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Author / Ustaz Name */}
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">
                Maqaa Barsiisaa / Ustaazaa (Author / Scholar) *
              </label>
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Fkn: Ustaz Ahmed Nur, Sheikh Yusuf Abdi..."
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
              />
            </div>

            {/* Lesson Title */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-300 mb-1.5">
                Mata-Duree Darsichaa (Lesson Title) *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Fkn: Bu'uura Qulqullinaa fi Sirna Salaataa, Seera Zakaa, kkf..."
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
              />
            </div>

            {/* Arabic Text (Ayah / Hadith) */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-300 mb-1.5 flex items-center justify-between">
                <span>Aayata Qur'aanaa ykn Hadiisa Afaan Arabaatiin (Arabic Verse / Hadith - Optional)</span>
                <span className="text-[10px] text-gray-500 font-mono font-arabic">النص العربي</span>
              </label>
              <textarea
                rows={2}
                dir="rtl"
                value={arabicText}
                onChange={(e) => setArabicText(e.target.value)}
                placeholder="اكتب الآية أو الحديث هنا..."
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3.5 py-2.5 text-sm text-emerald-300 focus:outline-none focus:border-emerald-500 font-arabic leading-relaxed"
              />
            </div>

            {/* Full Lesson Content */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-300 mb-1.5">
                Barumsa & Ibsa Guutuu (Full Lesson Content in Afaan Oromoo) *
              </label>
              <textarea
                rows={6}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Barumsa darsichaa, qabxiiwwan fiqhii, seera amantaa, hiikaa fi gorsawwan bal'inaan asitti barreessaa..."
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium leading-relaxed"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-800">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 text-xs font-bold"
            >
              Dhiisi (Cancel)
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-lg disabled:opacity-50 flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? 'Maxxanfamaa jira...' : 'Kallattiin Maxxansi (Publish Lesson)'}</span>
            </button>
          </div>
        </form>
      )}

      {/* SEARCH & SECTOR FILTER TABS */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Mata-dureedhaan, barsiisaadhaan, ykn qabiyyeedhaan barbaadaa..."
              className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => setFilterSector('all')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition shrink-0 ${filterSector === 'all' ? 'bg-emerald-600 text-white' : 'bg-gray-950 border border-gray-800 text-gray-400 hover:text-white'}`}
            >
              Hunda ({lessons.length})
            </button>
            {SECTORS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setFilterSector(s.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1 ${filterSector === s.id ? 'bg-emerald-600 text-white' : 'bg-gray-950 border border-gray-800 text-gray-400 hover:text-white'}`}
              >
                <span>{s.icon}</span>
                <span>{s.id.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* LESSONS LIST */}
      <div className="rounded-3xl bg-gray-950 border border-gray-800 p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
              DARSIILLEE BARNOOTA ISLAAMAA
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
              {filteredLessons.length} Darsiilee
            </span>
          </div>

          <span className="text-[11px] text-gray-400 font-mono">
            Darsiileen kun fuula /education irratti qoodamu.
          </span>
        </div>

        {/* Lessons Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLessons.map((l) => (
            <div 
              key={l.id} 
              className="p-5 rounded-2xl bg-gray-900 border border-gray-800 space-y-3 flex flex-col justify-between hover:border-gray-700 transition"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase bg-emerald-950 text-emerald-300 border border-emerald-800">
                    {l.sectorLabel}
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono">
                    {new Date(l.publishedAt).toLocaleDateString()}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white line-clamp-2">
                  {l.title}
                </h4>

                {l.arabicText && (
                  <p dir="rtl" className="text-xs text-emerald-300 font-arabic bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-900/50 line-clamp-2">
                    {l.arabicText}
                  </p>
                )}

                <p className="text-xs text-gray-300 line-clamp-3 leading-relaxed">
                  {l.content}
                </p>

                <div className="text-[11px] text-gray-400 flex items-center gap-1.5 pt-1">
                  <User className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Barsiisaa: <strong className="text-gray-300">{l.authorName}</strong></span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setViewingLesson(l)}
                  className="px-2.5 py-1 rounded-lg bg-gray-950 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-800 text-[11px] font-bold inline-flex items-center gap-1 transition"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Dubbisi (Read)</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setEditingLesson(l)}
                    className="p-1.5 rounded-lg bg-gray-950 hover:bg-gray-800 text-gray-400 hover:text-emerald-400 border border-gray-800 transition"
                    title="Gulaali (Edit)"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  {deleteTargetId === l.id ? (
                    <div className="flex items-center gap-1 bg-red-950 border border-red-800 rounded-lg p-1 animate-fade-in">
                      <span className="text-[10px] text-red-300 px-1 font-bold">Haquu?</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteLesson(l.id)}
                        className="px-1.5 py-0.5 bg-red-600 text-white text-[10px] font-bold rounded hover:bg-red-500"
                      >
                        Eeyyee
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTargetId(null)}
                        className="px-1.5 py-0.5 bg-gray-800 text-gray-300 text-[10px] rounded hover:bg-gray-700"
                      >
                        Lakkii
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setDeleteTargetId(l.id)}
                      className="p-1.5 rounded-lg bg-gray-950 hover:bg-red-950 text-gray-500 hover:text-red-400 border border-gray-800 transition"
                      title="Haqi (Delete)"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredLessons.length === 0 && (
            <div className="md:col-span-2 py-12 text-center space-y-2">
              <BookOpen className="w-8 h-8 text-gray-600 mx-auto" />
              <p className="text-xs text-gray-400 font-bold">
                Darsiin qophaa'e hin jiru.
              </p>
              <p className="text-[11px] text-gray-500">
                Kutaa kanatti darsii haaraa barreessuuf qabduu "+ Darsii Haaraa Barreessi" cuqaasaa.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* VIEW LESSON MODAL */}
      {viewingLesson && (
        <div 
          onClick={() => setViewingLesson(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-950 border border-gray-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 uppercase">
                {viewingLesson.sectorLabel}
              </span>
              <button
                type="button"
                onClick={() => setViewingLesson(null)}
                className="p-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {viewingLesson.title}
              </h2>

              <div className="flex items-center gap-3 text-xs text-gray-400 font-mono pb-2 border-b border-gray-900">
                <span>Barsiisaa: <strong className="text-emerald-400">{viewingLesson.authorName}</strong></span>
                <span>·</span>
                <span>{new Date(viewingLesson.publishedAt).toLocaleDateString()}</span>
              </div>

              {viewingLesson.arabicText && (
                <div dir="rtl" className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-200 font-arabic text-base sm:text-lg leading-loose text-center">
                  {viewingLesson.arabicText}
                </div>
              )}

              <div className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap pt-2">
                {viewingLesson.content}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800 flex items-center justify-between text-xs">
              <Link 
                href="/education" 
                target="_blank"
                className="text-emerald-400 hover:underline flex items-center gap-1 font-bold"
              >
                <span>Fuula /education Irratti Ilaali</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => setViewingLesson(null)}
                className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-bold"
              >
                Cufi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT LESSON MODAL */}
      {editingLesson && (
        <div 
          onClick={() => setEditingLesson(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-950 border border-gray-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Darsii Gulaali (Edit Lesson)</h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingLesson(null)}
                className="p-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateLesson} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Kutaa Barnootaa (Sector)</label>
                <select
                  value={editingLesson.sector}
                  onChange={(e) => setEditingLesson({ ...editingLesson, sector: e.target.value as EducationSector })}
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white"
                >
                  {SECTORS.map((s) => (
                    <option key={s.id} value={s.id}>{s.icon} {s.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Mata-Duree (Title)</label>
                <input
                  type="text"
                  required
                  value={editingLesson.title}
                  onChange={(e) => setEditingLesson({ ...editingLesson, title: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Maqaa Barsiisaa / Ustaazaa</label>
                <input
                  type="text"
                  required
                  value={editingLesson.authorName}
                  onChange={(e) => setEditingLesson({ ...editingLesson, authorName: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Afaan Arabaa (Arabic Text)</label>
                <textarea
                  rows={2}
                  dir="rtl"
                  value={editingLesson.arabicText || ''}
                  onChange={(e) => setEditingLesson({ ...editingLesson, arabicText: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-sm text-emerald-300 font-arabic"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Qabiyyee Darsichaa (Full Content)</label>
                <textarea
                  rows={6}
                  required
                  value={editingLesson.content}
                  onChange={(e) => setEditingLesson({ ...editingLesson, content: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setEditingLesson(null)}
                  className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 text-xs font-bold"
                >
                  Dhiisi
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow"
                >
                  Ol Kaa'i (Save Changes)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
