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
} from '../types/kaswarga';

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'TRX-001',
    date: '2026-07-24',
    description: 'Iuran Kas Bulanan RT 05 - Juli 2026',
    category: 'Iuran Warga',
    type: 'income',
    amount: 1750000,
    recordedBy: 'Bpk. Trianto (Bendahara)',
    paymentMethod: 'Tunai (Cash)',
    sourceOrRecipient: 'Warga RT 05',
  },
  {
    id: 'TRX-002',
    date: '2026-07-22',
    description: 'Pembelian Lampu LED Jalan & Kabel Pos Kamling',
    category: 'Perbaikan & Lampu',
    type: 'expense',
    amount: 420000,
    recordedBy: 'Bpk. Trianto (Ketua RT)',
    paymentMethod: 'Tunai (Cash)',
    sourceOrRecipient: 'Toko Bangunan Sumber Rejeki',
  },
  {
    id: 'TRX-003',
    date: '2026-07-20',
    description: 'Honor Petugas Kebersihan & Gaji Satpam Pos',
    category: 'Gaji & Operasional',
    type: 'expense',
    amount: 1200000,
    recordedBy: 'Bpk. Trianto (Bendahara)',
    paymentMethod: 'Tunai (Cash)',
    sourceOrRecipient: 'Satpam & Petugas Kebersihan',
  },
  {
    id: 'TRX-004',
    date: '2026-07-15',
    description: 'Sumbangan Donasi Acara Kerja Bakti Lingkungan',
    category: 'Donasi',
    type: 'income',
    amount: 500000,
    recordedBy: 'Ibu Ratna',
    paymentMethod: 'Tunai (Cash)',
    sourceOrRecipient: 'Ibu Ratna',
  },
  {
    id: 'TRX-005',
    date: '2026-07-10',
    description: 'Konsumsi Rapat Warga RT 05',
    category: 'Kegiatan Warga',
    type: 'expense',
    amount: 250000,
    recordedBy: 'Ibu Maya',
    paymentMethod: 'Tunai (Cash)',
    sourceOrRecipient: 'Warung Makan Ibu Maya',
  },
];

const INITIAL_WARGA: Warga[] = [
  { id: 'W-01', name: 'Bpk. Budi Santoso', houseNo: 'Blok A No. 01', phone: '081234567890', status: 'Lunas', lastPaidMonth: 'Juli 2026', amount: 50000, dueDate: '2026-07-10', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
  { id: 'W-02', name: 'Bpk. Trianto', houseNo: 'Blok A No. 02', phone: '081298765432', status: 'Lunas', lastPaidMonth: 'Juli 2026', amount: 50000, dueDate: '2026-07-10', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
  { id: 'W-03', name: 'Ibu Siti Aminah', houseNo: 'Blok A No. 03', phone: '081311223344', status: 'Belum Bayar', lastPaidMonth: 'Juni 2026', amount: 50000, dueDate: '2026-07-10', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' },
  { id: 'W-04', name: 'Bpk. Agus Pratama', houseNo: 'Blok B No. 01', phone: '081555667788', status: 'Lunas', lastPaidMonth: 'Juli 2026', amount: 50000, dueDate: '2026-07-10', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
  { id: 'W-05', name: 'Bpk. Rahmat Hidayat', houseNo: 'Blok B No. 02', phone: '081777889900', status: 'Belum Bayar', lastPaidMonth: 'Mei 2026', amount: 100000, dueDate: '2026-06-10', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80' },
  { id: 'W-06', name: 'Ibu Dewi Lestari', houseNo: 'Blok B No. 03', phone: '081900112233', status: 'Lunas', lastPaidMonth: 'Juli 2026', amount: 50000, dueDate: '2026-07-10', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80' },
  { id: 'W-07', name: 'Bpk. Eko Kurniawan', houseNo: 'Blok C No. 01', phone: '082133445566', status: 'Lunas', lastPaidMonth: 'Juli 2026', amount: 50000, dueDate: '2026-07-10', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
  { id: 'W-08', name: 'Bpk. Denny Sujatmiko', houseNo: 'Blok C No. 02', phone: '082244556677', status: 'Belum Bayar', lastPaidMonth: 'April 2026', amount: 150000, dueDate: '2026-05-10', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
];

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  { id: 'NOTIF-1', title: 'Iuran Diterima', message: 'Bpk. Budi Santoso melunasi iuran bulan Juli 2026', timestamp: '10 min lalu', read: false },
  { id: 'NOTIF-2', title: 'Tunggakan Iuran', message: '3 warga belum melunasi iuran bulan ini', timestamp: '2 jam lalu', read: false },
];

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
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Authentication & Role State
  isAuthenticated: boolean;
  userRole: UserRole;
  loginAdmin: (password: string) => boolean;
  loginAsWarga: () => void;
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
  addWarga: (warga: Omit<Warga, 'id' | 'status' | 'lastPaidMonth' | 'dueDate' | 'avatar'>) => void;
  toggleWargaPayment: (id: string) => void;
  openKwitansiForWarga: (warga: Warga) => void;
  sendReminderWhatsApp: (warga: Warga) => void;
  addToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
  markAllNotificationsAsRead: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<MainTabMenu>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('kaswarga_is_auth') === 'true';
    }
    return false;
  });

  const [userRole, setUserRole] = useState<UserRole>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('kaswarga_user_role') as UserRole) || 'warga';
    }
    return 'warga';
  });

  // Load initial state from LocalStorage if available
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kaswarga_transactions');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const seen = new Set();
            return parsed.map((t, idx) => {
              if (seen.has(t.id)) {
                t.id = `TRX-${Date.now().toString().slice(-4)}-${idx}`;
              }
              seen.add(t.id);
              return t;
            });
          }
        } catch (e) { console.error(e); }
      }
    }
    return INITIAL_TRANSACTIONS;
  });

  const [wargaList, setWargaList] = useState<Warga[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kaswarga_warga');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { console.error(e); }
      }
    }
    return INITIAL_WARGA;
  });

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
    if (typeof window !== 'undefined') {
      localStorage.setItem('kaswarga_transactions', JSON.stringify(transactions));
    }
  }, [transactions]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('kaswarga_warga', JSON.stringify(wargaList));
    }
  }, [wargaList]);

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

  const loginAdmin = (password: string): boolean => {
    if (password === 'admin' || password === 'admin123' || password === '123456') {
      setIsAuthenticated(true);
      setUserRole('admin');
      addToast('Selamat Datang Pengurus RT (Akses Penuh Admin)!', 'success');
      return true;
    }
    addToast('Kata sandi Pengurus RT salah!', 'warning');
    return false;
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
    const id = `toast-${Date.now()}`;
    const newToast: Toast = { id, message, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => removeToast(id), 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addTransaction = (newTxData: Omit<Transaction, 'id'>) => {
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
  };

  const updateTransaction = (updatedTx: Transaction) => {
    if (userRole !== 'admin') {
      addToast('Hanya Pengurus RT yang dapat mengedit transaksi kas!', 'warning');
      return;
    }
    setTransactions((prev) =>
      prev.map((t) => (t.id === updatedTx.id ? updatedTx : t))
    );
    addToast(`Transaksi "${updatedTx.description}" berhasil diperbarui!`, 'success');
  };

  const deleteTransaction = (id: string) => {
    if (userRole !== 'admin') {
      addToast('Hanya Pengurus RT yang dapat menghapus transaksi kas!', 'warning');
      return;
    }
    const target = transactions.find((t) => t.id === id);
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    addToast(`Transaksi "${target?.description || id}" berhasil dihapus dari kas!`, 'warning');
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

  const addWarga = (newWargaData: Omit<Warga, 'id' | 'status' | 'lastPaidMonth' | 'dueDate' | 'avatar'>) => {
    if (userRole !== 'admin') {
      addToast('Hanya Pengurus RT yang dapat mendaftarkan warga!', 'warning');
      return;
    }
    const avatars = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    ];
    const newWarga: Warga = {
      ...newWargaData,
      id: `W-0${wargaList.length + 1}`,
      status: 'Belum Bayar',
      lastPaidMonth: '-',
      dueDate: new Date().toISOString().split('T')[0],
      avatar: avatars[wargaList.length % avatars.length],
    };
    setWargaList((prev) => [...prev, newWarga]);
    addToast(`Warga baru ${newWarga.name} (${newWarga.houseNo}) berhasil terdaftar!`, 'success');
  };

  const openKwitansiForWarga = (warga: Warga) => {
    const data: KwitansiData = {
      noStruk: `KW-${warga.id}-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0],
      wargaName: warga.name,
      houseNo: warga.houseNo,
      month: warga.lastPaidMonth === '-' ? 'Juli 2026' : warga.lastPaidMonth,
      amount: warga.amount || rtSettings.nominalIuran,
      recordedBy: rtSettings.namaBendahara,
    };
    setKwitansiData(data);
    setIsKwitansiOpen(true);
  };

  const toggleWargaPayment = (id: string) => {
    if (userRole !== 'admin') {
      addToast('Hanya Pengurus RT yang dapat mengubah status iuran!', 'warning');
      return;
    }
    setWargaList((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          const nextStatus: WargaStatus = w.status === 'Lunas' ? 'Belum Bayar' : 'Lunas';
          const nextMonth = nextStatus === 'Lunas' ? 'Juli 2026' : w.lastPaidMonth;
          const updated: Warga = { ...w, status: nextStatus, lastPaidMonth: nextMonth };

          if (nextStatus === 'Lunas') {
            addToast(`Iuran ${w.name} ditandai LUNAS (Juli 2026)!`, 'success');
            addTransaction({
              date: new Date().toISOString().split('T')[0],
              description: `Iuran Bulanan Juli 2026 - ${w.name} (${w.houseNo})`,
              category: 'Iuran Warga',
              type: 'income',
              amount: w.amount || rtSettings.nominalIuran,
              recordedBy: rtSettings.namaBendahara,
            });
            setTimeout(() => openKwitansiForWarga(updated), 400);
          } else {
            addToast(`Status iuran ${w.name} diubah menjadi BELUM BAYAR.`, 'warning');
          }
          return updated;
        }
        return w;
      })
    );
  };

  const sendReminderWhatsApp = (warga: Warga) => {
    const text = encodeURIComponent(
      `Selamat pagi/siang ${warga.name} (${warga.houseNo}), ini pengingat resmi pengurus ${rtSettings.rtRwName} untuk Iuran Kas Bulanan (Nominal Rp ${warga.amount.toLocaleString('id-ID')}). Mohon dapat dilunasi. Terima kasih!`
    );
    window.open(`https://wa.me/${warga.phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
    addToast(`Pesan pengingat WA terkirim ke ${warga.name}`, 'success');
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
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
        toggleWargaPayment,
        openKwitansiForWarga,
        sendReminderWhatsApp,
        addToast,
        removeToast,
        markAllNotificationsAsRead,
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
