// models/keuangan.js
const db = require('../config');

function getAll() {
  const stmt = db.prepare('SELECT * FROM keuangan ORDER BY tanggal DESC');
  return stmt.all();
}

function create({ tanggal, tipe, jumlah, deskripsi }) {
  const stmt = db.prepare('INSERT INTO keuangan (tanggal, tipe, jumlah, deskripsi) VALUES (?, ?, ?, ?)');
  const info = stmt.run(tanggal, tipe, jumlah, deskripsi);
  return { id: info.lastInsertRowid, tanggal, tipe, jumlah, deskripsi };
}

module.exports = { getAll, create };
