// models/Breeding.js
const mongoose = require("mongoose");

const breedingSchema = new mongoose.Schema({
  maleCattle: { type: mongoose.Schema.Types.ObjectId, ref: "Cattle", required: true },
  femaleCattle: { type: mongoose.Schema.Types.ObjectId, ref: "Cattle", required: true },
  animalId: { type: String },   // Female cattle ID
  partnerId: { type: String },  // Male cattle ID
  breedingDate: { type: Date, required: true },
  expectedDeliveryDate: { type: Date, required: true },
  status: { type: String, enum: ["Pregnant", "Delivered", "Failed"] },
  notes: String,
});

module.exports = mongoose.model("Breeding", breedingSchema);
