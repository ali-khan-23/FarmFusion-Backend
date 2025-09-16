// seedVaccination.js
const mongoose = require('mongoose');
const Vaccination = require('./models/Vaccination'); // adjust path if needed
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cattlefarm';

const vaccines = [
  "FMD", "Black Quarter", "HS", "Brucellosis", "Anthrax",
  "Rabies", "PPR", "Lumpy Skin", "Theileriosis", "Enterotoxemia"
];

const notesSamples = [
  "Healthy after dose", "Mild fever observed", "No issues", "Needs follow-up", "Booster required",
  "Check after 3 weeks", "Administered successfully", "Observed swelling", "Stable", "Repeat annually"
];

const animals = Array.from({ length: 20 }, (_, i) => `COW-${i + 1}`);

const generateRecords = () => {
  const records = [];
  for (let i = 0; i < 50; i++) {
    const vaccineName = vaccines[Math.floor(Math.random() * vaccines.length)];
    const animalId = animals[Math.floor(Math.random() * animals.length)];

    const dateGiven = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const nextDueDate = new Date(dateGiven);
    nextDueDate.setMonth(dateGiven.getMonth() + 6);

    records.push({
      animalId,
      vaccineName,
      dateGiven,
      nextDueDate,
      notes: notesSamples[Math.floor(Math.random() * notesSamples.length)],
    });
  }
  return records;
};

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    await Vaccination.deleteMany({});
    console.log("🗑️ Old records cleared");

    const data = generateRecords();
    await Vaccination.insertMany(data);
    console.log(`✅ Inserted ${data.length} vaccination records`);

    process.exit();
  } catch (err) {
    console.error("❌ Error seeding vaccination records:", err);
    process.exit(1);
  }
};

seed();
