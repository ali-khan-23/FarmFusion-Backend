// routes/animals.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth"); // middleware to check token
const Animal = require("../models/Animal");

// 📌 Get user's purchased animals (installments)
router.get("/my-installments", auth, async (req, res) => {
  try {
    const animals = await Animal.find({ buyer: req.user.id }).select(
      "name breed price installmentStatus date"
    );
    res.json(animals);
  } catch (err) {
    console.error("Error fetching user installments:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// 📌 Admin: Update installment status
router.put("/:id/installment", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const { status } = req.body;
    const updated = await Animal.findByIdAndUpdate(
      req.params.id,
      { installmentStatus: status },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error("Error updating installment:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
