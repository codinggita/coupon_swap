import React, { useState } from "react";
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
} from "lucide-react";

const Body = () => {
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

  const toggleFavorite = (couponId) => {
    setFavorites((prev) =>
      prev.includes(couponId) ? prev.filter((id) => id !== couponId) : [...prev, couponId]
    );
  };

  const openPaymentModal = (coupon) => {
    setSelectedCoupon(coupon);
    setShowPaymentModal(true);
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
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-100 via-white to-yellow-100">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="bg-orange-200 text-orange-800 text-sm font-medium px-3 py-1 rounded-full shadow-sm">
                  Over 10k+ Happy Users
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                Swap Your Coupons, <span className="text-orange-600">Save More!</span>
              </h2>
              <p className="text-lg text-gray-700">
                Trade your Google Pay, Paytm, or Flipkart & other coupons for cash or snag incredible deals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-500 text-white font-medium rounded-full hover:from-orange-700 hover:to-amber-600 transition-all shadow-lg flex items-center justify-center gap-2">
                  <ShoppingBag size={20} />
                  Explore Deals
                </button>
                <button className="px-6 py-3 border-2 border-orange-600 text-orange-600 font-medium rounded-full hover:bg-orange-50 transition-all flex items-center justify-center gap-2">
                  <DollarSign size={20} />
                  Sell Now
                </button>
              </div>
            </div>
            <div className="relative">
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

            {/* Filters */}
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
                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="border border-gray-200 rounded-md py-2 px-3 focus:ring-2 focus:ring-orange-500 bg-white shadow-sm"
                >
                  <option value="all">All Platforms</option>
                  <option value="Google Pay">Google Pay</option>
                  <option value="Paytm">Paytm</option>
                  <option value="Flipkart">Flipkart</option>
                  <option value="Amazon">Amazon</option>
                  <option value="Myntra">Myntra</option>
                </select>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-200 rounded-md py-2 px-3 focus:ring-2 focus:ring-orange-500 bg-white shadow-sm"
                >
                  {categories.map((cat) => (
                    <option key={cat.name} value={cat.name.toLowerCase()}>{cat.name} ({cat.count})</option>
                  ))}
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-200 rounded-md py-2 px-3 focus:ring-2 focus:ring-orange-500 bg-white shadow-sm"
                >
                  <option value="price">Sort by Price</option>
                  <option value="value">Sort by Value</option>
                  <option value="rating">Sort by Rating</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCoupons.map((coupon) => (
              <div
                key={coupon.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
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
                    <Heart
                      size={22}
                      className={favorites.includes(coupon.id) ? "text-red-500 fill-current" : "text-gray-400"}
                    />
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
                      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                        {coupon.discount}% OFF
                      </span>
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
                      onClick={() => openPaymentModal(coupon)}
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
            <button className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-medium py-2 px-6 rounded-md flex items-center gap-2 mx-auto shadow-lg">
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

      {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">Explore Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, idx) => (
              <div
                key={idx}
                className="bg-orange-50 border border-orange-100 rounded-xl p-5 hover:bg-orange-100 transition-all cursor-pointer shadow-sm hover:shadow-md transform hover:-translate-y-1"
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

      {/* Payment Modal */}
      {showPaymentModal && selectedCoupon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative animate-fade-in">
            <button 
              onClick={closePaymentModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Complete Your Purchase</h2>
            
            <div className="mb-6 p-4 bg-orange-50 rounded-xl">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Gift Card:</span>
                <span className="font-semibold">{selectedCoupon.platform} - ₹{selectedCoupon.value}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Price:</span>
                <span className="font-semibold">₹{selectedCoupon.price}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-orange-100">
                <span className="text-gray-600 font-semibold">Total:</span>
                <span className="font-bold text-orange-600">₹{selectedCoupon.price}</span>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Payment Method</h3>
              <div className="grid grid-cols-3 gap-3">
                <button 
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border ${paymentMethod === 'card' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'} hover:bg-orange-50 transition duration-300`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <CreditCard size={24} className={paymentMethod === 'card' ? 'text-orange-500' : 'text-gray-400'} />
                  <span className={`text-sm mt-1 ${paymentMethod === 'card' ? 'text-orange-500 font-medium' : 'text-gray-500'}`}>Card</span>
                </button>
                <button 
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border ${paymentMethod === 'upi' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'} hover:bg-orange-50 transition duration-300`}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <img 
                    src="/assets/upi-icon.png" 
                    alt="UPI" 
                    className="w-6 h-6"
                    onError={(e) => e.target.src = '/assets/default-payment-icon.png'}
                  />
                  <span className={`text-sm mt-1 ${paymentMethod === 'upi' ? 'text-orange-500 font-medium' : 'text-gray-500'}`}>UPI</span>
                </button>
                <button 
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border ${paymentMethod === 'wallet' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'} hover:bg-orange-50 transition duration-300`}
                  onClick={() => setPaymentMethod('wallet')}
                >
                  <ShoppingCart size={24} className={paymentMethod === 'wallet' ? 'text-orange-500' : 'text-gray-400'} />
                  <span className={`text-sm mt-1 ${paymentMethod === 'wallet' ? 'text-orange-500 font-medium' : 'text-gray-500'}`}>Wallet</span>
                </button>
              </div>
            </div>
            
            {paymentMethod === 'card' && (
              <div className="mb-6 space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Card Number</label>
                  <input 
                    type="text" 
                    placeholder="1234 5678 9012 3456" 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Expiry Date</label>
                    <input 
                      type="text" 
                      placeholder="MM/YY" 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">CVV</label>
                    <input 
                      type="text" 
                      placeholder="123" 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {paymentMethod === 'upi' && (
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-1">UPI ID</label>
                <input 
                  type="text" 
                  placeholder="name@upi" 
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            )}
            
            {paymentMethod === 'wallet' && (
              <div className="mb-6 grid grid-cols-3 gap-3">
                <button 
                  className="border border-gray-200 rounded-xl p-3 hover:bg-orange-50 transition duration-300 flex flex-col items-center"
                >
                  <img 
                    src="/assets/phonepe-logo.png" 
                    alt="PhonePe" 
                    className="w-8 h-8 mb-1"
                    onError={(e) => e.target.src = '/assets/default-wallet-icon.png'}
                  />
                  <span className="text-center text-sm font-medium text-gray-700">PhonePe</span>
                </button>
                <button 
                  className="border border-gray-200 rounded-xl p-3 hover:bg-orange-50 transition duration-300 flex flex-col items-center"
                >
                  <img 
                    src="/assets/paytm-logo.png" 
                    alt="Paytm" 
                    className="w-8 h-8 mb-1"
                    onError={(e) => e.target.src = '/assets/default-wallet-icon.png'}
                  />
                  <span className="text-center text-sm font-medium text-gray-700">Paytm</span>
                </button>
                <button 
                  className="border border-gray-200 rounded-xl p-3 hover:bg-orange-50 transition duration-300 flex flex-col items-center"
                >
                  <img 
                    src="/assets/googlepay-logo.png" 
                    alt="Google Pay" 
                    className="w-8 h-8 mb-1"
                    onError={(e) => e.target.src = '/assets/default-wallet-icon.png'}
                  />
                  <span className="text-center text-sm font-medium text-gray-700">Google Pay</span>
                </button>
              </div>
            )}
            
            <button 
              onClick={handlePurchase}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-bold hover:from-orange-600 hover:to-amber-600 transition duration-300 shadow-lg flex items-center justify-center"
            >
              Pay ₹{selectedCoupon.price}
            </button>
            
            <p className="text-xs text-gray-500 text-center mt-4">
              By completing this purchase, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      )}
    </main>
  );
};

export default Body;