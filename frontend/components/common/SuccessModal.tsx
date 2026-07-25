'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, ArrowDownLeft, ArrowUpRight, X } from 'lucide-react';

export const SuccessModal: React.FC = () => {
  const { isSuccessModalOpen, setIsSuccessModalOpen, lastTransaction } = useApp();

  if (!isSuccessModalOpen || !lastTransaction) return null;

  const isIncome = lastTransaction.type === 'income';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 text-center relative overflow-hidden">
        {/* Close Top Right */}
        <button
          onClick={() => setIsSuccessModalOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Big Animated Icon */}
        <div className="pt-2 flex justify-center">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 animate-bounce shadow-md ${
              isIncome
                ? 'bg-emerald-50 text-emerald-600 border-emerald-200 shadow-emerald-600/10'
                : 'bg-rose-50 text-rose-600 border-rose-200 shadow-rose-600/10'
            }`}
          >
            {isIncome ? <ArrowDownLeft className="w-10 h-10 stroke-[2.5]" /> : <ArrowUpRight className="w-10 h-10 stroke-[2.5]" />}
          </div>
        </div>

        {/* Modal Title */}
        <div className="space-y-1">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border ${
              isIncome ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'
            }`}
          >
            {isIncome ? 'Pemasukan Kas Berhasil' : 'Pengeluaran Kas Berhasil'}
          </span>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight pt-1">
            Kas {isIncome ? 'Masuk' : 'Keluar'} Terdaftar!
          </h3>
          <p className="text-xs text-slate-500 font-medium">Transaksi telah disimpan permanen ke dalam catatan kas RT</p>
        </div>

        {/* Nominal Box */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
          <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Nominal Transaksi</div>
          <div
            className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
              isIncome ? 'text-emerald-600' : 'text-rose-600'
            }`}
          >
            {isIncome ? '+' : '-'} Rp {lastTransaction.amount.toLocaleString('id-ID')}
          </div>
        </div>

        {/* Transaction Details */}
        <div className="text-left text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200/60 space-y-2 text-slate-700">
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Keterangan:</span>
            <span className="font-extrabold text-slate-900 text-right">{lastTransaction.description}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Kategori Pos:</span>
            <span className="font-bold text-slate-800">{lastTransaction.category}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Tanggal:</span>
            <span className="font-mono font-bold text-slate-800">{lastTransaction.date}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-500 font-medium">Pencatat / Pengurus:</span>
            <span className="font-semibold text-slate-900">{lastTransaction.recordedBy}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setIsSuccessModalOpen(false)}
          className={`w-full py-3 rounded-xl text-xs font-extrabold text-white shadow-md cursor-pointer transition-all ${
            isIncome
              ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
              : 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20'
          }`}
        >
          Selesai & Tutup Notifikasi
        </button>
      </div>
    </div>
  );
};
