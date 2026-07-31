'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HeartHandshake, Plus, Search, CheckCircle2, Clock, XCircle, FileText, Trash2, Edit, Printer } from 'lucide-react';
import { BantuanStatus } from '../../types/kaswarga';

export const BantuanSosialView: React.FC = () => {
  const { bantuanList, setIsTambahBantuanOpen, userRole, updateBantuanStatus, deleteBantuan, setSuratPengantarData, setIsSuratPengantarOpen } = useApp();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'ALL' | BantuanStatus>('ALL');

  const filteredBantuan = bantuanList.filter((b) => {
    const matchesSearch =
      b.wargaName.toLowerCase().includes(search.toLowerCase()) ||
      b.houseNo.toLowerCase().includes(search.toLowerCase()) ||
      b.jenisBantuan.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || b.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: BantuanStatus) => {
    switch (status) {
      case 'Diusulkan':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Disetujui Kelurahan':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Diterima Warga':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Ditolak':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status: BantuanStatus) => {
    switch (status) {
      case 'Diusulkan':
        return <Clock className="w-3.5 h-3.5" />;
      case 'Disetujui Kelurahan':
        return <FileText className="w-3.5 h-3.5" />;
      case 'Diterima Warga':
        return <CheckCircle2 className="w-3.5 h-3.5" />;
      case 'Ditolak':
        return <XCircle className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 tracking-tight">
            <HeartHandshake className="w-6 h-6 text-emerald-600" /> Bantuan Sosial Warga
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Pendataan pengajuan dan penerimaan bantuan kelurahan/pemerintah</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {userRole === 'admin' && (
            <button
              onClick={() => setIsTambahBantuanOpen(true)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" /> + Usulkan Bantuan
            </button>
          )}

          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs flex-wrap">
            <button
              onClick={() => setFilterStatus('ALL')}
              className={`px-3 py-1.5 rounded-lg font-extrabold transition-all ${
                filterStatus === 'ALL' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua ({bantuanList.length})
            </button>
            <button
              onClick={() => setFilterStatus('Diusulkan')}
              className={`px-3 py-1.5 rounded-lg font-extrabold transition-all ${
                filterStatus === 'Diusulkan' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Usulan ({bantuanList.filter((b) => b.status === 'Diusulkan').length})
            </button>
            <button
              onClick={() => setFilterStatus('Diterima Warga')}
              className={`px-3 py-1.5 rounded-lg font-extrabold transition-all ${
                filterStatus === 'Diterima Warga' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Diterima ({bantuanList.filter((b) => b.status === 'Diterima Warga').length})
            </button>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Cari nama warga, nomor rumah, atau jenis bantuan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-emerald-600"
        />
      </div>

      {/* Grid of Bantuan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBantuan.map((bantuan) => (
          <div key={bantuan.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow space-y-4">
            <div className="flex justify-between items-start gap-3">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">{bantuan.wargaName}</h3>
                <p className="text-xs text-emerald-600 font-extrabold">{bantuan.houseNo}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border flex items-center gap-1 ${getStatusColor(bantuan.status)}`}>
                {getStatusIcon(bantuan.status)} {bantuan.status}
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-600 pt-3 border-t border-slate-100">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Jenis Bantuan:</span>
                <span className="font-bold text-slate-800">{bantuan.jenisBantuan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Tgl Usulan:</span>
                <span className="font-bold text-slate-800">{bantuan.tanggalUsulan}</span>
              </div>
              {bantuan.keterangan && (
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-slate-500 mt-2">
                  <span className="font-bold block mb-1">Keterangan:</span>
                  {bantuan.keterangan}
                </div>
              )}
            </div>

            {userRole === 'admin' && (
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <select
                  value={bantuan.status}
                  onChange={(e) => updateBantuanStatus(bantuan.id, e.target.value as BantuanStatus)}
                  className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 rounded-lg px-2 py-1.5 focus:outline-none focus:border-emerald-500 flex-1"
                >
                  <option value="Diusulkan">⏳ Diusulkan</option>
                  <option value="Disetujui Kelurahan">📄 Disetujui Kelurahan</option>
                  <option value="Diterima Warga">✅ Diterima Warga</option>
                  <option value="Ditolak">❌ Ditolak</option>
                </select>
                <button
                  onClick={() => {
                    setSuratPengantarData(bantuan);
                    setIsSuratPengantarOpen(true);
                  }}
                  className="p-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border border-transparent hover:border-emerald-200 rounded-lg transition-all cursor-pointer shadow-xs"
                  title="Cetak Surat Keterangan"
                >
                  <Printer className="w-4 h-4 stroke-[2.5]" />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Yakin ingin menghapus data usulan bantuan ini?')) {
                      deleteBantuan(bantuan.id);
                    }
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 rounded-lg transition-all cursor-pointer shadow-xs"
                  title="Hapus Usulan"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ))}
        {filteredBantuan.length === 0 && (
          <div className="col-span-full py-10 text-center text-slate-500 font-medium bg-white rounded-2xl border border-slate-200 border-dashed">
            Tidak ada data usulan bantuan sosial ditemukan.
          </div>
        )}
      </div>
    </div>
  );
};
