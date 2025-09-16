const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Animal = require("../models/Animal");

// ✅ Get single animal by ID
router.get("/:id", auth(), async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) return res.status(404).json({ message: "Animal not found" });
    res.json(animal);
  } catch (err) {
    console.error("Error fetching animal:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Add weight entry
router.post("/:id/weight", auth(), async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) return res.status(404).json({ message: "Animal not found" });

    const newEntry = {
      date: new Date().toISOString().split("T")[0],
      weight: parseInt(req.body.weight, 10),
    };

    animal.weightProgress.push(newEntry);
    await animal.save();

    res.json(animal);
  } catch (err) {
    console.error("Error adding weight:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update installment status
router.put("/:id/installment", auth(), async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) return res.status(404).json({ message: "Animal not found" });

    animal.installmentStatus = req.body.status;
    await animal.save();

    res.json(animal);
  } catch (err) {
    console.error("Error updating installment:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
