'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  UploadCloud, 
  Video, 
  Radio, 
  Image as ImageIcon, 
  Check, 
  Trash2, 
  Eye, 
  Copy, 
  FileCheck, 
  Plus, 
  X,
  AlertTriangle,
  Play,
  Globe,
  ExternalLink,
  Edit3,
  FileText
} from 'lucide-react';
import { MediaItem } from '@/lib/types';

export default function AdminMediaUploadPage() {
  const [mediaType, setMediaType] = useState<'image' | 'video' | 'audio'>('image');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileSizeText, setFileSizeText] = useState<string>('');
  const [uploadedList, setUploadedList] = useState<MediaItem[]>([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [previewModalItem, setPreviewModalItem] = useState<MediaItem | null>(null);

  // Edit Description & Title Modal State
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load from localStorage & sync with server on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('aalam_media_uploads');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setUploadedList(parsed);
        }
      }
    } catch (e) {
      console.warn('Could not read saved media from localStorage', e);
    }

    fetch('/api/media')
      .then(res => res.ok ? res.json() : [])
      .then((data: MediaItem[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setUploadedList(prev => {
            const map = new Map<string, MediaItem>();
            data.forEach(item => map.set(item.id, item));
            prev.forEach(item => {
              if (!map.has(item.id)) map.set(item.id, item);
            });
            const merged = Array.from(map.values());
            try {
              localStorage.setItem('aalam_media_uploads', JSON.stringify(merged));
            } catch (e) {}
            return merged;
          });
        }
      })
      .catch(() => {});
  }, []);

  const saveToStorage = (newList: MediaItem[]) => {
    setUploadedList(newList);
    try {
      localStorage.setItem('aalam_media_uploads', JSON.stringify(newList));
    } catch (e) {
      console.warn('Could not persist to localStorage', e);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
    setFileSizeText(formatBytes(file.size));
    
    // Auto-fill title with clean file name if title is empty
    if (!title.trim()) {
      const cleanName = file.name.replace(/\.[^/.]+$/, '');
      setTitle(cleanName);
    }

    // Auto-detect media type
    if (file.type.startsWith('image/')) {
      setMediaType('image');
    } else if (file.type.startsWith('video/')) {
      setMediaType('video');
    } else if (file.type.startsWith('audio/')) {
      setMediaType('audio');
    }

    // Generate preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setFilePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleNativeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newItem: MediaItem = {
      id: 'media-' + Date.now(),
      title: title.trim(),
      description: description.trim(),
      fileName: selectedFile?.name || `${title.toLowerCase().replace(/\s+/g, '-')}.${mediaType === 'image' ? 'jpg' : mediaType === 'video' ? 'mp4' : 'mp3'}`,
      type: mediaType,
      size: fileSizeText || '1.2 MB',
      url: filePreview || `/uploads/${title.toLowerCase().replace(/\s+/g, '-')}`,
      createdAt: new Date().toISOString(),
      published: true // Published online with full description!
    };

    const updated = [newItem, ...uploadedList];
    saveToStorage(updated);

    // Sync to server API
    fetch('/api/media', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    }).catch(() => {});

    // Reset form
    setTitle('');
    setDescription('');
    setSelectedFile(null);
    setFilePreview(null);
    setFileSizeText('');
    if (fileInputRef.current) fileInputRef.current.value = '';

    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 4000);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setIsSavingEdit(true);
    const updated = uploadedList.map(m => {
      if (m.id === editingItem.id) {
        return {
          ...m,
          title: editTitle.trim(),
          description: editDesc.trim()
        };
      }
      return m;
    });

    saveToStorage(updated);

    try {
      await fetch('/api/media', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingItem.id,
          title: editTitle.trim(),
          description: editDesc.trim()
        })
      });
    } catch (e) {}

    setIsSavingEdit(false);
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    const updated = uploadedList.filter(m => m.id !== id);
    saveToStorage(updated);
    setDeleteTargetId(null);

    // Sync deletion to server API
    fetch(`/api/media?id=${encodeURIComponent(id)}`, {
      method: 'DELETE'
    }).catch(() => {});
  };

  const togglePublish = (id: string) => {
    const item = uploadedList.find(m => m.id === id);
    if (!item) return;
    const newStatus = item.published === false ? true : false;
    const updated = uploadedList.map(m => m.id === id ? { ...m, published: newStatus } : m);
    saveToStorage(updated);

    fetch('/api/media', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, published: newStatus })
    }).catch(() => {});
  };

  const copyUrl = (id: string, url: string) => {
    navigator.clipboard?.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openPicker = (forcedType?: 'image' | 'video' | 'audio') => {
    if (forcedType) setMediaType(forcedType);
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-5">
        <div>
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
            DIRECT MEDIA MANAGEMENT & PUBLISHING
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Kuusaa Faayilootaa (Media Uploads & Description)
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Suuraalee ol fe'aa, ibsa isaanii ofiin barreessaa. Suuraaleen ol fe'aman ibsa isaanii waliin fuula <strong className="text-emerald-400">/gallery</strong> irratti ifatti maxxanfamu.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/gallery"
            target="_blank"
            className="inline-flex items-center gap-1.5 bg-gray-900 hover:bg-gray-800 border border-emerald-700/60 text-emerald-400 font-bold px-3 py-2 rounded-xl text-xs transition shadow active:scale-95"
          >
            <Globe className="w-4 h-4" />
            <span>Kuusaa Suuraa Ilaali (Live Gallery) &rarr;</span>
          </Link>
          <button
            type="button"
            onClick={() => openPicker('image')}
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-2 rounded-xl text-xs transition shadow active:scale-95"
          >
            <ImageIcon className="w-4 h-4" />
            <span>Suuraa Ol Fe'i</span>
          </button>
        </div>
      </div>

      {/* Success Banner */}
      {uploadSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950 border border-emerald-600 text-emerald-300 text-xs font-bold flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xl animate-fade-in">
          <div className="flex items-center gap-2.5">
            <Check className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Suuraan keessan ibsa isaa waliin milkaa'inaan ol fe'amee fuula <strong>/gallery</strong> irratti kallattiin maxxanfameera!</span>
          </div>
          <Link
            href="/gallery"
            target="_blank"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold self-start sm:self-auto shrink-0"
          >
            <span>Kuusaa Suuraa Irratti Ilaali</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Hidden Native File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*,audio/*"
        onChange={handleNativeInput}
        className="hidden"
      />

      {/* Upload Panel */}
      <form onSubmit={handleUploadSubmit} className="p-6 sm:p-8 rounded-3xl bg-gray-950 border border-gray-800 space-y-5 shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1.5">
              Gosa Faayilii (Media Type)
            </label>
            <select
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value as any)}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
            >
              <option value="image">Suuraa (Direct Image Upload - JPG, PNG, WEBP)</option>
              <option value="video">Viidiyoo (Direct Video Upload - MP4, WebM)</option>
              <option value="audio">Sagalee (Direct Audio Upload - MP3, WAV)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1.5">
              Mata-Duree Faayilii (Title / Name)
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Fkn: Suuraa Istaadiyoo Aalam Media Adaamaa..."
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
            />
          </div>

          {/* Dedicated Custom Description Field */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-300 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>Ibsa Suuraa / Faayilii (Photo Description & Story)</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">Ofiin barreessaa (Write your own description)</span>
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ibsa suuraa kanaa gadi-fageenyaan ofii keessanii barreessaa (fkn: bakka, yeroo, sagantaa, eebba Aalam Media magaalaa Adaamaa, ykn ergaa suuraan kun dabarsu)..."
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium leading-relaxed placeholder-gray-600"
            />
            <span className="text-[10px] text-gray-500 mt-1 block font-mono">
              * Ibsi kun suuraa kana cinaatti fuula /gallery fi fuula duraa irratti ifatti mul'ata.
            </span>
          </div>
        </div>

        {/* Interactive Click & Drag Dropzone */}
        <div
          onClick={() => openPicker()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-emerald-600/40 hover:border-emerald-500 bg-emerald-950/10 hover:bg-emerald-950/20 rounded-2xl p-7 text-center cursor-pointer transition space-y-3 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 border border-emerald-600/30 flex items-center justify-center text-emerald-400 mx-auto group-hover:scale-110 transition shadow">
            <UploadCloud className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <p className="text-sm font-bold text-white group-hover:text-emerald-300 transition">
              Kompiitara ykn moobaayila keessan irraa faayilii filachuuf as tuqaa (Click to Browse)
            </p>
            <p className="text-xs text-gray-400">
              Yookiin faayilii qabadhaatii asitti darbaa (Drag & Drop files here)
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <span className="text-[10px] font-mono font-bold bg-gray-900 border border-gray-800 text-gray-300 px-2.5 py-0.5 rounded-md">
              JPG, PNG, WEBP
            </span>
            <span className="text-[10px] font-mono font-bold bg-gray-900 border border-gray-800 text-gray-300 px-2.5 py-0.5 rounded-md">
              MP4, MOV, WebM
            </span>
            <span className="text-[10px] font-mono font-bold bg-gray-900 border border-gray-800 text-gray-300 px-2.5 py-0.5 rounded-md">
              MP3, WAV
            </span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold">
              Battalumatti Maxxanfama (Instant Live)
            </span>
          </div>
        </div>

        {/* File Preview Box (When a file is picked) */}
        {selectedFile && (
          <div className="p-4 rounded-2xl bg-gray-900 border border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 overflow-hidden w-full sm:w-auto">
              {filePreview && mediaType === 'image' && (
                <img
                  src={filePreview}
                  alt="Preview"
                  className="w-16 h-14 rounded-xl object-cover border border-emerald-600/50 shrink-0"
                />
              )}
              {mediaType === 'video' && (
                <div className="w-16 h-14 rounded-xl bg-gray-950 border border-emerald-600/50 flex items-center justify-center text-emerald-400 shrink-0">
                  <Video className="w-6 h-6" />
                </div>
              )}
              {mediaType === 'audio' && (
                <div className="w-16 h-14 rounded-xl bg-gray-950 border border-emerald-600/50 flex items-center justify-center text-blue-400 shrink-0">
                  <Radio className="w-6 h-6" />
                </div>
              )}
              <div className="overflow-hidden">
                <span className="text-xs font-bold text-white block truncate">
                  {selectedFile.name}
                </span>
                <span className="text-[11px] font-mono text-emerald-400">
                  {fileSizeText} · {selectedFile.type || mediaType}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedFile(null);
                setFilePreview(null);
                setFileSizeText('');
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              className="px-3 py-1.5 rounded-lg bg-gray-950 hover:bg-red-950 text-gray-400 hover:text-red-300 text-xs font-bold border border-gray-800 transition shrink-0"
            >
              Haquu (Cancel)
            </button>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-xs sm:text-sm transition shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
        >
          <FileCheck className="w-4 h-4" />
          <span>Ol Fe'i & Ibsa Isaa Waliin Maxxansi (Publish with Custom Description)</span>
        </button>
      </form>

      {/* Uploaded Media Table & Counter */}
      <div className="rounded-3xl bg-gray-950 border border-gray-800 p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
              FAAYILOOTA SARVARII IRRA JIRAN
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
              {uploadedList.length} Faayiloota
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/gallery"
              target="_blank"
              className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Fuula /gallery Ilaali</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Uploaded List */}
        <div className="divide-y divide-gray-800">
          {uploadedList.map((m) => (
            <div key={m.id} className="py-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs group hover:bg-gray-900/40 p-3 rounded-2xl transition border border-transparent hover:border-gray-800/80">
              <div className="flex items-start gap-3 overflow-hidden flex-1">
                {m.type === 'image' && (
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-800 shrink-0 bg-gray-900">
                    <img src={m.url} alt={m.title} className="w-full h-full object-cover" />
                  </div>
                )}
                {m.type === 'video' && (
                  <div className="w-16 h-16 rounded-xl border border-gray-800 shrink-0 bg-emerald-950/40 flex items-center justify-center text-emerald-400">
                    <Video className="w-6 h-6" />
                  </div>
                )}
                {m.type === 'audio' && (
                  <div className="w-16 h-16 rounded-xl border border-gray-800 shrink-0 bg-blue-950/40 flex items-center justify-center text-blue-400">
                    <Radio className="w-6 h-6" />
                  </div>
                )}

                <div className="overflow-hidden space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-white text-sm">{m.title}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono uppercase font-bold ${
                      m.type === 'image' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                      m.type === 'video' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                      'bg-blue-950 text-blue-300 border border-blue-800'
                    }`}>
                      {m.type}
                    </span>

                    {/* Live Online Badge */}
                    {m.published !== false ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-700 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        ONLINE (MAXXANFAMEERA)
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-gray-400 bg-gray-900 border border-gray-800">
                        DRAFT
                      </span>
                    )}
                  </div>

                  {/* Custom Description Display */}
                  {m.description ? (
                    <div className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-xs text-gray-300 leading-relaxed space-y-1">
                      <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">
                        Ibsa Suuraa:
                      </span>
                      <p className="line-clamp-2">{m.description}</p>
                    </div>
                  ) : (
                    <div className="text-[11px] text-gray-500 italic flex items-center gap-1">
                      <span>Ibsi hin barreeffamne.</span>
                      <button
                        onClick={() => {
                          setEditingItem(m);
                          setEditTitle(m.title);
                          setEditDesc(m.description || '');
                        }}
                        className="text-emerald-400 hover:underline not-italic font-bold"
                      >
                        + Ibsa Barreessi
                      </button>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-500 font-mono pt-0.5">
                    <span>{m.size}</span>
                    <span>·</span>
                    <span>{new Date(m.createdAt).toLocaleDateString()}</span>
                    {m.type === 'image' && (
                      <>
                        <span>·</span>
                        <Link href="/gallery" target="_blank" className="text-emerald-400 hover:underline inline-flex items-center gap-0.5 font-bold">
                          <span>Ilaali /gallery</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 shrink-0 self-end sm:self-start pt-1">
                {/* Edit Description Button */}
                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(m);
                    setEditTitle(m.title);
                    setEditDesc(m.description || '');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-gray-900 hover:bg-emerald-950 text-gray-300 hover:text-emerald-300 border border-gray-800 hover:border-emerald-700 text-[11px] font-bold inline-flex items-center gap-1 transition"
                  title="Ibsa Gulaali (Edit Description)"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Ibsa Gulaali</span>
                </button>

                {/* Publish / Unpublish Toggle */}
                <button
                  type="button"
                  onClick={() => togglePublish(m.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold font-mono transition border ${
                    m.published !== false 
                      ? 'bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border-emerald-800' 
                      : 'bg-gray-900 hover:bg-gray-800 text-gray-400 border-gray-800'
                  }`}
                  title="Toggle published status"
                >
                  {m.published !== false ? 'Maxxanfameera' : 'Maxxansi'}
                </button>

                {/* Preview / View button */}
                <button
                  type="button"
                  onClick={() => setPreviewModalItem(m)}
                  className="px-2.5 py-1 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-800 text-[11px] font-bold inline-flex items-center gap-1 transition"
                  title="Ilaali (Preview)"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Ilaali</span>
                </button>

                {/* Copy URL */}
                <button
                  type="button"
                  onClick={() => copyUrl(m.id, m.url)}
                  className="px-2.5 py-1 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-emerald-400 border border-gray-800 text-[11px] font-bold inline-flex items-center gap-1 transition"
                  title="Copy link"
                >
                  {copiedId === m.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-mono">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>URL</span>
                    </>
                  )}
                </button>

                {/* Delete button with confirmation */}
                {deleteTargetId === m.id ? (
                  <div className="flex items-center gap-1 bg-red-950 border border-red-800 rounded-lg p-1 animate-fade-in">
                    <span className="text-[10px] text-red-300 px-1 font-bold">Haquu?</span>
                    <button
                      type="button"
                      onClick={() => handleDelete(m.id)}
                      className="px-1.5 py-0.5 bg-red-600 text-white text-[10px] font-bold rounded hover:bg-red-500"
                    >
                      Eeyyee
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTargetId(null)}
                      className="px-1.5 py-0.5 bg-gray-800 text-gray-300 text-[10px] rounded hover:bg-gray-700"
                    >
                      Lakkii
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setDeleteTargetId(m.id)}
                    className="p-1.5 rounded-lg bg-gray-900 hover:bg-red-950 text-gray-500 hover:text-red-400 border border-gray-800 hover:border-red-800 transition"
                    title="Haqi (Delete Media)"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Clean 0-State */}
          {uploadedList.length === 0 && (
            <div className="py-12 text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-500 mx-auto">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-gray-400">
                Kuusaa qulqulluu (0 faayilii). Faayiliin tokkollee sarvarii irratti hin jiru.
              </p>
              <p className="text-[11px] text-gray-600">
                Suuraa, viidiyoo, ykn sagalee ol fe'uuf qabduu olitti jiru cuqaasaa.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* EDIT DESCRIPTION MODAL */}
      {editingItem && (
        <div 
          onClick={() => setEditingItem(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-950 border border-gray-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Ibsa Suuraa Gulaali (Edit Description)</h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="p-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  Mata-Duree Suuraa (Title)
                </label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  Ibsa Suuraa (Custom Description)
                </label>
                <textarea
                  rows={4}
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  placeholder="Ibsa suuraa kanaa gadi-fageenyaan barreessaa..."
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 text-xs font-bold"
                >
                  Dhiisi (Cancel)
                </button>
                <button
                  type="submit"
                  disabled={isSavingEdit}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow disabled:opacity-50"
                >
                  {isSavingEdit ? 'Ol Kaa\'aa jira...' : 'Ol Kaa\'i (Save Changes)'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Preview */}
      {previewModalItem && (
        <div 
          onClick={() => setPreviewModalItem(null)}
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-950 border border-gray-800 rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="overflow-hidden">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">
                  {previewModalItem.type} PREVIEW
                </span>
                <h4 className="text-sm font-bold text-white truncate">{previewModalItem.title}</h4>
              </div>
              <button
                type="button"
                onClick={() => setPreviewModalItem(null)}
                className="p-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden bg-black flex items-center justify-center min-h-[220px] max-h-[420px]">
              {previewModalItem.type === 'image' && (
                <img
                  src={previewModalItem.url}
                  alt={previewModalItem.title}
                  className="max-h-[400px] w-auto object-contain"
                />
              )}
              {previewModalItem.type === 'video' && (
                <video
                  src={previewModalItem.url}
                  controls
                  className="w-full max-h-[400px]"
                />
              )}
              {previewModalItem.type === 'audio' && (
                <div className="p-8 w-full text-center space-y-4">
                  <Radio className="w-12 h-12 text-blue-400 mx-auto" />
                  <audio src={previewModalItem.url} controls className="w-full" />
                </div>
              )}
            </div>

            {/* Custom Description in Modal */}
            {previewModalItem.description && (
              <div className="p-3.5 rounded-xl bg-gray-900 border border-gray-800 space-y-1">
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">
                  Ibsa Suuraa:
                </span>
                <p className="text-xs text-gray-200 leading-relaxed">
                  {previewModalItem.description}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-gray-400 font-mono pt-2">
              <span>Hamma: {previewModalItem.size}</span>
              <button
                type="button"
                onClick={() => copyUrl(previewModalItem.id, previewModalItem.url)}
                className="text-emerald-400 hover:underline"
              >
                Copy Direct URL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
