'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Printer, Building2, Edit3, CheckCircle2 } from 'lucide-react';

interface PreviewPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PreviewPrintModal: React.FC<PreviewPrintModalProps> = ({ isOpen, onClose }) => {
  const { transactions, rtSettings } = useApp();

  const [title, setTitle] = useState('LAPORAN PERTANGGUNGJAWABAN KEUANGAN KAS RT');
  const [periode, setPeriode] = useState(new Date().toLocaleString('id-ID', { month: 'long', year: 'numeric' }));
  const [namaKetuaRt, setNamaKetuaRt] = useState(rtSettings.namaKetuaRt);
  const [namaBendahara, setNamaBendahara] = useState(rtSettings.namaBendahara);
  const [catatanTambahan, setCatatanTambahan] = useState(
    'Laporan keuangan kas RT ini telah diteliti dan disetujui bersama oleh pengurus RT.'
  );

  useEffect(() => {
    if (rtSettings) {
      setNamaKetuaRt(rtSettings.namaKetuaRt);
      setNamaBendahara(rtSettings.namaBendahara);
    }
  }, [rtSettings]);

  if (!isOpen) return null;

  const totalIncome = transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const saldoAkhir = totalIncome - totalExpense;

  const handleExecutePrint = () => {
    document.body.classList.add('laporan-printing');
    window.print();
    setTimeout(() => {
      document.body.classList.remove('laporan-printing');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in laporan-modal-overlay">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full p-6 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto laporan-modal-box">
        {/* Header Modal */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
              <Printer className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base tracking-tight">Pratinjau & Edit Sebelum Cetak PDF</h3>
              <p className="text-xs text-slate-500 font-medium">Sesuaikan judul, nama pengurus, dan catatan sebelum mencetak</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2 Column Layout: Edit Panel & Live A4 Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 laporan-content-grid">
          {/* Left Edit Controls */}
          <div className="space-y-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200/80 laporan-edit-panel">
            <div className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5 border-b border-slate-200 pb-2">
              <Edit3 className="w-4 h-4 text-emerald-600" /> Edit Rincian Dokumen
            </div>

            <div>
              <label className="block text-[11px] font-extrabold text-slate-700 uppercase mb-1">Judul Laporan</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-extrabold text-slate-700 uppercase mb-1">Periode Bulan</label>
              <input
                type="text"
                value={periode}
                onChange={(e) => setPeriode(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-extrabold text-slate-700 uppercase mb-1">Nama Ketua RT</label>
              <input
                type="text"
                value={namaKetuaRt}
                onChange={(e) => setNamaKetuaRt(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-extrabold text-slate-700 uppercase mb-1">Nama Bendahara RT</label>
              <input
                type="text"
                value={namaBendahara}
                onChange={(e) => setNamaBendahara(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-extrabold text-slate-700 uppercase mb-1">Catatan Tambahan Pengurus</label>
              <textarea
                rows={3}
                value={catatanTambahan}
                onChange={(e) => setCatatanTambahan(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          {/* Right Live Preview Box */}
          <div className="md:col-span-2 bg-white border border-slate-300 rounded-2xl p-6 shadow-md text-slate-900 space-y-5 text-xs font-sans laporan-printable-area">
            {/* Kop Surat */}
            <div className="border-b-2 border-slate-900 pb-3 text-center space-y-1">
              <h1 className="text-base font-extrabold uppercase tracking-tight text-slate-900">{title}</h1>
              <h2 className="text-xs font-bold text-slate-700 uppercase">{rtSettings.rtRwName} • {rtSettings.kelurahan}</h2>
              <p className="text-[11px] text-slate-500">Periode: {periode}</p>
            </div>

            {/* Financial Summary */}
            <div className="grid grid-cols-3 gap-3 text-center border border-slate-200 p-3 rounded-xl bg-slate-50">
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-500">Total Masuk</div>
                <div className="font-extrabold text-emerald-700">Rp {totalIncome.toLocaleString('id-ID')}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-500">Total Keluar</div>
                <div className="font-extrabold text-rose-700">Rp {totalExpense.toLocaleString('id-ID')}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-500">Saldo Akhir</div>
                <div className="font-extrabold text-slate-900">Rp {saldoAkhir.toLocaleString('id-ID')}</div>
              </div>
            </div>

            {/* Table Preview */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] border border-slate-300">
                <thead className="bg-slate-100 font-extrabold border-b border-slate-300">
                  <tr>
                    <th className="p-2 border-r border-slate-300">Tanggal</th>
                    <th className="p-2 border-r border-slate-300">Keterangan</th>
                    <th className="p-2 border-r border-slate-300">Kategori</th>
                    <th className="p-2 text-right">Nominal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {transactions.map((t) => (
                    <tr key={t.id}>
                      <td className="p-2 border-r border-slate-200 font-mono">{t.date}</td>
                      <td className="p-2 border-r border-slate-200 font-extrabold">{t.description}</td>
                      <td className="p-2 border-r border-slate-200">{t.category}</td>
                      <td className={`p-2 text-right font-extrabold ${t.type === 'income' ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {t.type === 'income' ? '+' : '-'} Rp {t.amount.toLocaleString('id-ID')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {catatanTambahan && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-700 italic">
                <strong>Catatan Pengurus:</strong> {catatanTambahan}
              </div>
            )}

            {/* Signature Preview */}
            <div className="pt-6 grid grid-cols-2 text-center text-[11px]">
              <div>
                <div>Mengetahui,<br /><strong className="font-bold">Ketua RT</strong></div>
                <div className="font-extrabold underline mt-10">{namaKetuaRt}</div>
              </div>

              <div>
                <div>Dibuat Oleh,<br /><strong className="font-bold">Bendahara RT</strong></div>
                <div className="font-extrabold underline mt-10">{namaBendahara}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex justify-between items-center border-t border-slate-100 laporan-footer-actions">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
          >
            Batal
          </button>
          <button
            onClick={handleExecutePrint}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs shadow-md shadow-emerald-600/20 flex items-center gap-2 cursor-pointer transition-all"
          >
            <Printer className="w-4 h-4" /> Cetak Dokumen PDF (A4)
          </button>
        </div>
      </div>
    </div>
  );
};
