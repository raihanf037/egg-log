# ⚙️ Backend: Aplikasi Manajemen Peternakan Ayam Petelur

## Ringkasan
Bangun backend (server + database) untuk aplikasi manajemen peternakan ayam petelur. Backend bertanggung jawab menyimpan data secara persisten menggunakan SQLite dan menyediakan API sederhana untuk dikonsumsi oleh frontend.

**Techstack:** Node.js (Express.js), SQLite

---

## Database (SQLite)

Buat 3 tabel berikut:

- **telur** — menyimpan catatan harian jumlah telur
- **pakan** — menyimpan catatan stok pakan masuk/keluar
- **keuangan** — menyimpan transaksi pemasukan dan pengeluaran

Struktur detail ada di `planning.txt` bagian "Struktur Database".

---

## API Endpoints yang Dibutuhkan

### Telur
- `GET /api/telur` — ambil semua data telur
- `POST /api/telur` — tambah data telur baru

### Pakan
- `GET /api/pakan` — ambil semua data pakan
- `POST /api/pakan` — tambah data pakan baru

### Keuangan
- `GET /api/keuangan` — ambil semua data transaksi
- `POST /api/keuangan` — tambah transaksi baru

> Untuk MVP, cukup GET dan POST. Update/Delete bisa ditambahkan belakangan.

---

## Struktur Folder Backend

```
backend/
├── db/
│   └── farm.db          ← file database SQLite
├── models/
│   ├── telur.js         ← query CRUD untuk tabel telur
│   ├── pakan.js         ← query CRUD untuk tabel pakan
│   └── keuangan.js      ← query CRUD untuk tabel keuangan
├── routes/
│   ├── telurRoutes.js
│   ├── pakanRoutes.js
│   └── keuanganRoutes.js
├── config.js            ← inisialisasi koneksi database
└── server.js            ← entry point, setup Express + routes
```

---

## Kriteria Selesai (Backend)

- [ ] Server bisa dijalankan dengan `node server.js` tanpa error
- [ ] Database SQLite dibuat otomatis saat server pertama kali dijalankan
- [ ] Semua endpoint API berfungsi (bisa diuji dengan Postman atau curl)
- [ ] Data berhasil tersimpan secara persisten di file `farm.db`

---

## Catatan
- Aplikasi berjalan **offline/lokal** — tidak perlu deployment cloud.
- Gunakan library `better-sqlite3` atau `sqlite3` untuk koneksi ke SQLite.
- Aktifkan CORS di server agar frontend bisa memanggil API.
- Frontend integration (mengganti dummy data dengan fetch ke API) dilakukan di issue terpisah.
