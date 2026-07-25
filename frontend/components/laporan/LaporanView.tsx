'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Printer, Download, Eye, Edit, Trash2 } from 'lucide-react';
import { ConfirmModal } from '../common/ConfirmModal';
import { PreviewPrintModal } from './PreviewPrintModal';
import { PreviewExcelModal } from './PreviewExcelModal';
import { Transaction } from '../../types/kaswarga';

export const LaporanView: React.FC = () => {
  const {
    transactions,
    rtSettings,
    openDetailTransaction,
    openEditTransaction,
    deleteTransaction,
  } = useApp();

  const [filterType, setFilterType] = useState<'ALL' | 'INCOME' | 'EXPENSE'>('ALL');
  const [deleteTarget, setDeleteTarget] = useState<Transaction | null>(null);
  const [isPreviewPrintOpen, setIsPreviewPrintOpen] = useState(false);
  const [isPreviewExcelOpen, setIsPreviewExcelOpen] = useState(false);

  const filtered = transactions.filter((t) => {
    if (filterType === 'INCOME') return t.type === 'income';
    if (filterType === 'EXPENSE') return t.type === 'expense';
    return true;
  });

  const totalIncome = transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const saldoAkhir = 15450000 + totalIncome - totalExpense;

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      deleteTransaction(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Official A4 Print Kop Surat (Visible Only When Printing) */}
      <div className="print-only mb-6 border-b-2 border-slate-900 pb-4 text-center space-y-1">
        <h1 className="text-xl font-extrabold uppercase tracking-tight">LAPORAN PERTANGGUNGJAWABAN KEUANGAN KAS RT</h1>
        <h2 className="text-base font-bold text-slate-800 uppercase">{rtSettings.rtRwName} • {rtSettings.kelurahan}</h2>
        <p className="text-xs text-slate-600">Periode: Juli 2026 • Dicetak Tanggal: {new Date().toLocaleDateString('id-ID')}</p>
      </div>

      {/* Screen Header Controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 tracking-tight">
            <FileText className="w-6 h-6 text-emerald-600" /> Laporan Keuangan Kas {rtSettings.rtRwName}
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Ringkasan Laporan Pertanggungjawaban Kas Transparan - Juli 2026</p>
        </div>

        {/* Print / Export Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPreviewPrintOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" /> Cetak PDF (A4)
          </button>
          <button
            onClick={() => setIsPreviewExcelOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200/80 rounded-xl text-xs font-extrabold transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" /> Unduh Excel (.XLS Rapi)
          </button>
        </div>
      </div>

      {/* Summary Financial Statement Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-xs">
          <div className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Total Uang Masuk</div>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">Rp {totalIncome.toLocaleString('id-ID')}</div>
        </div>
        <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-xs">
          <div className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Total Uang Keluar</div>
          <div className="text-2xl font-extrabold text-rose-600 mt-1">Rp {totalExpense.toLocaleString('id-ID')}</div>
        </div>
        <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-xs">
          <div className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Saldo Akhir Kas RT</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">Rp {saldoAkhir.toLocaleString('id-ID')}</div>
        </div>
      </div>

      {/* Filter Tabs & Transactions Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs space-y-4 p-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 no-print">
          <h3 className="font-extrabold text-slate-900 text-base tracking-tight">Rincian Catatan Transaksi Kas</h3>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-3.5 py-1.5 rounded-lg font-extrabold transition-all ${
                filterType === 'ALL' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua ({transactions.length})
            </button>
            <button
              onClick={() => setFilterType('INCOME')}
              className={`px-3.5 py-1.5 rounded-lg font-extrabold transition-all ${
                filterType === 'INCOME' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Uang Masuk
            </button>
            <button
              onClick={() => setFilterType('EXPENSE')}
              className={`px-3.5 py-1.5 rounded-lg font-extrabold transition-all ${
                filterType === 'EXPENSE' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Uang Keluar
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[11px] font-extrabold tracking-wider border-b border-slate-200/80">
              <tr>
                <th className="py-3.5 px-4">Tanggal</th>
                <th className="py-3.5 px-4">Keterangan</th>
                <th className="py-3.5 px-4">Kategori Pos</th>
                <th className="py-3.5 px-4">Pencatat</th>
                <th className="py-3.5 px-4 text-right">Nominal (Rp)</th>
                <th className="py-3.5 px-4 text-center no-print">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-600">{tx.date}</td>
                  <td className="py-3.5 px-4 font-extrabold text-slate-900">{tx.description}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700">{tx.category}</td>
                  <td className="py-3.5 px-4 text-slate-500 font-medium">{tx.recordedBy}</td>
                  <td
                    className={`py-3.5 px-4 text-right font-extrabold ${
                      tx.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {tx.type === 'income' ? '+' : '-'} Rp {tx.amount.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3.5 px-4 text-center no-print">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => openDetailTransaction(tx)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80 transition-colors cursor-pointer"
                        title="Lihat Detail Transaksi"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openEditTransaction(tx)}
                        className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors cursor-pointer"
                        title="Edit Transaksi Kas"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(tx)}
                        className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer"
                        title="Hapus Transaksi Kas"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Signature Area (Visible Only When Printing) */}
      <div className="print-only pt-10 grid grid-cols-2 text-center text-xs text-slate-900">
        <div className="space-y-16">
          <div>Mengetahui,<br /><strong className="font-extrabold">Ketua {rtSettings.rtRwName}</strong></div>
          <div className="font-extrabold underline">{rtSettings.namaKetuaRt}</div>
        </div>

        <div className="space-y-16">
          <div>Dibuat Oleh,<br /><strong className="font-extrabold">Bendahara {rtSettings.rtRwName}</strong></div>
          <div className="font-extrabold underline">{rtSettings.namaBendahara}</div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="Hapus Catatan Transaksi Kas?"
        description={`Apakah Anda yakin ingin menghapus transaksi "${deleteTarget?.description}" sebesar Rp ${deleteTarget?.amount.toLocaleString('id-ID')}? Saldo kas RT akan otomatis dihitung ulang.`}
        confirmText="Hapus Permanen"
        cancelText="Batal"
        type="danger"
      />

      {/* Pratinjau & Edit Modal Sebelum Cetak PDF */}
      <PreviewPrintModal isOpen={isPreviewPrintOpen} onClose={() => setIsPreviewPrintOpen(false)} />

      {/* Pratinjau & Edit Modal Sebelum Unduh Excel */}
      <PreviewExcelModal isOpen={isPreviewExcelOpen} onClose={() => setIsPreviewExcelOpen(false)} />
    </div>
  );
};
