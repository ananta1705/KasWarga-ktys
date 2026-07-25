'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Menu, Plus, Minus, Bell, LogOut, Shield, User } from 'lucide-react';

interface HeaderProps {
  setIsMobileOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ setIsMobileOpen }) => {
  const {
    activeTab,
    rtSettings,
    setIsKasMasukOpen,
    setIsKasKeluarOpen,
    notifications,
    markAllNotificationsAsRead,
    userRole,
    logout,
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard Kas RT';
      case 'warga':
        return 'Data Warga & Status Iuran';
      case 'transaksi':
        return 'Pencatatan Uang Kas';
      case 'laporan':
        return 'Laporan Keuangan RT';
      case 'pengaturan':
        return 'Pengaturan RT & Pengurus';
      default:
        return 'KasWarga RT 05';
    }
  };

  return (
    <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-30 h-20 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="lg:hidden p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">{getPageTitle()}</h1>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                  userRole === 'admin'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-slate-100 text-slate-700 border-slate-300'
                }`}
              >
                {userRole === 'admin' ? 'Pengurus' : 'Publik'}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              {rtSettings.rtRwName} • {rtSettings.kelurahan}
            </p>
          </div>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex items-center gap-2.5">
          {userRole === 'admin' && activeTab === 'dashboard' && (
            <>
              <button
                onClick={() => setIsKasMasukOpen(true)}
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>+ Uang Masuk</span>
              </button>

              <button
                onClick={() => setIsKasKeluarOpen(true)}
                className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-md shadow-rose-600/20 transition-all cursor-pointer"
              >
                <Minus className="w-4 h-4 stroke-[3]" />
                <span>- Uang Keluar</span>
              </button>
            </>
          )}

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200/80 text-slate-700 hover:text-slate-900 relative cursor-pointer transition-colors"
              title="Notifikasi"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 text-white rounded-full text-xs font-bold flex items-center justify-center shadow">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50 animate-fade-in text-xs">
                <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <span className="font-extrabold text-slate-900">Notifikasi Sistem</span>
                  {unreadCount > 0 && (
                    <button onClick={markAllNotificationsAsRead} className="text-[11px] text-emerald-600 font-bold hover:underline">
                      Tandai Dibaca
                    </button>
                  )}
                </div>
                <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-3 hover:bg-slate-50 transition-colors">
                      <div className="font-bold text-slate-900">{n.title}</div>
                      <p className="text-slate-600 text-[11px] mt-0.5">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200/80 cursor-pointer transition-colors flex items-center gap-1.5 text-xs font-extrabold"
            title="Keluar dari Sistem"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">Keluar</span>
          </button>
        </div>
      </div>
    </header>
  );
};
