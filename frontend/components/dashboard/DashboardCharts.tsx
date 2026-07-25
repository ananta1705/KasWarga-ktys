'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const MONTHLY_DATA = [
  { month: 'Januari', Pemasukan: 2100000, Pengeluaran: 1200000 },
  { month: 'Februari', Pemasukan: 2250000, Pengeluaran: 980000 },
  { month: 'Maret', Pemasukan: 2000000, Pengeluaran: 1450000 },
  { month: 'April', Pemasukan: 2400000, Pengeluaran: 1100000 },
  { month: 'Mei', Pemasukan: 2150000, Pengeluaran: 1600000 },
  { month: 'Juni', Pemasukan: 2300000, Pengeluaran: 1350000 },
  { month: 'Juli', Pemasukan: 2250000, Pengeluaran: 1870000 },
];

export const DashboardCharts: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-slate-100 pb-4">
        <div>
          <h3 className="font-extrabold text-slate-900 text-base tracking-tight">
            Grafik Ringkasan Uang Masuk vs Uang Keluar (2026)
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Perbandingan total pemasukan dan pengeluaran kas RT setiap bulan</p>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold">
          <span className="flex items-center gap-1.5 text-emerald-700">
            <span className="w-3 h-3 rounded bg-emerald-600 inline-block" /> Uang Masuk
          </span>
          <span className="flex items-center gap-1.5 text-rose-700">
            <span className="w-3 h-3 rounded bg-rose-600 inline-block" /> Uang Keluar
          </span>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={MONTHLY_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }} barGap={8}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 12, fontWeight: '600' }} />
            <YAxis stroke="#64748b" tick={{ fontSize: 11 }} tickFormatter={(val) => `${(val / 1000000).toFixed(1)} Jt`} />
            <Tooltip
              contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '0.75rem', fontSize: '12px', color: '#0f172a', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}
              formatter={(val: any) => [`Rp ${Number(val).toLocaleString('id-ID')}`, '']}
            />
            <Bar dataKey="Pemasukan" name="Uang Masuk" fill="#059669" radius={[6, 6, 0, 0]} />
            <Bar dataKey="Pengeluaran" name="Uang Keluar" fill="#e11d48" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
