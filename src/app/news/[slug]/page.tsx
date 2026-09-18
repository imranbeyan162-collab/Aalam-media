'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import ImageSlot from '@/components/ui/ImageSlot';
import AdSlot from '@/components/ads/AdSlot';
import ErrorReportModal from '@/components/article/ErrorReportModal';
import { initialArticles, initialAds } from '@/lib/data/seed';
import { 
  Clock, 
  Calendar, 
  Share2, 
  AlertCircle, 
  ThumbsUp, 
  Heart, 
  Lightbulb, 
  Award, 
  MessageSquare, 
  Send, 
  Check, 
  Copy,
  ChevronLeft
} from 'lucide-react';

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { t } = useLanguage();

  const article = initialArticles.find((a) => a.slug === slug) || initialArticles[0];

  // States
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [reactions, setReactions] = useState(article.reactions);
  const [userReacted, setUserReacted] = useState<string | null>(null);
  
  // Comments
  const [comments, setComments] = useState([
    { id: '1', name: 'Mustafa Hassan', text: 'Gabaasa qulqullina olaanaa qabu. Aalam Media tattaaffii keessaniif galatoomaa.', date: 'Har\'a 10:30' },
    { id: '2', name: 'Fatima Abdi', text: 'Barruu baay\'ee nama barsiisuudha. Addunyaa Islaamummaan Miidhagde!', date: 'Kaleessa 14:15' }
  ]);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleReaction = (type: 'like' | 'love' | 'insightful' | 'respect') => {
    if (userReacted === type) return;
    setReactions(prev => ({ ...prev, [type]: prev[type] + 1 }));
    setUserReacted(type);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentName.trim() && commentText.trim()) {
      setComments([
        ...comments,
        {
          id: Date.now().toString(),
          name: commentName,
          text: commentText,
          date: 'Amma (Just now)'
        }
      ]);
      setCommentText('');
    }
  };

  const relatedArticles = initialArticles.filter(a => a.id !== article.id).slice(0, 3);

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back button */}
      <Link href="/news" className="inline-flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-emerald-400 transition">
        <ChevronLeft className="w-4 h-4" />
        <span>Gara Oduutti Deebisaa</span>
      </Link>

      {/* Category Badge & Headline */}
      <div className="space-y-3">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800/80 font-mono">
          {article.category}
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
          {article.headline}
        </h1>
        <p className="text-base sm:text-lg text-gray-300 font-medium leading-relaxed">
          {article.subtitle}
        </p>
      </div>

      {/* Author Byline, Dates & Social Share Bar */}
      <div className="py-4 border-y border-gray-800 flex flex-wrap items-center justify-between gap-4">
        {/* Author info */}
        <div className="flex items-center gap-3">
          <img
            src={article.author.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'}
            alt={article.author.name}
            className="w-11 h-11 rounded-full object-cover border border-emerald-600/60"
          />
          <div>
            <span className="block text-sm font-bold text-white">{article.author.name}</span>
            <span className="block text-xs text-emerald-400">{article.author.role}</span>
          </div>
        </div>

        {/* Timestamps */}
        <div className="flex items-center gap-4 text-xs text-gray-400 font-mono">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-gray-500" />
            <span>{t('article.published')}: <strong>{new Date(article.publishedAt).toLocaleDateString()}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 border-l border-gray-800 pl-4">
            <Clock className="w-3.5 h-3.5 text-gray-500" />
            <span>{t('article.updated')}: <strong>{new Date(article.updatedAt).toLocaleTimeString()}</strong></span>
          </div>
        </div>

        {/* Social Share Buttons (Facebook, WhatsApp, Telegram, X, Copy Link) */}
        <div className="flex items-center gap-2">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-gray-900 border border-gray-800 hover:text-blue-500 hover:border-blue-500 transition"
            title="Share on Facebook"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>

          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.headline + ' ' + (typeof window !== 'undefined' ? window.location.href : ''))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-gray-900 border border-gray-800 hover:text-green-500 hover:border-green-500 transition"
            title="Share on WhatsApp"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
          </a>

          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(article.headline)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-gray-900 border border-gray-800 hover:text-sky-400 hover:border-sky-400 transition"
            title="Share on Telegram"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
          </a>

          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(article.headline)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-gray-900 border border-gray-800 hover:text-white hover:border-gray-500 transition"
            title="Share on X"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>

          <button
            onClick={handleCopyLink}
            className="p-2 rounded-lg bg-gray-900 border border-gray-800 hover:text-emerald-400 hover:border-emerald-500 transition flex items-center gap-1 text-xs"
            title="Copy Link"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Featured Image with Caption, Credit, Alt, and Source */}
      <ImageSlot
        meta={article.featuredImage}
        aspect="wide"
        className="rounded-2xl shadow-2xl"
      />

      {/* Article Body */}
      <div className="prose prose-invert max-w-none text-gray-200 text-sm sm:text-base leading-relaxed space-y-5">
        {article.content.split('\n\n').map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>

      {/* In-Article Advertisement Slot */}
      <AdSlot ad={initialAds[0]} placement="Article" />

      {/* Tags & CORRECTION SYSTEM BUTTON (Mandated: visible "Report an Error / Sirreeffama Gabaasaa" button) */}
      <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 flex flex-wrap items-center justify-between gap-4">
        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-gray-500 font-mono">Asxaa (Tags):</span>
          {article.tags.map((tag) => (
            <span key={tag} className="px-2.5 py-0.5 rounded-full bg-gray-900 text-gray-300 text-xs font-mono border border-gray-800">
              #{tag}
            </span>
          ))}
        </div>

        {/* Correction System Trigger Button */}
        <button
          onClick={() => setErrorModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-950/60 border border-red-800/80 text-red-300 hover:bg-red-900 hover:text-white text-xs font-bold transition active:scale-95"
        >
          <AlertCircle className="w-3.5 h-3.5 text-red-400" />
          <span>{t('article.reportError')}</span>
        </button>
      </div>

      {/* ENGAGEMENT: REACTIONS BAR (👍❤️💡👏) */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-gray-950 via-[#0A120D] to-gray-950 border border-emerald-950/80 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
          {t('article.reactions')}
        </h4>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => handleReaction('like')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${userReacted === 'like' ? 'bg-emerald-600 text-white' : 'bg-gray-900 border border-gray-800 text-gray-300 hover:border-emerald-600'}`}
          >
            <ThumbsUp className="w-4 h-4 text-emerald-400" />
            <span>👍 Like ({reactions.like})</span>
          </button>

          <button
            onClick={() => handleReaction('love')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${userReacted === 'love' ? 'bg-rose-600 text-white' : 'bg-gray-900 border border-gray-800 text-gray-300 hover:border-rose-600'}`}
          >
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>❤️ Love ({reactions.love})</span>
          </button>

          <button
            onClick={() => handleReaction('insightful')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${userReacted === 'insightful' ? 'bg-amber-600 text-white' : 'bg-gray-900 border border-gray-800 text-gray-300 hover:border-amber-500'}`}
          >
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>💡 Insightful ({reactions.insightful})</span>
          </button>

          <button
            onClick={() => handleReaction('respect')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${userReacted === 'respect' ? 'bg-purple-600 text-white' : 'bg-gray-900 border border-gray-800 text-gray-300 hover:border-purple-500'}`}
          >
            <Award className="w-4 h-4 text-purple-400" />
            <span>👏 Respect ({reactions.respect})</span>
          </button>
        </div>
      </div>

      {/* ENGAGEMENT: COMMENTS SECTION */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
          <MessageSquare className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-bold text-white">
            {t('article.comments')} ({comments.length})
          </h3>
        </div>

        {/* Comment input form */}
        <form onSubmit={handleCommentSubmit} className="p-4 rounded-xl bg-gray-950 border border-gray-800 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              required
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              placeholder="Maqaa keessan (Your name)..."
              className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          <textarea
            required
            rows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder={t('article.writeComment')}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          ></textarea>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-lg transition"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t('article.postComment')}</span>
          </button>
        </form>

        {/* Comments list */}
        <div className="space-y-3">
          {comments.map((com) => (
            <div key={com.id} className="p-4 rounded-xl bg-gray-900 border border-gray-800 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <strong className="text-emerald-400">{com.name}</strong>
                <span className="text-gray-500 font-mono text-[11px]">{com.date}</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {com.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* RELATED NEWS */}
      <section className="space-y-4 pt-8 border-t border-gray-800">
        <h3 className="text-base font-bold text-white uppercase tracking-wider border-l-4 border-emerald-500 pl-3">
          {t('article.relatedNews')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.map((rel) => (
            <div key={rel.id} className="aalam-news-card rounded-xl overflow-hidden p-3 space-y-2">
              <ImageSlot meta={rel.featuredImage} aspect="video" />
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">{rel.category}</span>
              <Link href={`/news/${rel.slug}`} className="block font-bold text-xs text-white hover:text-emerald-400 transition line-clamp-2">
                {rel.headline}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ERROR REPORT MODAL */}
      <ErrorReportModal
        articleId={article.id}
        articleTitle={article.headline}
        isOpen={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
      />
    </article>
  );
}
