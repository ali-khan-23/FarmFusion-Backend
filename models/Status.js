const mongoose = require("mongoose");

const StatusSchema = new mongoose.Schema({
  name: { type: String, required: true },
  weight: { type: String, required: true },
  disease: { type: String, default: "None" },
  image: { type: String },
  video: { type: String },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Status", StatusSchema);
