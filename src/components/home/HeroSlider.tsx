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
    imageUrl: '/images/founder-misbah.jpg',
    link: '/about'
  },
  {
    id: 2,
    type: 'studio',
    title: 'Aalam Media Studio',
    subtitle: 'Wiirtuu Tamsaasa Oduu, Qophii Podcast fi Sagantaalee Barnoota Ammayyaa',
    badge: 'Aalam Media Production',
    imageUrl: '/images/studio-neon.jpg',
    link: '/gallery'
  },
  {
    id: 3,
    type: 'studio',
    title: 'Aalam Media Broadcasting',
    subtitle: "Sagantaalee Viidiyoo, Da'awaa fi Qorannoo Addunyaa Islaamaa",
    badge: 'Aalam Media Studio',
    imageUrl: '/images/studio-interview-wide.jpg',
    link: '/video'
  },
  {
    id: 4,
    type: 'studio',
    title: 'Aalam Podcast Hub',
    subtitle: 'Marii fi Gaaf-deebii Hayyoota fi Hogganoota Hawaasaa Waliin',
    badge: 'Aalam Media Hub',
    imageUrl: '/images/podcast-studio.jpg',
    link: '/podcast'
  },
  {
    id: 5,
    type: 'studio',
    title: 'Aalam Media Newsroom',
    subtitle: 'Oduu Biyyoolessaa fi Addunyaa Dhugaa fi Qulqullina Olaanaadhaan',
    badge: 'Aalam Media Newsroom',
    imageUrl: '/images/studio-editing.jpg',
    link: '/news'
  }
];

import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const slide = slides[currentSlide];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div 
      className="relative w-full h-[380px] sm:h-[460px] md:h-[520px] overflow-hidden rounded-3xl bg-gray-950 border border-gray-800 shadow-2xl group/slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images with smooth Ken Burns & crossfade */}
      {slides.map((s, idx) => {
        const isActive = idx === currentSlide;
        return (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'}`}
          >
            <img
              src={s.imageUrl}
              alt={s.title}
              className={`w-full h-full object-cover object-[center_20%] brightness-[0.42] transition-transform duration-[6000ms] ease-out ${isActive ? 'scale-105' : 'scale-100'}`}
            />
            {/* Smooth Islamic gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F0D] via-[#0A0F0D]/50 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F0D]/80 via-transparent to-[#0A0F0D]/40"></div>
          </div>
        );
      })}

      {/* Slide Text Overlay with smooth entrance transitions */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-10 md:p-14 max-w-4xl pointer-events-none">
        <div className="space-y-3 pointer-events-auto">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-600/90 text-white shadow-xl backdrop-blur-md transition-all duration-500">
            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
            {slide.badge}
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-lg transition-all duration-700 ease-out transform">
            {slide.title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 font-medium max-w-2xl drop-shadow leading-relaxed transition-all duration-700 ease-out delay-75">
            {slide.subtitle}
          </p>

          <div className="pt-2 flex items-center gap-4">
            <Link
              href={slide.link}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all duration-300 transform hover:-translate-y-1 hover:shadow-emerald-900/50 hover:shadow-xl active:translate-y-0"
            >
              <span>Bal'inaan Ilaali</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Prev / Next Navigation Arrows (smooth hover fade-in) */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-gray-950/70 hover:bg-emerald-600 text-white flex items-center justify-center backdrop-blur-md border border-gray-700 hover:border-emerald-500 opacity-0 group-hover/slider:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover/slider:translate-x-0 shadow-lg cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-gray-950/70 hover:bg-emerald-600 text-white flex items-center justify-center backdrop-blur-md border border-gray-700 hover:border-emerald-500 opacity-0 group-hover/slider:opacity-100 transition-all duration-300 transform translate-x-2 group-hover/slider:translate-x-0 shadow-lg cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Modern Slide Indicators with smooth expansion */}
      <div className="absolute bottom-5 right-6 sm:right-10 z-30 flex items-center gap-2 bg-gray-950/50 px-3 py-1.5 rounded-full backdrop-blur-md border border-gray-800/80">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
              idx === currentSlide
                ? 'w-8 bg-emerald-500 shadow-sm shadow-emerald-500/50'
                : 'w-2 bg-gray-600/80 hover:bg-gray-400'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
