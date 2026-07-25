'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Search, CheckCircle2, Clock, Send, Plus, Printer } from 'lucide-react';

export const DataWargaView: React.FC = () => {
  const { wargaList, toggleWargaPayment, sendReminderWhatsApp, setIsTambahWargaOpen, openKwitansiForWarga, userRole } = useApp();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'Lunas' | 'Belum Bayar'>('ALL');

  const filteredWarga = wargaList.filter((w) => {
    const matchesSearch =
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.houseNo.toLowerCase().includes(search.toLowerCase()) ||
      w.phone.includes(search);
    const matchesStatus = filterStatus === 'ALL' || w.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 tracking-tight">
            <Users className="w-6 h-6 text-emerald-600" /> Data Warga RT 05
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Total {wargaList.length} KK Terdaftar • Kontak & Status Pembayaran Iuran</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Add Warga Button (Admin Only) */}
          {userRole === 'admin' && (
            <button
              onClick={() => setIsTambahWargaOpen(true)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" /> + Tambah Warga Baru
            </button>
          )}

          {/* Filter Status Buttons */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setFilterStatus('ALL')}
              className={`px-3 py-1.5 rounded-lg font-extrabold transition-all ${
                filterStatus === 'ALL' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua ({wargaList.length})
            </button>
            <button
              onClick={() => setFilterStatus('Lunas')}
              className={`px-3 py-1.5 rounded-lg font-extrabold transition-all ${
                filterStatus === 'Lunas' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Lunas ({wargaList.filter((w) => w.status === 'Lunas').length})
            </button>
            <button
              onClick={() => setFilterStatus('Belum Bayar')}
              className={`px-3 py-1.5 rounded-lg font-extrabold transition-all ${
                filterStatus === 'Belum Bayar' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Belum ({wargaList.filter((w) => w.status === 'Belum Bayar').length})
            </button>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Cari nama warga atau nomor rumah..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-emerald-600"
        />
      </div>

      {/* Warga Cards Grid (Mobile & Desktop Responsive) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredWarga.map((w) => (
          <div
            key={w.id}
            className={`bg-white border rounded-2xl p-5 shadow-xs space-y-4 flex flex-col justify-between transition-all hover:shadow-md ${
              w.status === 'Lunas' ? 'border-slate-200/80' : 'border-amber-300 bg-amber-50/20'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <img src={w.avatar} alt={w.name} className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0" />
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm leading-tight">{w.name}</h3>
                    <div className="text-xs text-emerald-600 font-extrabold mt-0.5">{w.houseNo}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Telepon / WA:</span>
                  <span className="font-mono font-bold text-slate-800">{w.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Terakhir Bayar:</span>
                  <span className="font-extrabold text-slate-900">{w.lastPaidMonth}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="flex justify-between items-center mb-1">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-extrabold inline-flex items-center gap-1 border ${
                    w.status === 'Lunas'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}
                >
                  {w.status === 'Lunas' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                  {w.status}
                </span>

                {w.status === 'Belum Bayar' ? (
                  <button
                    onClick={() => sendReminderWhatsApp(w)}
                    className="text-xs text-emerald-600 font-extrabold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <Send className="w-3 h-3" /> Kirim WA
                  </button>
                ) : (
                  <button
                    onClick={() => openKwitansiForWarga(w)}
                    className="text-xs text-emerald-700 font-extrabold flex items-center gap-1 hover:underline cursor-pointer bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200"
                  >
                    <Printer className="w-3 h-3" /> Kwitansi
                  </button>
                )}
              </div>

              {userRole === 'admin' ? (
                <button
                  onClick={() => toggleWargaPayment(w.id)}
                  className={`w-full py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    w.status === 'Lunas'
                      ? 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20'
                  }`}
                >
                  {w.status === 'Lunas' ? 'Batalkan Status Lunas' : 'Tandai Sudah Lunas'}
                </button>
              ) : (
                <div className="w-full py-2 rounded-xl text-[11px] text-center font-bold text-slate-400 bg-slate-100">
                  Status Terverifikasi
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
