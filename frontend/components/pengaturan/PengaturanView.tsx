'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Save, Building2, UserCheck } from 'lucide-react';

export const PengaturanView: React.FC = () => {
  const { rtSettings, setRtSettings, addToast } = useApp();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Pengaturan informasi RT berhasil disimpan!', 'success');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 tracking-tight">
          <Settings className="w-6 h-6 text-emerald-600" /> Pengaturan Informasi RT & Pengurus
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-1">Sesuaikan nama RT, nominal iuran bulanan warga, dan kontak pengurus</p>
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSave} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-5 text-xs">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-600" /> Identitas Lingkungan RT
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-700 font-extrabold mb-1">Nama RT / RW</label>
            <input
              type="text"
              required
              value={rtSettings.rtRwName}
              onChange={(e) => setRtSettings({ ...rtSettings, rtRwName: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 text-sm font-extrabold focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-extrabold mb-1">Kelurahan / Desa</label>
            <input
              type="text"
              required
              value={rtSettings.kelurahan}
              onChange={(e) => setRtSettings({ ...rtSettings, kelurahan: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 text-sm font-semibold focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-extrabold mb-1">Nominal Iuran Bulanan Per KK (Rp)</label>
            <input
              type="number"
              required
              value={rtSettings.nominalIuran}
              onChange={(e) => setRtSettings({ ...rtSettings, nominalIuran: parseFloat(e.target.value) || 0 })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 text-sm font-mono font-extrabold focus:outline-none focus:border-emerald-600"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 pb-1">
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-emerald-600" /> Pengurus Bertanggung Jawab
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-700 font-extrabold mb-1">Nama Ketua RT</label>
            <input
              type="text"
              required
              value={rtSettings.namaKetuaRt}
              onChange={(e) => setRtSettings({ ...rtSettings, namaKetuaRt: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 text-sm font-semibold focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-extrabold mb-1">Nama Bendahara RT</label>
            <input
              type="text"
              required
              value={rtSettings.namaBendahara}
              onChange={(e) => setRtSettings({ ...rtSettings, namaBendahara: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 text-sm font-semibold focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-extrabold mb-1">Nomor WA Bendahara</label>
            <input
              type="text"
              required
              value={rtSettings.nomorWaBendahara}
              onChange={(e) => setRtSettings({ ...rtSettings, nomorWaBendahara: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 text-sm font-mono font-bold focus:outline-none focus:border-emerald-600"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 flex justify-end border-t border-slate-100">
          <button
            type="submit"
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs shadow-md shadow-emerald-600/20 flex items-center gap-2 cursor-pointer transition-all"
          >
            <Save className="w-4 h-4" /> Simpan Pengaturan RT
          </button>
        </div>
      </form>
    </div>
  );
};
