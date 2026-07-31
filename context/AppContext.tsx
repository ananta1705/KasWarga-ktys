'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Transaction,
  Warga,
  WargaStatus,
  NotificationItem,
  Toast,
  MainTabMenu,
  RtSettings,
  KwitansiData,
  Bantuan,
  BantuanStatus,
} from '../types/kaswarga';



const INITIAL_NOTIFICATIONS: NotificationItem[] = [];

export type UserRole = 'admin' | 'warga';

interface AppContextType {
  activeTab: MainTabMenu;
  setActiveTab: (tab: MainTabMenu) => void;
  transactions: Transaction[];
  wargaList: Warga[];
  rtSettings: RtSettings;
  setRtSettings: React.Dispatch<React.SetStateAction<RtSettings>>;
  notifications: NotificationItem[];
  toasts: Toast[];
  bantuanList: Bantuan[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Authentication & Role State
  isAuthenticated: boolean;
  userRole: UserRole;
  isHydrated: boolean;
  loginAsWarga: () => void;
  loginAdmin: (password: string) => Promise<boolean>;
  logout: () => void;

  // Modals state
  isKasMasukOpen: boolean;
  setIsKasMasukOpen: (o: boolean) => void;
  isKasKeluarOpen: boolean;
  setIsKasKeluarOpen: (o: boolean) => void;
  isPembayaranIuranOpen: boolean;
  setIsPembayaranIuranOpen: (o: boolean) => void;
  isTambahWargaOpen: boolean;
  setIsTambahWargaOpen: (o: boolean) => void;
  isKwitansiOpen: boolean;
  setIsKwitansiOpen: (o: boolean) => void;
  isTambahBantuanOpen: boolean;
  setIsTambahBantuanOpen: (o: boolean) => void;
  isSuratPengantarOpen: boolean;
  setIsSuratPengantarOpen: (o: boolean) => void;
  suratPengantarData: Bantuan | null;
  setSuratPengantarData: (data: Bantuan | null) => void;
  kwitansiData: KwitansiData | null;
  setKwitansiData: (data: KwitansiData | null) => void;

  // Success Pop-Up Modal
  isSuccessModalOpen: boolean;
  setIsSuccessModalOpen: (o: boolean) => void;
  lastTransaction: Transaction | null;

  // Detail & Edit Modals state
  selectedTransaction: Transaction | null;
  isDetailModalOpen: boolean;
  setIsDetailModalOpen: (o: boolean) => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (o: boolean) => void;

  // Actions
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  updateTransaction: (tx: Transaction) => void;
  deleteTransaction: (id: string) => void;
  openDetailTransaction: (tx: Transaction) => void;
  openEditTransaction: (tx: Transaction) => void;
  addWarga: (warga: Omit<Warga, 'id' | 'status' | 'lastPaidMonth' | 'dueDate'>) => void;
  deleteWarga: (id: string) => void;
  toggleWargaPayment: (id: string) => void;
  openKwitansiForWarga: (warga: Warga) => void;
  sendReminderWhatsApp: (warga: Warga) => void;
  addToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  addBantuan: (bantuan: Omit<Bantuan, 'id'>) => void;
  updateBantuanStatus: (id: string, status: BantuanStatus, keterangan?: string) => void;
  deleteBantuan: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<MainTabMenu>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>('warga');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('kaswarga_is_auth') === 'true';
    const role = (localStorage.getItem('kaswarga_user_role') as UserRole) || 'warga';
    setIsAuthenticated(auth);
    setUserRole(role);
    setIsHydrated(true);
  }, []);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [wargaList, setWargaList] = useState<Warga[]>([]);
  const [bantuanList, setBantuanList] = useState<Bantuan[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Sync state with Google Sheets on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resTx, resWarga, resBantuan] = await Promise.all([
          fetch('/api/sheets/transactions'),
          fetch('/api/sheets/warga'),
          fetch('/api/sheets/bantuan')
        ]);
        
        if (resTx.ok) {
          const txData = await resTx.json();
          if (txData.length > 0) setTransactions(txData);
        }
        
        if (resWarga.ok) {
          const wargaData = await resWarga.json();
          if (wargaData.length > 0) setWargaList(wargaData);
        }

        if (resBantuan.ok) {
          const bantuanData = await resBantuan.json();
          if (bantuanData.length > 0) setBantuanList(bantuanData);
        }
      } catch (e) {
        console.error('Failed to sync from sheets:', e);
      } finally {
        setIsDataLoaded(true);
      }
    };
    fetchData();
  }, []);

  const [rtSettings, setRtSettings] = useState<RtSettings>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kaswarga_settings');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return {
            ...parsed,
            rtRwName: 'RT 05 / RW 04',
            kelurahan: 'Kelurahan Kertayasa',
            namaKetuaRt: 'Bpk. Trianto',
            namaBendahara: 'Bpk. Trianto',
          };
        } catch (e) { console.error(e); }
      }
    }
    return {
      rtRwName: 'RT 05 / RW 04',
      kelurahan: 'Kelurahan Kertayasa',
      nominalIuran: 50000,
      namaKetuaRt: 'Bpk. Trianto',
      namaBendahara: 'Bpk. Trianto',
      nomorWaBendahara: '0812-3456-7890',
    };
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Modals state
  const [isKasMasukOpen, setIsKasMasukOpen] = useState(false);
  const [isKasKeluarOpen, setIsKasKeluarOpen] = useState(false);
  const [isPembayaranIuranOpen, setIsPembayaranIuranOpen] = useState(false);
  const [isTambahWargaOpen, setIsTambahWargaOpen] = useState(false);
  const [isKwitansiOpen, setIsKwitansiOpen] = useState(false);
  const [isTambahBantuanOpen, setIsTambahBantuanOpen] = useState(false);
  const [isSuratPengantarOpen, setIsSuratPengantarOpen] = useState(false);
  const [suratPengantarData, setSuratPengantarData] = useState<Bantuan | null>(null);
  const [kwitansiData, setKwitansiData] = useState<KwitansiData | null>(null);

  // Success Pop-Up Modal
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [lastTransaction, setLastTransaction] = useState<Transaction | null>(null);

  // Detail & Edit Modals state
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Sync state to LocalStorage
  useEffect(() => {
    // LocalStorage sync for transactions and warga removed, now using Google Sheets
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('kaswarga_settings', JSON.stringify(rtSettings));
    }
  }, [rtSettings]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('kaswarga_is_auth', isAuthenticated.toString());
      localStorage.setItem('kaswarga_user_role', userRole);
    }
  }, [isAuthenticated, userRole]);

  const loginAdmin = async (password: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      
      if (data.success) {
        setIsAuthenticated(true);
        setUserRole('admin');
        addToast('Selamat Datang Pengurus RT (Akses Penuh Admin)!', 'success');
        return true;
      }
      
      addToast('Kata sandi Pengurus RT salah!', 'warning');
      return false;
    } catch (e) {
      console.error(e);
      addToast('Terjadi kesalahan pada server saat verifikasi kata sandi', 'warning');
      return false;
    }
  };

  const loginAsWarga = () => {
    setIsAuthenticated(true);
    setUserRole('warga');
    addToast('Masuk sebagai Warga / Publik (Akses Transparansi Kas)', 'info');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole('warga');
    setActiveTab('dashboard');
    addToast('Anda telah keluar dari aplikasi KasWarga.', 'info');
  };

  const addToast = (message: string, type: Toast['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newToast: Toast = { id, message, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => removeToast(id), 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addTransaction = async (newTxData: Omit<Transaction, 'id'>) => {
    if (userRole !== 'admin') {
      addToast('Hanya Pengurus RT yang dapat mencatat transaksi kas!', 'warning');
      return;
    }
    const uniqueId = `TRX-${Date.now().toString().slice(-4)}-${Math.floor(Math.random() * 100)}`;
    const newTx: Transaction = {
      ...newTxData,
      id: uniqueId,
    };
    setTransactions((prev) => [newTx, ...prev]);
    setLastTransaction(newTx);
    setIsSuccessModalOpen(true);
    addToast(`Transaksi "${newTx.description}" berhasil dicatat!`, 'success');
    
    // Sync to Sheets
    try {
      await fetch('/api/sheets/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add', transaction: newTx })
      });
    } catch(e) { console.error(e); }
  };

  const updateTransaction = async (updatedTx: Transaction) => {
    if (userRole !== 'admin') {
      addToast('Hanya Pengurus RT yang dapat mengedit transaksi kas!', 'warning');
      return;
    }
    setTransactions((prev) =>
      prev.map((t) => (t.id === updatedTx.id ? updatedTx : t))
    );
    addToast(`Transaksi "${updatedTx.description}" berhasil diperbarui!`, 'success');
    
    // Sync to Sheets
    try {
      await fetch('/api/sheets/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update', transaction: updatedTx })
      });
    } catch(e) { console.error(e); }
  };

  const deleteTransaction = async (id: string) => {
    if (userRole !== 'admin') {
      addToast('Hanya Pengurus RT yang dapat menghapus transaksi kas!', 'warning');
      return;
    }
    const target = transactions.find((t) => t.id === id);
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    addToast(`Transaksi "${target?.description || id}" berhasil dihapus dari kas!`, 'warning');
    
    // Sync to Sheets
    try {
      await fetch('/api/sheets/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', transaction: { id } })
      });
    } catch(e) { console.error(e); }
  };

  const openDetailTransaction = (tx: Transaction) => {
    setSelectedTransaction(tx);
    setIsDetailModalOpen(true);
  };

  const openEditTransaction = (tx: Transaction) => {
    if (userRole !== 'admin') {
      addToast('Hanya Pengurus RT yang dapat mengedit transaksi kas!', 'warning');
      return;
    }
    setSelectedTransaction(tx);
    setIsEditModalOpen(true);
  };

  const addWarga = async (newWargaData: Omit<Warga, 'id' | 'status' | 'lastPaidMonth' | 'dueDate'>) => {
    if (userRole !== 'admin') {
      addToast('Hanya Pengurus RT yang dapat mendaftarkan warga!', 'warning');
      return;
    }
    const newWarga: Warga = {
      ...newWargaData,
      id: `W-0${wargaList.length + 1}`,
      status: 'Belum Bayar',
      lastPaidMonth: '-',
      dueDate: new Date().toISOString().split('T')[0],
    };
    setWargaList((prev) => [...prev, newWarga]);
    addToast(`Warga baru ${newWarga.name} (${newWarga.houseNo}) berhasil terdaftar!`, 'success');
    
    // Sync to Sheets
    try {
      await fetch('/api/sheets/warga', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add', warga: newWarga })
      });
    } catch(e) { console.error(e); }
  };

  const deleteWarga = async (id: string) => {
    if (userRole !== 'admin') {
      addToast('Hanya Pengurus RT yang dapat menghapus warga!', 'warning');
      return;
    }
    const target = wargaList.find((w) => w.id === id);
    setWargaList((prev) => prev.filter((w) => w.id !== id));
    addToast(`Warga "${target?.name || id}" berhasil dihapus!`, 'warning');
    
    // Sync to Sheets
    try {
      await fetch('/api/sheets/warga', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', warga: { id } })
      });
    } catch(e) { console.error(e); }
  };

  const openKwitansiForWarga = (warga: Warga) => {
    const data: KwitansiData = {
      noStruk: `KW-${warga.id}-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0],
      wargaName: warga.name,
      houseNo: warga.houseNo,
      month: warga.lastPaidMonth === '-' ? 'Juli 2026' : warga.lastPaidMonth,
      amount: rtSettings.nominalIuran,
      recordedBy: rtSettings.namaBendahara,
    };
    setKwitansiData(data);
    setIsKwitansiOpen(true);
  };

  const toggleWargaPayment = async (id: string) => {
    if (userRole !== 'admin') {
      addToast('Hanya Pengurus RT yang dapat mengubah status iuran!', 'warning');
      return;
    }
    
    let updatedWarga: Warga | null = null;

    setWargaList((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          const nextStatus: WargaStatus = w.status === 'Lunas' ? 'Belum Bayar' : 'Lunas';
          const nextMonth = nextStatus === 'Lunas' ? 'Juli 2026' : w.lastPaidMonth;
          updatedWarga = { ...w, status: nextStatus, lastPaidMonth: nextMonth };

          if (nextStatus === 'Lunas') {
            addToast(`Iuran ${w.name} ditandai LUNAS (Juli 2026)!`, 'success');
            setTimeout(() => openKwitansiForWarga(updatedWarga!), 400);
          } else {
            addToast(`Status iuran ${w.name} diubah menjadi BELUM BAYAR.`, 'warning');
          }
          return updatedWarga;
        }
        return w;
      })
    );
    
    if (updatedWarga) {
      try {
        await fetch('/api/sheets/warga', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'update', warga: updatedWarga })
        });
      } catch(e) { console.error(e); }
    }
  };

  const sendReminderWhatsApp = (warga: Warga) => {
    const text = encodeURIComponent(
      `Selamat pagi/siang ${warga.name} (${warga.houseNo}), ini pengingat resmi pengurus ${rtSettings.rtRwName} untuk Iuran Kas Bulanan (Nominal Rp ${rtSettings.nominalIuran.toLocaleString('id-ID')}). Mohon dapat dilunasi. Terima kasih!`
    );
    window.open(`https://wa.me/${warga.phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
    addToast(`Pesan pengingat WA terkirim ke ${warga.name}`, 'success');
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const addBantuan = async (newBantuanData: Omit<Bantuan, 'id'>) => {
    if (userRole !== 'admin') {
      addToast('Hanya Pengurus RT yang dapat menambah data bantuan!', 'warning');
      return;
    }
    const id = `B-${Date.now().toString().slice(-4)}-${Math.floor(Math.random() * 100)}`;
    const newBantuan: Bantuan = { ...newBantuanData, id };
    
    setBantuanList((prev) => [newBantuan, ...prev]);
    addToast(`Usulan Bantuan "${newBantuan.jenisBantuan}" untuk ${newBantuan.wargaName} berhasil dicatat!`, 'success');
    
    try {
      await fetch('/api/sheets/bantuan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add', bantuan: newBantuan })
      });
    } catch(e) { console.error(e); }
  };

  const updateBantuanStatus = async (id: string, status: BantuanStatus, keterangan?: string) => {
    if (userRole !== 'admin') {
      addToast('Hanya Pengurus RT yang dapat mengubah status bantuan!', 'warning');
      return;
    }
    
    let updatedBantuan: Bantuan | null = null;
    setBantuanList((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          updatedBantuan = { ...b, status, keterangan: keterangan ?? b.keterangan };
          return updatedBantuan;
        }
        return b;
      })
    );
    
    if (updatedBantuan) {
      addToast(`Status Bantuan berhasil diubah menjadi ${status}!`, 'success');
      try {
        await fetch('/api/sheets/bantuan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'update', bantuan: updatedBantuan })
        });
      } catch(e) { console.error(e); }
    }
  };

  const deleteBantuan = async (id: string) => {
    if (userRole !== 'admin') {
      addToast('Hanya Pengurus RT yang dapat menghapus data bantuan!', 'warning');
      return;
    }
    setBantuanList((prev) => prev.filter((b) => b.id !== id));
    addToast('Data Bantuan berhasil dihapus!', 'warning');
    
    try {
      await fetch('/api/sheets/bantuan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', bantuan: { id } })
      });
    } catch(e) { console.error(e); }
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        transactions,
        wargaList,
        rtSettings,
        setRtSettings,
        notifications,
        toasts,
        searchQuery,
        setSearchQuery,
        isAuthenticated,
        userRole,
        isHydrated,
        loginAdmin,
        loginAsWarga,
        logout,
        isKasMasukOpen,
        setIsKasMasukOpen,
        isKasKeluarOpen,
        setIsKasKeluarOpen,
        isPembayaranIuranOpen,
        setIsPembayaranIuranOpen,
        isTambahWargaOpen,
        setIsTambahWargaOpen,
        isKwitansiOpen,
        setIsKwitansiOpen,
        isTambahBantuanOpen,
        setIsTambahBantuanOpen,
        isSuratPengantarOpen,
        setIsSuratPengantarOpen,
        suratPengantarData,
        setSuratPengantarData,
        kwitansiData,
        setKwitansiData,
        isSuccessModalOpen,
        setIsSuccessModalOpen,
        lastTransaction,
        selectedTransaction,
        isDetailModalOpen,
        setIsDetailModalOpen,
        isEditModalOpen,
        setIsEditModalOpen,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        openDetailTransaction,
        openEditTransaction,
        addWarga,
        deleteWarga,
        toggleWargaPayment,
        openKwitansiForWarga,
        sendReminderWhatsApp,
        addToast,
        removeToast,
        markAllNotificationsAsRead,
        bantuanList,
        addBantuan,
        updateBantuanStatus,
        deleteBantuan,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
