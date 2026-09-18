'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3">
        <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
          GET IN TOUCH
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white">Nu Qunnamaa (Contact Us)</h1>
        <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
          Yaada, gaaffii, beeksisa, fi gumaacha qabdaniif kallattiin nu qunnamaa.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Contact info */}
        <div className="md:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-gray-950 border border-gray-800 space-y-3">
            <h3 className="text-base font-bold text-white border-l-4 border-emerald-500 pl-2">
              Teessoo Wiirtuu
            </h3>
            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Bakka:</strong>
                  <span>Adaamaa, Oromiyaa, Itoophiyaa</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Bilbila:</strong>
                  <span className="font-mono">0915636302 / 0712025283</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Imeelii:</strong>
                  <span className="font-mono">misbahsheikhhusein@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="md:col-span-7">
          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-700 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">Galatoomaa! Ergaan Keessan Qaqqabeera.</h3>
              <p className="text-xs text-gray-300">Gareen qunnamtii Aalam Media battalatti deebii isiniif kenna.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="p-6 rounded-2xl bg-gray-950 border border-gray-800 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Maqaa Guutuu *</label>
                  <input type="text" required className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Imeelii *</label>
                  <input type="email" required className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Dhimma / Subject</label>
                <input type="text" required className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Ergaa Keessan *</label>
                <textarea rows={4} required className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"></textarea>
              </div>

              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition">
                <Send className="w-4 h-4" />
                <span>Ergaa Ergaa</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
