'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { AlertCircle, X, CheckCircle2, Send } from 'lucide-react';

interface ErrorReportModalProps {
  articleId: string;
  articleTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ErrorReportModal({
  articleId,
  articleTitle,
  isOpen,
  onClose
}: ErrorReportModalProps) {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          articleId,
          articleTitle,
          reporterName: name,
          reporterEmail: email,
          details
        })
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-gray-950 border border-gray-800 rounded-2xl p-6 shadow-2xl space-y-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg bg-gray-900"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 text-amber-400">
          <AlertCircle className="w-5 h-5" />
          <h3 className="text-base font-bold text-white">
            {t('article.reportErrorTitle')}
          </h3>
        </div>

        <p className="text-xs text-gray-400 leading-relaxed">
          {t('article.reportErrorDesc')}
        </p>

        {submitted ? (
          <div className="p-6 text-center space-y-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-sm font-bold text-white">Gabaasni Keessan Qaqqabeera!</h4>
            <p className="text-xs text-gray-300">
              Galatoomaa! Gareen qindeessitoota oduu Aalam Media odeeffannoo kana qorachuun sirreeffama barbaachisaa ni godha.
            </p>
            <button
              onClick={onClose}
              className="mt-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2 px-4 rounded-lg"
            >
              Cufaa (Close)
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                {t('article.yourName')}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                placeholder="Maqaa keessan..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                {t('article.yourEmail')}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                placeholder="Imeelii keessan..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                {t('article.details')}
              </label>
              <textarea
                required
                rows={4}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                placeholder="Dogoggorri barruu kana keessatti mul'ate maali? Mee bal'inaan nuuf ibsaa..."
              ></textarea>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-gray-900 text-gray-400 hover:text-white text-xs font-medium"
              >
                Haqi (Cancel)
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{loading ? 'Ergamaa jira...' : t('article.sendReport')}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
