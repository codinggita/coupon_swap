import React, { useState } from 'react';

const TermsConditions = () => {
  const [expandedTerm, setExpandedTerm] = useState(null);
  const [showFeatures, setShowFeatures] = useState(false);

  const terms = [
    {
      title: "Coupons must be valid and unused",
      description: "All coupons must be current and not previously redeemed to be accepted.",
      details: "We verify each coupon's validity through our secure system to ensure fair usage."
    },
    {
      title: "No refunds after purchase",
      description: "All sales are final once the transaction is completed successfully.",
      details: "This policy helps us maintain consistent pricing and service quality."
    }
  ];

  const features = [
    { title: "Instant Validation", description: "Real-time coupon verification system with 99.9% uptime.", icon: "⚡" },
    { title: "User Dashboard", description: "Track your purchases and coupons in a personalized dashboard.", icon: "📊" },
    { title: "24/7 Support", description: "Round-the-clock customer assistance for all your needs.", icon: "📞" },
    { title: "Secure Transactions", description: "End-to-end encrypted transactions for maximum security.", icon: "🔒" },
    { title: "Verified Sellers", description: "Every seller is thoroughly checked for authenticity.", icon: "✅" },
    { title: "Fast Payouts", description: "Withdraw your earnings quickly with no hassle.", icon: "💰" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <header className="text-center bg-white rounded-2xl shadow-xl p-8 transition-all duration-500 hover:shadow-2xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-orange-600 mb-4">Terms & Conditions</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">By using CouponTrade, you agree to these carefully crafted rules:</p>
        </header>

        {/* Terms Section */}
        <section className="bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-orange-500 mb-6 border-b border-orange-200 pb-2">Our Terms</h2>
          <ul className="space-y-6">
            {terms.map((term, index) => (
              <li key={index} className="flex flex-col">
                <div className="flex items-start gap-3">
                  <span className="text-orange-500 text-xl">•</span>
                  <div className="flex-1">
                    <button
                      onClick={() => setExpandedTerm(expandedTerm === index ? null : index)}
                      className="text-orange-500 font-semibold text-lg hover:text-orange-600 transition-colors text-left"
                    >
                      {term.title}
                    </button>
                    <p className="ml-0 text-gray-600 text-sm mt-1">{term.description}</p>
                  </div>
                </div>
                {expandedTerm === index && (
                  <div className="mt-3 ml-8 text-gray-600 text-sm bg-orange-50 p-4 rounded-lg animate-fade-in">
                    <p>{term.details}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Features Section */}
        <section className="bg-orange-100 rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-orange-600">Why Choose CouponSwap</h2>
            <button
              onClick={() => setShowFeatures(!showFeatures)}
              className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-2"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-fade-in">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="text-lg font-medium text-orange-500">{feature.title}</h3>
                  <p className="text-gray-600 text-sm mt-2">{feature.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Footer Section */}
        <footer className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <p className="text-sm text-gray-500 italic mb-4">Last updated: March 09, 2025</p>
          <div className="border-t-2 border-orange-200 pt-4">
            <p className="text-base text-orange-600 font-semibold">Thank you for choosing CouponTrade! 🌟</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default TermsConditions;
