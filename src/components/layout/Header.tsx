'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Globe, 
  Flame, 
  BookOpen, 
  Video, 
  Radio, 
  Camera, 
  Compass, 
  UserCheck, 
  HeartHandshake,
  Share2
} from 'lucide-react';

export default function Header() {
  const { locale, setLocale, t, isRTL } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const todayGregorian = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="w-full bg-[#0A0F0D] border-b border-gray-800 sticky top-0 z-50">
      {/* 1. TOP UTILITY BAR */}
      <div className="bg-[#06100B] border-b border-emerald-950/60 text-xs text-gray-300 py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Date & Location */}
          <div className="flex items-center gap-3 text-gray-400 font-medium text-[11px] sm:text-xs">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {t('brand.location')}
            </span>
            <span className="hidden sm:inline text-gray-600">|</span>
            <span className="hidden sm:inline font-mono">{todayGregorian}</span>
          </div>

          {/* Center/Right: Social Channels + Language Switcher + Become a Member */}
          <div className="flex items-center gap-4">
            {/* Social Icons (Mandated in header & footer) */}
            <div className="hidden md:flex items-center gap-2.5 text-gray-400">
              <a href="https://www.facebook.com/share/1JPeH4t9nW/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" title="Facebook" className="hover:text-emerald-400 transition">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@aalammedia1" target="_blank" rel="noopener noreferrer" title="TikTok" className="hover:text-emerald-400 transition">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </a>
              <a href="https://www.youtube.com/@AalamMedia-cc8lij" target="_blank" rel="noopener noreferrer" title="YouTube" className="hover:text-emerald-400 transition">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              {/* Fallback integration slots for Telegram, Instagram, X */}
              <span className="text-gray-600">|</span>
              <a href="#" title="Telegram (Live link coming soon)" className="text-gray-500 hover:text-emerald-400 transition" onClick={(e) => { e.preventDefault(); alert('Telegram official handle coming soon'); }}>
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              </a>
              <a href="#" title="Instagram (Live link coming soon)" className="text-gray-500 hover:text-emerald-400 transition" onClick={(e) => { e.preventDefault(); alert('Instagram official handle coming soon'); }}>
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" title="X (Twitter) (Live link coming soon)" className="text-gray-500 hover:text-emerald-400 transition" onClick={(e) => { e.preventDefault(); alert('X / Twitter official handle coming soon'); }}>
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>

            {/* Language Switcher (Mandated: Oromoo | English | العربية) */}
            <div className="flex items-center bg-gray-900 border border-gray-800 rounded-lg p-0.5 text-xs">
              <button 
                onClick={() => setLocale('om')}
                className={`px-2 py-0.5 rounded transition font-medium ${locale === 'om' ? 'bg-emerald-600 text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
              >
                Oromoo
              </button>
              <button 
                onClick={() => setLocale('en')}
                className={`px-2 py-0.5 rounded transition font-medium ${locale === 'en' ? 'bg-emerald-600 text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
              >
                English
              </button>
              <button 
                onClick={() => setLocale('ar')}
                className={`px-2.5 py-0.5 rounded transition font-medium font-arabic ${locale === 'ar' ? 'bg-emerald-600 text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
              >
                العربية
              </button>
            </div>

            {/* "BECOME A MEMBER" CTA Button */}
            <Link 
              href="/member"
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-[11px] sm:text-xs px-3 py-1 rounded-md shadow-sm transition active:scale-95"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{t('nav.becomeMember')}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN LOGO & BRANDING BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Logo & Brand Name */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 transition duration-300 group-hover:scale-105">
            <img src="/brand/logo.svg" alt="Aalam Media Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-white font-display">
                AALAM <span className="text-emerald-500">MEDIA</span>
              </span>
            </div>
            <span className="text-[11px] sm:text-xs text-emerald-400/90 font-medium italic">
              "{t('brand.slogan')}"
            </span>
          </div>
        </Link>

        {/* Right side: Search toggle + Support Us + Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/support"
            className="hidden sm:inline-flex items-center gap-1.5 bg-gray-900 border border-emerald-800/70 hover:border-emerald-500 text-emerald-400 hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition"
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>{t('nav.supportUs')}</span>
          </Link>

          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-300 hover:text-emerald-400 hover:border-emerald-600 transition"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* SEARCH BAR DROPDOWN */}
      {searchOpen && (
        <div className="bg-gray-900 border-t border-b border-gray-800 px-4 py-3">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Barbaadi / Search articles, scholars, podcast, videos..."
                  className="w-full bg-gray-950 border border-gray-700 text-white rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-emerald-500"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2 rounded-lg text-sm transition"
              >
                {t('nav.search')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3. MAIN NAVIGATION MENU (Desktop) */}
      <nav className="hidden lg:block bg-[#08120D] border-t border-emerald-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-between text-xs font-semibold text-gray-200">
            <li>
              <Link href="/" className="inline-block py-2.5 px-3 hover:text-emerald-400 transition text-emerald-400 border-b-2 border-emerald-500">
                {t('nav.home')}
              </Link>
            </li>

            {/* News Dropdown */}
            <li className="relative group">
              <button className="flex items-center gap-1 py-2.5 px-3 hover:text-emerald-400 transition">
                <span>Oduu (News)</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block w-56 bg-gray-950 border border-gray-800 shadow-2xl rounded-b-xl py-2 z-50">
                <Link href="/news?cat=world" className="block px-4 py-2 text-xs text-gray-300 hover:bg-emerald-950/60 hover:text-emerald-300 transition">
                  {t('nav.worldNews')}
                </Link>
                <Link href="/news?cat=national" className="block px-4 py-2 text-xs text-gray-300 hover:bg-emerald-950/60 hover:text-emerald-300 transition">
                  {t('nav.nationalNews')}
                </Link>
                <Link href="/news?cat=muslim" className="block px-4 py-2 text-xs text-gray-300 hover:bg-emerald-950/60 hover:text-emerald-300 transition">
                  {t('nav.muslimWorld')}
                </Link>
                <Link href="/news?cat=breaking" className="block px-4 py-2 text-xs text-amber-400 hover:bg-emerald-950/60 transition">
                  🔥 {t('nav.breaking')}
                </Link>
              </div>
            </li>

            {/* Islamic Education Dropdown */}
            <li className="relative group">
              <button className="flex items-center gap-1 py-2.5 px-3 hover:text-emerald-400 transition">
                <span>{t('nav.islamicEducation')}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block w-56 bg-gray-950 border border-gray-800 shadow-2xl rounded-b-xl py-2 z-50">
                <Link href="/education?sub=quran" className="block px-4 py-2 text-xs text-gray-300 hover:bg-emerald-950/60 hover:text-emerald-300 transition">
                  📖 Qur'aana
                </Link>
                <Link href="/education?sub=hadith" className="block px-4 py-2 text-xs text-gray-300 hover:bg-emerald-950/60 hover:text-emerald-300 transition">
                  📜 Hadiisa
                </Link>
                <Link href="/education?sub=fiqh" className="block px-4 py-2 text-xs text-gray-300 hover:bg-emerald-950/60 hover:text-emerald-300 transition">
                  ⚖️ Fiqhii
                </Link>
                <Link href="/education?sub=aqeedah" className="block px-4 py-2 text-xs text-gray-300 hover:bg-emerald-950/60 hover:text-emerald-300 transition">
                  🌱 Aqiidaa
                </Link>
                <Link href="/education?sub=tafsir" className="block px-4 py-2 text-xs text-gray-300 hover:bg-emerald-950/60 hover:text-emerald-300 transition">
                  🔍 Tafsiira
                </Link>
              </div>
            </li>

            {/* Scholars & History */}
            <li>
              <Link href="/ulamaa" className="inline-block py-2.5 px-3 hover:text-emerald-400 transition">
                {t('nav.scholars')}
              </Link>
            </li>

            {/* Hegere Travel */}
            <li>
              <Link href="/hegere" className="inline-flex items-center gap-1 py-2.5 px-3 hover:text-emerald-400 transition text-amber-400">
                <Compass className="w-3.5 h-3.5" />
                <span>{t('nav.hegere')}</span>
              </Link>
            </li>

            {/* Podcast */}
            <li>
              <Link href="/podcast" className="inline-flex items-center gap-1 py-2.5 px-3 hover:text-emerald-400 transition">
                <Radio className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t('nav.podcast')}</span>
              </Link>
            </li>

            {/* Video */}
            <li>
              <Link href="/video" className="inline-flex items-center gap-1 py-2.5 px-3 hover:text-emerald-400 transition">
                <Video className="w-3.5 h-3.5" />
                <span>{t('nav.video')}</span>
              </Link>
            </li>

            {/* Audio (Separated per explicit client instruction) */}
            <li>
              <Link href="/audio" className="inline-flex items-center gap-1 py-2.5 px-3 hover:text-emerald-400 transition">
                <span>{t('nav.audio')}</span>
              </Link>
            </li>

            {/* Photo Gallery */}
            <li>
              <Link href="/gallery" className="inline-flex items-center gap-1 py-2.5 px-3 hover:text-emerald-400 transition">
                <Camera className="w-3.5 h-3.5" />
                <span>{t('nav.gallery')}</span>
              </Link>
            </li>

            {/* Admin Newsroom Portal shortcut */}
            <li>
              <Link href="/admin" className="inline-block py-1 px-2.5 rounded bg-emerald-950/70 border border-emerald-800/60 text-emerald-400 hover:text-white hover:bg-emerald-900 transition font-mono text-[11px]">
                Admin Newsroom
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* 4. MOBILE DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gray-950 border-t border-gray-800 px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-gray-800">
            <Link 
              href="/member" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 bg-emerald-600 text-white font-bold py-2 rounded-lg text-xs"
            >
              <UserCheck className="w-4 h-4" />
              <span>{t('nav.becomeMember')}</span>
            </Link>
            <Link 
              href="/support" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 bg-gray-800 text-emerald-400 border border-emerald-800/60 py-2 rounded-lg text-xs"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>{t('nav.supportUs')}</span>
            </Link>
          </div>

          <ul className="space-y-1 text-sm font-medium text-gray-200">
            <li><Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-gray-900 text-emerald-400">{t('nav.home')}</Link></li>
            <li><Link href="/news" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-gray-900">Oduu (All News)</Link></li>
            <li><Link href="/education" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-gray-900">{t('nav.islamicEducation')}</Link></li>
            <li><Link href="/ulamaa" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-gray-900">{t('nav.scholars')}</Link></li>
            <li><Link href="/hegere" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-gray-900 text-amber-400">{t('nav.hegere')}</Link></li>
            <li><Link href="/podcast" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-gray-900">{t('nav.podcast')}</Link></li>
            <li><Link href="/video" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-gray-900">{t('nav.video')}</Link></li>
            <li><Link href="/audio" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-gray-900">{t('nav.audio')}</Link></li>
            <li><Link href="/gallery" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-gray-900">{t('nav.gallery')}</Link></li>
            <li><Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-gray-900">{t('nav.aboutUs')}</Link></li>
            <li><Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-gray-900">{t('nav.contactUs')}</Link></li>
            <li className="pt-2 border-t border-gray-800">
              <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded bg-emerald-950 text-emerald-400 font-mono text-xs">
                Admin Panel (Newsroom) &rarr;
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
