import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CouponVerification = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [couponStatus, setCouponStatus] = useState('Verifying...');
  const couponData = {
    code: 'SAMPLE123', 
    companies: [
      { name: 'Amazon', valid: true, discount: '10% off' },
      { name: 'Walmart', valid: true, discount: '15% off' },
      { name: 'Target', valid: false, discount: 'N/A' },
      { name: 'Best Buy', valid: true, discount: '$20 off' },
    ],
  };

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 500);
    const verifyCoupon = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const validCompany = couponData.companies.find((company) => company.valid);
        if (validCompany) {
          setCouponStatus(`Valid at ${validCompany.name}! (${validCompany.discount})`);
          setTimeout(() => navigate('/CoupenSuccess'), 2000); 
        } else {
          setCouponStatus('Sorry, this coupon is invalid.');
          setTimeout(() => navigate('/coupon-error'), 2000); 
        }
      } catch (error) {
        setCouponStatus('Verification failed. Please try again.');
        console.error('Verification error:', error);
        setTimeout(() => navigate('/coupon-error'), 2000);
      }
    };

    verifyCoupon();

    return () => clearInterval(progressInterval);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl w-full max-w-md transform transition-all hover:shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-100 rounded-full flex items-center justify-center animate-pulse">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 5v2m0 4v2m0 4v2M5 5h14a2 2 0 012 2v3a2 2 0 000 4v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3a2 2 0 000-4V7a2 2 0 012-2z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-orange-600 text-center mb-2 animate-fade-in-down">
          Verifying Your Coupon
        </h1>
        <p className="text-gray-600 text-center mb-6 sm:mb-8 text-sm sm:text-base">
          Hang tight! We’re checking if your coupon is valid.
        </p>

        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div
            className="bg-orange-500 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-center text-gray-500 text-sm sm:text-base animate-pulse">
          {couponStatus === 'Verifying...' ? 'This may take a few seconds...' : couponStatus}
        </p>
      </div>
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CouponVerification;