const mongoose = require("mongoose");

const userAnimalSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true }, // Cow, Buffalo, Goat, etc.
  name: { type: String, required: true }, // Add name field
  picture: { type: String }, // image URL
  video: { type: String }, // 🎥 YouTube or local video URL
  startingWeight: { type: Number, required: true },
  currentWeight: { type: Number, default: 0 },
  growthRecords: [
    {
      date: { type: Date, default: Date.now },
      weight: Number,
    },
  ],
  installmentPlan: {
    total: { type: Number, required: true },
    paid: { type: Number, default: 0 },
    due: { type: Number, default: 0 },
    status: { type: String, enum: ["Paid", "Due"], default: "Due" },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("UserAnimal", userAnimalSchema);
