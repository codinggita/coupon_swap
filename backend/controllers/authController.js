const User = require('../models/User');  
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signUp = async (req, res) => {
  try {
    const { emailPhone, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ emailPhone });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      emailPhone,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, try again later' });
  }
};
