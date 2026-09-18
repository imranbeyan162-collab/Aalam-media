import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Aalam Media — Addunyaa Islaamummaan Miidhagde',
  description: 'The official news and Islamic education media platform of Aalam Media, based in Adama, Oromia, Ethiopia. Founded by Misbah Sheikh Husein.',
  keywords: ['Aalam Media', 'Oromia News', 'Islamic Media', 'Adama', 'Afaan Oromoo', 'Ulamaa', 'Barnoota Islaamaa'],
  openGraph: {
    title: 'Aalam Media — Official News & Educational Platform',
    description: 'Addunyaa Islaamummaan Miidhagde. Independent journalism and comprehensive Islamic knowledge.',
    url: 'https://aalammedia.com',
    siteName: 'Aalam Media',
    images: [{ url: '/brand/logo.svg', width: 800, height: 800, alt: 'Aalam Media' }],
    locale: 'om_ET',
    type: 'website'
  },
  icons: {
    icon: '/brand/logo.svg',
    apple: '/brand/logo.svg'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="om" dir="ltr">
      <body className="min-h-screen bg-[#0A0F0D] text-gray-100 flex flex-col antialiased selection:bg-emerald-600 selection:text-white">
        <LanguageProvider>
          <Header />
          <main className="flex-1 w-full">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
