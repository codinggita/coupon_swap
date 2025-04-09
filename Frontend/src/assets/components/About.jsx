import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Target, Settings, Users, Rocket, HelpCircle, Search, Megaphone, MessageSquare } from 'lucide-react';

const AboutUs = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  return (
 
    <div className="bg-gradient-to-b from-orange-50 to-white py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      {/* About Us Title */}
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-orange-600 mb-6 tracking-tight">
          About Us
        </h1>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto text-center mb-16 animate-fade-in">
      <h1 className="text-4xl sm:text-5xl font-bold text-orange-600 tracking-tight">
          CouponSwap
        </h1>
        <div className="nested-description">
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            "CouponSwap – Launched in 2025 by me, Nagesh Jagtap, is a smart platform to trade Amazon, Flipkart, and other coupons easily and safely. I built it from scratch to turn unused coupons into real value. Whether you're selling extras or grabbing a deal, CouponSwap helps you save and earn with a simple, secure experience."
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="max-w-6xl mx-auto mb-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-orange-600 text-center mb-10">
          <BookOpen className="inline mr-2" /> Our Story
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="bg-white p-8 rounded-xl shadow-lg transform hover:-translate-y-2 transition-all duration-300">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Born & Launched in 2025</h3>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Hi, I’m Nagesh Jagtap, the sole creator of CouponSwap. In 2025, I had a lightbulb moment: why let unused coupons expire? I rolled up my sleeves, coded this website myself, and now, as of April 2025, it’s live and ready for you! From idea to reality, I’ve poured my heart into making CouponSwap a place where you can trade coupons effortlessly. I’m still here, running the show solo, and excited to see where this journey takes us.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="https://github.com/NAGESHJAGTAP/full_stack_web_development_personal_Portfollio/blob/main/portfollio/src/assets/nagesh.png?raw=true"
              alt="Nagesh Jagtap"
              className="rounded-xl shadow-lg w-full max-w-md object-cover transform hover:scale-105 transition-all duration-300 "
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="max-w-6xl mx-auto mb-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-orange-600 text-center mb-10">
          <Target className="inline mr-2" /> My Mission & Vision
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">My Mission</h3>
            <p className="text-base text-gray-600 text-center">
              To give you a platform where trading coupons is quick, secure, and rewarding—built by me, for you.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">My Vision</h3>
            <p className="text-base text-gray-600 text-center">
              To turn CouponSwap into the go-to spot for coupon traders worldwide, growing it step-by-step from my solo start in 2025.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
  
      <section className="max-w-6xl mx-auto mb-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-orange-600 text-center mb-12">
          <span className="mr-2"></span> How CouponSwap Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              step: 'List Your Coupon',
              description: 'Got an unused coupon? Upload it in seconds using the system I designed.',
              icon: '📝',
            },
            {
              step: 'Browse Deals',
              description: 'Find great deals on coupons listed by others—explore what’s live now!',
              icon: '🛒',
            },
            {
              step: 'Trade & Win',
              description: 'Sell for cash or buy at a discount—start trading today on my live platform.',
              icon: '💰',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-5xl mb-4 text-center">{item.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 text-center">
                {item.step}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 text-center">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section (Commented Out as in Original) */}
      <section className="max-w-6xl mx-auto mb-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-orange-600 text-center mb-12">
          <Users className="inline mr-2" /> Meet the Team (Just Me!)
        </h2>
        <div className="grid grid-cols-1 max-w-md mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center">
            <Users className="text-orange-600 w-12 h-12 mb-4 mx-auto" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Nagesh Jagtap</h3>
            <p className="text-sm text-orange-600 mb-3">Founder & Developer</p>
            <p className="text-sm text-gray-600">
              I’m the guy who brought CouponSwap to life in 2025. From coding to managing, I do it all. My mission is to make coupon trading simple and valuable—and now that we’re live, I’m here to keep it running smoothly for you!
            </p>
          </div>
        </div>
      </section>

      {/* Launch Celebration Section */}
      <section className="max-w-6xl mx-auto mb-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-orange-600 text-center mb-12">
          <Rocket className="inline mr-2" /> We’re Live in 2025!
        </h2>
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            CouponSwap is Officially Up and Running
          </h3>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            After months of hard work, I launched CouponSwap in 2025, and as of today, April 6, 2025, it’s fully operational! This is just the beginning—I’m thrilled to see you join me in trading coupons and making the most of every deal. Let’s make this platform a success together!
          </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="max-w-6xl mx-auto mb-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-orange-600 text-center mb-12">
          <HelpCircle className="inline mr-2" /> Why CouponSwap?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Solo-Built Passion</h3>
            <p className="text-sm sm:text-base text-gray-600">
              I built this site myself in 2025, pouring my energy into every feature to ensure it’s perfect for you.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Live & Ready</h3>
            <p className="text-sm sm:text-base text-gray-600">
              As of now, CouponSwap is live—start trading today with a platform that’s ready to roll!
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Simple Trading</h3>
            <p className="text-sm sm:text-base text-gray-600">
              I designed it to be fast and easy—list, browse, and trade coupons in minutes.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Your Savings Matter</h3>
            <p className="text-sm sm:text-base text-gray-600">
              My goal is to help you save and earn—every coupon traded is a win for us both.
            </p>
          </div>
        </div>
      </section>

      {/* CouponSwap Finder Extension Section */}
      <section className="max-w-6xl mx-auto mb-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-orange-600 text-center mb-12">
          <Search className="inline mr-2" /> CouponSwap Finder Extension
        </h2>
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            Never Miss a Coupon Again!
          </h3>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
            I’ve built the CouponSwap Finder browser extension to enhance your shopping experience. Available for Chrome, it automatically detects when you’re on sites like Amazon, Flipkart, or Fastrack, and alerts you if there’s a coupon waiting on CouponSwap. Whether you’re browsing for deals or just exploring, this tool ensures you’re always in the know about savings opportunities. Install it today and let CouponSwap bring the discounts to you!
          </p>
          <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">What the Extension Does</h4>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The CouponSwap Finder extension works seamlessly in the background. When you visit a website, it identifies the domain (like amazon.com or flipkart.com) and checks if there’s a matching coupon on CouponSwap. If a coupon is found, you’ll receive a notification with details and a link to claim it. Plus, clicking the extension icon shows a popup with real-time coupon availability for the site you’re on—making savings effortless and instant!
          </p>
          <a
            href="CouponSwap finder" // Replace with actual link once published
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block bg-orange-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-orange-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            Get the Extension
          </a>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-orange-600 mb-6">
          <Megaphone className="inline mr-2" /> Start Trading Today!
        </h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          CouponSwap is live and waiting for you. Join me, Nagesh, and let’s make the most of every coupon in 2025!
        </p>
        <Link to="/browse">
          <button className="bg-orange-600 text-white font-semibold py-4 px-10 rounded-full hover:bg-orange-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
            Get Started Now
          </button>
        </Link>
      </section>

      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isChatOpen && (
          <button
            onClick={toggleChat}
            className="bg-orange-600 text-white p-4 rounded-full shadow-lg hover:bg-orange-700 transition-all duration-300 flex items-center gap-2"
          >
            <MessageSquare className="w-6 h-6" />
            <span className="hidden sm:inline text-sm sm:text-base">Chat with Me</span>
          </button>
        )}

        {isChatOpen && (
          <div className="bg-white rounded-lg shadow-xl w-80 sm:w-96 h-[28rem] flex flex-col animate-slide-up">
            <div className="bg-orange-600 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h3 className="font-semibold text-base sm:text-lg">Chat with Nagesh</h3>
              <button onClick={toggleChat} className="hover:text-orange-200 text-xl">
                ✕
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto text-gray-800 bg-gray-50">
              <p className="text-sm text-gray-500 italic">Hey there! It’s Nagesh. CouponSwap is live—how can I assist you?</p>
            </div>
            <div className="p-4 border-t border-gray-200">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-sm sm:text-base"
              />
              <button className="mt-3 w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm sm:text-base">
                Send Message
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Custom Styles */}
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
        .nested-description {
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
};

export default AboutUs;













