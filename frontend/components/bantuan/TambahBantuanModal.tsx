'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, HeartHandshake } from 'lucide-react';
import { BantuanStatus } from '../../types/kaswarga';

export const TambahBantuanModal: React.FC = () => {
  const { isTambahBantuanOpen, setIsTambahBantuanOpen, addBantuan, wargaList } = useApp();

  const [wargaId, setWargaId] = useState('');
  const [manualName, setManualName] = useState('');
  const [manualHouseNo, setManualHouseNo] = useState('');
  const [jenisBantuan, setJenisBantuan] = useState('');
  const [keterangan, setKeterangan] = useState('');

  if (!isTambahBantuanOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let finalName = manualName;
    let finalHouse = manualHouseNo;
    
    if (wargaId) {
      const selectedWarga = wargaList.find((w) => w.id === wargaId);
      if (selectedWarga) {
        finalName = selectedWarga.name;
        finalHouse = selectedWarga.houseNo;
      }
    }

    if (!finalName || !jenisBantuan) return;

    addBantuan({
      wargaId: wargaId || undefined,
      wargaName: finalName,
      houseNo: finalHouse || '-',
      jenisBantuan,
      status: 'Diusulkan',
      tanggalUsulan: new Date().toISOString().split('T')[0],
      keterangan,
    });

    setIsTambahBantuanOpen(false);
    setWargaId('');
    setManualName('');
    setManualHouseNo('');
    setJenisBantuan('');
    setKeterangan('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base tracking-tight">Usulkan Bantuan Baru</h3>
              <p className="text-xs text-slate-500 font-medium">Catat usulan bantuan sosial dari/untuk warga</p>
            </div>
          </div>

          <button
            onClick={() => setIsTambahBantuanOpen(false)}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
              Pilih Warga (Terdaftar)
            </label>
            <select
              value={wargaId}
              onChange={(e) => {
                setWargaId(e.target.value);
                setManualName('');
                setManualHouseNo('');
              }}
              className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-3 text-sm text-slate-900 font-semibold focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
            >
              <option value="">-- Ketik Manual (Jika Tidak Ada di Daftar) --</option>
              {wargaList.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name} ({w.houseNo})
                </option>
              ))}
            </select>
          </div>

          {!wargaId && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nama Warga *
                </label>
                <input
                  type="text"
                  required={!wargaId}
                  placeholder="Nama Lengkap"
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-3 text-sm text-slate-900 font-semibold focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
                />
              </div>
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nomor Rumah
                </label>
                <input
                  type="text"
                  placeholder="Misal: Blok A No. 1"
                  value={manualHouseNo}
                  onChange={(e) => setManualHouseNo(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-3 text-sm text-slate-900 font-semibold focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
              Jenis Bantuan *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: BLT, Sembako, KIP, Bedah Rumah"
              value={jenisBantuan}
              onChange={(e) => setJenisBantuan(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-3 text-sm text-slate-900 font-semibold focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
              Keterangan Tambahan
            </label>
            <textarea
              placeholder="Alasan pengusulan atau catatan kelurahan..."
              rows={3}
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-3 text-sm text-slate-900 font-medium focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 resize-none"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsTambahBantuanOpen(false)}
              className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs shadow-md shadow-emerald-600/20 cursor-pointer transition-all"
            >
              Kirim Usulan Bantuan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
