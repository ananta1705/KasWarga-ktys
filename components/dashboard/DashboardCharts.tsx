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

import { useApp } from '../../context/AppContext';

export const DashboardCharts: React.FC = () => {
  const { transactions } = useApp();

  const currentYear = new Date().getFullYear();
  const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  
  const monthlyData = monthNames.map(month => ({
    month,
    Pemasukan: 0,
    Pengeluaran: 0
  }));

  transactions.forEach(t => {
    if (!t.date) return;
    const dateObj = new Date(t.date);
    if (dateObj.getFullYear() === currentYear) {
      const monthIndex = dateObj.getMonth();
      if (t.type === 'income') {
        monthlyData[monthIndex].Pemasukan += Number(t.amount) || 0;
      } else if (t.type === 'expense') {
        monthlyData[monthIndex].Pengeluaran += Number(t.amount) || 0;
      }
    }
  });

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-slate-100 pb-4">
        <div>
          <h3 className="font-extrabold text-slate-900 text-base tracking-tight">
            Grafik Ringkasan Uang Masuk vs Uang Keluar ({currentYear})
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
          <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }} barGap={8}>
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
