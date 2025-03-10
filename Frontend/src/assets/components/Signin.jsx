// SignUp.js
import React, { useState } from 'react';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;

    if (password === confirmPassword && password.length >= 8) {
      setShowSuccess(true);
    } else {
      alert('Passwords must match and be at least 8 characters long!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-orange-600 text-center mb-2">
          Join the Coupon Marketplace!
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Create an account to start buying or selling coupons in minutes.
        </p>

        {!showSuccess ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="emailPhone"
                className="block text-gray-700 font-medium mb-2"
              >
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

            <div className="mb-6 relative group">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
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
              <span className="absolute left-0 -bottom-10 bg-orange-50 text-orange-600 p-2 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Use at least 8 characters with a mix of letters and numbers.
              </span>
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-medium mb-2"
              >
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

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Sign Up
            </button>
          </form>
        ) : (
          <div className="bg-orange-50 text-orange-600 p-4 rounded-lg text-center font-medium">
            Account created! Check your email to verify.
          </div>
        )}

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-orange-500 font-medium hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;