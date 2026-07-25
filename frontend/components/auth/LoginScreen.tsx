'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Eye, EyeOff, Lock, User, CheckCircle2, ArrowRight, Building2 } from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { loginAdmin, loginAsWarga, rtSettings } = useApp();

  const [loginType, setLoginType] = useState<'admin' | 'warga'>('admin');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setErrorMsg('Masukkan kata sandi Pengurus RT');
      return;
    }

    const success = loginAdmin(password);
    if (!success) {
      setErrorMsg('Kata sandi salah. Gunakan: admin123');
    } else {
      setErrorMsg('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-6 font-sans text-slate-900 antialiased">
      <div className="max-w-md w-full space-y-6">
        {/* RT Header Badge */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 mb-1">
            <Building2 className="w-9 h-9 stroke-[2.5]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">KasWarga System</h1>
          <p className="text-xs sm:text-sm text-slate-600 font-bold">
            {rtSettings.rtRwName} • {rtSettings.kelurahan}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          {/* Role Switcher Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-extrabold">
            <button
              type="button"
              onClick={() => {
                setLoginType('admin');
                setErrorMsg('');
              }}
              className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                loginType === 'admin'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Shield className="w-4 h-4" /> Pengurus RT
            </button>
            <button
              type="button"
              onClick={() => {
                setLoginType('warga');
                setErrorMsg('');
              }}
              className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                loginType === 'warga'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <User className="w-4 h-4" /> Warga / Publik
            </button>
          </div>

          {loginType === 'admin' ? (
            /* Admin Form */
            <form onSubmit={handleAdminSubmit} className="space-y-4 text-xs">
              <div className="space-y-1 text-left">
                <span className="text-xs font-black text-slate-900 uppercase tracking-wider">Akses Pengurus RT</span>
                <p className="text-[11px] text-slate-500 font-medium">Masuk untuk mengelola kas, iuran warga, & cetak dokumen</p>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                  Kata Sandi Pengurus *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Masukkan kata sandi (default: admin123)"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorMsg('');
                    }}
                    className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-10 py-3 text-sm text-slate-900 font-semibold focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errorMsg && <p className="text-rose-600 font-bold text-xs mt-1.5 animate-fade-in">{errorMsg}</p>}
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-800 font-medium space-y-0.5">
                <div className="font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Kata Sandi Default Pengurus:
                </div>
                <div>Gunakan password: <code className="font-bold bg-white px-1.5 py-0.5 rounded border border-emerald-300">admin123</code></div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                Masuk Sebagai Pengurus <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Warga / Public Transparency Mode */
            <div className="space-y-5 text-xs text-left">
              <div className="space-y-1">
                <span className="text-xs font-black text-slate-900 uppercase tracking-wider">Akses Transparansi Warga</span>
                <p className="text-xs text-slate-500 font-medium">Lihat saldo kas RT, grafik laporan keuangan, dan status iuran secara transparan</p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-slate-700">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Hak Akses Warga / Publik:
                </div>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600 font-medium">
                  <li>Melihat Grafik & Saldo Kas RT Transparan</li>
                  <li>Melihat Status Pelunasan Iuran Warga</li>
                  <li>Melihat Catatan Transaksi Masuk & Keluar</li>
                  <li>Mode Aman (Read-Only) Terproteksi</li>
                </ul>
              </div>

              <button
                type="button"
                onClick={loginAsWarga}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                Lihat Laporan Kas Warga <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-slate-400 font-medium">
          KasWarga • Sistem Keuangan RT Transparan & Modern © 2026
        </div>
      </div>
    </div>
  );
};
