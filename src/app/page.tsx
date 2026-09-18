'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import HeroSlider from '@/components/home/HeroSlider';
import BreakingNewsTicker from '@/components/home/BreakingNewsTicker';
import ImageSlot from '@/components/ui/ImageSlot';
import AdSlot from '@/components/ads/AdSlot';
import { 
  initialArticles, 
  initialBreakingNews, 
  initialScholars, 
  initialPodcasts, 
  initialVideos, 
  initialAlbums, 
  initialAds 
} from '@/lib/data/seed';
import { 
  Flame, 
  TrendingUp, 
  BookOpen, 
  Radio, 
  Video, 
  Camera, 
  Compass, 
  UserCheck, 
  HeartHandshake, 
  ChevronRight, 
  Calendar, 
  Clock, 
  Share2, 
  ThumbsUp, 
  Eye 
} from 'lucide-react';

export default function HomePage() {
  const { t, locale } = useLanguage();
  const [eduTab, setEduTab] = useState<'quran' | 'hadith' | 'fiqh' | 'aqeedah' | 'tafsir'>('quran');

  // Content Filtering
  const leadArticle = initialArticles[0];
  const latestArticles = initialArticles.slice(1, 4);
  const featuredArticles = initialArticles.filter(a => a.isFeatured);
  const nationalArticles = initialArticles.filter(a => a.category.includes('Biyyoolessaa'));
  const worldArticles = initialArticles.filter(a => a.category.includes('Addunyaa'));
  const muslimArticles = initialArticles.filter(a => a.category.includes('Muslimaa') || a.category.includes('Ulamaa'));

  return (
    <div className="w-full pb-16">
      {/* 1. BREAKING NEWS TICKER */}
      <BreakingNewsTicker items={initialBreakingNews} active={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-12">
        {/* 2. HERO / INTRO SLIDER (Founder first, then 4 studio photos loop at 4s) */}
        <section>
          <HeroSlider />
        </section>

        {/* 3. LEAD NEWS BLOCK + LATEST FEED (Section 5 requirement) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Lead Story (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                Oduu Guddaa (Lead Story)
              </h3>
              <span className="text-xs text-gray-500 font-mono">Adama Central Desk</span>
            </div>

            <div className="group rounded-2xl bg-gray-900 border border-gray-800 overflow-hidden hover:border-emerald-700/60 transition shadow-xl">
              <Link href={`/news/${leadArticle.slug}`}>
                <ImageSlot
                  meta={leadArticle.featuredImage}
                  aspect="wide"
                  className="rounded-none border-0"
                />
              </Link>
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 font-semibold border border-emerald-800/40">
                    {leadArticle.category}
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-gray-500" />
                    {new Date(leadArticle.publishedAt).toLocaleDateString()}
                  </span>
                  <span>|</span>
                  <span>Barreessaa: <strong className="text-gray-300">{leadArticle.author.name}</strong></span>
                </div>

                <Link href={`/news/${leadArticle.slug}`}>
                  <h2 className="text-2xl sm:text-3xl font-black text-white group-hover:text-emerald-400 transition leading-tight">
                    {leadArticle.headline}
                  </h2>
                </Link>

                <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
                  {leadArticle.subtitle}
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-gray-800 text-xs text-gray-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      {leadArticle.reactions.like + leadArticle.reactions.love}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {leadArticle.views} views
                    </span>
                  </div>
                  <Link href={`/news/${leadArticle.slug}`} className="text-emerald-400 font-bold hover:underline flex items-center gap-1">
                    {t('sections.readMore')} &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar: SECTION 1 - Latest News Feed (Auto-updating style) (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="border-b border-gray-800 pb-2 flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-500" />
                {t('sections.latestNews')}
              </h3>
              <Link href="/news" className="text-xs text-emerald-400 hover:underline">
                {t('sections.viewAll')}
              </Link>
            </div>

            <div className="space-y-3">
              {latestArticles.map((art) => (
                <div key={art.id} className="p-3.5 rounded-xl bg-gray-900/80 border border-gray-800 hover:border-gray-700 transition">
                  <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-1 font-mono">
                    <span className="text-emerald-400 font-semibold">{art.category}</span>
                    <span>·</span>
                    <span>{new Date(art.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <Link href={`/news/${art.slug}`} className="font-bold text-sm text-gray-200 hover:text-emerald-400 transition line-clamp-2 leading-snug">
                    {art.headline}
                  </Link>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                    {art.subtitle}
                  </p>
                </div>
              ))}
            </div>

            {/* In-sidebar Ad slot */}
            <AdSlot ad={initialAds[0]} placement="Desktop" className="my-3 p-3" />
          </div>
        </section>

        {/* SECTION 2 - FEATURED NEWS (Manually curated) */}
        <section className="space-y-4">
          <div className="border-b border-gray-800 pb-2 flex items-center justify-between">
            <h3 className="text-lg font-black uppercase tracking-wide text-white border-l-4 border-emerald-500 pl-3">
              {t('sections.featuredNews')}
            </h3>
            <Link href="/news?featured=true" className="text-xs text-emerald-400 hover:underline">
              {t('sections.viewAll')} &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredArticles.slice(0, 3).map((art) => (
              <div key={art.id} className="aalam-news-card rounded-xl overflow-hidden flex flex-col justify-between">
                <div>
                  <ImageSlot meta={art.featuredImage} aspect="video" className="rounded-none border-0" />
                  <div className="p-4 space-y-2">
                    <span className="text-[11px] font-bold text-emerald-400 font-mono uppercase">
                      {art.category}
                    </span>
                    <Link href={`/news/${art.slug}`} className="block font-bold text-base text-white hover:text-emerald-400 transition leading-snug">
                      {art.headline}
                    </Link>
                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                      {art.subtitle}
                    </p>
                  </div>
                </div>
                <div className="px-4 pb-4 pt-2 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-500">
                  <span>{art.author.name}</span>
                  <Link href={`/news/${art.slug}`} className="text-emerald-400 font-medium hover:underline">
                    {t('sections.readMore')}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3, 4, 5 - DEDICATED NEWS SECTIONS (National, Muslim World, World) */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
          {/* Section 3: Oduu Biyya Keessaa (National) */}
          <div className="space-y-4">
            <div className="border-b-2 border-emerald-600 pb-2">
              <h3 className="text-sm font-black uppercase tracking-wider text-emerald-400">
                {t('sections.nationalSection')}
              </h3>
            </div>
            <div className="space-y-4">
              {nationalArticles.concat(initialArticles.slice(0, 1)).slice(0, 2).map((art, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-gray-900 border border-gray-800 space-y-2">
                  <ImageSlot meta={art.featuredImage} aspect="video" />
                  <Link href={`/news/${art.slug}`} className="block font-bold text-sm text-white hover:text-emerald-400 transition">
                    {art.headline}
                  </Link>
                  <p className="text-xs text-gray-400 line-clamp-2">{art.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Oduu Muslimaa (Muslim World) */}
          <div className="space-y-4">
            <div className="border-b-2 border-emerald-600 pb-2">
              <h3 className="text-sm font-black uppercase tracking-wider text-emerald-400">
                {t('sections.muslimSection')}
              </h3>
            </div>
            <div className="space-y-4">
              {muslimArticles.concat(initialArticles.slice(1, 2)).slice(0, 2).map((art, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-gray-900 border border-gray-800 space-y-2">
                  <ImageSlot meta={art.featuredImage} aspect="video" />
                  <Link href={`/news/${art.slug}`} className="block font-bold text-sm text-white hover:text-emerald-400 transition">
                    {art.headline}
                  </Link>
                  <p className="text-xs text-gray-400 line-clamp-2">{art.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Oduu Addunyaa (World) */}
          <div className="space-y-4">
            <div className="border-b-2 border-emerald-600 pb-2">
              <h3 className="text-sm font-black uppercase tracking-wider text-emerald-400">
                {t('sections.worldSection')}
              </h3>
            </div>
            <div className="space-y-4">
              {worldArticles.concat(initialArticles.slice(2, 3)).slice(0, 2).map((art, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-gray-900 border border-gray-800 space-y-2">
                  <ImageSlot meta={art.featuredImage} aspect="video" />
                  <Link href={`/news/${art.slug}`} className="block font-bold text-sm text-white hover:text-emerald-400 transition">
                    {art.headline}
                  </Link>
                  <p className="text-xs text-gray-400 line-clamp-2">{art.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6 - BARNOOTA ISLAAMAA (Qur'aan / Hadiisa / Fiqh / Aqeedah / Tafsiira sub-blocks) */}
        <section className="p-6 sm:p-8 rounded-2xl bg-[#0B1510] border border-emerald-900/60 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-900/60 pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">
                WIIRTUUBARNOOTAA
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {t('sections.educationSection')}
              </h3>
            </div>

            {/* Sub-block tab switcher */}
            <div className="flex flex-wrap items-center gap-1.5 bg-gray-950 p-1 rounded-xl border border-gray-800 text-xs">
              {(['quran', 'hadith', 'fiqh', 'aqeedah', 'tafsir'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setEduTab(tab)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition capitalize ${eduTab === tab ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  {tab === 'quran' && "📖 Qur'aana"}
                  {tab === 'hadith' && '📜 Hadiisa'}
                  {tab === 'fiqh' && '⚖️ Fiqhii'}
                  {tab === 'aqeedah' && '🌱 Aqiidaa'}
                  {tab === 'tafsir' && '🔍 Tafsiira'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 p-6 rounded-xl bg-gray-950 border border-emerald-900/40 space-y-3">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                Qophii Addaa — {eduTab.toUpperCase()}
              </span>
              <h4 className="text-lg font-bold text-white">
                Barnoota Qulqullina Qabu: Safuu, Amantaa fi Qajeelfama Bu'uuraa Dhalootaa
              </h4>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Aalam Media sagantaa kana jalatti barnoota amantaa Islaamaa haala ammayyaa fi salphaatti hubatamuu danda'uun qindeesse dhiyeessa.
                Barnoonni kun qajeelfama kitaabaa fi sunnaa bu'uureffatee hayyoota beekamoodhaan kan qophaa'udha.
              </p>
              <div className="pt-2">
                <Link href={`/education?sub=${eduTab}`} className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300">
                  Dabalata Baradhaa &rarr;
                </Link>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gray-950 border border-gray-800 space-y-3 flex flex-col justify-between">
              <div>
                <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                  Sagantaa Itti Aanu
                </h5>
                <p className="text-xs text-gray-300">
                  Darsiilee fi barnoota sagantaa kana irratti dhiyaatan hordofuuf galmaa'aa.
                </p>
              </div>
              <Link href="/member" className="block text-center py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition">
                {t('nav.becomeMember')}
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 7 - SEENAA ULAMAA'OTAA (Stars of Islam - Scholars) */}
        <section className="space-y-4">
          <div className="border-b border-gray-800 pb-2 flex items-center justify-between">
            <h3 className="text-lg font-black uppercase tracking-wide text-white border-l-4 border-emerald-500 pl-3">
              {t('sections.scholarsSection')}
            </h3>
            <Link href="/ulamaa" className="text-xs text-emerald-400 hover:underline">
              {t('sections.viewAll')} &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {initialScholars.map((sch) => (
              <div key={sch.id} className="p-5 rounded-xl bg-gray-900 border border-gray-800 hover:border-emerald-600 transition space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-700 flex items-center justify-center text-emerald-400 font-bold text-lg">
                  {sch.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-base text-white">{sch.name}</h4>
                  <span className="text-xs text-emerald-400 font-mono">{sch.era}</span>
                </div>
                <p className="text-xs text-gray-300 line-clamp-3 leading-relaxed">
                  {sch.bio}
                </p>
                <div className="pt-2 border-t border-gray-800">
                  <span className="text-[11px] text-gray-400 block mb-1 font-semibold">Gumaacha Guddaa:</span>
                  <p className="text-[11px] text-gray-300 italic">{sch.keyContributions[0]}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 8 - AALAM PODCAST */}
        <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#061A10] to-[#0A0F0D] border border-emerald-800/80 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-900 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <Radio className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">STAADIIYOO MARII</span>
                <h3 className="text-xl sm:text-2xl font-black text-white">{t('sections.podcastSection')}</h3>
              </div>
            </div>
            <Link href="/podcast" className="text-xs font-bold text-emerald-400 hover:text-white transition">
              Kutaalee Hunda Dhaggeeffadhaa &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <ImageSlot meta={initialPodcasts[0].coverImage} aspect="square" className="shadow-2xl" />
            </div>

            <div className="lg:col-span-7 space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-950 text-emerald-300 border border-emerald-800">
                Kutaa #{initialPodcasts[0].episodeNumber}
              </span>
              <h4 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                {initialPodcasts[0].title}
              </h4>
              <div className="text-xs text-gray-300 space-y-1">
                <p><strong>Keessummaa:</strong> {initialPodcasts[0].guest}</p>
                <p><strong>Qopheessaa:</strong> {initialPodcasts[0].host}</p>
                <p><strong>Yeroo:</strong> {initialPodcasts[0].duration} min</p>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                {initialPodcasts[0].description}
              </p>

              {/* Action Buttons: Listen / Watch buttons as mandated */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <Link
                  href="/podcast"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition shadow-lg"
                >
                  <Radio className="w-4 h-4" />
                  <span>{t('sections.listenNow')}</span>
                </Link>
                <Link
                  href="/podcast"
                  className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-gray-200 border border-emerald-800 px-5 py-2.5 rounded-xl text-xs font-bold transition"
                >
                  <Video className="w-4 h-4 text-emerald-400" />
                  <span>{t('sections.watchNow')} (YouTube)</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9 - VIDEO (Latest Uploads & Embeds) */}
        <section className="space-y-4">
          <div className="border-b border-gray-800 pb-2 flex items-center justify-between">
            <h3 className="text-lg font-black uppercase tracking-wide text-white border-l-4 border-emerald-500 pl-3 flex items-center gap-2">
              <Video className="w-5 h-5 text-emerald-500" />
              {t('sections.videoSection')}
            </h3>
            <Link href="/video" className="text-xs text-emerald-400 hover:underline">
              {t('sections.viewAll')} &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {initialVideos.map((vid) => (
              <div key={vid.id} className="rounded-xl bg-gray-900 border border-gray-800 overflow-hidden hover:border-emerald-600 transition group">
                <div className="relative">
                  <ImageSlot meta={vid.thumbnail} aspect="video" className="rounded-none border-0" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-80 group-hover:opacity-100 transition">
                    <div className="w-12 h-12 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                      <Video className="w-5 h-5 ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/80 font-mono text-[11px] text-white px-2 py-0.5 rounded">
                    {vid.duration}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <span className="text-[10px] font-bold text-emerald-400 font-mono uppercase">
                    {vid.category}
                  </span>
                  <h4 className="font-bold text-sm text-white line-clamp-2">
                    {vid.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 10 - PHOTO GALLERY (Photos only, by album/category) */}
        <section className="space-y-4">
          <div className="border-b border-gray-800 pb-2 flex items-center justify-between">
            <h3 className="text-lg font-black uppercase tracking-wide text-white border-l-4 border-emerald-500 pl-3 flex items-center gap-2">
              <Camera className="w-5 h-5 text-emerald-500" />
              {t('sections.gallerySection')}
            </h3>
            <Link href="/gallery" className="text-xs text-emerald-400 hover:underline">
              {t('sections.viewAll')} &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {initialAlbums.map((alb) => (
              <div key={alb.id} className="rounded-xl bg-gray-900 border border-gray-800 overflow-hidden p-4 space-y-3">
                <ImageSlot meta={alb.coverImage} aspect="video" />
                <div>
                  <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono mb-1">
                    <span className="text-emerald-400 font-bold">{alb.category}</span>
                    <span>{alb.location} · {alb.date}</span>
                  </div>
                  <h4 className="font-bold text-base text-white">{alb.title}</h4>
                  <p className="text-xs text-gray-400 mt-1">{alb.caption}</p>
                  <p className="text-[11px] text-gray-500 mt-1">Kaameeraa: <strong>{alb.photographer}</strong></p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 11 - TRENDING / MOST READ */}
        <section className="p-6 rounded-2xl bg-gray-950 border border-gray-800 space-y-4">
          <div className="border-b border-gray-800 pb-2 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-black uppercase tracking-wide text-white">
              {t('sections.trending')}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {initialArticles.map((art, idx) => (
              <div key={art.id} className="flex gap-3 items-start p-3 rounded-xl bg-gray-900/60 border border-gray-800/80">
                <span className="text-2xl font-black text-emerald-500/80 font-mono">
                  #{idx + 1}
                </span>
                <div className="space-y-1">
                  <Link href={`/news/${art.slug}`} className="text-xs font-bold text-gray-200 hover:text-emerald-400 line-clamp-2">
                    {art.headline}
                  </Link>
                  <span className="text-[10px] text-gray-500 font-mono block">
                    {art.views} views
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 12, 13, 14 - NEWSLETTER + CTA BANNERS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* Section 13: "Become a Member" Call-to-Action Banner */}
          <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-900 to-emerald-950 border border-emerald-600/60 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-800 text-emerald-200 uppercase">
                Maatii Keenya Ta'aa
              </span>
              <h3 className="text-2xl font-black text-white">
                "BECOME A MEMBER" / "MAATII AALAM MEDIA TA'I"
              </h3>
              <p className="text-xs text-gray-200 leading-relaxed">
                Miidiyaa bilisaa, barnoota Islaamaa fi aadaa Oromoo cinaa dhaabbachuuf maatii Aalam Media waliin hidhata uumaa.
              </p>
            </div>
            <Link
              href="/member"
              className="inline-flex items-center justify-center gap-2 bg-white text-emerald-950 font-black py-3 px-6 rounded-xl text-sm transition hover:bg-emerald-100 shadow-lg"
            >
              <UserCheck className="w-4 h-4" />
              <span>{t('nav.becomeMember')} &rarr;</span>
            </Link>
          </div>

          {/* Section 14: "Support Aalam Media" Call-to-Action Banner */}
          <div className="p-8 rounded-2xl bg-gradient-to-r from-gray-900 to-[#0A150E] border border-gray-800 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-gray-800 text-gray-300 uppercase">
                Gumaacha & Deeggarsa
              </span>
              <h3 className="text-2xl font-black text-white">
                "SUPPORT AALAM MEDIA"
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Tamsaasa qulqullina olaanaa, sagantaalee qorannoo fi teeknooloojii miidiyaa ijaaruuf deeggarsi keessan bu'uura cimaadha.
              </p>
            </div>
            <Link
              href="/support"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 px-6 rounded-xl text-sm transition shadow-lg"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>{t('nav.supportUs')} &rarr;</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
