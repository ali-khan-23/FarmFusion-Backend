// backend/seedCattles.js
const mongoose = require("mongoose");
const Cattle = require("./models/Cattle");

mongoose
  .connect("mongodb://127.0.0.1:27017/farmfusion")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB connection error:", err));

const cattleTypes = ["Cow", "Buffalo", "Goat", "Sheep"];
const genders = ["Male", "Female"];
const breeds = {
  Cow: ["Holstein", "Jersey", "Sahiwal", "Angus"],
  Buffalo: ["Murrah", "Nili-Ravi", "Surti"],
  Goat: ["Boer", "Beetal", "Jamunapari"],
  Sheep: ["Merino", "Dorper", "Karakul"],
};

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function seedData() {
  try {
    await Cattle.deleteMany(); // clear old records
    console.log("🧹 Old cattle data cleared");

    let records = [];
    for (let i = 1; i <= 1000; i++) {
      const type = cattleTypes[Math.floor(Math.random() * cattleTypes.length)];
      const gender = genders[Math.floor(Math.random() * genders.length)];
      const breedList = breeds[type];
      const breed = breedList[Math.floor(Math.random() * breedList.length)];

      const age = getRandom(12, 120); // months (1–10 years)
      const weight = getRandom(50, 800); // kg
      const price = getRandom(300, 3000);

      records.push({
        name: `${type}-${i}`,
        type,
        gender,
        breed,
        age,
        weight,
        price,
      });
    }

    await Cattle.insertMany(records);
    console.log("✅ 1000 cattle records inserted!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding cattle:", err);
    process.exit(1);
  }
}

seedData();
