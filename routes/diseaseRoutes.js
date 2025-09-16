const express = require('express');
const router = express.Router();
const Disease = require('../models/Disease');

// GET all
router.get('/', async (req, res) => {
  try {
    const data = await Disease.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new disease record
router.post('/', async (req, res) => {
  try {
    const newEntry = new Disease(req.body);
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE disease record
router.delete('/:id', async (req, res) => {
  try {
    await Disease.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE disease record
router.put('/:id', async (req, res) => {
  try {
    const updated = await Disease.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
