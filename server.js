const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");

// Load .env file
dotenv.config();

// Init express app
const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
connectDB();

// ✅ Import Routes
const authRoutes = require("./routes/auth");
const cattleRoutes = require("./routes/cattleRoutes");
const vaccinationRoutes = require("./routes/vaccinationRoutes");
const availabilityRoutes = require("./routes/availabilityRoutes");
const breedingRoutes = require("./routes/breedingRoutes");
const diseaseRoutes = require("./routes/diseaseRoutes");
const feedRoutes = require("./routes/feedRoutes");
const buyAnimalRoutes = require("./routes/buyAnimalRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const purchaseRoutes = require("./routes/purchase");
const userAnimalsRoutes = require("./routes/userAnimals");
const installmentRoutes = require("./routes/installments");
const animalRoutes = require("./routes/animal");
const vouchers = require("./routes/vouchers");
const adminRoutes = require("./routes/admin");

// ✅ Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/animals", animalRoutes);
app.use("/api/cattle", cattleRoutes);
app.use("/api/vaccination", vaccinationRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/breeding", breedingRoutes);
app.use("/api/diseases", diseaseRoutes);
app.use("/api/feed", feedRoutes);
app.use("/api/buyanimal", buyAnimalRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/user-animals", userAnimalsRoutes);
app.use("/api/installments", installmentRoutes);
app.use("/api/vouchers", vouchers);
app.use("/api/admin", adminRoutes);

// ✅ Default route (test)
app.get("/", (req, res) => {
  res.send("🌍 API is running...");
});

// ✅ Handle invalid routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ❌ REMOVE app.listen for Vercel
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

// ✅ Export app for Vercel serverless
module.exports = app;
