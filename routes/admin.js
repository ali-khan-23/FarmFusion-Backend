// routes/admin.js
const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// ✅ Admin-only dashboard example
router.get("/dashboard", auth(["admin"]), (req, res) => {
  res.json({ message: "Welcome Admin! This is your dashboard." });
});

// ✅ Example: both user & admin can access profile
router.get("/profile", auth(["user", "admin"]), (req, res) => {
  res.json({ message: `Hello ${req.user.role}, here is your profile.` });
});

// ✅ Admin: Get all users
router.get("/users", auth(["admin"]), async (req, res) => {
  try {
    const users = await User.find().select("-password"); // hide passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Admin: Update a user
router.put("/users/:id", auth(["admin"]), async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-password");

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Admin: Delete a user
router.delete("/users/:id", auth(["admin"]), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
