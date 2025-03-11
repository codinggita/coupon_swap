import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { MessageCircle, X } from 'lucide-react';

const AboutUs = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-4xl mx-auto">
        <section className="text-center mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-orange-600 mb-4">
            Who We Are
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-2xl mx-auto">
            At <span className="font-semibold">CouponSwap</span>, we’re all about making your Google Pay and Paytm coupons work for you. Sell what you don’t need, buy what you do—simple, fast, and fair.
          </p>
        </section>

        {/* How It Works Section */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-orange-600 text-center mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: 'List your coupon in seconds.',
                description: 'Upload your unused coupons with a few clicks.',
                icon: '📝',
              },
              {
                step: 'Buyers grab deals and save.',
                description: 'Shoppers find amazing discounts instantly.',
                icon: '🛒',
              },
              {
                step: 'Earn cash or savings with every trade.',
                description: 'Get paid or save big on every deal.',
                icon: '💰',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.step}
                </h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Link to="/get-started">
            <button className="bg-orange-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-orange-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
              Get Started
            </button>
          </Link>
        </section>
      </div>

     
      <div className="fixed bottom-6 right-6 z-50">
        {/* Chat Button */}
        {!isChatOpen && (
          <button
            onClick={toggleChat}
            className="bg-orange-600 text-white p-4 rounded-full shadow-lg hover:bg-orange-700 transition-all duration-300 flex items-center gap-2"
          >
            <MessageCircle size={24} />
            <span className="hidden sm:inline">Chat with Us</span>
          </button>
        )}

        {/* Chat Window */}
        {isChatOpen && (
          <div className="bg-white rounded-lg shadow-xl w-80 sm:w-96 h-96 flex flex-col animate-slide-up">
            {/* Chat Header */}
            <div className="bg-orange-600 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h3 className="font-semibold">Live Chat</h3>
              <button onClick={toggleChat} className="hover:text-orange-200">
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto text-gray-800">
              <p className="text-sm text-gray-500 italic">Welcome! How can we assist you today?</p>
            </div>

           
            <div className="p-4 border-t border-gray-200">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              />
              <button className="mt-2 w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors">
                Send
              </button>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        .animate-slide-up {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AboutUs;

