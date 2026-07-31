'use client';

import React from 'react';
import { Loader2, Inbox, AlertTriangle, CheckCircle } from 'lucide-react';

export const LoadingState: React.FC<{ message?: string }> = ({ message = 'Memuat data kas...' }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
    <div className="relative mb-4">
      <div className="w-12 h-12 rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin"></div>
      <Loader2 className="w-6 h-6 text-emerald-600 absolute inset-0 m-auto animate-pulse" />
    </div>
    <p className="text-sm font-extrabold text-slate-800">{message}</p>
    <p className="text-xs text-slate-500 mt-1 font-medium">Harap tunggu sebentar...</p>
  </div>
);

export const EmptyState: React.FC<{
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}> = ({
  title = 'Tidak Ada Data',
  description = 'Belum ada catatan transaksi atau data yang sesuai dengan pencarian Anda.',
  actionText,
  onAction,
}) => (
  <div className="flex flex-col items-center justify-center py-16 px-6 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-white shadow-xs">
    <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 mb-4">
      <Inbox className="w-7 h-7" />
    </div>
    <h4 className="text-base font-extrabold text-slate-900">{title}</h4>
    <p className="text-xs text-slate-500 max-w-sm mt-1 mb-5 leading-relaxed font-medium">{description}</p>
    {actionText && onAction && (
      <button
        onClick={onAction}
        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-xl shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
      >
        {actionText}
      </button>
    )}
  </div>
);

export const ErrorState: React.FC<{
  title?: string;
  description?: string;
  onRetry?: () => void;
}> = ({
  title = 'Gagal Memuat Data',
  description = 'Terjadi kesalahan sistem atau kendala jaringan saat mengambil data terbaru.',
  onRetry,
}) => (
  <div className="flex flex-col items-center justify-center py-16 px-6 text-center border border-rose-200 rounded-2xl bg-rose-50/50 shadow-xs">
    <div className="w-14 h-14 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 mb-4">
      <AlertTriangle className="w-7 h-7" />
    </div>
    <h4 className="text-base font-extrabold text-slate-900">{title}</h4>
    <p className="text-xs text-slate-600 max-w-sm mt-1 mb-5 leading-relaxed font-medium">{description}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-800 text-xs font-extrabold rounded-xl border border-slate-300 shadow-xs transition-all cursor-pointer"
      >
        Coba Lagi
      </button>
    )}
  </div>
);

export const SuccessState: React.FC<{
  title?: string;
  description?: string;
  onAction?: () => void;
  actionText?: string;
}> = ({ title = 'Berhasil!', description = 'Aksi telah berhasil diproses.', actionText = 'Kembali', onAction }) => (
  <div className="flex flex-col items-center justify-center py-12 px-6 text-center bg-emerald-50/50 border border-emerald-200 rounded-2xl shadow-xs">
    <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4 animate-bounce">
      <CheckCircle className="w-8 h-8" />
    </div>
    <h4 className="text-lg font-extrabold text-slate-900">{title}</h4>
    <p className="text-xs text-slate-600 max-w-sm mt-1 mb-6 leading-relaxed font-medium">{description}</p>
    {onAction && (
      <button
        onClick={onAction}
        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
      >
        {actionText}
      </button>
    )}
  </div>
);
