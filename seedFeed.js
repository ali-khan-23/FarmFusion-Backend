// seedFeed.js
const mongoose = require("mongoose");
const Feed = require("./models/Feed"); // adjust path
mongoose.connect("mongodb://127.0.0.1:27017/farmfusion", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const feedTypes = ["Grass", "Silage", "Grain", "Hay", "Minerals", "Concentrate"];
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function seedData() {
  try {
    await Feed.deleteMany();

    let records = [];
    for (let i = 1; i <= 1000; i++) {
      const feedType = feedTypes[Math.floor(Math.random() * feedTypes.length)];
      const quantity = getRandom(5, 50); // kg
      const dateGiven = new Date(2024, getRandom(0, 11), getRandom(1, 28));
      records.push({
        animalId: `Animal-${getRandom(1, 1000)}`,
        feedType,
        quantity,
        dateGiven,
        notes: `Notes for ${feedType} batch ${i}`,
      });
    }

    await Feed.insertMany(records);
    console.log("✅ 1000 feed records inserted!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding feed data:", err);
    process.exit(1);
  }
}
seedData();
