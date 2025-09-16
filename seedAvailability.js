// seedAvailability.js
const mongoose = require("mongoose");
const Availability = require("./models/Availability"); // adjust path if needed

mongoose.connect("mongodb://127.0.0.1:27017/farmfusion", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const animals = [
  "Cow", "Buffalo", "Goat", "Sheep", "Camel", "Horse", "Donkey", "Chicken", "Duck", "Turkey"
];

const statuses = ["Available", "Unavailable"];

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function seedData() {
  try {
    await Availability.deleteMany(); // clear old records

    let records = [];
    for (let i = 1; i <= 1000; i++) {   // 🔥 changed 100 → 1000
      const animalType = animals[Math.floor(Math.random() * animals.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const age = getRandom(1, 12); // age in years
      const weight = getRandom(50, 800); // weight in kg

      records.push({
        animalId: `${animalType}-${i}`,
        status,
        notes: `Healthy, ${age} years old, ${weight}kg`
      });
    }

    await Availability.insertMany(records);
    console.log("✅ 1000 unique availability records with age & weight inserted!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
}

seedData();
