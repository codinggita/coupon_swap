// SuccessPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();

  const handleViewListing = () => {
    navigate('/'); // Redirects to home route
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-amber-50 to-amber-100 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl max-w-md w-full text-center transform transition-all animate-fadeIn">
        {/* Success Icon */}
        <div className="text-5xl sm:text-6xl text-amber-500 mb-4 sm:mb-6">✓</div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3 sm:mb-4">
          Coupon Listed!
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8">
          Your coupon is now live in the marketplace.
        </p>

        {/* Coupon Details */}
        <div className="bg-amber-50 p-4 sm:p-5 rounded-lg mb-6 sm:mb-8 border border-amber-100">
          <p className="text-gray-700 text-sm sm:text-base md:text-lg">
            ₹50 Paytm Coupon | Listed for ₹40
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleViewListing}
          className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 px-6 sm:py-3 sm:px-8 rounded-full text-base sm:text-lg font-medium hover:from-orange-700 hover:to-orange-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
        >
          View Listing
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;