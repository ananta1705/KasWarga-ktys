'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Download, FileSpreadsheet, Edit3 } from 'lucide-react';

interface PreviewExcelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PreviewExcelModal: React.FC<PreviewExcelModalProps> = ({ isOpen, onClose }) => {
  const { transactions, rtSettings, addToast } = useApp();

  const [title, setTitle] = useState('LAPORAN PERTANGGUNGJAWABAN KEUANGAN KAS RT');
  const [periode, setPeriode] = useState('Juli 2026');
  const [namaKetuaRt, setNamaKetuaRt] = useState(rtSettings.namaKetuaRt);
  const [namaBendahara, setNamaBendahara] = useState(rtSettings.namaBendahara);
  const [catatanTambahan, setCatatanTambahan] = useState(
    'Laporan pertanggungjawaban kas disahkan oleh pengurus RT.'
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
  const saldoAkhir = 15450000 + totalIncome - totalExpense;

  const handleDownloadFormattedExcel = () => {
    const tableRows = transactions
      .map(
        (t) => `
      <tr>
        <td style="border:1px solid #cbd5e1; padding:6px; font-family:monospace; text-align:center;">${t.date}</td>
        <td style="border:1px solid #cbd5e1; padding:6px; font-weight:bold;">${t.description}</td>
        <td style="border:1px solid #cbd5e1; padding:6px;">${t.category}</td>
        <td style="border:1px solid #cbd5e1; padding:6px;">${t.paymentMethod || 'Tunai'}</td>
        <td style="border:1px solid #cbd5e1; padding:6px;">${t.sourceOrRecipient || '-'}</td>
        <td style="border:1px solid #cbd5e1; padding:6px;">${t.recordedBy}</td>
        <td style="border:1px solid #cbd5e1; padding:6px; text-align:right; font-weight:bold; color:${
          t.type === 'income' ? '#059669' : '#e11d48'
        };">
          ${t.type === 'income' ? '+' : '-'} Rp ${t.amount.toLocaleString('id-ID')}
        </td>
      </tr>
    `
      )
      .join('');

    const excelTemplate = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8"/>
        <!--[if gte mso 9]>
        <xml>
          <x:ExcelWorkbook>
            <x:ExcelWorksheets>
              <x:ExcelWorksheet>
                <x:Name>Laporan Kas RT</x:Name>
                <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
              </x:ExcelWorksheet>
            </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
        <![endif]-->
        <style>
          body { font-family: Arial, sans-serif; font-size: 11pt; }
          .kop { font-size: 16pt; font-weight: bold; text-align: center; }
          .subkop { font-size: 12pt; font-weight: bold; text-align: center; color: #475569; }
          .th-head { background-color: #059669; color: #ffffff; font-weight: bold; text-align: center; border: 1px solid #047857; padding: 8px; }
          .sum-card { background-color: #f8fafc; font-weight: bold; border: 1px solid #cbd5e1; padding: 8px; text-align: center; }
        </style>
      </head>
      <body>
        <table>
          <tr><td colspan="7" class="kop">${title}</td></tr>
          <tr><td colspan="7" class="subkop">${rtSettings.rtRwName} • ${rtSettings.kelurahan}</td></tr>
          <tr><td colspan="7" style="text-align:center; font-size:10pt; color:#64748b;">Periode: ${periode} | Dicetak: ${new Date().toLocaleDateString('id-ID')}</td></tr>
          <tr><td colspan="7"></td></tr>
          
          <!-- Summary Cards -->
          <tr>
            <td colspan="2" class="sum-card">TOTAL UANG MASUK:<br/><span style="color:#059669; font-size:13pt;">Rp ${totalIncome.toLocaleString('id-ID')}</span></td>
            <td colspan="2" class="sum-card">TOTAL UANG KELUAR:<br/><span style="color:#e11d48; font-size:13pt;">Rp ${totalExpense.toLocaleString('id-ID')}</span></td>
            <td colspan="3" class="sum-card">SALDO AKHIR KAS RT:<br/><span style="color:#0f172a; font-size:13pt;">Rp ${saldoAkhir.toLocaleString('id-ID')}</span></td>
          </tr>
          <tr><td colspan="7"></td></tr>

          <!-- Table Header -->
          <tr>
            <th class="th-head">Tanggal</th>
            <th class="th-head">Keterangan Transaksi</th>
            <th class="th-head">Kategori Pos</th>
            <th class="th-head">Metode Bayar</th>
            <th class="th-head">Sumber / Toko</th>
            <th class="th-head">Pencatat</th>
            <th class="th-head">Nominal (Rp)</th>
          </tr>

          ${tableRows}

          <tr><td colspan="7"></td></tr>
          ${
            catatanTambahan
              ? `<tr><td colspan="7" style="background-color:#f1f5f9; padding:8px; font-style:italic; border:1px solid #cbd5e1;">Catatan Pengurus: ${catatanTambahan}</td></tr><tr><td colspan="7"></td></tr>`
              : ''
          }

          <!-- Signatures -->
          <tr>
            <td colspan="3" style="text-align:center;">Mengetahui,<br/><b>Ketua ${rtSettings.rtRwName}</b><br/><br/><br/><br/><u><b>${namaKetuaRt}</b></u></td>
            <td colspan="1"></td>
            <td colspan="3" style="text-align:center;">Dibuat Oleh,<br/><b>Bendahara ${rtSettings.rtRwName}</b><br/><br/><br/><br/><u><b>${namaBendahara}</b></u></td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([excelTemplate], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Laporan_Kas_Rapi_${rtSettings.rtRwName.replace(/[^a-zA-Z0-9]/g, '_')}_Juli_2026.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast('File Excel Rapi (.XLS) berhasil diunduh!', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in no-print">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full p-6 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto">
        {/* Header Modal */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base tracking-tight">Pratinjau & Edit Sebelum Unduh Excel</h3>
              <p className="text-xs text-slate-500 font-medium">Periksa tampilan tabel Excel rapi dan sesuaikan nama pengurus</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Edit Controls */}
          <div className="space-y-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <div className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5 border-b border-slate-200 pb-2">
              <Edit3 className="w-4 h-4 text-emerald-600" /> Edit Rincian Excel
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
              <label className="block text-[11px] font-extrabold text-slate-700 uppercase mb-1">Catatan Tambahan Excel</label>
              <textarea
                rows={3}
                value={catatanTambahan}
                onChange={(e) => setCatatanTambahan(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          {/* Right Live Excel Preview Box */}
          <div className="md:col-span-2 bg-white border border-slate-300 rounded-2xl p-5 shadow-md text-slate-900 space-y-4 text-xs font-sans">
            <div className="border-b-2 border-emerald-600 pb-2 text-center">
              <h4 className="font-extrabold text-sm text-slate-900 uppercase">{title}</h4>
              <p className="text-[11px] text-slate-600 font-bold">{rtSettings.rtRwName} • {rtSettings.kelurahan}</p>
              <span className="text-[10px] text-emerald-700 font-extrabold">Format Rapi MS Excel (.XLS)</span>
            </div>

            {/* Summary Row */}
            <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-center font-bold text-[11px]">
              <div>
                <span className="text-slate-500 text-[10px]">UANG MASUK</span>
                <div className="text-emerald-700 font-extrabold">Rp {totalIncome.toLocaleString('id-ID')}</div>
              </div>
              <div>
                <span className="text-slate-500 text-[10px]">UANG KELUAR</span>
                <div className="text-rose-700 font-extrabold">Rp {totalExpense.toLocaleString('id-ID')}</div>
              </div>
              <div>
                <span className="text-slate-500 text-[10px]">SALDO AKHIR</span>
                <div className="text-slate-900 font-extrabold">Rp {saldoAkhir.toLocaleString('id-ID')}</div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] border border-slate-200">
                <thead className="bg-emerald-600 text-white font-extrabold">
                  <tr>
                    <th className="p-2 border-r border-emerald-700">Tanggal</th>
                    <th className="p-2 border-r border-emerald-700">Keterangan</th>
                    <th className="p-2 border-r border-emerald-700">Kategori</th>
                    <th className="p-2 text-right">Nominal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {transactions.slice(0, 5).map((t) => (
                    <tr key={t.id}>
                      <td className="p-2 border-r border-slate-200 font-mono text-[10px]">{t.date}</td>
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

            {/* Signatures */}
            <div className="pt-4 grid grid-cols-2 text-center text-[10px] text-slate-700">
              <div>Ketua RT: <strong>{namaKetuaRt}</strong></div>
              <div>Bendahara RT: <strong>{namaBendahara}</strong></div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex justify-between items-center border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
          >
            Batal
          </button>
          <button
            onClick={handleDownloadFormattedExcel}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs shadow-md shadow-emerald-600/20 flex items-center gap-2 cursor-pointer transition-all"
          >
            <Download className="w-4 h-4" /> Unduh File Excel Rapi (.XLS)
          </button>
        </div>
      </div>
    </div>
  );
};
