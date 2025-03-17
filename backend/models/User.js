const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  emailPhone: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
});

module.exports = mongoose.model('User', UserSchema);
