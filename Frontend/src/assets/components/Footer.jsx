import React from 'react';
import { Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-6 md:py-10 lg:py-12 transition-all duration-300">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-3">
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold flex items-center gap-2 group">
              <Tag 
                size={20} 
                className="md:size-6 lg:size-7 text-white group-hover:animate-spin transition-transform duration-500" 
              />
              <span className="bg-gradient-to-r from-white to-white bg-clip-text text-transparent">
                CouponSwap
              </span>
            </h3>
            <p className="text-gray-300 text-sm md:text-base max-w-[200px] md:max-w-xs">
              Your trusted platform for coupon trading since 2023.
            </p>
          </div>

          {/* Explore Section */}
          <div className="text-center sm:text-left">
            <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-4 text-white">Explore</h3>
            <ul className="space-y-3 text-sm md:text-base text-gray-300">
              <li>
                <Link
                  to="/browse"
                  className="relative hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                >
                  Browse Deals
                </Link>
              </li>
              <li>
                <Link
                  to="/sell"
                  className="relative hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                >
                  Sell Coupons
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className="relative hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                >
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="text-center sm:text-left">
            <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-3 text-sm md:text-base text-gray-300">
              <li>
                <Link
                  to="/faq"
                  className="relative hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="relative hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="relative hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Get in Touch Section */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-4">
            <h3 className="text-base md:text-lg lg:text-xl font-semibold text-white">Get in Touch</h3>
            <div className="space-y-2">
              <p className="text-gray-300 text-sm md:text-base">support@couponswap.com</p>
              <p className="text-gray-300 text-sm md:text-base">+91 98765-43210</p>
            </div>
            <Link
              to="/contact"
              className="bg-white text-gray-900 font-medium py-2 px-6 rounded-full text-sm md:text-base transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg hover:bg-gray-100 inline-block"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 md:mt-10 lg:mt-12 pt-6 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm md:text-base font-medium">
            © 2025 CouponSwap. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;