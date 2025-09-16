const mongoose = require("mongoose");

const voucherSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  discount: { type: Number, required: true },
  expiry: { type: Date, required: true },
});

module.exports = mongoose.model("Voucher", voucherSchema);
