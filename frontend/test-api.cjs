const http = require('http');

const data = JSON.stringify({
  action: 'add',
  warga: {
    id: 'W-99',
    name: 'Test Warga',
    houseNo: 'Blok X',
    phone: '0812',
    status: 'Belum Bayar',
    lastPaidMonth: '-',
    amount: 50000,
    dueDate: '2026-07-30',
    avatar: ''
  }
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/sheets/warga',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);
  
  res.on('data', d => {
    process.stdout.write(d);
  });
});

req.on('error', error => {
  console.error(error);
});

req.write(data);
req.end();
