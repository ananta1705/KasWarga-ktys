'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Printer, Building2, CheckCircle2, ShieldCheck, Share2, Copy } from 'lucide-react';

export const KwitansiModal: React.FC = () => {
  const { isKwitansiOpen, setIsKwitansiOpen, kwitansiData, rtSettings, addToast } = useApp();

  if (!isKwitansiOpen || !kwitansiData) return null;

  const handlePrint = () => {
    document.body.classList.add('kwitansi-printing');
    window.print();
    setTimeout(() => {
      document.body.classList.remove('kwitansi-printing');
    }, 1000);
  };

  const getFormattedWaMessage = () => {
    return [
      `🧾 *KWITANSI RESMI PEMBAYARAN IURAN KAS*`,
      `*${rtSettings.rtRwName.toUpperCase()} • ${rtSettings.kelurahan.toUpperCase()}*`,
      `==================================`,
      `*No. Struk:* \`${kwitansiData.noStruk}\``,
      `*Tanggal:* ${kwitansiData.date}`,
      ``,
      `*Nama Warga:* ${kwitansiData.wargaName}`,
      `*Alamat:* ${kwitansiData.houseNo}`,
      `*Untuk:* Iuran Kas RT Bulanan (${kwitansiData.month})`,
      ``,
      `*TOTAL NOMINAL:* *Rp ${kwitansiData.amount.toLocaleString('id-ID')}*`,
      `*STATUS:* ✅ *LUNAS*`,
      `==================================`,
      `*Penerima/Bendahara:* ${kwitansiData.recordedBy}`,
      `_Verified Digital Receipt - Sistem KasWarga_`,
    ].join('\n');
  };

  const handleShareWhatsApp = () => {
    const text = getFormattedWaMessage();
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    addToast('Pesan struk kwitansi rapi dikirim ke WhatsApp!', 'success');
  };

  const handleCopyText = () => {
    const text = getFormattedWaMessage();
    navigator.clipboard.writeText(text);
    addToast('Teks Struk Kwitansi berhasil disalin ke clipboard!', 'success');
  };

  return (
    <div className="kwitansi-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div className="kwitansi-modal-box bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 no-print">
          <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-700 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" /> Kwitansi Resmi Pelunasan Iuran
          </div>

          <button
            onClick={() => setIsKwitansiOpen(false)}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Physical Receipt Voucher Card */}
        <div className="kwitansi-printable-area p-6 rounded-2xl bg-white border-2 border-slate-900 space-y-5 text-slate-900 font-sans relative overflow-hidden shadow-sm">
          {/* Watermark LUNAS Background Stamp */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none rotate-[-20deg] border-8 border-emerald-600 px-6 py-2 rounded-2xl">
            <span className="text-6xl font-black text-emerald-600 tracking-widest">LUNAS</span>
          </div>

          {/* RT Header Logo */}
          <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-700 flex items-center justify-center text-white font-bold shadow-xs">
                <Building2 className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="font-extrabold text-base text-slate-900 tracking-tight uppercase">
                  KWITANSI PEMBAYARAN {rtSettings.rtRwName}
                </h4>
                <p className="text-[11px] text-slate-600 font-bold uppercase">{rtSettings.kelurahan}</p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] text-slate-500 uppercase font-extrabold">NO STRUK</div>
              <div className="font-mono font-bold text-xs text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {kwitansiData.noStruk}
              </div>
            </div>
          </div>

          {/* Details Table */}
          <div className="space-y-3 text-xs pt-1">
            <div className="grid grid-cols-3 py-1 border-b border-slate-200">
              <span className="text-slate-600 font-medium col-span-1">Telah Diterima Dari:</span>
              <span className="font-extrabold text-slate-900 col-span-2 text-right">{kwitansiData.wargaName}</span>
            </div>
            <div className="grid grid-cols-3 py-1 border-b border-slate-200">
              <span className="text-slate-600 font-medium col-span-1">Alamat Rumah / Blok:</span>
              <span className="font-bold text-slate-900 col-span-2 text-right">{kwitansiData.houseNo}</span>
            </div>
            <div className="grid grid-cols-3 py-1 border-b border-slate-200">
              <span className="text-slate-600 font-medium col-span-1">Untuk Pembayaran:</span>
              <span className="font-semibold text-slate-900 col-span-2 text-right">
                Iuran Kas RT Bulanan - {kwitansiData.month}
              </span>
            </div>
            <div className="grid grid-cols-3 py-1 border-b border-slate-200">
              <span className="text-slate-600 font-medium col-span-1">Tanggal Pembayaran:</span>
              <span className="font-mono font-bold text-slate-900 col-span-2 text-right">{kwitansiData.date}</span>
            </div>
          </div>

          {/* Amount Box */}
          <div className="p-4 rounded-xl bg-emerald-700 text-white flex items-center justify-between border border-emerald-800 shadow-xs">
            <div>
              <div className="text-[10px] uppercase font-bold text-emerald-100">JUMLAH NOMINAL LUNAS</div>
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Rp {kwitansiData.amount.toLocaleString('id-ID')},-
              </div>
            </div>
            <span className="px-3.5 py-1.5 bg-white text-emerald-800 text-xs font-black rounded-full flex items-center gap-1.5 shadow-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> LUNAS
            </span>
          </div>

          {/* Footer Signature */}
          <div className="pt-4 grid grid-cols-2 text-center text-xs text-slate-900">
            <div>
              <div className="text-[11px] text-slate-500 font-medium">Cap / Stempel RT</div>
              <div className="mt-8 text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 py-1 rounded border border-emerald-200 inline-block px-3">
                VERIFIED DIGITAL RECEIPT
              </div>
            </div>

            <div>
              <div className="text-[11px] text-slate-500 font-medium">Penerima / Bendahara RT</div>
              <div className="font-extrabold underline mt-8 text-slate-900">{kwitansiData.recordedBy}</div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-2 no-print">
          <button
            type="button"
            onClick={() => setIsKwitansiOpen(false)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-extrabold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
          >
            Tutup
          </button>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopyText}
              className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-extrabold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
              title="Salin Teks Struk"
            >
              <Copy className="w-4 h-4" /> Salin Teks
            </button>
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-extrabold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
            >
              <Share2 className="w-4 h-4" /> Kirim ke WA
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
            >
              <Printer className="w-4 h-4" /> Cetak Kwitansi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
