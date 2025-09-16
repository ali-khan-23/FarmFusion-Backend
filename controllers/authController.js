const User = require("../models/User");
const jwt = require("jsonwebtoken");

// 🔹 Helper: generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || "mysecret",
    { expiresIn: "1h" }
  );
};

// ✅ REGISTER
const registerUser = async (req, res) => {
  const { name, email, phone, address, password, role } = req.body;

  try {
    // Check existing user
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Create new
    user = new User({
      name,
      email,
      phone,
      address,
      password, // will be hashed by model
      role: role || "user",
    });

    await user.save();

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user),
    });
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).send("Server error");
  }
};

// ✅ LOGIN
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user),
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).send("Server error");
  }
};

module.exports = { registerUser, loginUser };
