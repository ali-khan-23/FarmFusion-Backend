// backend/routes/cattleRoutes.js
const express = require('express');
const router = express.Router();
const Cattle = require('../models/Cattle');

// GET all cattle
router.get('/', async (req, res) => {
  try {
    const cattle = await Cattle.find().sort({ createdAt: -1 });
    res.json(cattle);
  } catch (err) {
    console.error('GET /api/cattle error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST new cattle
router.post('/', async (req, res) => {
  try {
    const newCattle = new Cattle(req.body);
    const saved = await newCattle.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('POST /api/cattle error:', err);
    res.status(400).json({ error: 'Invalid cattle data' });
  }
});

// UPDATE cattle by ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Cattle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ error: 'Cattle not found' });
    res.status(200).json(updated);
  } catch (err) {
    console.error('PUT /api/cattle/:id error:', err);
    res.status(400).json({ error: 'Update failed' });
  }
});

// DELETE cattle by ID
router.delete('/:id', async (req, res) => {
  try {
    const removed = await Cattle.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Cattle not found' });
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('DELETE /api/cattle/:id error:', err);
    res.status(500).json({ error: 'Delete failed' });
  }
});

module.exports = router;
