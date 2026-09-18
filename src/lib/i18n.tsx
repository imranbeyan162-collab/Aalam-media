'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import om from '@/locales/om.json';
import en from '@/locales/en.json';
import ar from '@/locales/ar.json';
import { Locale } from './types';

type Translations = typeof om;

const translations: Record<Locale, Translations> = {
  om,
  en: en as unknown as Translations,
  ar: ar as unknown as Translations,
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: string, fallback?: string) => string;
  dict: Translations;
  dir: 'ltr' | 'rtl';
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Default language is Afaan Oromoo ('om')
  const [locale, setLocaleState] = useState<Locale>('om');

  useEffect(() => {
    const saved = localStorage.getItem('aalam_media_locale') as Locale;
    if (saved && (saved === 'om' || saved === 'en' || saved === 'ar')) {
      setLocaleState(saved);
      document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = saved;
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'om';
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('aalam_media_locale', newLocale);
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLocale;
  };

  const t = (path: string, fallback?: string): string => {
    const keys = path.split('.');
    let current: any = translations[locale] || translations['om'];

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        // Fallback to Oromoo if missing
        let fallbackCurrent: any = translations['om'];
        for (const fbKey of keys) {
          if (fallbackCurrent && typeof fallbackCurrent === 'object' && fbKey in fallbackCurrent) {
            fallbackCurrent = fallbackCurrent[fbKey];
          } else {
            return fallback || path;
          }
        }
        return typeof fallbackCurrent === 'string' ? fallbackCurrent : fallback || path;
      }
    }

    return typeof current === 'string' ? current : fallback || path;
  };

  const dir: 'ltr' | 'rtl' = locale === 'ar' ? 'rtl' : 'ltr';
  const isRTL = locale === 'ar';

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, dict: translations[locale], dir, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
