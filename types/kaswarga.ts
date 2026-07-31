export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  type: TransactionType;
  amount: number;
  recordedBy: string;
  paymentMethod?: string;
  referenceNo?: string;
  sourceOrRecipient?: string;
  notes?: string;
}

export type WargaStatus = 'Lunas' | 'Belum Bayar';

export interface Warga {
  id: string;
  name: string;
  houseNo: string;
  phone: string;
  status: WargaStatus;
  lastPaidMonth: string;
  dueDate: string;
}

export type BantuanStatus = 'Diusulkan' | 'Disetujui Kelurahan' | 'Ditolak' | 'Diterima Warga';

export interface Bantuan {
  id: string;
  wargaId?: string;
  wargaName: string;
  houseNo: string;
  jenisBantuan: string;
  status: BantuanStatus;
  tanggalUsulan: string;
  keterangan?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  timestamp?: string;
}

export type MainTabMenu = 'dashboard' | 'warga' | 'transaksi' | 'laporan' | 'pengaturan' | 'bantuan';

export interface RtSettings {
  rtRwName: string;
  kelurahan: string;
  nominalIuran: number;
  namaKetuaRt: string;
  namaBendahara: string;
  nomorWaBendahara: string;
}

export interface KwitansiData {
  noStruk: string;
  date: string;
  wargaName: string;
  houseNo: string;
  month: string;
  amount: number;
  recordedBy: string;
}
