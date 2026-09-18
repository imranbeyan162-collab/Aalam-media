'use client';

import React, { useState } from 'react';
import { Mail, Download, Send } from 'lucide-react';

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState([
    { id: '1', email: 'reader1@example.com', date: '2026-09-14' },
    { id: '2', email: 'member@aalammedia.com', date: '2026-09-15' },
    { id: '3', email: 'info@imako.com', date: '2026-09-15' }
  ]);

  const exportCSV = () => {
    const csv = 'Email,Subscription Date\n' + subscribers.map(s => `"${s.email}","${s.date}"`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aalam-newsletter-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
            AUDIENCE ENGAGEMENT
          </span>
          <h1 className="text-2xl font-black text-white">Galmee Newsletter (Subscribers)</h1>
        </div>

        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="rounded-2xl bg-gray-950 border border-gray-800 p-4 space-y-3">
        <h3 className="text-xs font-bold uppercase text-gray-400">Teessoo Imeelii Galmaa'an ({subscribers.length})</h3>
        <div className="divide-y divide-gray-800">
          {subscribers.map((s) => (
            <div key={s.id} className="py-2.5 flex items-center justify-between text-xs font-mono">
              <span className="text-white">{s.email}</span>
              <span className="text-gray-500">{s.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
