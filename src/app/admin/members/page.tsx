'use client';

import React, { useState } from 'react';
import { initialMembers } from '@/lib/data/seed';
import { MemberRecord } from '@/lib/types';
import { Users, Download, Search, Check, X, Shield } from 'lucide-react';

export default function AdminMembersPage() {
  const [members, setMembers] = useState<MemberRecord[]>(initialMembers);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');

  const filtered = members.filter(m => {
    const matchesSearch = !searchQuery || 
      m.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
      m.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'ALL' || m.membershipType === typeFilter;
    return matchesSearch && matchesType;
  });

  const updateStatus = (id: string, newStatus: 'ACTIVE' | 'PENDING' | 'REJECTED') => {
    setMembers(members.map(m => m.id === id ? { ...m, status: newStatus } : m));
  };

  const exportCSV = () => {
    const headers = 'ID,Full Name,Email,Phone,City,Country,Preferred Language,Membership Type,Area of Interest,Status,Created At\n';
    const rows = members.map(m => 
      `"${m.id}","${m.fullName}","${m.email}","${m.phone}","${m.city}","${m.country}","${m.preferredLanguage}","${m.membershipType}","${m.areaOfInterest}","${m.status}","${m.createdAt}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aalam-media-members-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
            COMMUNITY & MEMBERSHIP SYSTEM
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">To'annoo Miseensotaa (Members)</h1>
          <p className="text-xs text-gray-400 mt-1">Miseensota ilaaluu, barbaaduu, mirkaneessuu, fi CSV dhaan baasuu.</p>
        </div>

        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition shadow-lg"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV (Galmee Baasi)</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Maqaa, imeelii, ykn magaalaadhaan barbaadaa..."
            className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
        >
          <option value="ALL">Gosa Hunda (All Tiers)</option>
          <option value="Regular Member">Regular Member</option>
          <option value="Volunteer">Volunteer</option>
          <option value="Media Contributor">Media Contributor</option>
          <option value="Supporting Member">Supporting Member</option>
          <option value="Professional Member">Professional Member</option>
        </select>
      </div>

      {/* Members Table */}
      <div className="rounded-2xl bg-gray-950 border border-gray-800 overflow-hidden">
        <table className="w-full text-left text-xs text-gray-300">
          <thead className="bg-gray-900 text-gray-400 uppercase font-mono text-[10px]">
            <tr>
              <th className="p-3.5">Maqaa Guutuu</th>
              <th className="p-3.5">Qunnamtii</th>
              <th className="p-3.5">Magaalaa</th>
              <th className="p-3.5">Gosa Miseensummaa</th>
              <th className="p-3.5">Haala</th>
              <th className="p-3.5 text-right">Tarkaanfii</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filtered.map((m) => (
              <tr key={m.id} className="hover:bg-gray-900/60 transition">
                <td className="p-3.5 font-bold text-white">{m.fullName}</td>
                <td className="p-3.5 font-mono text-[11px]">
                  <div>{m.email}</div>
                  <div className="text-gray-500">{m.phone}</div>
                </td>
                <td className="p-3.5">{m.city}, {m.country}</td>
                <td className="p-3.5 font-mono text-emerald-400">{m.membershipType}</td>
                <td className="p-3.5">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                    m.status === 'ACTIVE' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                    m.status === 'PENDING' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                    'bg-red-950 text-red-400 border border-red-800'
                  }`}>
                    {m.status}
                  </span>
                </td>
                <td className="p-3.5 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    {m.status !== 'ACTIVE' && (
                      <button
                        onClick={() => updateStatus(m.id, 'ACTIVE')}
                        className="px-2 py-1 rounded bg-emerald-700 hover:bg-emerald-600 text-white text-[11px] font-bold"
                      >
                        Approve
                      </button>
                    )}
                    {m.status !== 'REJECTED' && (
                      <button
                        onClick={() => updateStatus(m.id, 'REJECTED')}
                        className="px-2 py-1 rounded bg-gray-800 hover:bg-red-900 text-gray-300 hover:text-white text-[11px]"
                      >
                        Reject
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
