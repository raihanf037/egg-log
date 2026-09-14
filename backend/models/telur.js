// models/telur.js
const db = require('../config');

function getAll() {
  const stmt = db.prepare('SELECT * FROM telur ORDER BY tanggal DESC');
  return stmt.all();
}

function create({ tanggal, jumlah }) {
  const stmt = db.prepare('INSERT INTO telur (tanggal, jumlah) VALUES (?, ?)');
  const info = stmt.run(tanggal, jumlah);
  return { id: info.lastInsertRowid, tanggal, jumlah };
}

module.exports = { getAll, create };
