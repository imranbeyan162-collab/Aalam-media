'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Slide {
  id: number;
  type: 'founder' | 'studio';
  title: string;
  subtitle: string;
  badge: string;
  imageUrl: string;
  link: string;
}

const slides: Slide[] = [
  {
    id: 1,
    type: 'founder',
    title: 'Misbah Sheikh Husein',
    subtitle: 'CEO & Founder — Aalam Media | "Addunyaa Islaamummaan Miidhagde."',
    badge: 'Hundeeffamaa & Hoggannaa',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&auto=format&fit=crop&q=80',
    link: '/about'
  },
  {
    id: 2,
    type: 'studio',
    title: 'Aalam Media Studio',
    subtitle: 'Wiirtuu Tamsaasa Oduu, Qophii Podcast fi Sagantaalee Barnoota Ammayyaa',
    badge: 'Aalam Media Production',
    imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1600&auto=format&fit=crop&q=80',
    link: '/gallery'
  },
  {
    id: 3,
    type: 'studio',
    title: 'Aalam Media Broadcasting',
    subtitle: "Sagantaalee Viidiyoo, Da'awaa fi Qorannoo Addunyaa Islaamaa",
    badge: 'Aalam Media Studio',
    imageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1600&auto=format&fit=crop&q=80',
    link: '/video'
  },
  {
    id: 4,
    type: 'studio',
    title: 'Aalam Podcast Hub',
    subtitle: 'Marii fi Gaaf-deebii Hayyoota fi Hogganoota Hawaasaa Waliin',
    badge: 'Aalam Media Hub',
    imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1600&auto=format&fit=crop&q=80',
    link: '/podcast'
  },
  {
    id: 5,
    type: 'studio',
    title: 'Aalam Media Newsroom',
    subtitle: 'Oduu Biyyoolessaa fi Addunyaa Dhugaa fi Qulqullina Olaanaadhaan',
    badge: 'Aalam Media Newsroom',
    imageUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1600&auto=format&fit=crop&q=80',
    link: '/news'
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // 4 seconds per slide as mandated in Section 5
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div className="relative w-full h-[360px] sm:h-[440px] md:h-[500px] overflow-hidden rounded-2xl bg-gray-950 border border-gray-800 shadow-2xl">
      {/* Background Image with smooth transitions */}
      {slides.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <img
            src={s.imageUrl}
            alt={s.title}
            className="w-full h-full object-cover brightness-[0.45] scale-105 transition duration-1000"
          />
          {/* Subtle Islamic pattern and gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F0D] via-black/40 to-transparent"></div>
        </div>
      ))}

      {/* Slide Text Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-10 md:p-14 max-w-4xl">
        <div className="space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-600/90 text-white shadow-lg backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
            {slide.badge}
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
            {slide.title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 font-medium max-w-2xl drop-shadow">
            {slide.subtitle}
          </p>

          <div className="pt-2 flex items-center gap-3">
            <Link
              href={slide.link}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition transform hover:-translate-y-0.5 shadow-lg"
            >
              Bal'inaan Ilaali &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 right-6 z-20 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-8 bg-emerald-500' : 'w-2 bg-gray-600 hover:bg-gray-400'}`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
