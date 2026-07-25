'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Send, Check, AlertCircle } from 'lucide-react';

export const DaftarWargaBelumBayar: React.FC = () => {
  const { wargaList, toggleWargaPayment, sendReminderWhatsApp, setActiveTab } = useApp();

  const unpaidList = wargaList.filter((w) => w.status === 'Belum Bayar');

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2 tracking-tight">
            <AlertCircle className="w-5 h-5 text-amber-500" /> Daftar Warga Belum Bayar Iuran Bulan Ini
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Tekan tombol pengingat WA atau tandai lunas setelah menerima iuran</p>
        </div>

        <button
          onClick={() => setActiveTab('warga')}
          className="text-xs text-emerald-600 hover:text-emerald-700 font-extrabold hover:underline w-fit"
        >
          Kelola Semua Warga →
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 text-slate-600 uppercase text-[11px] font-extrabold tracking-wider border-b border-slate-200/80">
            <tr>
              <th className="py-3.5 px-4">Nama Warga & Rumah</th>
              <th className="py-3.5 px-4">Telepon / WA</th>
              <th className="py-3.5 px-4">Terakhir Bayar</th>
              <th className="py-3.5 px-4 text-right">Nominal Iuran</th>
              <th className="py-3.5 px-4 text-center">Aksi Cepat</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {unpaidList.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-500 font-bold">
                  Semua warga telah melunasi iuran bulan ini! 🎉
                </td>
              </tr>
            ) : (
              unpaidList.map((w) => (
                <tr key={w.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img src={w.avatar} alt={w.name} className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0" />
                      <div>
                        <div className="font-extrabold text-slate-900 text-sm">{w.name}</div>
                        <div className="text-xs text-emerald-600 font-extrabold">{w.houseNo}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs font-semibold text-slate-600">{w.phone}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700">{w.lastPaidMonth}</td>
                  <td className="py-3.5 px-4 text-right font-extrabold text-rose-600 text-sm">
                    Rp {w.amount.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => sendReminderWhatsApp(w)}
                        className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                        title="Kirim Pesan WhatsApp Pengingat"
                      >
                        <Send className="w-3.5 h-3.5" /> Kirim WA
                      </button>
                      <button
                        onClick={() => toggleWargaPayment(w.id)}
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-1 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                        title="Tandai Sudah Lunas"
                      >
                        <Check className="w-4 h-4 stroke-[3]" /> Tandai Lunas
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
