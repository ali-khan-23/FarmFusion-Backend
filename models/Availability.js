const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  animalId: String,
  name: String,
  breed: String,
  isAvailable: Boolean,
  location: String,
  statusNote: String
});

module.exports = mongoose.model('Availability', availabilitySchema);
