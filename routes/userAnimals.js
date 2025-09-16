const express = require("express");
const router = express.Router();
const UserAnimal = require("../models/UserAnimal");

// Add new animal
router.post("/", async (req, res) => {
  try {
    const animal = new UserAnimal(req.body);
    await animal.save();
    res.json(animal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all animals for a user
router.get("/:userId", async (req, res) => {
  try {
    const animals = await UserAnimal.find({ owner: req.params.userId });
    res.json(animals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update growth (weight progress)
router.put("/:id/progress", async (req, res) => {
  try {
    const { weight } = req.body;
    const animal = await UserAnimal.findById(req.params.id);
    animal.currentWeight = weight;
    animal.growthRecords.push({ weight });
    await animal.save();
    res.json(animal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update installment
router.put("/:id/installment", async (req, res) => {
  try {
    const { paid } = req.body;
    const animal = await UserAnimal.findById(req.params.id);

    animal.installmentPlan.paid += paid;
    animal.installmentPlan.due = animal.installmentPlan.total - animal.installmentPlan.paid;
    animal.installmentPlan.status =
      animal.installmentPlan.due === 0 ? "Paid" : "Due";

    await animal.save();
    res.json(animal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
