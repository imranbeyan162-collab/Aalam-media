'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Send } from 'lucide-react';

export default function NewArticlePage() {
  const [formData, setFormData] = useState({
    headline: '',
    subtitle: '',
    category: 'Oduu Biyyoolessaa',
    language: 'om',
    isBreaking: false,
    authorName: 'Misbah Sheikh Husein',
    content: '',
    tags: '',
    // Mandatory Section 7 Image slot fields
    imageUrl: '',
    imageAlt: '',
    imageCaption: '',
    imageCredit: '',
    imageSource: ''
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent, status: string) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      window.location.href = '/admin/articles';
    }, 1500);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <Link href="/admin/articles" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Gara Tarree Oduutti Deebi'aa</span>
      </Link>

      <div className="border-b border-gray-800 pb-4">
        <h1 className="text-2xl font-black text-white">Barruu Haaraa Qopheessaa (New Article)</h1>
        <p className="text-xs text-gray-400 mt-1">
          Barreessaa &rarr; Gulaalaa &rarr; Maxxansa (Newsroom Editorial System)
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-600 text-emerald-300 text-xs font-bold">
          Barruun keessan milkaa'inaan galmaa'ee gara gulaalaatti darbeera!
        </div>
      )}

      <form className="p-8 rounded-3xl bg-gray-950 border border-gray-800 space-y-6">
        <div>
          <label className="block text-xs font-bold text-gray-300 mb-1">Mata-Duree Guddaa (Headline) *</label>
          <input
            type="text"
            required
            value={formData.headline}
            onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
            className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            placeholder="Fkn: Konfaransii Dhaabbata Ulamaa'ota Oromiyaa..."
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-300 mb-1">Ibsa Gabaabaa (Subtitle / Excerpt) *</label>
          <textarea
            rows={2}
            required
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            placeholder="Ibsa gabaabaa fuula duraatti mul'atu..."
          ></textarea>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">Ramaddii (Category)</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="Oduu Biyyoolessaa">Oduu Biyyoolessaa</option>
              <option value="Oduu Muslimaa">Oduu Muslimaa</option>
              <option value="Oduu Addunyaalessaa">Oduu Addunyaalessaa</option>
              <option value="Seenaa Ulamaa’otaa">Seenaa Ulamaa’otaa</option>
              <option value="Barnoota Islaamaa">Barnoota Islaamaa</option>
              <option value="Hegere (Imala)">Hegere (Imala)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">Afaan (Language)</label>
            <select
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="om">Afaan Oromoo (Default)</option>
              <option value="en">English</option>
              <option value="ar">العربية (Arabic)</option>
            </select>
          </div>

          <div className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              id="breaking"
              checked={formData.isBreaking}
              onChange={(e) => setFormData({ ...formData, isBreaking: e.target.checked })}
              className="rounded text-red-600 focus:ring-red-500 bg-gray-900 border-gray-800"
            />
            <label htmlFor="breaking" className="text-xs font-bold text-red-400">
              Oduu Ariifachiisaa (Breaking News)
            </label>
          </div>
        </div>

        {/* SECTION 7: IMAGE SYSTEM FIELDS (Alt text, Caption, Credit, Source) */}
        <div className="p-5 rounded-2xl bg-gray-900 border border-gray-800 space-y-3">
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
            [BAKKA SUURAA / IMAGE SLOT & METADATA]
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-gray-300 mb-1">Image URL ykn Path</label>
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-1.5 text-xs text-white"
                placeholder="https://... ykn /uploads/..."
              />
            </div>
            <div>
              <label className="block text-[11px] text-gray-300 mb-1">Alt Text *</label>
              <input
                type="text"
                value={formData.imageAlt}
                onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-1.5 text-xs text-white"
                placeholder="Ibsa suuraa dhabamtu..."
              />
            </div>
            <div>
              <label className="block text-[11px] text-gray-300 mb-1">Caption (Ibsa Suuraa)</label>
              <input
                type="text"
                value={formData.imageCaption}
                onChange={(e) => setFormData({ ...formData, imageCaption: e.target.value })}
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-1.5 text-xs text-white"
                placeholder="Ibsa suuraa jala jiru..."
              />
            </div>
            <div>
              <label className="block text-[11px] text-gray-300 mb-1">Photographer Credit & Source</label>
              <input
                type="text"
                value={formData.imageCredit}
                onChange={(e) => setFormData({ ...formData, imageCredit: e.target.value })}
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-1.5 text-xs text-white"
                placeholder="Aalam Photo / External Press"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-300 mb-1">Qabiyyee Guutuu (Full Article Body) *</label>
          <textarea
            rows={8}
            required
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 leading-relaxed font-sans"
            placeholder="Barruu guutuu barreessaa..."
          ></textarea>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800">
          <button
            type="button"
            onClick={(e) => handleSubmit(e, 'DRAFT')}
            className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white text-xs font-bold"
          >
            Draft Ka'i (Save Draft)
          </button>
          <button
            type="button"
            onClick={(e) => handleSubmit(e, 'EDITOR_REVIEW')}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Gulaalaaf Ergi (Submit to Editor)</span>
          </button>
        </div>
      </form>
    </div>
  );
}
