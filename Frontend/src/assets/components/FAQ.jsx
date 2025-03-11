import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  // Toggle accordion item
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const faqItems = [
    {
      question: "How do I sell a coupon?",
      answer: "Just log in, navigate to the ‘Sell Coupon’ section, and enter your coupon details like code, value, and expiry date. It takes less than a minute to list it for buyers!",
    },
    {
      question: "Are my payments secure?",
      answer: "Absolutely! We use trusted payment gateways like Razorpay and Paytm to ensure your transactions are encrypted and secure. Your financial safety is our priority.",
    },
    {
      question: "How do I buy a coupon?",
      answer: "Browse our deals section, pick a coupon you like, and complete the purchase using your preferred payment method. The coupon code will be instantly available in your account.",
    },
    {
      question: "What types of coupons can I trade?",
      answer: "You can trade Google Pay, Paytm, and other popular digital coupons. We’re constantly adding support for more platforms—stay tuned!",
    },
    {
      question: "How long does it take to get paid?",
      answer: "Once your coupon is sold, payments are processed within 1-2 business days to your linked bank account or wallet, depending on your chosen method.",
    },
    {
      question: "Can I trust the coupons I buy?",
      answer: "Yes! Every coupon is verified for validity before listing. If there’s an issue, our support team is here to assist with refunds or replacements.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Main Content */}
      <div className="max-w-3xl mx-auto">
        {/* Heading Section */}
        <section className="text-center mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-orange-600 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-xl mx-auto">
            Find answers to common queries below or reach out if you need more help!
          </p>
        </section>

        {/* Accordion Section */}
        <section className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center p-4 sm:p-5 text-left focus:outline-none hover:bg-orange-50 transition-colors"
              >
                <span className="text-base sm:text-lg font-semibold text-gray-800">
                  {item.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp size={20} className="text-orange-600" />
                ) : (
                  <ChevronDown size={20} className="text-orange-600" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-200 animate-slide-down">
                  <p className="text-sm sm:text-base text-gray-600">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </section>

        {/* CTA Section */}
        <section className="text-center mt-12">
          <p className="text-base sm:text-lg text-gray-700 mb-4">
            Still need help?
          </p>
          <Link to="/contact">
            <button className="bg-orange-600 text-white font-semibold py-2.5 px-6 sm:py-3 sm:px-8 rounded-full hover:bg-orange-700 transition-all duration-300 shadow-md hover:shadow-lg">
              Contact Us
            </button>
          </Link>
        </section>
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

export default FAQPage;