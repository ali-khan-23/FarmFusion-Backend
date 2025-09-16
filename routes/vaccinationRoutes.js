const express = require('express');
const router = express.Router();
const Vaccination = require('../models/Vaccination');

// GET all records
router.get('/', async (req, res) => {
  try {
    const records = await Vaccination.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch vaccination records' });
  }
});

// POST new record
router.post('/', async (req, res) => {
  try {
    const { animalId, vaccineName, dateGiven, nextDueDate, notes } = req.body;
    if (!animalId || !vaccineName || !dateGiven || !nextDueDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const newRecord = new Vaccination({ animalId, vaccineName, dateGiven, nextDueDate, notes });
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create vaccination record' });
  }
});

// DELETE record
router.delete('/:id', async (req, res) => {
  try {
    await Vaccination.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete record' });
  }
});

// UPDATE record
router.put('/:id', async (req, res) => {
  try {
    const updated = await Vaccination.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update record' });
  }
});

module.exports = router;
