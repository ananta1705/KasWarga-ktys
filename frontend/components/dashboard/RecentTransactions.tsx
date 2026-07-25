'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowDownLeft, ArrowUpRight, Receipt, Tag, ShieldCheck } from 'lucide-react';

export const RecentTransactions: React.FC = () => {
  const { transactions, setActiveTab } = useApp();

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2 tracking-tight">
            <Receipt className="w-5 h-5 text-emerald-600" /> Riwayat Transaksi Terbaru (Detail)
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Pencatatan kas masuk & keluar beserta metode pembayaran & resi</p>
        </div>

        <button
          onClick={() => setActiveTab('transaksi')}
          className="text-xs text-emerald-600 hover:text-emerald-700 font-extrabold hover:underline cursor-pointer"
        >
          Lihat Semua →
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        {transactions.slice(0, 6).map((tx, idx) => (
          <div key={`${tx.id}-${idx}`} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0">
              <div
                className={`p-2.5 rounded-xl border shrink-0 mt-0.5 ${
                  tx.type === 'income'
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                    : 'bg-rose-50 text-rose-600 border-rose-200'
                }`}
              >
                {tx.type === 'income' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
              </div>

              <div className="min-w-0 space-y-1">
                <div className="font-extrabold text-sm text-slate-900 leading-snug">{tx.description}</div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="font-mono font-semibold text-slate-600">{tx.date}</span>
                  <span>•</span>
                  <span className="font-extrabold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md text-[11px] border border-slate-200">
                    {tx.category}
                  </span>
                  {tx.paymentMethod && (
                    <span className="font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md text-[11px] border border-teal-200">
                      {tx.paymentMethod}
                    </span>
                  )}
                  {tx.referenceNo && (
                    <span className="font-mono text-slate-600 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200 text-[10px]">
                      Ref: {tx.referenceNo}
                    </span>
                  )}
                </div>
                {tx.notes && <p className="text-xs text-slate-600 italic bg-slate-50 p-2 rounded-lg border border-slate-100">{tx.notes}</p>}
              </div>
            </div>

            <div className="text-right shrink-0">
              <div
                className={`font-extrabold text-sm whitespace-nowrap ${
                  tx.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {tx.type === 'income' ? '+' : '-'} Rp {tx.amount.toLocaleString('id-ID')}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">{tx.recordedBy}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
