'use client';

import React, { useState, useEffect } from 'react';
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
  Lock,
  Unlock,
  KeyRound,
  LogOut,
  Eye,
  EyeOff,
  CheckCircle2,
  X,
  AlertCircle,
  BookOpen
} from 'lucide-react';

const DEFAULT_CEO_PASSCODE = 'misbah123abc';
const DEFAULT_EDU_PASSCODE = 'ustaz123';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [currentRole, setCurrentRole] = useState<UserRole>('SUPER_ADMIN');

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [passcodeInput, setPasscodeInput] = useState<string>('');
  const [showPasscode, setShowPasscode] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [eduPasscodeDisplay, setEduPasscodeDisplay] = useState<string>('ustaz123');

  // Change Passcode Modal State
  const [changeModalOpen, setChangeModalOpen] = useState<boolean>(false);
  const [changeTarget, setChangeTarget] = useState<'ceo' | 'education'>('ceo');
  const [oldPasscode, setOldPasscode] = useState<string>('');
  const [newPasscode, setNewPasscode] = useState<string>('');
  const [confirmPasscode, setConfirmPasscode] = useState<string>('');
  const [changeError, setChangeError] = useState<string | null>(null);
  const [changeSuccess, setChangeSuccess] = useState<string | null>(null);
  const [isChanging, setIsChanging] = useState<boolean>(false);

  // Check existing session on load
  useEffect(() => {
    try {
      const authSession = sessionStorage.getItem('aalam_admin_authenticated');
      const savedRole = sessionStorage.getItem('aalam_admin_role') as UserRole;
      if (authSession === 'true') {
        setIsAuthenticated(true);
        if (savedRole) {
          setCurrentRole(savedRole);
        }
      }
    } catch (e) {}
    setIsInitializing(false);

    // Sync current active passcodes from server
    fetch('/api/auth/passcode')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.ceoPasscode) {
          localStorage.setItem('aalam_admin_passcode', data.ceoPasscode);
        }
        if (data?.educationPasscode) {
          localStorage.setItem('aalam_edu_passcode', data.educationPasscode);
          setEduPasscodeDisplay(data.educationPasscode);
        }
      })
      .catch(() => {});
  }, []);

  const isEduAdmin = currentRole === 'ISLAMIC_EDUCATION_ADMIN';

  // Guard: Redirect Islamic Education Admin away from other admin routes
  useEffect(() => {
    if (isAuthenticated && isEduAdmin && pathname !== '/admin/education') {
      window.location.href = '/admin/education';
    }
  }, [isAuthenticated, isEduAdmin, pathname]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAuthError(null);

    const entered = passcodeInput.trim();
    const localCeoPass = localStorage.getItem('aalam_admin_passcode') || DEFAULT_CEO_PASSCODE;
    const localEduPass = localStorage.getItem('aalam_edu_passcode') || DEFAULT_EDU_PASSCODE;

    // 1. Quick local check
    if (entered === localCeoPass || entered === DEFAULT_CEO_PASSCODE) {
      sessionStorage.setItem('aalam_admin_authenticated', 'true');
      sessionStorage.setItem('aalam_admin_role', 'SUPER_ADMIN');
      setCurrentRole('SUPER_ADMIN');
      setIsAuthenticated(true);
      setIsSubmitting(false);
      setPasscodeInput('');
      return;
    }

    if (entered === localEduPass || entered === DEFAULT_EDU_PASSCODE) {
      sessionStorage.setItem('aalam_admin_authenticated', 'true');
      sessionStorage.setItem('aalam_admin_role', 'ISLAMIC_EDUCATION_ADMIN');
      setCurrentRole('ISLAMIC_EDUCATION_ADMIN');
      setIsAuthenticated(true);
      setIsSubmitting(false);
      setPasscodeInput('');
      if (pathname !== '/admin/education') {
        window.location.href = '/admin/education';
      }
      return;
    }

    // 2. Server API verification fallback
    try {
      const res = await fetch('/api/auth/passcode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify', passcode: entered })
      });
      const data = await res.json();

      if (data.success) {
        sessionStorage.setItem('aalam_admin_authenticated', 'true');
        sessionStorage.setItem('aalam_admin_role', data.role);
        setCurrentRole(data.role);
        setIsAuthenticated(true);
        setPasscodeInput('');
        if (data.role === 'ISLAMIC_EDUCATION_ADMIN' && pathname !== '/admin/education') {
          window.location.href = '/admin/education';
        }
      } else {
        setAuthError(data.error || 'Koodiin iccitii dogoggora! Irra deebi\'aa yaalaa.');
      }
    } catch (err) {
      setAuthError('Koodiin iccitii dogoggora! Irra deebi\'aa yaalaa.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('aalam_admin_authenticated');
    sessionStorage.removeItem('aalam_admin_role');
    setIsAuthenticated(false);
    setPasscodeInput('');
    setAuthError(null);
  };

  const handleChangePasscodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangeError(null);
    setChangeSuccess(null);

    if (newPasscode.trim().length < 4) {
      setChangeError('Koodiin haaraa yoo xiqqaate qubee/lakkoofsa 4 ta\'uu qaba.');
      return;
    }

    if (newPasscode !== confirmPasscode) {
      setChangeError('Koodiin haaraa fi koodiin mirkaneessaa wal hin fakkaatan!');
      return;
    }

    setIsChanging(true);
    const target = isEduAdmin ? 'education' : changeTarget;

    try {
      const res = await fetch('/api/auth/passcode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'change',
          target,
          currentPasscode: oldPasscode,
          newPasscode: newPasscode.trim()
        })
      });
      const data = await res.json();

      if (data.success) {
        if (target === 'education') {
          localStorage.setItem('aalam_edu_passcode', newPasscode.trim());
          setEduPasscodeDisplay(newPasscode.trim());
          setChangeSuccess('Koodiin iccitii Barnoota Islaamaa milkaa\'inaan jijjiirameera!');
        } else {
          localStorage.setItem('aalam_admin_passcode', newPasscode.trim());
          setChangeSuccess('Koodiin iccitii CEO milkaa\'inaan jijjiirameera!');
        }
        setOldPasscode('');
        setNewPasscode('');
        setConfirmPasscode('');
        setTimeout(() => {
          setChangeModalOpen(false);
          setChangeSuccess(null);
        }, 2200);
      } else {
        setChangeError(data.error || 'Jijjiiruu hin dandeenye. Koodii ammaa mirkaneeffadhaa.');
      }
    } catch (err) {
      // Local fallback
      if (target === 'education') {
        localStorage.setItem('aalam_edu_passcode', newPasscode.trim());
        setEduPasscodeDisplay(newPasscode.trim());
        setChangeSuccess('Koodiin iccitii Barnoota Islaamaa jijjiirameera!');
      } else {
        localStorage.setItem('aalam_admin_passcode', newPasscode.trim());
        setChangeSuccess('Koodiin iccitii CEO jijjiirameera!');
      }
      setTimeout(() => {
        setChangeModalOpen(false);
        setChangeSuccess(null);
      }, 2200);
    } finally {
      setIsChanging(false);
    }
  };

  const navItems = isEduAdmin
    ? [
        { label: 'Barnoota Islaamaa (Islamic Education)', href: '/admin/education', icon: BookOpen }
      ]
    : [
        { label: 'Overview', href: '/admin', icon: LayoutDashboard },
        { label: 'Articles & Workflow', href: '/admin/articles', icon: FileText },
        { label: 'Breaking Ticker', href: '/admin/breaking', icon: Flame },
        { label: 'Media Uploads', href: '/admin/media', icon: UploadCloud },
        { label: 'Barnoota Islaamaa', href: '/admin/education', icon: BookOpen },
        { label: 'Members', href: '/admin/members', icon: Users },
        { label: 'Advertisements', href: '/admin/ads', icon: Megaphone },
        { label: 'Error Reports', href: '/admin/errors', icon: AlertTriangle },
        { label: 'Newsletter', href: '/admin/newsletter', icon: Mail }
      ];

  // Prevent flicker during initial load
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-[#070C09] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  // 1. LOCKED / PASSCODE GATE SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070C09] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-md space-y-6 relative z-10">
          {/* Logo & Portal Branding */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gray-950 border border-emerald-600/60 p-2 shadow-2xl mx-auto ring-4 ring-emerald-950/60">
              <img src="/brand/logo.png" alt="Aalam Media" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">
                SECURITY ACCESS GATEWAY
              </span>
              <h1 className="text-2xl font-black text-white mt-1">
                Wiirtuu Bulchiinsa Aalam Media
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Koodii iccitii CEO yookiin koodii Barnoota Islaamaa galchaa.
              </p>
            </div>
          </div>

          {/* Passcode Box */}
          <div className="p-8 rounded-3xl bg-gray-950 border border-gray-800 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800 text-xs text-gray-300 font-mono">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>Seensa Eegumsa Qabu</span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-900">
                Multi-Role
              </span>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs font-medium flex items-center gap-2 animate-fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">
                  Koodii Iccitii (Passcode)
                </label>
                <div className="relative">
                  <input
                    type={showPasscode ? 'text' : 'password'}
                    required
                    autoFocus
                    value={passcodeInput}
                    onChange={(e) => {
                      setPasscodeInput(e.target.value);
                      if (authError) setAuthError(null);
                    }}
                    placeholder="Koodii iccitii galchaa..."
                    className="w-full bg-gray-900 border border-gray-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none transition pr-10 font-mono tracking-wider"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasscode(!showPasscode)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                    title={showPasscode ? 'Dhoksi' : 'Mul\'isi'}
                  >
                    {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="flex items-center justify-between mt-2 text-[10px] text-gray-500">
                  <span>CEO: misbah123abc</span>
                  <span>Ustaz: ustaz123</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 rounded-xl text-xs sm:text-sm transition shadow-lg flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
              >
                <Unlock className="w-4 h-4" />
                <span>{isSubmitting ? 'Mirkanaa\'aa jira...' : 'Galmaa\'i (Unlock Dashboard)'}</span>
              </button>
            </form>
          </div>

          {/* Back to Home Link */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-emerald-400 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Gara Fuula Duraatti Deebi'i (Back to Main Website)</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED ADMIN NEWSROOM
  return (
    <div className="min-h-screen bg-[#070C09] text-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-950 border-r border-gray-800 p-4 space-y-6 shrink-0 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Brand header */}
          <div className="space-y-2">
            <Link href="/" className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Gara Fuula Duraatti (View Site)</span>
            </Link>
            <div className="flex items-center gap-2.5 pt-2">
              <img src="/brand/logo.png" alt="Aalam Media" className="w-8 h-8 object-contain" />
              <div>
                <h2 className="text-sm font-black text-white font-display">
                  {isEduAdmin ? 'BARNOOTA ISLAAMAA' : 'AALAM NEWSROOM'}
                </h2>
                <span className="text-[10px] text-emerald-400 font-mono">
                  {isEduAdmin ? 'Ustaz Portal v1.0' : 'Central Control v1.0'}
                </span>
              </div>
            </div>
          </div>

          {/* User Role Presentation */}
          {isEduAdmin ? (
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Bulchiinsa Barnoota Islaamaa</span>
              </div>
              <p className="text-[11px] text-gray-400 leading-tight">
                Kutaa Barnoota Islaamaa (Fiqhii, Qur'aana, Hadiisa) qofa to'attu.
              </p>
            </div>
          ) : (
            <>
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
                  <option value="SUPER_ADMIN">Super Admin (Misbah Sheikh Husein)</option>
                  <option value="CEO_OWNER">CEO / Owner</option>
                  <option value="EDITOR_IN_CHIEF">Editor-in-Chief</option>
                  <option value="EDITOR">Editor</option>
                  <option value="REPORTER">Reporter</option>
                  <option value="PHOTOGRAPHER_MEDIA">Photographer / Media</option>
                  <option value="MEMBERSHIP_MANAGER">Membership Manager</option>
                  <option value="ADVERTISEMENT_MANAGER">Advertisement Manager</option>
                </select>
              </div>

              {/* CEO: Ustaz Education Passcode Card */}
              <div className="p-3 rounded-xl bg-gray-900/80 border border-emerald-900/50 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-medium flex items-center gap-1 text-[11px]">
                    <KeyRound className="w-3 h-3 text-emerald-400" />
                    Koodii Ustaz:
                  </span>
                  <span className="font-mono text-emerald-400 font-bold text-xs bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    {eduPasscodeDisplay}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 leading-tight">
                  Koodii kana Ustaz/Barsiisaatti kennaa. Barnoota Islaamaa qofa to'ata.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setChangeTarget('education');
                    setChangeModalOpen(true);
                    setChangeError(null);
                    setChangeSuccess(null);
                  }}
                  className="w-full text-center text-[10px] text-emerald-400 hover:text-emerald-300 font-bold pt-1 underline"
                >
                  Koodii Ustaz Jijjiiri
                </button>
              </div>
            </>
          )}

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
        </div>

        {/* Security / Passcode / Logout Footer */}
        <div className="pt-4 border-t border-gray-800/80 space-y-2">
          {/* Change Passcode Button */}
          <button
            type="button"
            onClick={() => {
              setChangeTarget(isEduAdmin ? 'education' : 'ceo');
              setChangeModalOpen(true);
              setChangeError(null);
              setChangeSuccess(null);
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-emerald-400 text-xs font-medium border border-gray-800 transition"
          >
            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-emerald-400" />
              <span>{isEduAdmin ? 'Koodii Ustaz Jijjiiri' : 'Koodii Jijjiiri'}</span>
            </div>
            <span className="text-[10px] font-mono text-gray-500">Edit</span>
          </button>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-950 hover:bg-red-950/60 text-gray-400 hover:text-red-300 text-xs font-medium border border-gray-800 hover:border-red-800 transition"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            <span>Cufii Ba'i (Lock & Exit)</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto">
        {/* Mobile/Header Top Utility Bar */}
        <div className="md:hidden flex items-center justify-between pb-4 mb-6 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-bold text-white">
              {isEduAdmin ? 'Ustaz Session Active' : 'Admin Session Active'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setChangeTarget(isEduAdmin ? 'education' : 'ceo');
                setChangeModalOpen(true);
              }}
              className="p-1.5 rounded-lg bg-gray-900 text-emerald-400 border border-gray-800 text-xs"
              title="Koodii Jijjiiri"
            >
              <KeyRound className="w-4 h-4" />
            </button>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg bg-gray-900 text-red-400 border border-gray-800 text-xs"
              title="Cufii Ba'i"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Access Protection Banner for Restricted Roles */}
        {isEduAdmin && pathname !== '/admin/education' ? (
          <div className="p-8 rounded-3xl bg-gray-950 border border-red-900/60 text-center space-y-4">
            <AlertCircle className="w-10 h-10 text-red-400 mx-auto" />
            <h2 className="text-xl font-bold text-white">Hayyama Hin Qabdani (Access Restricted)</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto">
              Akka Ustaza Barnoota Islaamaatti, kutaa kana seenuuf hayyama hin qabdani. 
              Gara kutaa Barnoota Islaamaatti deebi'aa.
            </p>
            <Link
              href="/admin/education"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
            >
              <BookOpen className="w-4 h-4" />
              <span>Gara Barnoota Islaamaatti Deebi'i</span>
            </Link>
          </div>
        ) : (
          children
        )}
      </main>

      {/* CHANGE PASSCODE MODAL */}
      {changeModalOpen && (
        <div 
          onClick={() => setChangeModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-950 border border-gray-800 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-600/20 border border-emerald-600/40 flex items-center justify-center text-emerald-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {isEduAdmin 
                      ? 'Koodii Barnoota Islaamaa Jijjiiri' 
                      : changeTarget === 'education'
                      ? 'Koodii Ustaz Jijjiiri'
                      : 'Koodii CEO Jijjiiri'}
                  </h3>
                  <span className="text-[10px] text-gray-400 font-mono">
                    {isEduAdmin || changeTarget === 'education' ? 'Ustaz Passcode' : 'CEO Master Passcode'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setChangeModalOpen(false)}
                className="p-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Target Tab Switcher for CEO */}
            {!isEduAdmin && (
              <div className="grid grid-cols-2 gap-1 p-1 bg-gray-900 border border-gray-800 rounded-xl text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setChangeTarget('ceo');
                    setChangeError(null);
                    setChangeSuccess(null);
                  }}
                  className={`py-1.5 rounded-lg font-bold transition ${changeTarget === 'ceo' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  Koodii CEO (Master)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setChangeTarget('education');
                    setChangeError(null);
                    setChangeSuccess(null);
                  }}
                  className={`py-1.5 rounded-lg font-bold transition ${changeTarget === 'education' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  Koodii Ustaz (Education)
                </button>
              </div>
            )}

            {changeError && (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{changeError}</span>
              </div>
            )}

            {changeSuccess && (
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{changeSuccess}</span>
              </div>
            )}

            <form onSubmit={handleChangePasscodeSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  {changeTarget === 'education' && !isEduAdmin
                    ? 'Koodii CEO yookiin Koodii Ustaz Ammaa'
                    : 'Koodii Ammaa (Current Passcode)'}
                </label>
                <input
                  type="password"
                  required
                  value={oldPasscode}
                  onChange={(e) => setOldPasscode(e.target.value)}
                  placeholder="Koodii yeroo ammaa..."
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  Koodii Haaraa (New Passcode)
                </label>
                <input
                  type="password"
                  required
                  value={newPasscode}
                  onChange={(e) => setNewPasscode(e.target.value)}
                  placeholder="Koodii haaraa barreessaa..."
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  Koodii Haaraa Mirkaneessi (Confirm New Passcode)
                </label>
                <input
                  type="password"
                  required
                  value={confirmPasscode}
                  onChange={(e) => setConfirmPasscode(e.target.value)}
                  placeholder="Koodii haaraa irra deebi'aa..."
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setChangeModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 text-xs font-bold"
                >
                  Dhiisi (Cancel)
                </button>
                <button
                  type="submit"
                  disabled={isChanging}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow disabled:opacity-50 flex items-center gap-1.5"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>{isChanging ? 'Jijjiiramaa jira...' : 'Koodii Ol Kaa\'i (Save Passcode)'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
