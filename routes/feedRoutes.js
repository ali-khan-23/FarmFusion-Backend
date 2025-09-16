const express = require('express');
const router = express.Router();
const FeedRecord = require("../models/FeedRecords");

// GET all feed records
router.get('/', async (req, res) => {
  try {
    const data = await Feed.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new feed record
router.post('/', async (req, res) => {
  try {
    const newRecord = new Feed(req.body);
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a feed record
router.delete('/:id', async (req, res) => {
  try {
    await Feed.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a feed record
router.put('/:id', async (req, res) => {
  try {
    const updated = await Feed.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
