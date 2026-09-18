'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { HeartHandshake, ShieldAlert, CheckCircle, Phone, Mail, MapPin } from 'lucide-react';

export default function SupportPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Title */}
      <div className="text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
          <HeartHandshake className="w-3.5 h-3.5" />
          {t('nav.supportUs')}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Aalam Media Deeggaraa
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
          {t('support.subtitle')}
        </p>
      </div>

      {/* What your support funds */}
      <div className="p-8 rounded-3xl bg-gray-950 border border-gray-800 space-y-6">
        <h2 className="text-xl font-bold text-white border-l-4 border-emerald-500 pl-3">
          {t('support.fundsTitle')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-xs text-gray-200">Gabaasa oduu bilisaa, dhugaa fi qulqullina qabu gaggeessuuf</span>
          </div>
          <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-xs text-gray-200">Barnoota Islaamaa (Qur'aana, Hadiisa, Fiqhii) ammayyeessuuf</span>
          </div>
          <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-xs text-gray-200">Oomisha Podcast, dookumantarii fi viidiyoo qorannoo olaanaa</span>
          </div>
          <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-xs text-gray-200">Bu'uura teeknooloojii, tamsaasa diriirsuu fi leenjii gaazexeessitootaa</span>
          </div>
        </div>
      </div>

      {/* STRICT CLIENT RULE: NO GUESSING/INVENTING BANK NUMBERS.
          Mandated: Clearly labeled "Payment details coming soon" placeholder. */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-950/40 via-gray-950 to-amber-950/30 border-2 border-dashed border-amber-600/70 text-center space-y-4">
        <ShieldAlert className="w-12 h-12 text-amber-400 mx-auto" />
        <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-950 text-amber-300 border border-amber-800 uppercase tracking-wider">
          {t('support.placeholderTitle')}
        </span>
        <h3 className="text-2xl font-black text-white">
          "Payment Details Coming Soon" / "Odeeffannoon Kaffaltii Dhiyootti"
        </h3>
        <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
          {t('support.placeholderDesc')}
        </p>

        <div className="pt-4 border-t border-gray-800/80 max-w-md mx-auto space-y-2 text-xs text-gray-300 font-mono">
          <p className="font-bold text-emerald-400">{t('support.contactForPledge')}</p>
          <p className="flex items-center justify-center gap-2">
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>0915636302 / 0712025283</span>
          </p>
          <p className="flex items-center justify-center gap-2">
            <Mail className="w-3.5 h-3.5 text-emerald-400" />
            <span>misbahsheikhhusein@gmail.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}
