const User = require('../models/login');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  try {
    const { emailPhone, password } = req.body;
    console.log('Login request received:', emailPhone);
    const user = await User.findOne({ emailPhone });
    if (!user) {
      console.log(' User not found');
      return res.status(400).json({ message: 'Invalid email/phone or password' });
    }

    console.log(' User found:', user);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(' Incorrect password');
      return res.status(400).json({ message: 'Invalid email/phone or password' });
    }
    console.log(' Login successful');
    return res.status(200).json({ message: 'Login successful', user: { id: user._id, emailPhone: user.emailPhone } });

  } catch (error) {
    console.error(' Login Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
