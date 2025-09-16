const express = require('express');
const router = express.Router();
const AnimalPurchase = require('../models/AnimalPurchase');

// Get all records
router.get('/', async (req, res) => {
  const records = await AnimalPurchase.find();
  res.json(records);
});

// Create new record
router.post('/', async (req, res) => {
  const record = new AnimalPurchase(req.body);
  await record.save();
  res.status(201).json(record);
});

// Update record
router.put('/:id', async (req, res) => {
  const updated = await AnimalPurchase.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete record
router.delete('/:id', async (req, res) => {
  await AnimalPurchase.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
