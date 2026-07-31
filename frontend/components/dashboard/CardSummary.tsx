'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Wallet, ArrowDownLeft, ArrowUpRight, Users } from 'lucide-react';

export const CardSummary: React.FC = () => {
  const { transactions, wargaList } = useApp();

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {/* Card 1: Total Saldo */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs relative overflow-hidden transition-all hover:shadow-md">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Total Saldo Kas RT</span>
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60">
            <Wallet className="w-6 h-6" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Rp {totalBalance.toLocaleString('id-ID')}
        </div>
        <div className="mt-2 text-xs text-emerald-600 font-bold flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Saldo Kas Utama Bank BCA RT
        </div>
      </div>

      {/* Card 2: Total Uang Masuk */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs relative overflow-hidden transition-all hover:shadow-md">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Total Uang Masuk</span>
          <div className="p-2.5 rounded-xl bg-teal-50 text-teal-600 border border-teal-200/60">
            <ArrowDownLeft className="w-6 h-6" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-teal-700 tracking-tight">
          Rp {totalIncome.toLocaleString('id-ID')}
        </div>
        <div className="mt-2 text-xs text-slate-500 font-medium">
          Iuran Bulanan & Donasi Warga
        </div>
      </div>

      {/* Card 3: Total Uang Keluar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs relative overflow-hidden transition-all hover:shadow-md">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Total Uang Keluar</span>
          <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-200/60">
            <ArrowUpRight className="w-6 h-6" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 tracking-tight">
          Rp {totalExpense.toLocaleString('id-ID')}
        </div>
        <div className="mt-2 text-xs text-slate-500 font-medium">
          Operasional Pos & Perbaikan
        </div>
      </div>

    </div>
  );
};
