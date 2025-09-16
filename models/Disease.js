const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema({
  animalId: { type: String, required: true },
  diseaseName: { type: String, required: true },
  diagnosisDate: { type: Date, required: true },
  treatment: { type: String },
  notes: { type: String }
});

module.exports = mongoose.model('Disease', diseaseSchema);
