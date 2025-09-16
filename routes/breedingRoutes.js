const express = require("express");
const router = express.Router();
const Breeding = require("../models/Breeding");

// ✅ GET all breeding records (with animalId & partnerId)
router.get("/", async (req, res) => {
  try {
    const data = await Breeding.find()
      .populate("maleCattle", "cattleId gender")
      .populate("femaleCattle", "cattleId gender");

    // Transform response to include `animalId` and `partnerId`
    const formatted = data.map((record) => ({
      _id: record._id,
      animalId: record.femaleCattle?.cattleId || "N/A", // female = animalId
      partnerId: record.maleCattle?.cattleId || "N/A",  // male = partnerId
      breedingDate: record.breedingDate,
      expectedDeliveryDate: record.expectedDeliveryDate,
      status: record.status,
      notes: record.notes,
    }));

    res.status(200).json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST new breeding record
router.post("/", async (req, res) => {
  try {
    const newRecord = new Breeding(req.body);
    await newRecord.save();

    res.status(201).json(newRecord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ DELETE breeding record
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Breeding.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ UPDATE breeding record
router.put("/:id", async (req, res) => {
  try {
    const updated = await Breeding.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
