import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    emailPhone: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData, {
        withCredentials: true
      });

      if (response.status === 200) {
        console.log('Login successful:', response.data);
        navigate('/');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl w-full max-w-md transform transition-all hover:shadow-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-orange-600 text-center mb-2">
          Welcome Back!
        </h1>
        <p className="text-gray-600 text-center mb-6 sm:mb-8 text-sm sm:text-base">
          Log in to access your coupons and deals.
        </p>

        {error && <div className="text-red-600 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="emailPhone" className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
              Email or Phone
            </label>
            <input
              type="text"
              id="emailPhone"
              name="emailPhone"
              placeholder="Enter your email or phone"
              value={formData.emailPhone}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 text-sm sm:text-base"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 text-sm sm:text-base"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Log In
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600 text-sm sm:text-base">
          Don't have an account?{' '}
          <a href="/signin" className="text-orange-500 font-medium hover:underline transition-colors">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
