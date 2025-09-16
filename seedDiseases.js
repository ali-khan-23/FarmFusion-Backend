// seedDiseases.js
const mongoose = require('mongoose');
const Disease = require('./models/Disease'); // adjust path if needed
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cattlefarm';

// Common cattle diseases
const diseases = [
  "Mastitis",
  "Foot and Mouth Disease",
  "Black Quarter",
  "Brucellosis",
  "Hemorrhagic Septicemia",
  "Anthrax",
  "Rabies",
  "Theileriosis",
  "Lumpy Skin Disease",
  "Parasitic Infestation"
];

// Common treatments
const treatments = [
  "Antibiotics",
  "Vaccination",
  "Deworming",
  "Supportive therapy",
  "Isolated and monitored",
  "Surgical intervention",
  "Anti-inflammatory drugs",
  "Nutritional supplements"
];

// Notes
const notesSamples = [
  "Recovered after treatment",
  "Needs follow-up check",
  "Under observation",
  "Mild case, stable",
  "Severe infection, monitor closely",
  "Responding to antibiotics",
  "Treatment ongoing",
  "Booster required",
  "Stable condition",
  "Critical, needs intensive care"
];

// Sample animal IDs
const animals = Array.from({ length: 20 }, (_, i) => `COW-${i + 1}`);

const generateRecords = () => {
  const records = [];
  for (let i = 0; i < 50; i++) {
    const diseaseName = diseases[Math.floor(Math.random() * diseases.length)];
    const animalId = animals[Math.floor(Math.random() * animals.length)];
    const treatment = treatments[Math.floor(Math.random() * treatments.length)];
    const notes = notesSamples[Math.floor(Math.random() * notesSamples.length)];

    const diagnosisDate = new Date(
      2024,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    );

    records.push({
      animalId,
      diseaseName,
      diagnosisDate,
      treatment,
      notes,
    });
  }
  return records;
};

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    await Disease.deleteMany({});
    console.log("🗑️ Old disease records cleared");

    const data = generateRecords();
    await Disease.insertMany(data);
    console.log(`✅ Inserted ${data.length} disease records`);

    process.exit();
  } catch (err) {
    console.error("❌ Error seeding disease records:", err);
    process.exit(1);
  }
};

seed();
