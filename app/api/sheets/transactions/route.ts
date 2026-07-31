import { NextResponse } from 'next/server';
import { getGoogleSheet, ensureSheet } from '@/lib/google-sheets';

export const dynamic = 'force-dynamic';

const SHEET_TITLE = 'Transactions';
const HEADERS = ['ID', 'Tanggal', 'Keterangan', 'Kategori', 'Tipe', 'Nominal', 'Pencatat', 'Metode_Pembayaran', 'Sumber_Atau_Penerima'];

export async function GET() {
  try {
    const doc = await getGoogleSheet();
    const sheet = await ensureSheet(doc, SHEET_TITLE, HEADERS);
    const rows = await sheet.getRows();
    
    const transactions = rows.map((row) => ({
      id: row.get('ID'),
      date: row.get('Tanggal'),
      description: row.get('Keterangan'),
      category: row.get('Kategori'),
      type: row.get('Tipe'),
      amount: Number(row.get('Nominal')),
      recordedBy: row.get('Pencatat'),
      paymentMethod: row.get('Metode_Pembayaran'),
      sourceOrRecipient: row.get('Sumber_Atau_Penerima'),
    }));

    return NextResponse.json(transactions.reverse()); // Reverse to put newest on top
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { action, transaction } = await req.json();
    const doc = await getGoogleSheet();
    const sheet = await ensureSheet(doc, SHEET_TITLE, HEADERS);

    if (action === 'add') {
      await sheet.addRow({
        ID: transaction.id,
        Tanggal: transaction.date,
        Keterangan: transaction.description,
        Kategori: transaction.category,
        Tipe: transaction.type,
        Nominal: transaction.amount,
        Pencatat: transaction.recordedBy,
        Metode_Pembayaran: transaction.paymentMethod,
        Sumber_Atau_Penerima: transaction.sourceOrRecipient,
      });
      return NextResponse.json({ success: true });
    }

    if (action === 'update') {
      const rows = await sheet.getRows();
      const row = rows.find(r => r.get('ID') === transaction.id);
      if (row) {
        row.assign({
          Tanggal: transaction.date,
          Keterangan: transaction.description,
          Kategori: transaction.category,
          Tipe: transaction.type,
          Nominal: transaction.amount,
          Pencatat: transaction.recordedBy,
          Metode_Pembayaran: transaction.paymentMethod,
          Sumber_Atau_Penerima: transaction.sourceOrRecipient,
        });
        await row.save();
        return NextResponse.json({ success: true });
      }
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    if (action === 'delete') {
      const rows = await sheet.getRows();
      const row = rows.find(r => r.get('ID') === transaction.id);
      if (row) {
        await row.delete();
        return NextResponse.json({ success: true });
      }
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error modifying transaction:', error);
    return NextResponse.json({ error: 'Failed to modify transaction' }, { status: 500 });
  }
}
