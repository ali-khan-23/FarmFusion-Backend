// models/BuyAnimal.js
const mongoose = require('mongoose');

const buyAnimalSchema = new mongoose.Schema({
  buyerName: { type: String, required: true },
  contact: { type: String, required: true },
  animalType: { type: String, required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, required: true },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('BuyAnimal', buyAnimalSchema);
