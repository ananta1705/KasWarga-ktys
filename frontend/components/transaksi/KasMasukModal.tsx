'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ArrowDownLeft } from 'lucide-react';

export const KasMasukModal: React.FC = () => {
  const { isKasMasukOpen, setIsKasMasukOpen, addTransaction, rtSettings } = useApp();

  const todayStr = new Date().toISOString().split('T')[0];

  const [date, setDate] = useState(todayStr);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Iuran Warga');
  const [amount, setAmount] = useState('');
  const [sourceOrRecipient, setSourceOrRecipient] = useState('');
  const [recordedBy, setRecordedBy] = useState(rtSettings.namaBendahara);

  if (!isKasMasukOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;

    addTransaction({
      date: date || todayStr,
      description,
      category: category || 'Iuran Warga',
      type: 'income',
      amount: parseFloat(amount),
      paymentMethod: 'Tunai (Cash)',
      sourceOrRecipient: sourceOrRecipient || 'Warga RT 05',
      recordedBy: recordedBy || rtSettings.namaBendahara,
    });

    setIsKasMasukOpen(false);
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
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
              <ArrowDownLeft className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base tracking-tight">Catat Kas Masuk</h3>
              <p className="text-xs text-slate-500 font-medium">Input Penerimaan Kas RT</p>
            </div>
          </div>

          <button
            onClick={() => setIsKasMasukOpen(false)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clean Minimal Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
              Keterangan / Nama Pemasukan *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Sumbangan Acara 17 Agustus"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-3 text-sm text-slate-900 font-semibold focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                Kategori Pos
              </label>
              <input
                type="text"
                placeholder="Iuran Warga / Donasi"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-3 text-xs text-slate-900 font-bold focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                Nominal (Rp) *
              </label>
              <input
                type="number"
                required
                placeholder="500000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-3 text-sm text-slate-900 font-mono font-extrabold focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                Tanggal Transaksi
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                Sumber / Penyumbang
              </label>
              <input
                type="text"
                placeholder="Bpk. Doni / Warga"
                value={sourceOrRecipient}
                onChange={(e) => setSourceOrRecipient(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
              Nama Pencatat / Pengurus
            </label>
            <input
              type="text"
              value={recordedBy}
              onChange={(e) => setRecordedBy(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-emerald-600"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsKasMasukOpen(false)}
              className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs shadow-md shadow-emerald-600/20 cursor-pointer transition-all"
            >
              Simpan Kas Masuk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
