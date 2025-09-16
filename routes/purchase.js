const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth"); // ✅ use your role-based auth middleware
const Purchase = require("../models/Purchase");

// Get logged-in user's purchases
router.get("/my-purchases", auth(), async (req, res) => {
  try {
    const purchases = await Purchase.find({ user: req.user.id }).populate("animal");
    res.json(purchases);
  } catch (err) {
    console.error("Error fetching purchases:", err);
    res.status(500).json({ error: "Server error fetching purchases" });
  }
});

module.exports = router;
