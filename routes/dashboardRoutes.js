// backend/routes/dashboard.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Cattle = require("../models/Cattle");
const Vaccination = require("../models/Vaccination");
const Breeding = require("../models/Breeding");
// Add other models: Medicine, Diet, Sales, etc.

// ✅ Admin-only stats
router.get("/stats", auth(["admin"]), async (req, res) => {
  try {
    const totalCattle = await Cattle.countDocuments();
    const vaccinated = await Vaccination.countDocuments();
    const breeding = await Breeding.countDocuments();
    const available = await Cattle.countDocuments({ available: true });
    const sold = await Cattle.countDocuments({ sold: true });

    res.json({
      totalCattle,
      vaccinated,
      breeding,
      available,
      sold,
      medicines: 27,   // Replace with await Medicine.countDocuments()
      diet: "Live",    // Replace with await Diet.countDocuments()
      buyNow: 80       // Replace with real BuyNow collection count
    });
  } catch (err) {
    console.error("Dashboard stats error:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
