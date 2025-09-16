// routes/buyAnimalRoutes.js
const express = require('express');
const router = express.Router();
const BuyAnimal = require('../models/BuyAnimal');

// GET all
router.get('/', async (req, res) => {
  const data = await BuyAnimal.find();
  res.json(data);
});

// POST
router.post('/', async (req, res) => {
  const newOrder = new BuyAnimal(req.body);
  await newOrder.save();
  res.status(201).json(newOrder);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await BuyAnimal.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

// PUT
router.put('/:id', async (req, res) => {
  const updated = await BuyAnimal.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

module.exports = router;
