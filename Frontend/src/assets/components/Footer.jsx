import React from 'react';
import { Tag } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-8 md:py-12 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {/* Brand Section */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2 group">
              <Tag size={20} className="md:size-16 text-white-500 group-hover:animate-spin transition-transform duration-500" />
              <span className="bg-gradient-to-r from-white-500 to-white-500 bg-clip-text text-transparent">
                CouponSwap
              </span>
            </h3>
            <p className="text-gray-300 text-xs md:text-sm max-w-xs">
              Your trusted platform for coupon trading since 2023.
            </p>
          </div>

          {/* Explore Section */}
          <div className="text-center sm:text-left">
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-white-400">Explore</h3>
            <ul className="space-y-3 text-xs md:text-sm text-gray-300">
              {['Browse Deals', 'Sell Coupons', 'How It Works'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="relative hover:text-white-400 transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white-400 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div className="text-center sm:text-left">
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-white-400">Support</h3>
            <ul className="space-y-3 text-xs md:text-sm text-gray-300">
              {['FAQ', 'Contact Us', 'Terms'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="relative hover:text-white-400 transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-orange-400 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in Touch Section */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-white-400">Get in Touch</h3>
            <p className="text-gray-300 text-xs md:text-sm mb-2">support@couponswap.com</p>
            <p className="text-gray-300 text-xs md:text-sm mb-4">+91 98765-43210</p>
            <button className="bg-white-600 hover:bg-white-700 text-white font-medium py-1.5 px-4 md:py-2 md:px-6 rounded-full text-xs md:text-sm transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
              Contact Us
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-xs md:text-sm font-medium">
            © 2025 CouponSwap. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;