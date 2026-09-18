'use client';

import React, { useState } from 'react';
import { initialErrorReports } from '@/lib/data/seed';
import { ErrorReport } from '@/lib/types';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AdminErrorsPage() {
  const [reports, setReports] = useState<ErrorReport[]>(initialErrorReports);

  const resolveReport = (id: string) => {
    setReports(reports.map(r => r.id === id ? { ...r, status: 'RESOLVED' } : r));
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="border-b border-gray-800 pb-4">
        <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
          EDITORIAL INTEGRITY & CORRECTIONS
        </span>
        <h1 className="text-2xl font-black text-white">Gabaasa Dogoggoraa (Error Reports)</h1>
        <p className="text-xs text-gray-400 mt-1">
          Gabaasota dubbistootaa "Report an Error / Sirreeffama Gabaasaa" irraa dhufan qorachuu.
        </p>
      </div>

      <div className="space-y-4">
        {reports.map((rep) => (
          <div key={rep.id} className="p-6 rounded-2xl bg-gray-950 border border-gray-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400">
                Barruu: {rep.articleTitle}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${rep.status === 'RESOLVED' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'}`}>
                {rep.status}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-200 bg-gray-900 p-3 rounded-xl border border-gray-800">
              "{rep.details}"
            </p>

            <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
              <span>Ergaa: <strong>{rep.reporterName}</strong> ({rep.reporterEmail})</span>
              {rep.status === 'PENDING' && (
                <button
                  onClick={() => resolveReport(rep.id)}
                  className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                >
                  Sirreeffameera (Mark Resolved)
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
