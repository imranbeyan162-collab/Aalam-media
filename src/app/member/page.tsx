'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { UserCheck, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

export default function MemberPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    country: 'Itoophiyaa',
    preferredLanguage: 'Afaan Oromoo',
    membershipType: 'Regular Member',
    areaOfInterest: '',
    message: '',
    consent: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Title */}
      <div className="text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
          <UserCheck className="w-3.5 h-3.5" />
          {t('nav.becomeMember')}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          "BECOME A MEMBER" / "MAATII AALAM MEDIA TA'I"
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
          {t('member.subtitle')}
        </p>
      </div>

      {submitted ? (
        <div className="p-10 rounded-3xl bg-emerald-950/40 border border-emerald-700 text-center space-y-4 animate-fadeIn">
          <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
          <h2 className="text-2xl font-bold text-white">Baga Gammaddan!</h2>
          <p className="text-sm text-gray-200 max-w-md mx-auto">
            {t('member.successMessage')}
          </p>
          <div className="pt-4">
            <a href="/" className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 px-6 rounded-xl transition">
              Gara Fuula Duraatti Deebi'aa &rarr;
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-gray-950 border border-gray-800 space-y-6 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                {t('member.fullName')} *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                placeholder="Misbah Husein"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                {t('member.email')} *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                placeholder="example@mail.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                {t('member.phone')} *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                placeholder="0912345678"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                {t('member.city')} *
              </label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                placeholder="Adaamaa / Finfinnee"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                {t('member.country')} *
              </label>
              <input
                type="text"
                required
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                placeholder="Itoophiyaa"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                {t('member.preferredLang')}
              </label>
              <select
                value={formData.preferredLanguage}
                onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Afaan Oromoo">Afaan Oromoo</option>
                <option value="English">English</option>
                <option value="Arabic">العربية (Arabic)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-300 mb-1">
                {t('member.membershipType')} (Admin-editable list)
              </label>
              <select
                value={formData.membershipType}
                onChange={(e) => setFormData({ ...formData, membershipType: e.target.value as any })}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-semibold"
              >
                <option value="Regular Member">Regular Member (Miseensa Idilee)</option>
                <option value="Volunteer">Volunteer (Tola Ooltummaa)</option>
                <option value="Media Contributor">Media Contributor (Gumaacha Miidiyaa)</option>
                <option value="Supporting Member">Supporting Member (Miseensa Deeggaraa)</option>
                <option value="Professional Member">Professional Member (Miseensa Ogeessaa)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-300 mb-1">
                {t('member.areaOfInterest')}
              </label>
              <input
                type="text"
                value={formData.areaOfInterest}
                onChange={(e) => setFormData({ ...formData, areaOfInterest: e.target.value })}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                placeholder="Fkn. Gabaasa Oduu, Qophii Viidiyoo, Qorannoo Barnoota Islaamaa..."
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-300 mb-1">
                {t('member.message')}
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                placeholder="Yaada ykn ergaa dabalataa..."
              ></textarea>
            </div>
          </div>

          <div className="flex items-start gap-2 pt-2">
            <input
              type="checkbox"
              id="consent"
              required
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              className="mt-1 rounded text-emerald-600 focus:ring-emerald-500 bg-gray-900 border-gray-800"
            />
            <label htmlFor="consent" className="text-xs text-gray-300">
              {t('member.consent')}
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black py-3 rounded-xl text-sm transition shadow-lg flex items-center justify-center gap-2"
          >
            <UserCheck className="w-4 h-4" />
            <span>{loading ? 'Galmeessaa jira...' : t('member.submit')}</span>
          </button>
        </form>
      )}
    </div>
  );
}
