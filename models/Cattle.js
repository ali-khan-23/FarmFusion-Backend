// backend/models/Cattle.js
const mongoose = require("mongoose");

const cattleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["Cow", "Buffalo", "Goat", "Sheep"],
      required: true,
    },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    breed: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 0 }, // months or years
    weight: { type: Number, min: 0 }, // kg
    status: {
      type: String,
      enum: ["Available", "Sold", "Sick", "Breeding"],
      default: "Available",
    },
    price: { type: Number, min: 0 },
    dateAdded: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cattle", cattleSchema);
