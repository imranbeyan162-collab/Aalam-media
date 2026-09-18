'use client';

import React, { useState } from 'react';
import { initialBreakingNews } from '@/lib/data/seed';
import { Flame, Check, Plus, Trash2 } from 'lucide-react';

export default function AdminBreakingPage() {
  const [tickerActive, setTickerActive] = useState(true);
  const [items, setItems] = useState(initialBreakingNews);
  const [newHeadline, setNewHeadline] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newHeadline.trim()) {
      setItems([
        ...items,
        {
          id: Date.now().toString(),
          text: newHeadline,
          link: '/news',
          active: true
        }
      ]);
      setNewHeadline('');
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div className="border-b border-gray-800 pb-4 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
            BREAKING TICKER CONTROLLER
          </span>
          <h1 className="text-2xl font-black text-white">Oduu Ariifachiisaa (Breaking Ticker)</h1>
        </div>

        {/* Big ON/OFF Switch */}
        <div className="flex items-center gap-3 bg-gray-900 border border-gray-800 p-2 rounded-2xl">
          <span className="text-xs font-bold text-gray-300">Ticker Strip:</span>
          <button
            onClick={() => setTickerActive(!tickerActive)}
            className={`px-4 py-1.5 rounded-xl text-xs font-black transition ${tickerActive ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-500'}`}
          >
            {tickerActive ? 'ON (ACTIVE)' : 'OFF (DISABLED)'}
          </button>
        </div>
      </div>

      {/* Add New Ticker Headline */}
      <form onSubmit={handleAdd} className="p-6 rounded-2xl bg-gray-950 border border-gray-800 flex gap-3">
        <input
          type="text"
          required
          value={newHeadline}
          onChange={(e) => setNewHeadline(e.target.value)}
          placeholder="Mata-duree oduu ariifachiisaa haaraa galchaa..."
          className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-red-500"
        />
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-5 py-2 rounded-xl transition flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          <span>Dabali</span>
        </button>
      </form>

      {/* Active Headlines List */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Oduu Ariifachiisaa Tamsaasa Irra Jiran ({items.length})
        </h3>
        {items.map((item) => (
          <div key={item.id} className="p-4 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-xs font-medium text-white">{item.text}</span>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="p-1.5 text-gray-400 hover:text-red-400 transition"
              title="Haqi"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
