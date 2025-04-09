import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Added Link import
import {
  Search,
  ShoppingBag,
  Tag,
  ArrowRight,
  ChevronRight,
  DollarSign,
  Info,
  Star,
  Heart,
  Clock,
  CreditCard,
  X,
  ShoppingCart,
  ChevronLeft,
  ChevronDown,
  Mail,
  Users,
  Gift,
  Shield,
  TrendingUp,
  UserPlus,
} from "lucide-react";

const Landingpage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("price");
  const [favorites, setFavorites] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [purchasedCoupons, setPurchasedCoupons] = useState([]);
  const [copiedCode, setCopiedCode] = useState(null);
  const [currentFeatured, setCurrentFeatured] = useState(0);

  const allCoupons = [
    { id: 1, platform: "Google Pay", value: 100, price: 80, expires: "15/03/25", seller: "Rahul S.", rating: 4.8, category: "Payment", discount: 20, code: "GPAY100" },
    { id: 2, platform: "Paytm", value: 50, price: 40, expires: "20/03/25", seller: "Priya M.", rating: 4.9, category: "Payment", discount: 20, code: "PAYTM50" },
    { id: 3, platform: "Google Pay", value: 200, price: 160, expires: "18/03/25", seller: "Amit K.", rating: 4.7, category: "Payment", discount: 20, code: "GPAY200" },
    { id: 4, platform: "Paytm", value: 150, price: 120, expires: "25/03/25", seller: "Neha P.", rating: 4.6, category: "Payment", discount: 20, code: "PAYTM150" },
    { id: 5, platform: "Google Pay", value: 75, price: 60, expires: "22/03/25", seller: "Vikas R.", rating: 4.8, category: "Payment", discount: 20, code: "GPAY75" },
    { id: 6, platform: "Paytm", value: 300, price: 240, expires: "30/03/25", seller: "Sonia L.", rating: 4.9, category: "Payment", discount: 20, code: "PAYTM300" },
    { id: 7, platform: "Flipkart", value: 500, price: 400, expires: "28/03/25", seller: "Kiran D.", rating: 4.7, category: "E-commerce", discount: 20, code: "FK500" },
    { id: 8, platform: "Amazon", value: 250, price: 200, expires: "17/03/25", seller: "Anjali T.", rating: 4.8, category: "E-commerce", discount: 20, code: "AMZ250" },
    { id: 9, platform: "Myntra", value: 300, price: 240, expires: "23/03/25", seller: "Ravi B.", rating: 4.6, category: "Fashion", discount: 20, code: "MYN300" },
    { id: 10, platform: "Flipkart", value: 1000, price: 800, expires: "31/03/25", seller: "Meera G.", rating: 4.9, category: "E-commerce", discount: 20, code: "FK1000" },
    { id: 11, platform: "Amazon", value: 150, price: 120, expires: "19/03/25", seller: "Suresh V.", rating: 4.7, category: "E-commerce", discount: 20, code: "AMZ150" },
    { id: 12, platform: "Myntra", value: 400, price: 320, expires: "26/03/25", seller: "Pooja N.", rating: 4.8, category: "Fashion", discount: 20, code: "MYN400" },
  ];

  const categories = [
    { name: "All", count: allCoupons.length },
    { name: "Payment", count: allCoupons.filter(c => c.category === "Payment").length },
    { name: "E-commerce", count: allCoupons.filter(c => c.category === "E-commerce").length },
    { name: "Fashion", count: allCoupons.filter(c => c.category === "Fashion").length },
  ];

  const featuredCoupons = allCoupons.slice(0, 3);
  const trendingCoupons = allCoupons.slice(0, 5); // For ticker

  const testimonials = [
    { name: "Sakshi P", text: "Sold my Paytm coupon in a day and saved big on Flipkart!", rating: 5 },
    { name: "Om mule", text: "The best platform for coupon trading—easy and reliable.", rating: 4 },
    { name: "Om limbule", text: "Found a 20% off Amazon coupon—saved ₹200 instantly!", rating: 5 },
  ];

  const toggleFavorite = (couponId) => {
    setFavorites((prev) =>
      prev.includes(couponId) ? prev.filter((id) => id !== couponId) : [...prev, couponId]
    );
  };

  const handleBuyNow = (coupon) => {
    navigate('/Signin', { state: { coupon } });
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedCoupon(null);
    setPaymentMethod("card");
  };

  const handlePurchase = () => {
    if (!selectedCoupon) return;
    setTimeout(() => {
      setPurchasedCoupons([...purchasedCoupons, selectedCoupon.id]);
      alert(`Successfully purchased ${selectedCoupon.platform} ₹${selectedCoupon.value} coupon! Your code: ${selectedCoupon.code}`);
      closePaymentModal();
    }, 1000);
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filteredCoupons = allCoupons
    .filter(
      (coupon) =>
        (selectedPlatform === "all" || coupon.platform === selectedPlatform) &&
        (selectedCategory === "all" || coupon.category === selectedCategory) &&
        (coupon.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
          coupon.seller.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "value") return b.value - a.value;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-orange-600">CouponSwap</h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/Login')}
              className="px-4 py-2 border border-orange-600 text-orange-600 rounded-full hover:bg-orange-50 transition-all"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/Signin')}
              className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-500 text-white rounded-full hover:from-orange-700 hover:to-amber-600 transition-all"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-100 via-white to-yellow-100 relative">
          <div className="container mx-auto max-w-7xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 z-10">
                <div className="flex items-center gap-2 animate-slide-in-left">
                  <span className="bg-orange-200 text-orange-800 text-sm font-medium px-3 py-1 rounded-full shadow-sm">
                    Over 10k+ Happy Users
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight animate-fade-in">
                  Swap Your Coupons, <span className="text-orange-600">Save More!</span>
                </h2>
                <p className="text-lg text-gray-700 animate-fade-in">
                  Trade your Amazon, Fastrack, or Flipkart & other coupons for cash or snag incredible deals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-up">
                  <button className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-500 text-white font-medium rounded-full hover:from-orange-700 hover:to-amber-600 transition-all shadow-lg flex items-center justify-center gap-2">
                    <ShoppingBag size={20} />
                    Explore Deals
                  </button>
                  <button className="px-6 py-3 border-2 border-orange-600 text-orange-600 font-medium rounded-full hover:bg-orange-50 transition-all flex items-center justify-center gap-2">
                    <DollarSign size={20} />
                    Sell Now
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6 text-center animate-slide-in-up">
                  <div>
                    <p className="text-2xl font-bold text-orange-600">5K+</p>
                    <p className="text-sm text-gray-600">Users</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-orange-600">7K+</p>
                    <p className="text-sm text-gray-600">Coupons Traded</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-orange-600">₹1M+</p>
                    <p className="text-sm text-gray-600">Savings</p>
                  </div>
                </div>
              </div>
              <div className="relative animate-fade-in">
                <div className="bg-white rounded-3xl p-6 shadow-xl transform rotate-3 hover:rotate-0 transition-all duration-500 border border-gray-100">
                  <img
                    src="https://www.loopify.com/blog/wp-content/uploads/2020/12/Mobile-coupons-social.png"
                    alt="Mobile phones showing coupons"
                    className="mx-auto rounded-lg shadow-md"
                    loading="lazy"
                  />
                  <div className="absolute top-6 right-6 bg-orange-500 text-white font-bold py-2 px-4 rounded-full shadow-md transform rotate-12 animate-pulse">
                    Save ₹80+
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Deals Carousel */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Deals</h2>
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredCoupons.map((coupon, index) => (
                  <div
                    key={coupon.id}
                    className={`bg-white rounded-xl shadow-md p-6 transition-all duration-300 ${index === currentFeatured ? 'border-2 border-orange-500 scale-105' : 'opacity-75'}`}
                  >
                    <h3 className="font-semibold text-lg text-gray-900">{coupon.platform}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock size={14} /> Expires: {coupon.expires}
                    </p>
                    <div className="mt-4">
                      <p className="text-gray-600">Value: <span className="font-bold text-gray-900">₹{coupon.value}</span></p>
                      <p className="text-gray-600">Price: <span className="font-bold text-orange-600">₹{coupon.price}</span> <span className="text-xs text-green-600">({coupon.discount}% OFF)</span></p>
                    </div>
                    <button
                      onClick={() => handleBuyNow(coupon)}
                      className="mt-4 w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-medium py-2 rounded-md hover:from-orange-700 hover:to-amber-600"
                    >
                      Buy Now
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setCurrentFeatured((prev) => (prev - 1 + featuredCoupons.length) % featuredCoupons.length)}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setCurrentFeatured((prev) => (prev + 1) % featuredCoupons.length)}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* Coupons Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Discover Amazing Deals</h2>
                <div className="flex items-center gap-2 text-orange-600">
                  <span>{filteredCoupons.length} coupons available</span>
                  <Info size={16} className="cursor-pointer" title="Updated daily" />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-md">
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Search by platform or seller..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-orange-500 bg-gray-50 shadow-sm"
                  />
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <select value={selectedPlatform} onChange={(e) => setSelectedPlatform(e.target.value)} className="border border-gray-200 rounded-md py-2 px-3 focus:ring-2 focus:ring-orange-500 bg-white shadow-sm">
                    <option value="all">All Platforms</option>
                    <option value="Google Pay">Google Pay</option>
                    <option value="Paytm">Paytm</option>
                    <option value="Flipkart">Flipkart</option>
                    <option value="Amazon">Amazon</option>
                    <option value="Myntra">Myntra</option>
                  </select>
                  <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="border border-gray-200 rounded-md py-2 px-3 focus:ring-2 focus:ring-orange-500 bg-white shadow-sm">
                    {categories.map((cat) => (
                      <option key={cat.name} value={cat.name.toLowerCase()}>{cat.name} ({cat.count})</option>
                    ))}
                  </select>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border border-gray-200 rounded-md py-2 px-3 focus:ring-2 focus:ring-orange-500 bg-white shadow-sm">
                    <option value="price">Sort by Price</option>
                    <option value="value">Sort by Value</option>
                    <option value="rating">Sort by Rating</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCoupons.map((coupon) => (
                <div key={coupon.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mr-3">
                        <Tag size={22} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{coupon.platform}</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock size={14} /> Expires: {coupon.expires}
                        </p>
                      </div>
                    </div>
                    <button onClick={() => toggleFavorite(coupon.id)} className="p-1 hover:text-red-500">
                      <Heart size={22} className={favorites.includes(coupon.id) ? "text-red-500 fill-current" : "text-gray-400"} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Value</span>
                      <span className="font-bold text-gray-900">₹{coupon.value}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Price</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-orange-600">₹{coupon.price}</span>
                        <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">{coupon.discount}% OFF</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Seller</span>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-700">{coupon.seller}</span>
                        <Star size={14} className="text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{coupon.rating}</span>
                      </div>
                    </div>
                    {purchasedCoupons.includes(coupon.id) ? (
                      <div className="space-y-2">
                        <div className="text-center p-2 bg-green-50 rounded-md">
                          <p className="text-sm font-medium text-green-600">Code: {coupon.code}</p>
                        </div>
                        <button
                          onClick={() => copyCode(coupon.code)}
                          className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300"
                        >
                          {copiedCode === coupon.code ? "Copied!" : "Copy Code"}
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleBuyNow(coupon)}
                        className="w-full bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center gap-2 shadow-md"
                      >
                        <ShoppingBag size={16} />
                        Buy Now
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <button
                onClick={() => navigate('/Signin')}
                className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-medium py-2 px-6 rounded-md flex items-center gap-2 mx-auto shadow-lg"
              >
                Load More
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How CouponSwap Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { icon: Tag, title: "List Your Coupons", desc: "Upload your coupon details and set your price instantly." },
                { icon: ShoppingBag, title: "Find Amazing Deals", desc: "Browse verified coupons and save on every purchase." },
                { icon: Search, title: "Redeem With Ease", desc: "Get your code instantly and redeem it seamlessly." },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="text-center p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-2 duration-300"
                >
                  <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose CouponSwap?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all">
                <Users size={40} className="text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Trusted Community</h3>
                <p className="text-gray-600">Join thousands of users trading safely and securely.</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all">
                <Gift size={40} className="text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Great Savings</h3>
                <p className="text-gray-600">Unlock discounts up to 20% on every coupon.</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all">
                <Shield size={40} className="text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Transactions</h3>
                <p className="text-gray-600">Shop with confidence with verified sellers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Get Started */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How to Get Started</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gray-50 rounded-xl shadow-md">
                <UserPlus size={40} className="text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Sign Up</h3>
                <p className="text-gray-600">Create a free account in seconds.</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl shadow-md">
                <ShoppingBag size={40} className="text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Browse or List</h3>
                <p className="text-gray-600">Explore deals or list your coupons.</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl shadow-md">
                <DollarSign size={40} className="text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Save or Earn</h3>
                <p className="text-gray-600">Buy at a discount or sell for cash.</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <button
                onClick={() => navigate('/Signin')}
                className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-500 text-white font-medium rounded-full hover:from-orange-700 hover:to-amber-600 transition-all shadow-lg"
              >
                Join Now
              </button>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((story, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
                  <div className="flex items-center mb-4">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} size={18} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-4">"{story.text}"</p>
                  <p className="text-gray-800 font-semibold">- {story.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mid-Page CTA */}
        <section className="py-16 bg-gradient-to-r from-orange-600 to-amber-500 text-white text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Saving?</h2>
            <p className="text-lg mb-6">Browse deals or sell your unused coupons today!</p>
            <button
              onClick={() => navigate('/Signin')}
              className="px-6 py-3 bg-white text-orange-600 font-medium rounded-full hover:bg-orange-50 transition-all shadow-md flex items-center gap-2 mx-auto"
            >
              <ShoppingBag size={20} />
              Get Started
            </button>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">Explore Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, idx) => (
                <div
                  key={idx}
                  className={`bg-orange-50 border border-orange-100 rounded-xl p-5 hover:bg-orange-100 transition-all cursor-pointer shadow-sm hover:shadow-md transform hover:-translate-y-1 ${
                    selectedCategory === category.name.toLowerCase() ? 'bg-orange-100 border-orange-500' : ''
                  }`}
                  onClick={() => setSelectedCategory(category.name.toLowerCase())}
                >
                  <h3 className="font-semibold text-gray-800">{category.name}</h3>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm text-gray-600">{category.count} coupons</span>
                    <ArrowRight size={18} className="text-orange-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Quick Answers</h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              {[
                { q: "How do I sell a coupon?", a: "List it in the ‘Sell Coupon’ section—it’s quick and easy!" },
                { q: "Are my payments secure?", a: "Yes, we use trusted gateways like Razorpay and Paytm." },
                { q: "How do I buy a coupon?", a: "Browse, buy, and get your code instantly!" },
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4">
                  <button className="w-full text-left flex justify-between items-center">
                    <span className="font-semibold text-gray-800">{faq.q}</span>
                    <ChevronDown size={20} className="text-orange-600" />
                  </button>
                  <p className="text-gray-600 mt-2">{faq.a}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button onClick={() => navigate('/Signin')} className="text-orange-600 font-medium hover:underline flex items-center gap-2 mx-auto">
                See All FAQs <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-600 to-amber-500 text-white">
          <div className="container mx-auto max-w-7xl text-center">
            <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
            <p className="text-lg mb-6">Subscribe for exclusive deals and updates!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300 w-full sm:w-80"
              />
              <button className="px-6 py-3 bg-white text-orange-600 font-medium rounded-full hover:bg-orange-50 transition-all shadow-md">
                Subscribe
              </button>
            </div>
          </div>
        </section>

        {/* Footer Section */}
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
                      to="/Signin"
                      className="relative hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                    >
                      Browse Deals
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/Signin"
                      className="relative hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                    >
                      Sell Coupons
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/Signin"
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
                      to="/Signin"
                      className="relative hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                    >
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/Signin"
                      className="relative hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/Signin"
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
                  to="/Signin"
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
      </main>

      {/* Payment Modal */}
      {showPaymentModal && selectedCoupon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative animate-fade-in">
            <button onClick={closePaymentModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Purchase Coupon</h2>
            <div className="space-y-4">
              <p className="text-gray-700">Platform: <span className="font-semibold">{selectedCoupon.platform}</span></p>
              <p className="text-gray-700">Value: <span className="font-semibold">₹{selectedCoupon.value}</span></p>
              <p className="text-gray-700">Price: <span className="font-semibold text-orange-600">₹{selectedCoupon.price}</span></p>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                >
                  <option value="card">Credit/Debit Card</option>
                  <option value="upi">UPI</option>
                  <option value="wallet">Wallet</option>
                </select>
              </div>
              <button
                onClick={handlePurchase}
                className="w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-medium py-3 rounded-md hover:from-orange-700 hover:to-amber-600 transition-all"
              >
                Confirm Purchase
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-fade-in { animation: fadeIn 1s ease-out; }
        .animate-slide-in-left { animation: slideInLeft 0.8s ease-out; }
        .animate-slide-in-up { animation: slideInUp 0.8s ease-out; }
        .animate-marquee { animation: marquee 20s linear infinite; }
      `}</style>
    </div>
  );
};

export default Landingpage;