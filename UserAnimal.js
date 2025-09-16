// backend/seedUserAnimals.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const UserAnimal = require("./models/UserAnimal");

// Load env
dotenv.config();
connectDB();

const seedAnimals = async () => {
  try {
    await UserAnimal.deleteMany(); // clear old data

    const dummyAnimals = [
      {
        owner: "64f0c0f9a7c123456789abcd", // replace with a real user _id from your DB
        type: "Cow",
        name: "Brownie",
        picture: "https://images.unsplash.com/photo-1551024709-8f23befc6cf7",
        video: "https://www.youtube.com/watch?v=dummycow",
        startingWeight: 150,
        currentWeight: 200,
        growthRecords: [
          { date: new Date("2024-01-01"), weight: 150 },
          { date: new Date("2024-02-01"), weight: 170 },
          { date: new Date("2024-03-01"), weight: 200 },
        ],
        installmentPlan: { total: 50000, paid: 25000, due: 25000, status: "Due" },
      },
      {
        owner: "64f0c0f9a7c123456789abcd",
        type: "Buffalo",
        name: "Shadow",
        picture: "https://images.unsplash.com/photo-1602526212279-1a2b",
        video: "https://www.youtube.com/watch?v=dummybuffalo",
        startingWeight: 200,
        currentWeight: 260,
        growthRecords: [
          { date: new Date("2024-01-01"), weight: 200 },
          { date: new Date("2024-02-01"), weight: 230 },
          { date: new Date("2024-03-01"), weight: 260 },
        ],
        installmentPlan: { total: 60000, paid: 60000, due: 0, status: "Paid" },
      },
      {
        owner: "64f0c0f9a7c123456789abcd",
        type: "Goat",
        name: "Snowy",
        picture: "https://images.unsplash.com/photo-1589923188900-8b2d",
        video: "https://www.youtube.com/watch?v=dummygoat",
        startingWeight: 25,
        currentWeight: 40,
        growthRecords: [
          { date: new Date("2024-01-01"), weight: 25 },
          { date: new Date("2024-02-01"), weight: 32 },
          { date: new Date("2024-03-01"), weight: 40 },
        ],
        installmentPlan: { total: 20000, paid: 10000, due: 10000, status: "Due" },
      },
    ];

    await UserAnimal.insertMany(dummyAnimals);
    console.log("✅ Dummy animals inserted!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seedAnimals();
