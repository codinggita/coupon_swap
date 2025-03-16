import React, { useState } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom';

const SignUp = () => {  
  const [formData, setFormData] = useState({
    emailPhone: '',
    password: '',
    confirmPassword: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateEmailPhone = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/; 
    return emailRegex.test(input) || phoneRegex.test(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { emailPhone, password, confirmPassword } = formData;

    if (!validateEmailPhone(emailPhone)) {
      alert('Please enter a valid email or 10-digit phone number');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (password.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signin', {
        emailPhone,
        password,
        confirmPassword,  
      });

      if (response.status === 201) {
        setShowSuccess(true);
        setFormData({
          emailPhone: '',
          password: '',
          confirmPassword: ''
        });
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message); 
      } else {
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-orange-600 text-center mb-2">
          Join the CouponSwap!
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Create an account to start buying or selling coupons in minutes.
        </p>

        {!showSuccess ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="emailPhone" className="block text-gray-700 font-medium mb-2">
                Email or Phone
              </label>
              <input
                type="text"
                id="emailPhone"
                name="emailPhone"
                placeholder="Enter your email or phone number"
                value={formData.emailPhone}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                required
              />
            </div>

            <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
              Sign Up
            </button>
          </form>
        ) : (
          <div className="bg-orange-50 text-orange-600 p-4 rounded-lg text-center font-medium">
            <p className="text-xl font-semibold">Sign Up Successful!</p>
            <p>Account created! Check your email to verify.</p>
          </div>
        )}

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-orange-500 font-medium hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;