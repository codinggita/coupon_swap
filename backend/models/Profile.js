const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  bankName: { type: String },
  accountNumber: { type: String },
  ifscCode: { type: String },
  accountHolderName: { type: String },
  bankUpi: { type: String },
  address: { type: String },
  password: { type: String }, 
  profilePicture: { type: String }, 
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);