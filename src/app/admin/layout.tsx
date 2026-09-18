'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserRole } from '@/lib/types';
import { 
  LayoutDashboard, 
  FileText, 
  Flame, 
  UploadCloud, 
  Users, 
  Megaphone, 
  AlertTriangle, 
  Mail, 
  Settings, 
  Shield, 
  ArrowLeft,
  ChevronDown
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [currentRole, setCurrentRole] = useState<UserRole>('EDITOR_IN_CHIEF');

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Articles & Workflow', href: '/admin/articles', icon: FileText },
    { label: 'Breaking Ticker', href: '/admin/breaking', icon: Flame },
    { label: 'Media Uploads', href: '/admin/media', icon: UploadCloud },
    { label: 'Members', href: '/admin/members', icon: Users },
    { label: 'Advertisements', href: '/admin/ads', icon: Megaphone },
    { label: 'Error Reports', href: '/admin/errors', icon: AlertTriangle },
    { label: 'Newsletter', href: '/admin/newsletter', icon: Mail }
  ];

  return (
    <div className="min-h-screen bg-[#070C09] text-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-950 border-r border-gray-800 p-4 space-y-6 shrink-0">
        {/* Brand header */}
        <div className="space-y-2">
          <Link href="/" className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Gara Fuula Duraatti (View Site)</span>
          </Link>
          <div className="flex items-center gap-2.5 pt-2">
            <img src="/brand/logo.svg" alt="Aalam Media" className="w-8 h-8" />
            <div>
              <h2 className="text-sm font-black text-white font-display">AALAM NEWSROOM</h2>
              <span className="text-[10px] text-emerald-400 font-mono">Central Control v1.0</span>
            </div>
          </div>
        </div>

        {/* User Role Switcher (Simulating Granular Admin Permissions per Section 15) */}
        <div className="p-3 rounded-xl bg-gray-900 border border-gray-800 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
            <Shield className="w-3.5 h-3.5" />
            <span>Gahee Hojii (Active Role)</span>
          </div>
          <select
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value as UserRole)}
            className="w-full bg-gray-950 border border-gray-700 text-white rounded-lg p-1.5 text-xs font-mono focus:outline-none focus:border-emerald-500"
          >
            <option value="SUPER_ADMIN">Super Admin (Full Control)</option>
            <option value="CEO_OWNER">CEO / Owner (Oversight)</option>
            <option value="EDITOR_IN_CHIEF">Editor-in-Chief (Publish)</option>
            <option value="EDITOR">Editor (Review/Correct)</option>
            <option value="REPORTER">Reporter (Draft & Submit)</option>
            <option value="PHOTOGRAPHER_MEDIA">Photographer / Media</option>
            <option value="MEMBERSHIP_MANAGER">Membership Manager</option>
            <option value="ADVERTISEMENT_MANAGER">Advertisement Manager</option>
            <option value="ANALYST">Analyst (Metrics Only)</option>
          </select>
        </div>

        {/* Nav Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition ${isActive ? 'bg-emerald-600 text-white font-bold shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-900'}`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
