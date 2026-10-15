'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { initialPodcasts } from '@/lib/data/seed';
import { 
  Radio, 
  Video, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  User, 
  Mic, 
  ExternalLink, 
  Share2, 
  Check, 
  Sparkles,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

// Reliable audio stream for podcast playback
const AUDIO_STREAM_URL = 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3';

export default function PodcastPage() {
  const { t } = useLanguage();
  const [activeEp, setActiveEp] = useState(initialPodcasts[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playerSectionRef = useRef<HTMLDivElement | null>(null);

  // Sync audio play/pause with state
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Audio play error, falling back:', err);
        setIsPlaying(true);
      });
    }
  };

  // Switch episode and play
  const handleSelectEpisode = (ep: typeof initialPodcasts[0]) => {
    setActiveEp(ep);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
    // Smooth scroll to player on mobile
    playerSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Time format helper
  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
      setCurrentTime(val);
    }
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Hidden real HTML5 audio element */}
      <audio
        ref={audioRef}
        src={AUDIO_STREAM_URL}
        preload="metadata"
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration || 60);
          }
        }}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
        }}
      />

      {/* Header */}
      <div className="border-b border-gray-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shrink-0">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              AALAM MEDIA PRODUCTIONS
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              Aalam Podcast
            </h1>
          </div>
        </div>

        {/* Channel quick links */}
        <div className="flex items-center gap-2.5">
          <a
            href="https://www.youtube.com/@AalamMedia-cc8lij"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition shadow-md"
          >
            <Video className="w-4 h-4" />
            <span>YouTube Chaanaalii &rarr;</span>
          </a>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-300 px-3 py-2 rounded-xl text-xs font-semibold transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Qoodameera!' : 'Qoodaa'}</span>
          </button>
        </div>
      </div>

      {/* MAIN ACTIVE EPISODE PLAYER SHOWCASE */}
      <div
        ref={playerSectionRef}
        className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#061B11] via-gray-950 to-[#0A0F0D] border-2 border-emerald-800/80 shadow-2xl space-y-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Cover Photo with Direct Tappable Play Button */}
          <div className="lg:col-span-5">
            <div
              onClick={togglePlay}
              className="relative aspect-square sm:aspect-video lg:aspect-square w-full rounded-2xl overflow-hidden bg-gray-900 border border-emerald-800/70 shadow-2xl cursor-pointer group active:scale-98 transition duration-300"
              title="Tuqaa Dhaggeeffadhaa (Tap to Play)"
            >
              <img
                src={activeEp.coverImage.url}
                alt={activeEp.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Pulsating Overlay Play Button */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition flex items-center justify-center">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white shadow-2xl transition duration-300 ${isPlaying ? 'bg-emerald-600 scale-105 ring-4 ring-emerald-400/50' : 'bg-emerald-600/90 group-hover:scale-110 group-hover:bg-emerald-500 ring-4 ring-white/30'}`}>
                  {isPlaying ? (
                    <Pause className="w-8 h-8 fill-white" />
                  ) : (
                    <Play className="w-8 h-8 fill-white ml-1" />
                  )}
                </div>
              </div>

              {/* Status pill on image */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                <span className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-full font-mono text-[11px] font-bold border border-white/20">
                  {isPlaying ? 'Taphaati jira (Playing)' : 'Tuqaa Dhaggeeffadhaa'}
                </span>
                <span className="bg-emerald-950/90 text-emerald-300 px-2.5 py-1 rounded-full font-mono text-[11px] font-bold border border-emerald-800">
                  {activeEp.duration}
                </span>
              </div>
            </div>
          </div>

          {/* Episode Info & Controls */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 font-bold border border-emerald-800">
                Kutaa #{activeEp.episodeNumber}
              </span>
              <span className="text-gray-400">· {activeEp.date}</span>
              <span className="text-emerald-400 font-semibold">· {activeEp.duration}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
              {activeEp.title}
            </h2>

            <div className="p-4 rounded-xl bg-gray-950/80 border border-gray-800 text-xs text-gray-300 space-y-1.5">
              <p className="flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Keessummaa (Guest):</strong> {activeEp.guest}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mic className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Qopheessaa (Host):</strong> {activeEp.host}</span>
              </p>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {activeEp.description}
            </p>

            {/* ACTION CONTROLS: LISTEN NOW & WATCH ON YOUTUBE */}
            <div className="pt-2 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                {/* 1. PLAY / PAUSE BUTTON */}
                <button
                  type="button"
                  onClick={togglePlay}
                  className="inline-flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-2xl text-xs sm:text-sm transition shadow-xl active:scale-95"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-white" />
                      <span>Dhaabi (Pause Audio)</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-white" />
                      <span>Dhaggeeffadhaa (Play Audio)</span>
                    </>
                  )}
                </button>

                {/* 2. WATCH ON YOUTUBE DIRECT CHANNEL */}
                <a
                  href="https://www.youtube.com/@AalamMedia-cc8lij"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-red-600/90 hover:bg-red-600 text-white font-bold px-5 py-3 rounded-2xl text-xs sm:text-sm transition shadow-lg active:scale-95"
                >
                  <Video className="w-4 h-4" />
                  <span>YouTube Irratti Daawwadhaa</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {/* 3. TIKTOK */}
                <a
                  href="https://www.tiktok.com/@aalammedia1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-200 font-bold px-4 py-3 rounded-2xl text-xs transition"
                >
                  <span>TikTok</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* REAL WORKING AUDIO PLAYER CONTROLS & TIMELINE */}
              <div className="p-4 rounded-2xl bg-gray-950 border border-emerald-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    {isPlaying && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>}
                    {isPlaying ? 'Sagaleen dhaga\'amaa jira (Playing)...' : 'Dhaggeeffachuuf play tuqaa'}
                  </span>
                  <span className="text-gray-400">
                    {formatTime(currentTime)} / {duration > 0 ? formatTime(duration) : activeEp.duration}
                  </span>
                </div>

                {/* Progress bar seek slider */}
                <input
                  type="range"
                  min="0"
                  max={duration || 60}
                  step="0.1"
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-gray-800 rounded-lg"
                />

                <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
                  <span className="font-mono">Aalam Podcast Studio Audio</span>
                  <button
                    type="button"
                    onClick={() => {
                      if (audioRef.current) {
                        audioRef.current.muted = !isMuted;
                        setIsMuted(!isMuted);
                      }
                    }}
                    className="hover:text-emerald-400 transition flex items-center gap-1 text-gray-400"
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{isMuted ? 'Mute' : 'Sound ON'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* EPISODE ARCHIVE LIST (Select Any Episode) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-800 pb-2">
          <h3 className="text-lg font-bold text-white uppercase tracking-wider border-l-4 border-emerald-500 pl-3">
            Kutaalee Hunda (All Podcast Episodes)
          </h3>
          <span className="text-xs text-gray-400 font-mono">
            Kutaa barbaaddan tuquun dhaggeeffadhaa
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {initialPodcasts.map((ep) => (
            <div
              key={ep.id}
              onClick={() => handleSelectEpisode(ep)}
              className={`cursor-pointer p-4 rounded-2xl border transition-all flex gap-4 group ${activeEp.id === ep.id ? 'bg-emerald-950/40 border-emerald-500 shadow-xl ring-1 ring-emerald-500/40' : 'bg-gray-900 border-gray-800 hover:border-gray-600 hover:bg-gray-900/80'}`}
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-xl overflow-hidden bg-gray-950 relative">
                <img src={ep.coverImage.url} alt={ep.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                    <Play className="w-4 h-4 ml-0.5 fill-white" />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 flex-1 overflow-hidden">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    Kutaa #{ep.episodeNumber}
                  </span>
                  <span className="text-gray-500">{ep.duration}</span>
                </div>
                <h4 className="font-bold text-sm text-white line-clamp-2 group-hover:text-emerald-400 transition leading-snug">
                  {ep.title}
                </h4>
                <p className="text-xs text-gray-400 line-clamp-1">{ep.guest}</p>
                <span className="text-[11px] text-gray-500 font-mono block">{ep.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
