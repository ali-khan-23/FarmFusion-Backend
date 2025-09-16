// models/Animal.js
const mongoose = require("mongoose");

const AnimalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  purchaseDate: { type: Date, required: true },
});

module.exports = mongoose.model("Animal", AnimalSchema);
