// routes/telurRoutes.js
const express = require('express');
const router = express.Router();
const { getAll, create } = require('../models/telur');

// GET /api/telur - list all egg records
router.get('/', (req, res) => {
  try {
    const data = getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/telur - add a new egg record
router.post('/', (req, res) => {
  const { tanggal, jumlah } = req.body;
  if (!tanggal || jumlah == null) {
    return res.status(400).json({ error: 'tanggal and jumlah required' });
  }
  try {
    const newRec = create({ tanggal, jumlah: Number(jumlah) });
    res.status(201).json(newRec);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
