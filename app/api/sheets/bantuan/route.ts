import { NextResponse } from 'next/server';
import { getGoogleSheet, ensureSheet } from '@/lib/google-sheets';

export const dynamic = 'force-dynamic';

const SHEET_TITLE = 'Bantuan';
const HEADERS = ['ID', 'ID_Warga', 'Nama_Warga', 'Nomor_Rumah', 'Jenis_Bantuan', 'Status', 'Tanggal_Usulan', 'Keterangan'];

export async function GET() {
  try {
    const doc = await getGoogleSheet();
    const sheet = await ensureSheet(doc, SHEET_TITLE, HEADERS);
    const rows = await sheet.getRows();
    
    const bantuanList = rows.map((row) => ({
      id: row.get('ID'),
      wargaId: row.get('ID_Warga') || undefined,
      wargaName: row.get('Nama_Warga'),
      houseNo: row.get('Nomor_Rumah'),
      jenisBantuan: row.get('Jenis_Bantuan'),
      status: row.get('Status'),
      tanggalUsulan: row.get('Tanggal_Usulan'),
      keterangan: row.get('Keterangan') || '',
    }));

    return NextResponse.json(bantuanList);
  } catch (error) {
    console.error('Error fetching bantuan:', error);
    return NextResponse.json({ error: 'Failed to fetch bantuan' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { action, bantuan } = await req.json();
    const doc = await getGoogleSheet();
    const sheet = await ensureSheet(doc, SHEET_TITLE, HEADERS);

    if (action === 'add') {
      await sheet.addRow({
        ID: bantuan.id,
        ID_Warga: bantuan.wargaId || '',
        Nama_Warga: bantuan.wargaName,
        Nomor_Rumah: bantuan.houseNo,
        Jenis_Bantuan: bantuan.jenisBantuan,
        Status: bantuan.status,
        Tanggal_Usulan: bantuan.tanggalUsulan,
        Keterangan: bantuan.keterangan || '',
      });
      return NextResponse.json({ success: true });
    }

    if (action === 'update') {
      const rows = await sheet.getRows();
      const row = rows.find(r => r.get('ID') === bantuan.id);
      if (row) {
        row.assign({
          Status: bantuan.status,
          Keterangan: bantuan.keterangan || '',
        });
        await row.save();
        return NextResponse.json({ success: true });
      }
      return NextResponse.json({ error: 'Bantuan not found' }, { status: 404 });
    }

    if (action === 'delete') {
      const rows = await sheet.getRows();
      const row = rows.find(r => r.get('ID') === bantuan.id);
      if (row) {
        await row.delete();
        return NextResponse.json({ success: true });
      }
      return NextResponse.json({ error: 'Bantuan not found' }, { status: 404 });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error modifying bantuan:', error);
    return NextResponse.json({ error: 'Failed to modify bantuan' }, { status: 500 });
  }
}
