const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// Dummy 10 vouchers
let vouchers = [
  { _id: "1", title: "New User Discount", code: "WELCOME10", discount: 10, expiry: new Date("2025-12-31") },
  { _id: "2", title: "Holiday Special", code: "HOLIDAY20", discount: 20, expiry: new Date("2025-10-15") },
  { _id: "3", title: "Loyalty Reward", code: "LOYALTY15", discount: 15, expiry: new Date("2025-11-20") },
  { _id: "4", title: "Flash Sale", code: "FLASH25", discount: 25, expiry: new Date("2025-09-30") },
  { _id: "5", title: "FarmFest Offer", code: "FARMFEST30", discount: 30, expiry: new Date("2025-10-25") },
  { _id: "6", title: "Weekend Deal", code: "WEEKEND5", discount: 5, expiry: new Date("2025-11-10") },
  { _id: "7", title: "Mega Discount", code: "MEGA50", discount: 50, expiry: new Date("2025-12-01") },
  { _id: "8", title: "Referral Bonus", code: "REFER15", discount: 15, expiry: new Date("2025-12-15") },
  { _id: "9", title: "Black Friday", code: "BLACK40", discount: 40, expiry: new Date("2025-11-29") },
  { _id: "10", title: "Christmas Special", code: "XMAS35", discount: 35, expiry: new Date("2025-12-25") },
];

// ✅ GET all vouchers
router.get("/", auth, (req, res) => {
  res.json(vouchers);
});

module.exports = router;
