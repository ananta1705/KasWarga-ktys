'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CreditCard, Search } from 'lucide-react';

export const PembayaranIuranModal: React.FC = () => {
  const { isPembayaranIuranOpen, setIsPembayaranIuranOpen, wargaList, toggleWargaPayment, rtSettings } = useApp();

  const [selectedWargaId, setSelectedWargaId] = useState(wargaList[0]?.id || '');
  const [bulanIuran, setBulanIuran] = useState('Juli 2026');
  const [searchWarga, setSearchWarga] = useState('');

  if (!isPembayaranIuranOpen) return null;

  const filteredWarga = wargaList.filter(
    (w) =>
      w.name.toLowerCase().includes(searchWarga.toLowerCase()) ||
      w.houseNo.toLowerCase().includes(searchWarga.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedWargaId) {
      toggleWargaPayment(selectedWargaId);
    }
    setIsPembayaranIuranOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-xl space-y-5">
        {/* Header Modal */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-50 text-teal-600 border border-teal-200">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base tracking-tight">Pembayaran Iuran Warga</h3>
              <p className="text-xs text-slate-500 font-medium">Pilih Warga & Tandai Lunas (Rp {rtSettings.nominalIuran.toLocaleString('id-ID')})</p>
            </div>
          </div>

          <button
            onClick={() => setIsPembayaranIuranOpen(false)}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
              Pilih Nama Warga / Rumah *
            </label>
            <div className="relative mb-2">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama atau nomor rumah warga..."
                value={searchWarga}
                onChange={(e) => setSearchWarga(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-emerald-600"
              />
            </div>

            <select
              value={selectedWargaId}
              onChange={(e) => setSelectedWargaId(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-3 text-sm text-slate-900 font-extrabold focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
            >
              {filteredWarga.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name} ({w.houseNo}) - {w.status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
              Periode Bulan Iuran
            </label>
            <select
              value={bulanIuran}
              onChange={(e) => setBulanIuran(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-3 text-xs text-slate-900 font-extrabold focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
            >
              <option value="Juli 2026">Juli 2026 (Bulan Ini)</option>
              <option value="Agustus 2026">Agustus 2026</option>
              <option value="Juni 2026">Juni 2026 (Tunggakan)</option>
              <option value="Mei 2026">Mei 2026 (Tunggakan)</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsPembayaranIuranOpen(false)}
              className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs shadow-md shadow-emerald-600/20 cursor-pointer transition-all"
            >
              Konfirmasi & Tandai Lunas
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
