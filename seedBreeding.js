// backend/seedBreeding.js
const mongoose = require("mongoose");
const Cattle = require("./models/Cattle");
const Breeding = require("./models/Breeding");

mongoose
  .connect("mongodb://127.0.0.1:27017/farmfusion")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB connection error:", err));

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function seedBreeding() {
  try {
    await Breeding.deleteMany();
    console.log("🧹 Old breeding data cleared");

    const males = await Cattle.find({ gender: "Male" });
    const females = await Cattle.find({ gender: "Female" });

    if (males.length === 0 || females.length === 0) {
      console.log("⚠️ Not enough cattle to seed breeding records!");
      process.exit();
    }

    let records = [];
    for (let i = 0; i < 1000; i++) {
      const male = males[getRandom(0, males.length - 1)];
      const female = females[getRandom(0, females.length - 1)];

      const breedingDate = new Date();
      breedingDate.setMonth(breedingDate.getMonth() - getRandom(1, 6));

      const expectedDeliveryDate = new Date(breedingDate);
      expectedDeliveryDate.setMonth(expectedDeliveryDate.getMonth() + 9);

      const statusOptions = ["Pregnant", "Delivered", "Failed"];
      const status = statusOptions[getRandom(0, statusOptions.length - 1)];

      records.push({
        maleCattle: male._id,
        femaleCattle: female._id,
        animalId: female.cattleId,   // ✅ save readable animalId
        partnerId: male.cattleId,    // ✅ save readable partnerId
        breedingDate,
        expectedDeliveryDate,
        status,
        notes: `Breeding record ${i + 1}`,
      });
    }

    await Breeding.insertMany(records);
    console.log("✅ 1000 breeding records inserted!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding breeding data:", err);
    process.exit(1);
  }
}

seedBreeding();
