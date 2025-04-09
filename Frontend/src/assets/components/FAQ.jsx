import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Search, Star, ArrowRight, ChevronLeft, ChevronRight, Mail } from 'lucide-react';
const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [email, setEmail] = useState('');
  // Toggle accordion item
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const faqItems = [
    { category: 'Selling', question: "How do I sell a coupon?", answer: "Just log in, navigate to the ‘Sell Coupon’ section, and enter your coupon details like code, value, and expiry date. It takes less than a minute to list it for buyers!" },
    { category: 'Security', question: "Are my payments secure?", answer: "Absolutely! We use trusted payment gateways like Razorpay and Paytm to ensure your transactions are encrypted and secure. Your financial safety is our priority." },
    { category: 'Buying', question: "How do I buy a coupon?", answer: "Browse our deals section, pick a coupon you like, and complete the purchase using your preferred payment method. The coupon code will be instantly available in your account." },
    { category: 'General', question: "What types of coupons can I trade?", answer: "You can trade Amazon, Flipkart, and other popular digital coupons. We’re constantly adding support for more platforms—stay tuned!" },
    { category: 'Selling', question: "How long does it take to get paid?", answer: "Once your coupon is sold, payments are processed within 1-2 business days to your linked bank account or wallet, depending on your chosen method." },
    { category: 'Buying', question: "Can I trust the coupons I buy?", answer: "Yes! Every coupon is verified for validity before listing. If there’s an issue, our support team is here to assist with refunds or replacements." },
    { category: 'General', question: "Is there a fee to use CouponSwap?", answer: "We charge a small commission on successful sales to keep the platform running, but browsing and buying are free!" },
    { category: 'Security', question: "How is my personal data protected?", answer: "We use industry-standard encryption and comply with privacy laws to keep your data safe. You’re in good hands!" },
    { category: 'Buying', question: "Can I return a coupon?", answer: "If a coupon doesn’t work as advertised, contact us within 48 hours for a refund or replacement." },
    { category: 'Selling', question: "What happens if my coupon doesn’t sell?", answer: "If it doesn’t sell before expiry, it’s removed from the listing. You can relist it if you get an extension!" },
    { category: 'General', question: "How do I contact support?", answer: "Reach out via our Contact Us page or email support@couponswap.com. We’re here 24/7!" },
    { category: 'Security', question: "What if my account is hacked?", answer: "Contact us immediately. We’ll secure your account and help recover any lost funds." },
  ];

  // Categories for filtering
  const categories = ['All', 'Buying', 'Selling', 'Security', 'General'];

  // Filter FAQs based on search query and category
  const filteredFAQs = faqItems.filter(
    (item) =>
      (selectedCategory === 'All' || item.category === selectedCategory) &&
      (item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Featured Tips
  const tips = [
    { title: "Maximize Your Earnings", description: "List your coupons early to attract more buyers before they expire." },
    { title: "Snag the Best Deals", description: "Check the deals section daily for fresh discounts on popular platforms." },
    { title: "Stay Secure", description: "Always verify your account details to ensure smooth transactions." },
  ];

  // Testimonials
  const testimonials = [
    { name: "Sakshi p", text: "CouponSwap made it so easy to sell my unused Paytm vouchers. Got paid in just a day!" },
    { name: "om Mule Patil", text: "I saved 30% on my Flipkart purchase thanks to a coupon I found here. Amazing platform!" },
    { name: "Om limbule", text: "The verification process gives me peace of mind. Every coupon I’ve bought worked perfectly." },
    { name: "Sachin Limbule", text: "Fast payouts and a smooth interface. CouponSwap is my go-to for trading!" },
  ];

  // Handle testimonial navigation
  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  // Handle newsletter signup (placeholder)
  const handleNewsletterSignup = (e) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail('');
  };

  return (
    <div className="bg-gradient-to-b from-orange-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Banner */}
      <section className="relative text-center mb-16 bg-orange-100 py-16 rounded-lg shadow-lg overflow-hidden animate-fade-in">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-orange-300 opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-orange-600 mb-4">
            CouponSwap FAQ Hub
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-2xl mx-auto mb-6">
            Unlock the full potential of coupon trading with answers to all your questions!
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/browse">
              <button className="bg-orange-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-orange-700 transition-all duration-300 shadow-md hover:shadow-lg">
                Explore Deals
              </button>
            </Link>
            <Link to="/sell">
              <button className="bg-white text-orange-600 font-semibold py-3 px-8 rounded-full border border-orange-600 hover:bg-orange-50 transition-all duration-300 shadow-md hover:shadow-lg">
                Start Selling
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Search Bar and Category Filters */}
      <section className="max-w-4xl mx-auto mb-12">
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 pr-12 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-gray-700"
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-600" size={20} />
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`py-2 px-4 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-orange-600 border border-orange-600 hover:bg-orange-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {/* Heading Section */}
        <section className="text-center mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-orange-600 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-xl mx-auto">
            Find answers to common queries below or reach out if you need more help!
          </p>
        </section>

        {/* Most Popular FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-orange-600 text-center mb-6">
            Most Popular Question
          </h2>
          <div className="bg-orange-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{faqItems[0].question}</h3>
            <p className="text-base text-gray-600">{faqItems[0].answer}</p>
          </div>
        </section>

        {/* Accordion Section */}
        <section className="space-y-4 mb-16">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((item, index) => (
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
                    <p className="text-sm sm:text-base text-gray-600">{item.answer}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No FAQs match your search or category. Try something else!</p>
          )}
        </section>

        {/* Featured Tips Section */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-orange-600 text-center mb-8">
            Pro Tips for CouponSwap Users
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Star className="text-orange-600 w-8 h-8 mb-4 mx-auto" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">{tip.title}</h3>
                <p className="text-sm text-gray-600 text-center">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Carousel */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-orange-600 text-center mb-8">
            What Our Users Say
          </h2>
          <div className="relative">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-sm text-gray-600 mb-4 italic">"{testimonials[currentTestimonial].text}"</p>
              <p className="text-base font-semibold text-orange-600 text-center">
                - {testimonials[currentTestimonial].name}
              </p>
            </div>
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${currentTestimonial === index ? 'bg-orange-600' : 'bg-gray-300'}`}
              ></div>
            ))}
          </div>
        </section>

        {/* Submit Your Question Form */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-orange-600 text-center mb-8">
            Got a Question? Ask Us!
          </h2>
          <form className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="question">
                Your Question
              </label>
              <textarea
                id="question"
                placeholder="Type your question here..."
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-gray-700"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-orange-600 text-white font-semibold py-3 rounded-full hover:bg-orange-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Submit Question
            </button>
          </form>
        </section>

        {/* CTA Section */}
        <section className="text-center mt-12 mb-16">
          <p className="text-base sm:text-lg text-gray-700 mb-4">Still need help?</p>
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