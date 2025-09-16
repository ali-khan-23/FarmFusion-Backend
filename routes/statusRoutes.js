const express = require("express");
const Status = require("../models/Status");
const router = express.Router();

// GET all statuses
router.get("/", async (req, res) => {
  try {
    const statuses = await Status.find();
    res.json(statuses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one status
router.get("/:id", async (req, res) => {
  try {
    const status = await Status.findById(req.params.id);
    res.json(status);
  } catch (err) {
    res.status(404).json({ error: "Status not found" });
  }
});

// POST new status
router.post("/", async (req, res) => {
  try {
    const status = new Status(req.body);
    await status.save();
    res.status(201).json(status);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update status
router.put("/:id", async (req, res) => {
  try {
    const status = await Status.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(status);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE status
router.delete("/:id", async (req, res) => {
  try {
    await Status.findByIdAndDelete(req.params.id);
    res.json({ message: "Status deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
