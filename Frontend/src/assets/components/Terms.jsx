import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Mail, Lock, User, ArrowRight } from 'lucide-react';
const TermsConditions = () => {
  const [expandedTerm, setExpandedTerm] = useState(null);
  const [showFeatures, setShowFeatures] = useState(false);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const terms = [
    {
      title: "Coupons must be valid and unused",
      description: "All coupons must be current and not previously redeemed to be accepted.",
      details: "We verify each coupon's validity through our secure system to ensure fair usage and prevent fraud."
    },
    {
      title: "No refunds after purchase",
      description: "All sales are final once the transaction is completed successfully.",
      details: "This policy helps us maintain consistent pricing and service quality across the platform."
    },
    {
      title: "User account responsibility",
      description: "You are responsible for maintaining the security of your account.",
      details: "Use strong passwords and report any suspicious activity immediately to our support team."
    },
    {
      title: "Prohibited activities",
      description: "Fraudulent or illegal activities are strictly prohibited.",
      details: "This includes listing fake coupons or attempting to manipulate pricing—violators will be banned."
    },
    {
      title: "Payment processing",
      description: "Payments are processed within 1-2 business days.",
      details: "Delays may occur due to bank processing times, but we strive for quick payouts."
    },
    {
      title: "Termination of service",
      description: "We reserve the right to terminate accounts for policy violations.",
      details: "Repeated breaches or misuse of the platform may result in permanent suspension."
    },
  ];

  const features = [
    { title: "Instant Validation", description: "Real-time coupon verification system with 99.9% uptime.", icon: "⚡" },
    { title: "User Dashboard", description: "Track your purchases and coupons in a personalized dashboard.", icon: "📊" },
    { title: "24/7 Support", description: "Round-the-clock customer assistance for all your needs.", icon: "📞" },
    { title: "Secure Transactions", description: "End-to-end encrypted transactions for maximum security.", icon: "🔒" },
    { title: "Verified Sellers", description: "Every seller is thoroughly checked for authenticity.", icon: "✅" },
    { title: "Fast Payouts", description: "Withdraw your earnings quickly with no hassle.", icon: "💰" },
  ];

  const nextFeature = () => setCurrentFeatureIndex((prev) => (prev + 1) % Math.ceil(features.length / 3));
  const prevFeature = () => setCurrentFeatureIndex((prev) => (prev - 1 + Math.ceil(features.length / 3)) % Math.ceil(features.length / 3));

  const visibleFeatures = features.slice(currentFeatureIndex * 3, currentFeatureIndex * 3 + 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header Section */}
        <header className="text-center bg-white rounded-2xl shadow-xl p-8 transition-all duration-500 hover:shadow-2xl animate-fade-in">
          <div className="flex justify-center mb-4">
            <span className="text-sm text-orange-600">
              Home &gt; <span className="font-semibold">Terms & Conditions</span>
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-orange-600 mb-4">Terms & Conditions</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            By using CouponSwap, you agree to these carefully crafted rules designed to ensure a fair and secure experience.
          </p>
        </header>

        {/* Terms Section */}
        <section className="bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-orange-500 mb-6 border-b border-orange-200 pb-2">Our Terms</h2>
          <ul className="space-y-8">
            {terms.map((term, index) => (
              <li key={index} className="flex flex-col">
                <div className="flex items-start gap-4">
                  <span className="text-orange-500 text-2xl">•</span>
                  <div className="flex-1">
                    <button
                      onClick={() => setExpandedTerm(expandedTerm === index ? null : index)}
                      className="text-orange-500 font-semibold text-lg md:text-xl hover:text-orange-600 transition-colors text-left"
                    >
                      {term.title}
                    </button>
                    <p className="ml-0 text-gray-600 text-base mt-2">{term.description}</p>
                  </div>
                </div>
                {expandedTerm === index && (
                  <div className="mt-4 ml-10 text-gray-600 text-sm bg-orange-50 p-4 rounded-lg animate-slide-down">
                    <p>{term.details}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
        {/* User Responsibilities Section */}
        <section className="bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-orange-500 mb-6 border-b border-orange-200 pb-2">Your Responsibilities</h2>
          <ul className="space-y-6 text-gray-600">
            <li className="flex items-start gap-4">
              <User size={24} className="text-orange-500" />
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Accurate Information</h3>
                <p>Provide truthful details when listing or purchasing coupons to maintain trust.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Lock size={24} className="text-orange-500" />
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Account Security</h3>
                <p>Keep your login credentials safe and report any breaches immediately.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Mail size={24} className="text-orange-500" />
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Communication</h3>
                <p>Respond promptly to inquiries from buyers or our support team.</p>
              </div>
            </li>
          </ul>
        </section>

        {/* Features Section */}
        <section className="bg-orange-100 rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-orange-600">Why Choose CouponSwap</h2>
            <button
              onClick={() => setShowFeatures(!showFeatures)}
              className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-2 transition-all"
            >
              {showFeatures ? 'Hide' : 'Show'} Benefits
              <svg
                className={`w-5 h-5 transform transition-transform ${showFeatures ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          {showFeatures && (
            <div className="relative animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {visibleFeatures.map((feature, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-lg font-medium text-orange-500">{feature.title}</h3>
                    <p className="text-gray-600 text-sm mt-2">{feature.description}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={prevFeature}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextFeature}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </section>

        {/* Privacy Commitment Section */}
        <section className="bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-orange-500 mb-6 border-b border-orange-200 pb-2">Our Privacy Commitment</h2>
          <p className="text-gray-600 mb-4">
            At CouponSwap, your privacy is our priority. We use industry-standard encryption to protect your data and never share your personal information without consent.
          </p>
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-center gap-3">
              <Lock size={20} className="text-orange-500" />
              <span>Data is encrypted end-to-end.</span>
            </li>
            <li className="flex items-center gap-3">
              <User size={20} className="text-orange-500" />
              <span>You control what information you share.</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={20} className="text-orange-500" />
              <span>Opt-out of marketing emails anytime.</span>
            </li>
          </ul>
        </section>

        {/* Contact Us Section */}
        <section className="bg-orange-50 rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-orange-600 mb-6">Have Questions?</h2>
          <p className="text-gray-600 mb-6">
            Reach out to us anytime—we’re here to help you navigate our terms and services!
          </p>
          <button onClick={() => navigate('/contact')}
           className="bg-gradient-to-r from-orange-600 to-amber-500 text-white font-medium py-3 px-8 rounded-full hover:from-orange-700 hover:to-amber-600 transition-all duration-300 flex items-center gap-2 mx-auto shadow-md hover:shadow-lg">
            Contact Us <Mail size={20} />
          </button>
        </section>

        {/* Footer Section */}
        <footer className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <p className="text-sm text-gray-500 italic mb-4">Last updated: April 08, 2025</p>
          <div className="border-t-2 border-orange-200 pt-4">
            <p className="text-base text-orange-600 font-semibold">Thank you for choosing CouponSwap! 🌟</p>
            <p className="text-sm text-gray-600 mt-2">Together, we’re building a smarter way to trade coupons.</p>
          </div>
        </footer>
      </div>
      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { opacity: 0; height: 0; }
          to { opacity: 1; height: auto; }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        .animate-slide-down {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TermsConditions;