'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Search, CheckCircle2, Clock, Send, Plus, Printer, Trash2, Info, User, Home, Phone, CreditCard, Calendar, X } from 'lucide-react';
import { Warga } from '../../types/kaswarga';

export const DataWargaView: React.FC = () => {
  const { wargaList, toggleWargaPayment, sendReminderWhatsApp, setIsTambahWargaOpen, openKwitansiForWarga, userRole, deleteWarga } = useApp();
  const [search, setSearch] = useState('');
  const [wargaToDelete, setWargaToDelete] = useState<{ id: string; name: string } | null>(null);
  const [wargaDetail, setWargaDetail] = useState<Warga | null>(null);

  const filteredWarga = wargaList.filter((w) => {
    return w.name.toLowerCase().includes(search.toLowerCase()) ||
           w.houseNo.toLowerCase().includes(search.toLowerCase()) ||
           w.phone.includes(search);
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
            className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4 flex flex-col justify-between transition-all hover:shadow-md"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm leading-tight">{w.name}</h3>
                  <div className="text-xs text-emerald-600 font-extrabold mt-0.5">{w.houseNo}</div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button 
                    onClick={() => setWargaDetail(w)}
                    className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                    title="Detail Warga"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                  {userRole === 'admin' && (
                    <button 
                      onClick={() => setWargaToDelete({ id: w.id, name: w.name })}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Hapus Warga"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Telepon / WA:</span>
                  <span className="font-mono font-bold text-slate-800">{w.phone}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {wargaToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-sm w-full p-6 shadow-xl space-y-5 text-center">
            <div className="mx-auto w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg mb-1">Hapus Data Warga?</h3>
              <p className="text-sm text-slate-500 font-medium">
                Apakah Anda yakin ingin menghapus data <span className="font-bold text-slate-700">{wargaToDelete.name}</span> dari daftar? Data yang dihapus tidak dapat dikembalikan.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setWargaToDelete(null)}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  deleteWarga(wargaToDelete.id);
                  setWargaToDelete(null);
                }}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-md shadow-rose-600/20"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Warga Modal */}
      {wargaDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base tracking-tight">Detail Informasi Warga</h3>
                  <p className="text-xs text-slate-500 font-medium">ID: {wargaDetail.id}</p>
                </div>
              </div>
              <button
                onClick={() => setWargaDetail(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <User className="w-5 h-5 text-slate-400 shrink-0" />
                <div>
                  <div className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">Nama Lengkap</div>
                  <div className="font-extrabold text-slate-900 text-sm">{wargaDetail.name}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <Home className="w-5 h-5 text-slate-400 shrink-0" />
                <div>
                  <div className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">Nomor Rumah</div>
                  <div className="font-bold text-slate-700 text-sm">{wargaDetail.houseNo}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <Phone className="w-5 h-5 text-slate-400 shrink-0" />
                <div>
                  <div className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">Nomor HP / WhatsApp</div>
                  <div className="font-mono font-bold text-slate-700 text-sm">{wargaDetail.phone}</div>
                </div>
              </div>

            </div>

            <div className="pt-2">
              <button
                onClick={() => setWargaDetail(null)}
                className="w-full py-2.5 rounded-xl text-sm font-extrabold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Tutup Detail
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
