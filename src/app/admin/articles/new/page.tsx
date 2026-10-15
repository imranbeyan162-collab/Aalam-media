'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { addArticle } from '@/lib/articlesStore';
import { 
  ArrowLeft, 
  Upload, 
  Image as ImageIcon, 
  Check, 
  X, 
  Sparkles, 
  Send, 
  Eye, 
  FolderOpen,
  AlertCircle
} from 'lucide-react';

// Preset library of authentic photos available for quick selection
const PRESET_PHOTOS = [
  { url: '/images/founder-misbah.jpg', title: 'Misbah Sheikh Husein (CEO & Founder)' },
  { url: '/images/aalam-media-1.jpg', title: 'Istaadiyoo Aalam Media 1' },
  { url: '/images/aalam-media-2.jpg', title: 'Wiirtuu Tamsaasa Oduu' },
  { url: '/images/aalam-media-3.jpg', title: 'Qophii Sagantaalee' },
  { url: '/images/aalam-media-4.jpg', title: 'Aalam Media Studio' },
  { url: '/images/aalam-media-5.jpg', title: 'Hawaasa & Ulamaa\'ota' },
  { url: '/images/aalam-media-6.jpg', title: 'Gabaasa Oduu' },
  { url: '/images/aalam-media-7.jpg', title: 'Adaamaa Istaadiyoo' },
  { url: '/images/aalam-media-8.jpg', title: 'Da\'awaa & Barnoota' },
  { url: '/images/aalam-media-9.jpg', title: 'Konfaransii' },
  { url: '/images/aalam-media-10.jpg', title: 'Istaadiyoo Marii' },
  { url: '/images/aalam-media-11.jpg', title: 'Hegere & Imala' },
  { url: '/images/aalam-media-12.jpg', title: 'Wiirtuu Odeeffannoo' }
];

export default function SimpleNewArticlePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [headline, setHeadline] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('Oduu Biyyoolessaa');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('Misbah Sheikh Husein');
  const [isBreaking, setIsBreaking] = useState(false);
  const [isFeatured, setIsFeatured] = useState(true);

  // Photo state
  const [photoUrl, setPhotoUrl] = useState<string>('/images/aalam-media-1.jpg');
  const [photoName, setPhotoName] = useState<string>('Suuraa Aalam Media (Default)');
  const [showPresets, setShowPresets] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [publishedArticle, setPublishedArticle] = useState<any>(null);

  // Handle local file upload (From phone / computer)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadLoading(true);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPhotoUrl(result);
      setPhotoName(file.name);
      setUploadLoading(false);
    };
    reader.onerror = () => {
      alert('Dogoggorri suuraa dubbisuu mudate. Maaloo irra deebi\'aa yaalaa.');
      setUploadLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!headline.trim()) {
      alert('Maaloo Mata-Duree (Headline) guutaa.');
      return;
    }

    setSubmitting(true);

    try {
      const created = addArticle({
        headline: headline.trim(),
        subtitle: subtitle.trim() || headline.trim(),
        category,
        content: content.trim() || subtitle.trim() || headline.trim(),
        authorName: authorName.trim() || 'Misbah Sheikh Husein',
        imageUrl: photoUrl || '/images/aalam-media-1.jpg',
        imageAlt: headline.trim(),
        imageCaption: headline.trim(),
        imageCredit: 'Aalam Media',
        isBreaking,
        isFeatured,
        status: 'PUBLISHED'
      });

      setPublishedArticle(created);
    } catch (err) {
      console.error(err);
      alert('Dogoggorri uumameera. Maaloo irra deebi\'aa yaalaa.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/articles"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition py-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Gara Tarree Oduutti Deebi'aa</span>
        </Link>
        <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/60">
          Maxxansa Salphaa (Simple Publisher)
        </span>
      </div>

      {/* Header */}
      <div className="border-b border-gray-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
          <span>Barruu Haaraa Maxxansaa</span>
          <Sparkles className="w-5 h-5 text-emerald-400" />
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Mata-duree, suuraa, fi qabiyyee oduu galchuun kallattiin weebsaayitii irratti maxxansaa.
        </p>
      </div>

      {/* SUCCESS BANNER WHEN PUBLISHED */}
      {publishedArticle && (
        <div className="p-6 rounded-2xl bg-[#061F12] border-2 border-emerald-500 space-y-4 shadow-2xl animate-fade-in">
          <div className="flex items-center gap-3 text-emerald-300">
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Baga Gammaddan! Barruun Keessan Maxxanfameera!</h3>
              <p className="text-xs text-emerald-300/90">
                Oduun kun ammuma weebsaayitii fi fuula duraa irratti tamsaafameera.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gray-950/80 border border-gray-800 flex items-center gap-3">
            <img src={publishedArticle.featuredImage?.url} alt="Uploaded" className="w-16 h-12 rounded object-cover" />
            <div className="overflow-hidden">
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">{publishedArticle.category}</span>
              <h4 className="text-xs font-bold text-white truncate">{publishedArticle.headline}</h4>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition shadow"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Fuula Duraa Irratti Ilaali</span>
            </Link>
            <Link
              href="/admin/articles"
              className="inline-flex items-center gap-1.5 bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-200 font-bold px-4 py-2 rounded-xl text-xs transition"
            >
              <span>Tarree Oduu Hunda Ilaali &rarr;</span>
            </Link>
            <button
              onClick={() => {
                setPublishedArticle(null);
                setHeadline('');
                setSubtitle('');
                setContent('');
              }}
              className="text-xs text-gray-400 hover:text-white underline ml-auto"
            >
              Barruu Biroo Barreessi
            </button>
          </div>
        </div>
      )}

      {/* SIMPLE PUBLISH FORM */}
      {!publishedArticle && (
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-[#0F1412] border border-gray-800 space-y-6 shadow-xl">
          {/* 1. Headline */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-200">
              1. Mata-Duree Oduu (Headline / Title) <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Fkn: Tajaajila Aalam Media Magaalaa Adaamaa Irraa Hawaasaatiif..."
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition shadow-inner font-semibold placeholder:text-gray-600"
            />
          </div>

          {/* 2. Category selection */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-200">
              2. Ramaddii (Category) <span className="text-red-400">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition"
            >
              <option value="Oduu Biyyoolessaa">Oduu Biyyoolessaa (National News)</option>
              <option value="Oduu Muslimaa">Oduu Muslimaa (Muslim World)</option>
              <option value="Oduu Addunyaalessaa">Oduu Addunyaalessaa (World News)</option>
              <option value="Barnoota Islaamaa">Barnoota Islaamaa (Islamic Education)</option>
              <option value="Seenaa Ulamaa’otaa">Seenaa Ulamaa'otaa (Scholars of Islam)</option>
              <option value="Hegere (Imala)">Hegere (Imala) (Travel Chronicles)</option>
            </select>
          </div>

          {/* 3. PHOTO UPLOAD SECTION (Simple, Direct, Visible) */}
          <div className="space-y-2.5 p-4 sm:p-5 rounded-2xl bg-gray-950 border border-emerald-950/80">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-emerald-400" />
                <span>3. Suuraa Maxxansaa (Upload Photo)</span>
                <span className="text-red-400">*</span>
              </label>
              <button
                type="button"
                onClick={() => setShowPresets(!showPresets)}
                className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 underline flex items-center gap-1"
              >
                <FolderOpen className="w-3.5 h-3.5" />
                <span>{showPresets ? 'Kuusaa Cufi' : 'Kuusaa Suuraa Irraa Filadhaa'}</span>
              </button>
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            {/* Photo Preview & Upload Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              {/* Image Preview Box */}
              <div className="sm:col-span-5 relative aspect-video rounded-xl overflow-hidden bg-gray-900 border-2 border-dashed border-gray-700 flex items-center justify-center group">
                {uploadLoading ? (
                  <div className="text-xs text-emerald-400 animate-pulse font-mono">Suuraan fe'amaa jira...</div>
                ) : photoUrl ? (
                  <>
                    <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold"
                      >
                        Jijjiiri
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-4">
                    <Upload className="w-8 h-8 text-gray-500 mx-auto mb-1" />
                    <span className="text-xs text-gray-400">Suuraan hin filatamne</span>
                  </div>
                )}
              </div>

              {/* Upload Action Buttons */}
              <div className="sm:col-span-7 space-y-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition shadow-md"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Suuraa Kompiitara / Bilbila Irraa Filadhaa</span>
                  </button>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Suuraa qulqullina qabu (JPG, PNG, WebP) fe'aa. Suuraan kun fuula duraa fi keessa barruu irratti ifatti mul'ata.
                </p>
                <div className="text-[11px] text-emerald-400 font-mono truncate">
                  Suuraa filatame: <strong>{photoName}</strong>
                </div>
              </div>
            </div>

            {/* PRESET GALLERY ACCORDION */}
            {showPresets && (
              <div className="pt-3 border-t border-gray-800 space-y-2">
                <span className="text-[11px] font-bold text-gray-400 block">
                  Kuusaa Suuraalee Aalam Media (Click to select any photo):
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 max-h-48 overflow-y-auto p-1">
                  {PRESET_PHOTOS.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setPhotoUrl(p.url);
                        setPhotoName(p.title);
                        setShowPresets(false);
                      }}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition ${photoUrl === p.url ? 'border-emerald-500 ring-2 ring-emerald-500/50' : 'border-gray-800 hover:border-gray-600'}`}
                      title={p.title}
                    >
                      <img src={p.url} alt={p.title} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 4. Subtitle / Summary */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-200">
              4. Ibsa Gabaabaa (Summary / Excerpt) <span className="text-red-400">*</span>
            </label>
            <textarea
              rows={2}
              required
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Ibsa gabaabaa kaardii oduu irratti fuula duraatti mul'atu barreessaa..."
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition placeholder:text-gray-600"
            ></textarea>
          </div>

          {/* 5. Full Story Content */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-200">
              5. Qabiyyee Guutuu (Full Article Content)
            </label>
            <textarea
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Qabiyyee guutuu barruu kanaa asitti bal'inaan barreessaa..."
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500 transition placeholder:text-gray-600 leading-relaxed"
            ></textarea>
          </div>

          {/* 6. Author & Options Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-800">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Barreessaa (Author)</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex flex-col justify-center space-y-2 pt-1">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isBreaking}
                  onChange={(e) => setIsBreaking(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500 bg-gray-950 border-gray-800"
                />
                <span className="text-xs font-bold text-red-400">Oduu Ariifachiisaa (Breaking News Ticker)</span>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 bg-gray-950 border-gray-800"
                />
                <span className="text-xs font-semibold text-emerald-400">Fuula Duraa Irratti Mul'isi (Featured)</span>
              </label>
            </div>
          </div>

          {/* Submit Action Button */}
          <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
            <Link
              href="/admin/articles"
              className="text-xs text-gray-400 hover:text-white transition"
            >
              Dhiisi (Cancel)
            </Link>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-8 py-3 rounded-xl shadow-lg transition active:scale-95 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Maxxanfamaa jira...' : 'Maxxansi (Publish Now)'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
