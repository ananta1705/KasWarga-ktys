'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, UserPlus } from 'lucide-react';

export const TambahWargaModal: React.FC = () => {
  const { isTambahWargaOpen, setIsTambahWargaOpen, addWarga, rtSettings } = useApp();

  const [name, setName] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState(rtSettings.nominalIuran.toString());

  if (!isTambahWargaOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !houseNo) return;

    addWarga({
      name,
      houseNo,
      phone: phone || '081200000000',
      amount: parseFloat(amount) || rtSettings.nominalIuran,
    });

    setIsTambahWargaOpen(false);
    setName('');
    setHouseNo('');
    setPhone('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-xl space-y-5">
        {/* Header Modal */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base tracking-tight">Tambah Warga Baru</h3>
              <p className="text-xs text-slate-500 font-medium">Registrasi Warga / Kepala Keluarga RT 05</p>
            </div>
          </div>

          <button
            onClick={() => setIsTambahWargaOpen(false)}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
              Nama Lengkap Warga / KK *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Bpk. Bambang Susilo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-3 text-sm text-slate-900 font-semibold focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
              Nomor Rumah & Blok *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Blok A No. 05"
              value={houseNo}
              onChange={(e) => setHouseNo(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-3 text-sm text-slate-900 font-bold focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                No. WhatsApp / Telepon
              </label>
              <input
                type="text"
                placeholder="08123456789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-3 text-xs text-slate-900 font-mono font-semibold focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                Nominal Iuran (Rp)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-3 text-sm text-slate-900 font-mono font-extrabold focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsTambahWargaOpen(false)}
              className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs shadow-md shadow-emerald-600/20 cursor-pointer transition-all"
            >
              Daftarkan Warga Baru
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
