'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, ArrowDownLeft, ArrowUpRight, Calendar, User, Tag, Receipt } from 'lucide-react';

export const DetailTransaksiModal: React.FC = () => {
  const { isDetailModalOpen, setIsDetailModalOpen, selectedTransaction, openEditTransaction } = useApp();

  if (!isDetailModalOpen || !selectedTransaction) return null;

  const isIncome = selectedTransaction.type === 'income';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 shadow-xl space-y-5 relative">
        {/* Header Modal */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-xl border ${
                isIncome
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                  : 'bg-rose-50 text-rose-600 border-rose-200'
              }`}
            >
              {isIncome ? <ArrowDownLeft className="w-6 h-6" /> : <ArrowUpRight className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base tracking-tight">
                Rincian Detail {isIncome ? 'Pemasukan' : 'Pengeluaran'}
              </h3>
              <p className="text-xs text-slate-500 font-medium">ID Transaksi: {selectedTransaction.id}</p>
            </div>
          </div>

          <button
            onClick={() => setIsDetailModalOpen(false)}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount Big Pill */}
        <div
          className={`p-5 rounded-2xl text-center space-y-1 border ${
            isIncome ? 'bg-emerald-50/60 border-emerald-200' : 'bg-rose-50/60 border-rose-200'
          }`}
        >
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Nominal Rp</span>
          <div className={`text-3xl font-extrabold tracking-tight ${isIncome ? 'text-emerald-700' : 'text-rose-700'}`}>
            {isIncome ? '+' : '-'} Rp {selectedTransaction.amount.toLocaleString('id-ID')}
          </div>
        </div>

        {/* Transaction Info List */}
        <div className="space-y-3 text-xs divide-y divide-slate-100">
          <div className="pt-2 flex justify-between items-center">
            <span className="text-slate-500 font-medium flex items-center gap-1.5">
              <Receipt className="w-4 h-4 text-slate-400" /> Keterangan Transaksi:
            </span>
            <span className="font-extrabold text-slate-900 text-right max-w-[200px]">{selectedTransaction.description}</span>
          </div>

          <div className="pt-2 flex justify-between items-center">
            <span className="text-slate-500 font-medium flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-slate-400" /> Kategori Pos:
            </span>
            <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
              {selectedTransaction.category}
            </span>
          </div>

          <div className="pt-2 flex justify-between items-center">
            <span className="text-slate-500 font-medium flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" /> Tanggal Transaksi:
            </span>
            <span className="font-mono font-bold text-slate-800">{selectedTransaction.date}</span>
          </div>

          {selectedTransaction.sourceOrRecipient && (
            <div className="pt-2 flex justify-between items-center">
              <span className="text-slate-500 font-medium">{isIncome ? 'Sumber / Donatur:' : 'Toko / Penerima:'}</span>
              <span className="font-semibold text-slate-900">{selectedTransaction.sourceOrRecipient}</span>
            </div>
          )}

          <div className="pt-2 flex justify-between items-center">
            <span className="text-slate-500 font-medium flex items-center gap-1.5">
              <User className="w-4 h-4 text-slate-400" /> Pengurus Pencatat:
            </span>
            <span className="font-semibold text-slate-900">{selectedTransaction.recordedBy}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
          <button
            onClick={() => setIsDetailModalOpen(false)}
            className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
          >
            Tutup
          </button>
          <button
            onClick={() => {
              setIsDetailModalOpen(false);
              openEditTransaction(selectedTransaction);
            }}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs shadow-md shadow-emerald-600/20 cursor-pointer transition-all"
          >
            Edit Transaksi
          </button>
        </div>
      </div>
    </div>
  );
};
