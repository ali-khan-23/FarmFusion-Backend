// routes/voucherRoutes.js
const express = require("express");
const router = express.Router();
const Voucher = require("../models/Voucher");
const auth = require("../middleware/auth"); // ✅ import middleware

// ✅ Create a new voucher (only Admin)
router.post("/", auth(["admin"]), async (req, res) => {
  try {
    const { userId, animalId, amount, month, status } = req.body;

    const voucher = new Voucher({
      voucherNumber: "VCH-" + Date.now(),
      userId,
      animalId,
      amount,
      month,
      status,
    });

    await voucher.save();
    res.json(voucher);
  } catch (err) {
    console.error("Error creating voucher:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get all vouchers (Admin only)
router.get("/", auth(["admin"]), async (req, res) => {
  try {
    const vouchers = await Voucher.find().sort({ date: -1 });
    res.json(vouchers);
  } catch (err) {
    console.error("Error fetching vouchers:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get all vouchers for a user (User or Admin)
router.get("/user/:id", auth(["user", "admin"]), async (req, res) => {
  try {
    // If user is not admin, make sure they only fetch their own vouchers
    if (req.user.role !== "admin" && req.user.id !== req.params.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const vouchers = await Voucher.find({ userId: req.params.id }).sort({ date: -1 });
    res.json(vouchers);
  } catch (err) {
    console.error("Error fetching user vouchers:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get vouchers by animalId (Admin only)
router.get("/animal/:id", auth(["admin"]), async (req, res) => {
  try {
    const vouchers = await Voucher.find({ animalId: req.params.id }).sort({ date: -1 });
    res.json(vouchers);
  } catch (err) {
    console.error("Error fetching animal vouchers:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get vouchers by month (Admin only)
router.get("/month/:month", auth(["admin"]), async (req, res) => {
  try {
    const vouchers = await Voucher.find({ month: req.params.month }).sort({ date: -1 });
    res.json(vouchers);
  } catch (err) {
    console.error("Error fetching monthly vouchers:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
