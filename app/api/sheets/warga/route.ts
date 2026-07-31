import { NextResponse } from 'next/server';
import { getGoogleSheet, ensureSheet } from '@/lib/google-sheets';

export const dynamic = 'force-dynamic';

const SHEET_TITLE = 'Warga';
const HEADERS = ['ID', 'Nama_Warga', 'Nomor_Rumah', 'No_HP', 'Status_Iuran', 'Bulan_Terakhir_Bayar', 'Jatuh_Tempo'];

export async function GET() {
  try {
    const doc = await getGoogleSheet();
    const sheet = await ensureSheet(doc, SHEET_TITLE, HEADERS);
    const rows = await sheet.getRows();
    
    const wargaList = rows.map((row) => ({
      id: row.get('ID'),
      name: row.get('Nama_Warga'),
      houseNo: row.get('Nomor_Rumah'),
      phone: row.get('No_HP'),
      status: row.get('Status_Iuran'),
      lastPaidMonth: row.get('Bulan_Terakhir_Bayar'),
      dueDate: row.get('Jatuh_Tempo'),
    }));

    return NextResponse.json(wargaList);
  } catch (error) {
    console.error('Error fetching warga:', error);
    return NextResponse.json({ error: 'Failed to fetch warga' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { action, warga, initialData } = await req.json();
    const doc = await getGoogleSheet();
    const sheet = await ensureSheet(doc, SHEET_TITLE, HEADERS);

    if (action === 'add') {
      await sheet.addRow({
        ID: warga.id,
        Nama_Warga: warga.name,
        Nomor_Rumah: warga.houseNo,
        No_HP: warga.phone,
        Status_Iuran: warga.status,
        Bulan_Terakhir_Bayar: warga.lastPaidMonth,
        Jatuh_Tempo: warga.dueDate,
      });
      return NextResponse.json({ success: true });
    }

    if (action === 'update') {
      const rows = await sheet.getRows();
      const row = rows.find(r => r.get('ID') === warga.id);
      if (row) {
        row.assign({
          Status_Iuran: warga.status,
          Bulan_Terakhir_Bayar: warga.lastPaidMonth,
        });
        await row.save();
        return NextResponse.json({ success: true });
      }
      return NextResponse.json({ error: 'Warga not found' }, { status: 404 });
    }

    if (action === 'delete') {
      const rows = await sheet.getRows();
      const row = rows.find(r => r.get('ID') === warga.id);
      if (row) {
        await row.delete();
        return NextResponse.json({ success: true });
      }
      return NextResponse.json({ error: 'Warga not found' }, { status: 404 });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error modifying warga:', error);
    return NextResponse.json({ error: 'Failed to modify warga' }, { status: 500 });
  }
}
