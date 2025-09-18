// backend/config/connectDB.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
    console.log("📂 Using database:", mongoose.connection.name);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    // Throw error so Vercel logs it instead of killing the process
    throw err;
  }
};

module.exports = connectDB;
