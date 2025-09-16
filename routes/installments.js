// backend/routes/installments.js
const express = require("express");
const Installment = require("../models/Installment");
const auth = require("../middleware/auth");


const router = express.Router();

// ✅ Get logged-in user's installments
// ✅ Get logged-in user's installments
router.get("/my-installments", auth(), async (req, res) => {
  try {
    const installments = await Installment.find({ user: req.user.id }).populate("animal");
    res.json(installments);
  } catch (err) {
    console.error("Error fetching installments:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Add a new installment
router.post("/", auth(), async (req, res) => {
  try {
    const { animal, amount, status } = req.body;

    const newInstallment = new Installment({
      user: req.user.id,
      animal,
      amount,
      status,
      date: new Date(),
    });

    await newInstallment.save();
    res.status(201).json(newInstallment);
  } catch (err) {
    console.error("Error creating installment:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
