// models/pakan.js
const db = require('../config');

function getAll() {
  const stmt = db.prepare('SELECT * FROM pakan ORDER BY tanggal DESC');
  return stmt.all();
}

function create({ tanggal, jumlah_kg, keterangan }) {
  const stmt = db.prepare('INSERT INTO pakan (tanggal, jumlah_kg, keterangan) VALUES (?, ?, ?)');
  const info = stmt.run(tanggal, jumlah_kg, keterangan);
  return { id: info.lastInsertRowid, tanggal, jumlah_kg, keterangan };
}

module.exports = { getAll, create };
