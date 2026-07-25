'use client';

import React, { useState } from 'react';
import { AppProvider, useApp } from '../context/AppContext';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { ToastContainer } from '../components/common/ToastContainer';
import { SuccessModal } from '../components/common/SuccessModal';
import { LoginScreen } from '../components/auth/LoginScreen';

// Dashboard Modul MVP
import { CardSummary } from '../components/dashboard/CardSummary';
import { DashboardCharts } from '../components/dashboard/DashboardCharts';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { DaftarWargaBelumBayar } from '../components/dashboard/DaftarWargaBelumBayar';

// Data Warga Modul MVP
import { DataWargaView } from '../components/master/DataWargaView';
import { TambahWargaModal } from '../components/master/TambahWargaModal';

// Transaksi & Kwitansi Modals MVP
import { KasMasukModal } from '../components/transaksi/KasMasukModal';
import { KasKeluarModal } from '../components/transaksi/KasKeluarModal';
import { PembayaranIuranModal } from '../components/transaksi/PembayaranIuranModal';
import { KwitansiModal } from '../components/common/KwitansiModal';
import { DetailTransaksiModal } from '../components/transaksi/DetailTransaksiModal';
import { EditTransaksiModal } from '../components/transaksi/EditTransaksiModal';

// Laporan Modul MVP
import { LaporanView } from '../components/laporan/LaporanView';

// Pengaturan Modul MVP
import { PengaturanView } from '../components/pengaturan/PengaturanView';

function MainAppContent() {
  const { activeTab, isAuthenticated } = useApp();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Guard: Show Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <LoginScreen />
        <ToastContainer />
      </>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8 animate-fade-in">
            {/* 1. Summary Cards */}
            <CardSummary />

            {/* 2. Ringkasan Chart Pemasukan vs Pengeluaran */}
            <DashboardCharts />

            {/* 3. Daftar Warga Belum Bayar + Pengingat WA */}
            <DaftarWargaBelumBayar />

            {/* 4. Riwayat Transaksi Terbaru */}
            <RecentTransactions />
          </div>
        );

      case 'warga':
        return <DataWargaView />;

      case 'transaksi':
        return (
          <div className="space-y-6 animate-fade-in">
            <RecentTransactions />
          </div>
        );

      case 'laporan':
        return <LaporanView />;

      case 'pengaturan':
        return <PengaturanView />;

      default:
        return <CardSummary />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans antialiased">
      {/* Navigation Sidebar */}
      <Sidebar isMobileOpen={isMobileSidebarOpen} setIsMobileOpen={setIsMobileSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Header Navbar */}
        <Header setIsMobileOpen={setIsMobileSidebarOpen} />

        {/* Page Content Body */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {renderTabContent()}
        </main>
      </div>

      {/* Modals & Toast Alerts */}
      <KasMasukModal />
      <KasKeluarModal />
      <PembayaranIuranModal />
      <TambahWargaModal />
      <KwitansiModal />
      <SuccessModal />
      <DetailTransaksiModal />
      <EditTransaksiModal />
      <ToastContainer />
    </div>
  );
}

export default function KasWargaDashboardPage() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
