const validateEmailPhone = (input) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/; 
  return emailRegex.test(input) || phoneRegex.test(input);
};

module.exports = (req, res, next) => {
  const { emailPhone, password, confirmPassword } = req.body;

  if (!validateEmailPhone(emailPhone)) {
    return res.status(400).json({ message: 'Invalid email or phone number' });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters' });
  }

  if (password !== confirmPassword) {  
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  next();
};
