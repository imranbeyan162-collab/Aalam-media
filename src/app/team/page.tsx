'use client';

import React from 'react';
import ImageSlot from '@/components/ui/ImageSlot';

export default function TeamPage() {
  const team = [
    {
      name: 'Misbah Sheikh Husein',
      role: 'CEO & Founder',
      bio: 'Hundeeffamaa fi hoggansa waliigalaa Aalam Media.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80'
    },
    {
      name: 'Ustaz Ahmed Nur',
      role: 'Editor-in-Chief & Islamic Affairs',
      bio: 'Gulaalaa Olaanaa fi qindeessaa qophiilee barnoota Islaamaa.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80'
    },
    {
      name: 'Hamza Abdurazak',
      role: 'Head of Media & Production',
      bio: 'Hoggannaa waraabbii viidiyoo, istaadiyoo fi tamsaasa ammayyaa.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80'
    },
    {
      name: 'Sumayya Mohammed',
      role: 'Community & Digital Lead',
      bio: 'Hoggantuu qunnamtii hawaasummaa fi tajaajila miseensotaa.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3">
        <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
          AALAM NEWSROOM LEADERSHIP
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white">Garee Keenya (Our Team)</h1>
        <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
          Gaazexeessitoota, gulaaltota, fi ogeessota teeknooloojii Aalam Media keessatti tattaaffii taasisan.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {team.map((m, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-gray-900 border border-gray-800 text-center space-y-3 hover:border-emerald-600 transition">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-emerald-500">
              <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{m.name}</h3>
              <p className="text-xs text-emerald-400 font-medium">{m.role}</p>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">{m.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
