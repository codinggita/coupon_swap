const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  couponCode: { type: String, required: true, unique: true }, 
  valueRs: { type: Number, default: null },
  valuePercent: { type: Number, default: null },
  expiryDate: { type: Date, required: true },
  sellingPrice: { type: Number, required: true },
  minimumBuyPrice: { type: Number, required: true },
  description: { type: String },
  sellerName: { type: String },
  image: { type: String },
  createdAt: { type: Date, default: Date.now }
}); // Missing closing brace was added here

module.exports = mongoose.model('Coupon', couponSchema);