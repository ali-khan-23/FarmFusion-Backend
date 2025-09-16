// backend/models/Vaccination.js
const mongoose = require("mongoose");

const vaccinationSchema = new mongoose.Schema(
  {
    animalId: { type: String, required: true, trim: true },
    vaccineName: { type: String, required: true },
    dateGiven: { type: Date, required: true },
    nextDueDate: { type: Date, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vaccination", vaccinationSchema);
