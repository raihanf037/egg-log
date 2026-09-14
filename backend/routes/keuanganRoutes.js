// routes/keuanganRoutes.js
const express = require('express');
const router = express.Router();
const { getAll, create } = require('../models/keuangan');

// GET /api/keuangan - list all finance records
router.get('/', (req, res) => {
  try {
    const data = getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/keuangan - add a new finance record
router.post('/', (req, res) => {
  const { tanggal, tipe, jumlah, deskripsi } = req.body;
  if (!tanggal || !tipe || jumlah == null) {
    return res.status(400).json({ error: 'tanggal, tipe, and jumlah required' });
  }
  try {
    const newRec = create({ tanggal, tipe, jumlah: Number(jumlah), deskripsi });
    res.status(201).json(newRec);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
