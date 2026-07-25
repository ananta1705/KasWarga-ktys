'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { MainTabMenu } from '../../types/kaswarga';
import {
  LayoutDashboard,
  Users,
  Receipt,
  FileText,
  Settings,
  Building2,
  X,
  LogOut,
  Shield,
  User,
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, setIsMobileOpen }) => {
  const { activeTab, setActiveTab, wargaList, rtSettings, userRole, logout } = useApp();

  const unpaidCount = wargaList.filter((w) => w.status === 'Belum Bayar').length;

  const menuItems = [
    { id: 'dashboard' as MainTabMenu, label: 'Dashboard Utama', icon: LayoutDashboard },
    { id: 'warga' as MainTabMenu, label: 'Data Warga', icon: Users, badge: unpaidCount > 0 ? `${unpaidCount} Belum` : undefined },
    { id: 'transaksi' as MainTabMenu, label: 'Catat Kas', icon: Receipt },
    { id: 'laporan' as MainTabMenu, label: 'Laporan Kas', icon: FileText },
    { id: 'pengaturan' as MainTabMenu, label: 'Pengaturan RT', icon: Settings },
  ];

  const handleSelect = (id: MainTabMenu) => {
    setActiveTab(id);
    setIsMobileOpen(false);
  };

  return (
    <>
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-white border-r border-slate-200/80 flex flex-col transition-transform duration-300 lg:translate-x-0 shadow-sm ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* App Brand Header */}
        <div className="h-20 px-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
              <Building2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-slate-900 leading-tight tracking-tight">KasWarga</h2>
              <span className="text-xs text-emerald-600 font-extrabold">{rtSettings.rtRwName}</span>
            </div>
          </div>

          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden text-slate-400 hover:text-slate-800 p-2 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
          <div className="px-3 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">
            Menu Utama
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-extrabold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-rose-50 text-rose-600 border border-rose-200/80'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* User Role Card & Logout Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/80 space-y-3 shrink-0">
          <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-lg ${userRole === 'admin' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                {userRole === 'admin' ? <Shield className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>
              <div className="text-left">
                <div className="text-xs font-extrabold text-slate-900">
                  {userRole === 'admin' ? 'Pengurus RT' : 'Warga Publik'}
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                  {userRole === 'admin' ? 'Akses Penuh' : 'Akses Transparansi'}
                </div>
              </div>
            </div>

            <button
              onClick={logout}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
              title="Keluar dari Aplikasi"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <div className="text-[10px] text-slate-400 text-center font-medium">
            {rtSettings.kelurahan}
          </div>
        </div>
      </aside>
    </>
  );
};
