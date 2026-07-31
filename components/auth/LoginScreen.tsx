'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Eye, EyeOff, Lock, CheckCircle2, ArrowRight, Building2, Loader2 } from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { loginAdmin, rtSettings } = useApp();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setErrorMsg('Masukkan kata sandi Pengurus RT');
      return;
    }

    setIsLoading(true);
    const success = await loginAdmin(password);
    setIsLoading(false);
    
    if (!success) {
      setErrorMsg('Kata sandi salah.');
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
          {/* Admin Form */}
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
                    placeholder="Masukkan kata sandi"
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



              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Sedang Memeriksa...
                  </>
                ) : (
                  <>
                    Masuk Sebagai Pengurus <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-slate-400 font-medium">
          KasWarga • Sistem Keuangan RT Transparan & Modern © 2026
        </div>
      </div>
    </div>
  );
};
