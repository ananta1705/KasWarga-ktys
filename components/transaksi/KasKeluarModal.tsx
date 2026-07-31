'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ArrowUpRight } from 'lucide-react';

export const KasKeluarModal: React.FC = () => {
  const { isKasKeluarOpen, setIsKasKeluarOpen, addTransaction, rtSettings } = useApp();

  const todayStr = new Date().toISOString().split('T')[0];

  const [date, setDate] = useState(todayStr);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Perbaikan & Lampu');
  const [amount, setAmount] = useState('');
  const [sourceOrRecipient, setSourceOrRecipient] = useState('');
  const [recordedBy, setRecordedBy] = useState(rtSettings.namaKetuaRt);

  if (!isKasKeluarOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;

    addTransaction({
      date: date || todayStr,
      description,
      category: category || 'Perbaikan & Lampu',
      type: 'expense',
      amount: parseFloat(amount),
      paymentMethod: 'Tunai (Cash)',
      sourceOrRecipient: sourceOrRecipient || 'Toko / Penerima',
      recordedBy: recordedBy || rtSettings.namaKetuaRt,
    });

    setIsKasKeluarOpen(false);
    setDescription('');
    setAmount('');
    setSourceOrRecipient('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 shadow-xl space-y-5">
        {/* Header Modal */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-200">
              <ArrowUpRight className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base tracking-tight">Catat Kas Keluar</h3>
              <p className="text-xs text-slate-500 font-medium">Input Pengeluaran Kas RT</p>
            </div>
          </div>

          <button
            onClick={() => setIsKasKeluarOpen(false)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clean Minimal Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
              Keterangan Pengeluaran / Barang *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Pembelian Lampu LED Pos Kamling"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-3 text-sm text-slate-900 font-semibold focus:outline-none focus:border-rose-600 focus:ring-2 focus:ring-rose-600/15"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                Kategori Pos
              </label>
              <input
                type="text"
                placeholder="Perbaikan / Kebersihan"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-3 text-xs text-slate-900 font-bold focus:outline-none focus:border-rose-600 focus:ring-2 focus:ring-rose-600/15"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                Nominal (Rp) *
              </label>
              <input
                type="number"
                required
                placeholder="420000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-3 text-sm text-slate-900 font-mono font-extrabold focus:outline-none focus:border-rose-600 focus:ring-2 focus:ring-rose-600/15"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                Tanggal Pengeluaran
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-rose-600"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                Toko / Penerima
              </label>
              <input
                type="text"
                placeholder="Toko Bangunan / Satpam"
                value={sourceOrRecipient}
                onChange={(e) => setSourceOrRecipient(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-rose-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
              Nama Pengurus Bertanggung Jawab
            </label>
            <input
              type="text"
              value={recordedBy}
              onChange={(e) => setRecordedBy(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-rose-600"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsKasKeluarOpen(false)}
              className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-xl text-xs shadow-md shadow-rose-600/20 cursor-pointer transition-all"
            >
              Simpan Kas Keluar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
