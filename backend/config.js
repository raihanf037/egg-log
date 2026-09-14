const path = require('path');
const Database = require('better-sqlite3');

// Ensure the db directory exists
const dbDir = path.join(__dirname, 'db');
const fs = require('fs');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'farm.db');
const db = new Database(dbPath);

// Initialize tables if they don't exist
const initSchema = `
CREATE TABLE IF NOT EXISTS telur (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tanggal TEXT NOT NULL,
  jumlah INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS pakan (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tanggal TEXT NOT NULL,
  jumlah_kg REAL NOT NULL,
  keterangan TEXT
);

CREATE TABLE IF NOT EXISTS keuangan (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tanggal TEXT NOT NULL,
  tipe TEXT CHECK(tipe IN ('pemasukan','pengeluaran')) NOT NULL,
  jumlah REAL NOT NULL,
  deskripsi TEXT
);
`;

db.exec(initSchema);

module.exports = db;
