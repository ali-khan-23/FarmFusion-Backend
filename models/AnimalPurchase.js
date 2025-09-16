const mongoose = require('mongoose');

const animalPurchaseSchema = new mongoose.Schema({
  animalType: String,
  breed: String,
  age: Number,
  price: Number,
  purchaseDate: Date,
  sellerName: String,
  notes: String
});

module.exports = mongoose.model('AnimalPurchase', animalPurchaseSchema);
