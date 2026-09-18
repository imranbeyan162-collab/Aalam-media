'use client';

import React, { useState } from 'react';
import { UploadCloud, Video, Radio, Image as ImageIcon, Check } from 'lucide-react';

export default function AdminMediaUploadPage() {
  const [mediaType, setMediaType] = useState<'video' | 'audio' | 'image'>('video');
  const [title, setTitle] = useState('');
  const [uploadedList, setUploadedList] = useState([
    { id: '1', title: 'Eebba Aalam Media Adaamaa', type: 'video', size: '45.2 MB', url: '/uploads/eebba.mp4' },
    { id: '2', title: 'Barnoota Fiqhii Sagalee', type: 'audio', size: '12.8 MB', url: '/uploads/fiqh.mp3' }
  ]);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      setUploadedList([
        {
          id: Date.now().toString(),
          title,
          type: mediaType,
          size: '24.5 MB',
          url: `/uploads/${title.toLowerCase().replace(/\s+/g, '-')}`
        },
        ...uploadedList
      ]);
      setTitle('');
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="border-b border-gray-800 pb-4">
        <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
          DIRECT FILE STORAGE REPOSITORY
        </span>
        <h1 className="text-2xl font-black text-white">Kuusaa Faayilootaa (Media Uploads)</h1>
        <p className="text-xs text-gray-400 mt-1">
          Faayiloota viidiyoo, sagalee fi suuraa kallattiin sarvarii weebsaayitichaa irratti ol fe'uu.
        </p>
      </div>

      {uploadSuccess && (
        <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Faayilli keessan milkaa'inaan sarvarii irratti ol fe'ameera!</span>
        </div>
      )}

      {/* Upload Box */}
      <form onSubmit={handleUpload} className="p-6 rounded-3xl bg-gray-950 border border-gray-800 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">Gosa Faayilii</label>
            <select
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value as any)}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white"
            >
              <option value="video">Viidiyoo (Direct Video Upload)</option>
              <option value="audio">Sagalee (Direct Audio Upload)</option>
              <option value="image">Suuraa (Direct Image Upload)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">Mata-Duree Faayilii</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Mata-duree faayilii..."
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white"
            />
          </div>
        </div>

        <div className="border-2 border-dashed border-gray-800 rounded-2xl p-6 text-center text-xs text-gray-400 space-y-2">
          <UploadCloud className="w-8 h-8 text-emerald-400 mx-auto" />
          <p>Faayilii kompiitara keessan irraa filadhaatii asitti darbaa (Drag & Drop)</p>
          <span className="text-[10px] text-gray-600 block font-mono">MP4, WebM, MP3, WAV, JPG, PNG hanga 500MB</span>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs transition"
        >
          Ol Fe'i (Upload Directly to Server)
        </button>
      </form>

      {/* Uploaded Media Table */}
      <div className="rounded-2xl bg-gray-950 border border-gray-800 p-4 space-y-3">
        <h3 className="text-xs font-bold uppercase text-gray-400">Faayiloota Sarvarii Irra Jiran</h3>
        <div className="divide-y divide-gray-800">
          {uploadedList.map((m) => (
            <div key={m.id} className="py-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                {m.type === 'video' && <Video className="w-4 h-4 text-emerald-400" />}
                {m.type === 'audio' && <Radio className="w-4 h-4 text-blue-400" />}
                {m.type === 'image' && <ImageIcon className="w-4 h-4 text-amber-400" />}
                <span className="text-white font-medium">{m.title}</span>
              </div>
              <span className="text-gray-500 font-mono text-[11px]">{m.size}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
