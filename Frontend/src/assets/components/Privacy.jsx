import React, { useState } from 'react';

const PrivacyPolicy = () => {
  const [expandedPolicy, setExpandedPolicy] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);

  const policies = [
    {
      title: "We collect email and payment info for transactions",
      description: "Essential data is gathered to ensure smooth purchase processing.",
      details: "Includes email for confirmations and secure payment processing via trusted gateways."
    },
    {
      title: "We never share your details without consent",
      description: "Your information remains confidential unless you permit sharing.",
      details: "Protected by AES-256 encryption and compliant with GDPR/CCPA standards."
    }
  ];

  const features = [
    { title: "Data Encryption", description: "AES-256 protection for all data.", icon: "🔒" },
    { title: "Privacy Controls", description: "Customize your data sharing preferences.", icon: "⚙️" },
    { title: "Regular Audits", description: "Quarterly security checks by experts.", icon: "✅" }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! We'll get back to you soon.");
    setShowContactForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Section */}
        <header className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 lg:p-10 text-center transform transition-all duration-300 hover:shadow-xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-600 mb-3 sm:mb-4 tracking-tight animate-fade-in-down">
            Privacy Policy
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto">
            Your data’s safety is our priority. Here’s how we protect it:
          </p>
        </header>

        {/* Policy Section */}
        <section className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 lg:p-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-orange-600 mb-6 border-b-2 border-orange-100 pb-3">
            Privacy Practices
          </h2>
          <div className="space-y-6">
            {policies.map((policy, index) => (
              <div key={index} className="border-l-4 border-orange-200 pl-4">
                <button
                  onClick={() => setExpandedPolicy(expandedPolicy === index ? null : index)}
                  className="w-full text-left text-orange-600 font-semibold text-lg sm:text-xl hover:text-orange-700 transition-colors flex items-center justify-between"
                >
                  {policy.title}
                  <svg
                    className={`w-5 h-5 transform transition-transform ${expandedPolicy === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <p className="text-gray-600 text-sm sm:text-base mt-2">{policy.description}</p>
                {expandedPolicy === index && (
                  <div className="mt-3 text-gray-700 text-sm bg-orange-50 p-4 rounded-lg animate-fade-in">
                    <p>{policy.details}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-orange-50 rounded-3xl shadow-lg p-6 sm:p-8 lg:p-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-orange-600 mb-6">Our Privacy Advantages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-base sm:text-lg font-medium text-orange-600">{feature.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-orange-600 mb-4 sm:mb-0">Got Questions?</h2>
            <button
              onClick={() => setShowContactForm(!showContactForm)}
              className="bg-orange-500 text-white px-4 sm:px-6 py-2 rounded-full hover:bg-orange-600 transition-all duration-300 flex items-center gap-2 shadow-md"
            >
              {showContactForm ? 'Close Form' : 'Ask Us'}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </button>
          </div>
          {showContactForm && (
            <form onSubmit={handleContactSubmit} className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    required
                    className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    placeholder="Your name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Your Question</label>
                <textarea
                  required
                  className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  rows="4"
                  placeholder="What would you like to know about our privacy practices?"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-all duration-300 shadow-md"
              >
                Submit Question
              </button>
            </form>
          )}
        </section>

        {/* Footer Section */}
        <footer className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 lg:p-10 text-center">
          <p className="text-sm text-gray-500 mb-4">
            Questions? Reach out at{' '}
            <a href="mailto:privacy@[website].com" className="text-orange-600 hover:text-orange-700 transition-colors">
              privacy@CouponSwap.com
            </a>
          </p>
          <div className="border-t-2 border-orange-100 pt-4">
            <p className="text-base text-orange-600 font-semibold">
              Protecting your privacy at [CouponSwap] 🧡
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;