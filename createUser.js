const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const hashedPassword = await bcrypt.hash("123456", 10);

  const user = new User({
    name: "Admin User",
    email: "admin@gmail.com",
    password: hashedPassword,
    role: "admin",
  });

  await user.save();
  console.log("✅ User created: admin@gmail.com / 123456");
  mongoose.connection.close();
});
