import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KasWarga - Sistem Informasi Kas & Keuangan Warga',
  description: 'Platform transparansi keuangan kas warga RT/RW, iuran bulanan, serta pencatatan pemasukan dan pengeluaran.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-slate-50 text-slate-900 font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
