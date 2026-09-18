'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { Phone, Mail, MapPin, Send, HeartHandshake, UserCheck } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-[#050B08] border-t border-gray-800 text-gray-300">
      {/* Upper Footer: Brand info, Links, Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand & Slogan */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/brand/logo.svg" alt="Aalam Media" className="w-12 h-12 object-contain" />
              <div>
                <span className="text-xl font-black tracking-tight text-white font-display">AALAM MEDIA</span>
                <p className="text-xs text-emerald-400 italic">"{t('brand.slogan')}"</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              {t('brand.tagline')}
            </p>
            <div className="pt-2 space-y-1.5 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Adaamaa, Oromiyaa, Itoophiyaa</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="font-mono">0915636302 / 0712025283</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="font-mono">misbahsheikhhusein@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation / Quick links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="hover:text-emerald-400 transition">{t('nav.home')}</Link></li>
              <li><Link href="/news" className="hover:text-emerald-400 transition">Oduu (All News)</Link></li>
              <li><Link href="/podcast" className="hover:text-emerald-400 transition">{t('nav.podcast')}</Link></li>
              <li><Link href="/video" className="hover:text-emerald-400 transition">{t('nav.video')}</Link></li>
              <li><Link href="/audio" className="hover:text-emerald-400 transition">{t('nav.audio')}</Link></li>
              <li><Link href="/gallery" className="hover:text-emerald-400 transition">{t('nav.gallery')}</Link></li>
              <li><Link href="/hegere" className="hover:text-emerald-400 transition">{t('nav.hegere')}</Link></li>
              <li><Link href="/ulamaa" className="hover:text-emerald-400 transition">{t('nav.scholars')}</Link></li>
            </ul>
          </div>

          {/* Col 3: Standalone & Policy Pages (Section 22) */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
              {t('footer.policies')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/about" className="hover:text-emerald-400 transition">{t('nav.aboutUs')}</Link></li>
              <li><Link href="/team" className="hover:text-emerald-400 transition">{t('nav.team')}</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400 transition">{t('nav.contactUs')}</Link></li>
              <li><Link href="/policies/editorial" className="hover:text-emerald-400 transition">Editorial Policy</Link></li>
              <li><Link href="/policies/correction" className="hover:text-emerald-400 transition">Correction Policy</Link></li>
              <li><Link href="/policies/privacy" className="hover:text-emerald-400 transition">Privacy Policy</Link></li>
              <li><Link href="/policies/terms" className="hover:text-emerald-400 transition">Terms & Conditions</Link></li>
              <li><Link href="/policies/copyright" className="hover:text-emerald-400 transition">Copyright Policy</Link></li>
              <li><Link href="/policies/advertisement" className="hover:text-emerald-400 transition">Advertisement Policy</Link></li>
              <li><Link href="/policies/disclaimer" className="hover:text-emerald-400 transition">Disclaimer</Link></li>
            </ul>
          </div>

          {/* Col 4: Community & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2 border-l-2 border-emerald-500 pl-2">
              {t('sections.newsletter')}
            </h4>
            <p className="text-xs text-gray-400">
              {t('sections.newsletterDesc')}
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Galatoomaa! Teessoon keessan galmaa\'eera.'); }} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Teessoo Imeelii / Email..."
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t('sections.subscribe')}</span>
              </button>
            </form>

            <div className="pt-2 flex flex-col gap-2">
              <Link 
                href="/member" 
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold py-2 px-3 rounded-lg text-xs shadow-md transition hover:brightness-110"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>{t('nav.becomeMember')}</span>
              </Link>
              <Link 
                href="/support" 
                className="inline-flex items-center justify-center gap-2 bg-gray-900 border border-emerald-800/80 text-emerald-400 font-bold py-2 px-3 rounded-lg text-xs transition hover:bg-gray-800"
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>{t('nav.supportUs')}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Social media strip in footer */}
        <div className="mt-8 pt-6 border-t border-gray-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400">
          <div>
            &copy; {new Date().getFullYear()} Aalam Media. {t('footer.copyright')}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-500">Nu Hordofaa / Follow Us:</span>
            <a href="https://www.facebook.com/share/1JPeH4t9nW/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition">Facebook</a>
            <a href="https://www.tiktok.com/@aalammedia1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition">TikTok</a>
            <a href="https://www.youtube.com/@AalamMedia-cc8lij" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition">YouTube</a>
            <a href="#" className="text-gray-500 hover:text-emerald-400 transition" onClick={(e) => { e.preventDefault(); alert('Telegram official handle coming soon'); }}>Telegram</a>
            <a href="#" className="text-gray-500 hover:text-emerald-400 transition" onClick={(e) => { e.preventDefault(); alert('Instagram official handle coming soon'); }}>Instagram</a>
            <a href="#" className="text-gray-500 hover:text-emerald-400 transition" onClick={(e) => { e.preventDefault(); alert('X / Twitter official handle coming soon'); }}>X</a>
          </div>
        </div>
      </div>

      {/* SECTION 26: IMAKO SOLUTION — PERSISTENT FOOTER PROMOTION BLOCK */}
      <div className="w-full bg-[#020503] border-t border-gray-900 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <img 
              src="/brand/imako-logo.svg" 
              alt="Imako Solution" 
              className="h-7 w-auto object-contain opacity-90 hover:opacity-100 transition" 
            />
            <div className="flex flex-col">
              <span className="text-gray-300 font-semibold tracking-wide">
                Website & AI solutions by <strong className="text-blue-400 font-bold">Imako Solution</strong>
              </span>
              <span className="text-[11px] text-gray-500">
                Website Development · AI Automation · AI Consultancy
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-400 text-[11px] font-mono">
            <a href="mailto:imakosolution@gmail.com" className="hover:text-blue-400 transition flex items-center gap-1">
              <Mail className="w-3 h-3 text-blue-500" />
              <span>imakosolution@gmail.com</span>
            </a>
            <span className="text-gray-700">|</span>
            <span className="flex items-center gap-1 text-gray-400">
              <Phone className="w-3 h-3 text-blue-500" />
              <span>+251 91 225 1113 / +251 90 717 3634</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
