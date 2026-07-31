'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Printer, Building2, ShieldCheck, Share2, Copy } from 'lucide-react';

export const SuratPengantarModal: React.FC = () => {
  const { isSuratPengantarOpen, setIsSuratPengantarOpen, suratPengantarData, rtSettings, addToast } = useApp();

  if (!isSuratPengantarOpen || !suratPengantarData) return null;

  const handlePrint = () => {
    document.body.classList.add('surat-printing');
    window.print();
    setTimeout(() => {
      document.body.classList.remove('surat-printing');
    }, 1000);
  };

  const getFormattedWaMessage = () => {
    return [
      `📄 *SURAT PENGANTAR RT*`,
      `*${rtSettings.rtRwName.toUpperCase()} • ${rtSettings.kelurahan.toUpperCase()}*`,
      `==================================`,
      `Yang bertanda tangan di bawah ini Pengurus ${rtSettings.rtRwName}, menerangkan bahwa:`,
      ``,
      `*Nama:* ${suratPengantarData.wargaName}`,
      `*Alamat:* ${suratPengantarData.houseNo}`,
      ``,
      `Adalah benar warga kami dan dengan ini kami berikan pengantar untuk keperluan pengajuan/penerimaan *Bantuan Sosial (${suratPengantarData.jenisBantuan})*.`,
      ``,
      `Demikian surat pengantar ini dibuat untuk dapat dipergunakan sebagaimana mestinya.`,
      `==================================`,
      `*Tgl Dikeluarkan:* ${new Date().toLocaleDateString('id-ID')}`,
      `_Sistem KasWarga_`,
    ].join('\n');
  };

  const handleShareWhatsApp = () => {
    const text = getFormattedWaMessage();
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    addToast('Surat Pengantar berhasil disiapkan di WhatsApp!', 'success');
  };

  const handleCopyText = () => {
    const text = getFormattedWaMessage();
    navigator.clipboard.writeText(text);
    addToast('Teks Surat Pengantar berhasil disalin ke clipboard!', 'success');
  };

  return (
    <div className="surat-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div className="surat-modal-box bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6 flex flex-col max-h-[90vh] relative">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 no-print">
          <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-700 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" /> Surat Keterangan / Pengantar
          </div>

          <button
            onClick={() => setIsSuratPengantarOpen(false)}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Area */}
        <div className="surat-printable-area p-8 rounded-2xl bg-white border-2 border-slate-900 space-y-6 text-slate-900 font-sans relative overflow-y-auto shadow-sm flex-1">
          
          {/* Header Surat */}
          <div className="text-center border-b-2 border-slate-900 pb-4">
            <h4 className="font-extrabold text-xl text-slate-900 tracking-tight uppercase">
              PENGURUS {rtSettings.rtRwName}
            </h4>
            <p className="text-sm text-slate-600 font-bold uppercase">{rtSettings.kelurahan}</p>
          </div>

          <div className="text-center">
            <h5 className="font-extrabold text-lg underline underline-offset-4">SURAT PENGANTAR</h5>
            <p className="text-xs font-medium mt-1">No: {suratPengantarData.id}/SP/{new Date().getFullYear()}</p>
          </div>

          {/* Isi Surat */}
          <div className="space-y-4 text-sm leading-relaxed text-justify">
            <p>
              Yang bertanda tangan di bawah ini Pengurus {rtSettings.rtRwName}, Kelurahan {rtSettings.kelurahan}, dengan ini menerangkan bahwa:
            </p>
            
            <div className="ml-4 space-y-2">
              <div className="grid grid-cols-4">
                <span className="font-semibold col-span-1">Nama</span>
                <span className="col-span-3">: <span className="font-bold">{suratPengantarData.wargaName}</span></span>
              </div>
              <div className="grid grid-cols-4">
                <span className="font-semibold col-span-1">Alamat</span>
                <span className="col-span-3">: <span className="font-bold">{suratPengantarData.houseNo}</span></span>
              </div>
              <div className="grid grid-cols-4">
                <span className="font-semibold col-span-1">Keperluan</span>
                <span className="col-span-3">: Pengajuan / Penerimaan <span className="font-bold">Bantuan Sosial ({suratPengantarData.jenisBantuan})</span></span>
              </div>
            </div>

            <p>
              Orang tersebut di atas adalah benar warga kami yang berdomisili di alamat tersebut. Surat pengantar ini diberikan untuk melengkapi persyaratan terkait keperluan bantuan sosial.
            </p>
            <p>
              Demikian surat pengantar ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.
            </p>
          </div>

          {/* Footer Signature */}
          <div className="pt-8 flex justify-end text-center text-sm text-slate-900">
            <div>
              <div className="mb-1">{rtSettings.kelurahan}, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
              <div className="font-medium mb-16">Pengurus {rtSettings.rtRwName}</div>
              <div className="font-extrabold underline text-slate-900">Ketua RT / Sekretaris</div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-2 no-print">
          <button
            type="button"
            onClick={() => setIsSuratPengantarOpen(false)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-extrabold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
          >
            Tutup
          </button>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopyText}
              className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-extrabold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
              title="Salin Teks"
            >
              <Copy className="w-4 h-4" /> Salin Teks
            </button>
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-extrabold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
            >
              <Share2 className="w-4 h-4" /> WA
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
            >
              <Printer className="w-4 h-4" /> Cetak Surat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
