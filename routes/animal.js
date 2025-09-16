// routes/animal.js
const express = require("express");
const router = express.Router();
const Animal = require("../models/Animal");

// GET all animals
router.get("/", async (req, res) => {
  try {
    const animals = await Animal.find();
    res.json(animals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add new animal
router.post("/", async (req, res) => {
  const animal = new Animal({
    name: req.body.name,
    type: req.body.type,
    price: req.body.price,
    purchaseDate: req.body.purchaseDate,
  });

  try {
    const newAnimal = await animal.save();
    res.status(201).json(newAnimal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
