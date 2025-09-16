const mongoose = require('mongoose');

const feedSchema = new mongoose.Schema({
  animalId: { type: String, required: true },
  feedType: { type: String, required: true },
  quantity: { type: String, required: true }, // keeping as String for flexibility
  dateGiven: { type: Date, required: true },
  notes: { type: String }
});

module.exports = mongoose.model('Feed', feedSchema);
