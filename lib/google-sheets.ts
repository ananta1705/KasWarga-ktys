import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Inisialisasi Auth client
const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
const rawKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY || '';
const privateKey = rawKey.trim().replace(/^"/, '').replace(/"$/, '').replace(/\\n/g, '\n');

const serviceAccountAuth = new JWT({
  email: clientEmail,
  key: privateKey,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

export async function getGoogleSheet() {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_SPREADSHEET_ID as string, serviceAccountAuth);
  await doc.loadInfo();
  return doc;
}

// Fungsi helper untuk inisialisasi sheet jika belum ada
export async function ensureSheet(doc: any, title: string, headers: string[]) {
  let sheet = doc.sheetsByTitle[title];
  if (!sheet) {
    sheet = await doc.addSheet({ title, headerValues: headers });
  }
  return sheet;
}
