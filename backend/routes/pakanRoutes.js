// routes/pakanRoutes.js
const express = require('express');
const router = express.Router();
const { getAll, create } = require('../models/pakan');

// GET /api/pakan - list all feed records
router.get('/', (req, res) => {
  try {
    const data = getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/pakan - add a new feed record
router.post('/', (req, res) => {
  const { tanggal, jumlah_kg, keterangan } = req.body;
  if (!tanggal || jumlah_kg == null) {
    return res.status(400).json({ error: 'tanggal and jumlah_kg required' });
  }
  try {
    const newRec = create({ tanggal, jumlah_kg: Number(jumlah_kg), keterangan });
    res.status(201).json(newRec);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
