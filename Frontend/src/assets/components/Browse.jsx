// import React, { useState, useEffect } from 'react';
// import { Search, Tag, Clock, Filter, ArrowRight, Heart, DollarSign, CreditCard, ShoppingCart, X, ShoppingBag, Star } from 'lucide-react';
// import axios from 'axios';

// const CouponPage = () => {
//   const [platform, setPlatform] = useState('All');
//   const [value, setValue] = useState('All');
//   const [category, setCategory] = useState('All');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [favorites, setFavorites] = useState([]);
//   const [purchasedCoupons, setPurchasedCoupons] = useState([]);
//   const [showAll, setShowAll] = useState(false);
//   const [sortBy, setSortBy] = useState('Newest'); 
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [selectedCoupon, setSelectedCoupon] = useState(null);
//   const [paymentMethod, setPaymentMethod] = useState('card');
//   const [copiedCode, setCopiedCode] = useState(null);
//   const [coupons, setCoupons] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCoupons = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/coupon');
//         const formattedCoupons = response.data.data
//           .map((coupon, index) => ({
//             id: coupon._id,
//             platform: coupon.platform,
//             value: coupon.valueRs || (coupon.valuePercent * 10),
//             price: coupon.sellingPrice,
//             expires: new Date(coupon.expiryDate).toLocaleDateString('en-GB', {
//               day: '2-digit',
//               month: '2-digit',
//               year: '2-digit'
//             }),
//             code: coupon.couponCode,
//             description: coupon.description || '',
//             category: getCategoryFromPlatform(coupon.platform),
//             cards: Math.floor(Math.random() * 200) + 1,
//             seller: coupon.sellerName,
//             rating: 4.5 + Math.random() * 0.4,
//             discount: calculateDiscount(coupon.valueRs, coupon.valuePercent, coupon.sellingPrice),
//             createdAt: new Date(coupon.createdAt) 
//           }))
//           .sort((a, b) => b.createdAt - a.createdAt); 
//         setCoupons(formattedCoupons);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching coupons:', error);
//         setLoading(false);
//       }
//     };

//     fetchCoupons();
//   }, []);

//   const getCategoryFromPlatform = (platform) => {
//     const lowerPlatform = platform.toLowerCase();
//     if (lowerPlatform.includes('food') || lowerPlatform.includes('zomato') || lowerPlatform.includes('swiggy')) {
//       return 'Food & Dining';
//     } else if (lowerPlatform.includes('amazon') || lowerPlatform.includes('flipkart') || lowerPlatform.includes('myntra') || lowerPlatform.includes('fastrack')) {
//       return 'Shopping';
//     } else if (lowerPlatform.includes('bookmyshow') || lowerPlatform.includes('coding')) {
//       return 'Entertainment';
//     } else {
//       return 'Shopping';
//     }
//   };

//   const calculateDiscount = (valueRs, valuePercent, sellingPrice) => {
//     if (valueRs) {
//       return Math.round((1 - sellingPrice / valueRs) * 100);
//     } else if (valuePercent) {
//       return valuePercent;
//     }
//     return 0;
//   };

//   const getFilteredAndSortedCoupons = () => {
//     let filtered = coupons
//       .filter(coupon => platform === 'All' || coupon.platform === platform)
//       .filter(coupon => category === 'All' || coupon.category === category)
//       .filter(coupon => {
//         if (value === 'All') return true;
//         if (value === '<₹500') return coupon.value < 500;
//         if (value === '₹500-1000') return coupon.value >= 500 && coupon.value <= 1000;
//         return coupon.value > 1000;
//       })
//       .filter(coupon => 
//         searchTerm === '' || 
//         coupon.platform.toLowerCase().includes(searchTerm.toLowerCase()) || 
//         coupon.description.toLowerCase().includes(searchTerm.toLowerCase())
//       );

//     switch(sortBy) {
//       case 'Expiring Soon': 
//         return filtered.sort((a, b) => new Date(a.expires) - new Date(b.expires));
//       case 'Newest': 
//         return filtered.sort((a, b) => b.createdAt - a.createdAt); 
//       case 'Best Value': 
//         return filtered.sort((a, b) => (b.value - b.price) - (a.value - a.price));
//       case 'Price': 
//         return filtered.sort((a, b) => a.price - b.price);
//       case 'Rating': 
//         return filtered.sort((a, b) => b.rating - a.rating);
//       default: 
//         return filtered.sort((a, b) => b.createdAt - a.createdAt); 
//     }
//   };

//   const filteredCoupons = getFilteredAndSortedCoupons();
//   const displayedCoupons = showAll ? filteredCoupons : filteredCoupons.slice(0, 6);
//   const dealOfTheDay = filteredCoupons[0];

//   const toggleFavorite = (id) => {
//     setFavorites(favorites.includes(id) 
//       ? favorites.filter(favId => favId !== id) 
//       : [...favorites, id]);
//   };

//   const copyCode = (code) => {
//     navigator.clipboard.writeText(code);
//     setCopiedCode(code);
//     setTimeout(() => setCopiedCode(null), 2000);
//   };

//   const openPaymentModal = (coupon) => {
//     setSelectedCoupon(coupon);
//     setShowPaymentModal(true);
//   };

//   const closePaymentModal = () => {
//     setShowPaymentModal(false);
//     setSelectedCoupon(null);
//     setPaymentMethod('card');
//   };

//   const handlePurchase = () => {
//     if (!selectedCoupon) return;
//     setTimeout(() => {
//       setPurchasedCoupons([...purchasedCoupons, selectedCoupon.id]);
//       alert(`Successfully purchased ${selectedCoupon.platform} ₹${selectedCoupon.value}`);
//       closePaymentModal();
//     }, 1500);
//   };

//   const categoryCounts = {
//     'All': coupons.length,
//     'Food & Dining': coupons.filter(c => c.category === 'Food & Dining').length,
//     'Shopping': coupons.filter(c => c.category === 'Shopping').length,
//     'Travel': coupons.filter(c => c.category === 'Travel').length,
//     'Entertainment': coupons.filter(c => c.category === 'Entertainment').length,
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
//         <div className="text-2xl font-bold text-orange-600">Loading coupons...</div>
//       </div>
//     );
//   }
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 font-sans">
//       {/* Hero Section */}
//       <div className="relative bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-400 text-white py-24 px-6 overflow-hidden">
//         <div className="absolute inset-0 opacity-20">
//           <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
//             <path d="M0,0 C50,120 80,20 100,100 L100,0 Z" fill="white" />
//           </svg>
//         </div>
//         <div className="max-w-7xl mx-auto text-center relative z-10">
//           <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg">Premium Gift Cards Marketplace</h1>
//           <p className="text-xl md:text-2xl max-w-3xl mx-auto drop-shadow-md">Unlock amazing savings with digital gift cards from your favorite brands</p>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 py-12">
//         {/* Deal of the Day */}
//         {dealOfTheDay && (
//           <div className="relative bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 rounded-3xl p-8 mb-12 shadow-2xl transform hover:scale-105 transition duration-500 overflow-hidden">
//             <div className="absolute inset-0 bg-opacity-30 bg-white rounded-3xl"></div>
//             <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 z-10">
//               <div className="text-white text-center md:text-left">
//                 <h2 className="text-4xl font-bold mb-3 drop-shadow-lg">✨ Premium Deal of the Day</h2>
//                 <p className="text-xl">{dealOfTheDay.platform} - {dealOfTheDay.description}</p>
//                 <p className="text-md mt-2">Expires: {dealOfTheDay.expires}</p>
//               </div>
//               <div className="flex items-center gap-6">
//                 <span className="text-5xl font-extrabold text-white drop-shadow-lg">₹{dealOfTheDay.price}</span>
//                 <button 
//                   onClick={() => openPaymentModal(dealOfTheDay)}
//                   className="bg-white text-orange-600 px-8 py-3 rounded-full font-bold hover:bg-orange-50 transition duration-300 shadow-xl"
//                 >
//                   Purchase Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Filters */}
//         <div className="bg-white bg-opacity-90 rounded-3xl shadow-xl p-8 mb-12 backdrop-blur-md">
//           <div className="relative mb-8">
//             <input
//               type="text"
//               placeholder="Search brands or gift cards..."
//               className="w-full pl-14 pr-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-4 focus:ring-orange-300 transition duration-300 bg-gradient-to-r from-white to-gray-50 shadow-inner text-lg"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div>
//               <div className="flex items-center mb-4">
//                 <Tag size={20} className="text-orange-500 mr-3" />
//                 <span className="font-semibold text-gray-800 text-lg">Category</span>
//               </div>
//               <div className="flex flex-wrap gap-3">
//                 {Object.keys(categoryCounts).map(cat => (
//                   <button
//                     key={cat}
//                     className={`px-5 py-2 rounded-full text-md font-medium transition duration-300 shadow-sm ${category === cat ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
//                     onClick={() => setCategory(cat)}
//                   >
//                     {cat} ({categoryCounts[cat]})
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <div className="flex items-center mb-4">
//                 <Filter size={20} className="text-orange-500 mr-3" />
//                 <span className="font-semibold text-gray-800 text-lg">Brand</span>
//               </div>
//               <div className="flex flex-wrap gap-3">
//                 {['All', ...new Set(coupons.map(c => c.platform))].map(option => (
//                   <button
//                     key={option}
//                     className={`px-5 py-2 rounded-full text-md font-medium transition duration-300 shadow-sm ${platform === option ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
//                     onClick={() => setPlatform(option)}
//                   >
//                     {option}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <div className="flex items-center mb-4">
//                 <DollarSign size={20} className="text-orange-500 mr-3" />
//                 <span className="font-semibold text-gray-800 text-lg">Value</span>
//               </div>
//               <div className="flex flex-wrap gap-3">
//                 {['All', '<₹500', '₹500-1000', '>₹1000'].map(option => (
//                   <button
//                     key={option}
//                     className={`px-5 py-2 rounded-full text-md font-medium transition duration-300 shadow-sm ${value === option ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
//                     onClick={() => setValue(option)}
//                   >
//                     {option}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Results and Sorting */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-900">
//             Discover Amazing Deals ({filteredCoupons.length} available)
//           </h2>
//           <div className="mt-4 md:mt-0 flex items-center gap-3">
//             <span className="text-gray-600 text-lg">Sort by:</span>
//             <select 
//               className="bg-white border border-gray-200 rounded-xl px-5 py-2 focus:outline-none focus:ring-4 focus:ring-orange-300 transition duration-300 shadow-md text-lg"
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//             >
//               <option>Newest</option>
//               <option>Expiring Soon</option>
//               <option>Best Value</option>
//               <option>Price</option>
//               <option>Rating</option>
//             </select>
//           </div>
//         </div>

//         {/* Coupons Grid with Body's Cart UI */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
//           {displayedCoupons.map((coupon) => (
//             <div 
//               key={coupon.id} 
//               className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center">
//                   <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mr-3">
//                     <Tag size={22} />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-lg text-gray-900">{coupon.platform}</h3>
//                     <p className="text-sm text-gray-500 flex items-center gap-1">
//                       <Clock size={14} /> Expires: {coupon.expires}
//                     </p>
//                   </div>
//                 </div>
//                 <button onClick={() => toggleFavorite(coupon.id)} className="p-1 hover:text-red-500">
//                   <Heart
//                     size={22}
//                     className={favorites.includes(coupon.id) ? "text-red-500 fill-current" : "text-gray-400"}
//                   />
//                 </button>
//               </div>
//               <div className="space-y-3">
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">Value</span>
//                   <span className="font-bold text-gray-900">₹{coupon.value}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">Price</span>
//                   <div className="flex items-center gap-2">
//                     <span className="font-bold text-orange-600">₹{coupon.price}</span>
//                     <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
//                       {coupon.discount}% OFF
//                     </span>
//                   </div>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">Seller</span>
//                   <div className="flex items-center gap-1">
//                     <span className="text-gray-700">{coupon.seller}</span>
//                     <Star size={14} className="text-yellow-400 fill-current" />
//                     <span className="text-sm text-gray-600">{coupon.rating.toFixed(1)}</span>
//                   </div>
//                 </div>
//                 {purchasedCoupons.includes(coupon.id) ? (
//                   <div className="space-y-2">
//                     <div className="text-center p-2 bg-green-50 rounded-md">
//                       <p className="text-sm font-medium text-green-600">Code: {coupon.code}</p>
//                     </div>
//                     <button
//                       onClick={() => copyCode(coupon.code)}
//                       className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300"
//                     >
//                       {copiedCode === coupon.code ? "Copied!" : "Copy Code"}
//                     </button>
//                   </div>
//                 ) : (
//                   <button
//                     onClick={() => openPaymentModal(coupon)}
//                     className="w-full bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center gap-2 shadow-md"
//                   >
//                     <ShoppingBag size={16} />
//                     Buy Now
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Show More Button */}
//         {filteredCoupons.length > 6 && (
//           <div className="text-center mb-16">
//             <button 
//               onClick={() => setShowAll(!showAll)}
//               className="px-12 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full font-bold hover:from-orange-600 hover:to-amber-600 transition duration-500 flex items-center mx-auto shadow-xl"
//             >
//               {showAll ? 'Show Less' : 'Discover More Gift Cards'}
//               <ArrowRight size={24} className="ml-3" />
//             </button>
//           </div>
//         )}

//         {/* Newsletter */}
//         <div className="relative bg-gradient-to-r from-orange-600 to-amber-500 rounded-3xl shadow-2xl p-10 text-white text-center mb-16 overflow-hidden">
//           <div className="absolute inset-0 opacity-30">
//             <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
//               <path d="M0,0 C30,80 70,20 100,100 L100,0 Z" fill="white" />
//             </svg>
//           </div>
//           <div className="relative z-10">
//             <h2 className="text-4xl font-extrabold mb-4 drop-shadow-lg">Stay Updated with Exclusive Deals</h2>
//             <p className="text-lg mb-6">Subscribe to receive special offers directly to your inbox.</p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <input 
//                 type="email" 
//                 placeholder="Enter your email" 
//                 className="px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-orange-300 w-full sm:w-96 shadow-inner"
//               />
//               <button className="px-8 py-4 bg-white text-orange-600 font-bold rounded-full hover:bg-orange-100 transition duration-300 shadow-xl">
//                 Subscribe Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Payment Modal */}
//       {showPaymentModal && selectedCoupon && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative animate-fade-in">
//             <button 
//               onClick={closePaymentModal}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               <X size={24} />
//             </button>
            
//             <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Complete Your Purchase</h2>
            
//             <div className="mb-6 p-4 bg-orange-50 rounded-xl">
//               <div className="flex justify-between mb-2">
//                 <span className="text-gray-600">Gift Card:</span>
//                 <span className="font-semibold">{selectedCoupon.platform} - ₹{selectedCoupon.value}</span>
//               </div>
//               <div className="flex justify-between mb-2">
//                 <span className="text-gray-600">Price:</span>
//                 <span className="font-semibold">₹{selectedCoupon.price}</span>
//               </div>
//               <div className="flex justify-between pt-2 border-t border-orange-100">
//                 <span className="text-gray-600 font-semibold">Total:</span>
//                 <span className="font-bold text-orange-600">₹{selectedCoupon.price}</span>
//               </div>
//             </div>
            
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold mb-3">Payment Method</h3>
//               <div className="grid grid-cols-3 gap-3">
//                 <button 
//                   className={`flex flex-col items-center justify-center p-3 rounded-xl border ${paymentMethod === 'card' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'} hover:bg-orange-50 transition duration-300`}
//                   onClick={() => setPaymentMethod('card')}
//                 >
//                   <CreditCard size={24} className={paymentMethod === 'card' ? 'text-orange-500' : 'text-gray-400'} />
//                   <span className={`text-sm mt-1 ${paymentMethod === 'card' ? 'text-orange-500 font-medium' : 'text-gray-500'}`}>Card</span>
//                 </button>
//                 <button 
//                   className={`flex flex-col items-center justify-center p-3 rounded-xl border ${paymentMethod === 'upi' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'} hover:bg-orange-50 transition duration-300`}
//                   onClick={() => setPaymentMethod('upi')}
//                 >
//                   <img 
//                     src="../public/upi-payment-icon.svg" 
//                     alt="UPI" 
//                     className="w-6 h-6"
//                     onError={(e) => e.target.src = '/assets/default-payment-icon.png'}
//                   />
//                   <span className={`text-sm mt-1 ${paymentMethod === 'upi' ? 'text-orange-500 font-medium' : 'text-gray-500'}`}>UPI</span>
//                 </button>
//                 <button 
//                   className={`flex flex-col items-center justify-center p-3 rounded-xl border ${paymentMethod === 'wallet' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'} hover:bg-orange-50 transition duration-300`}
//                   onClick={() => setPaymentMethod('wallet')}
//                 >
//                   <ShoppingCart size={24} className={paymentMethod === 'wallet' ? 'text-orange-500' : 'text-gray-400'} />
//                   <span className={`text-sm mt-1 ${paymentMethod === 'wallet' ? 'text-orange-500 font-medium' : 'text-gray-500'}`}>Wallet</span>
//                 </button>
//               </div>
//             </div>
            
//             {paymentMethod === 'card' && (
//               <div className="mb-6 space-y-4">
//                 <div>
//                   <label className="block text-gray-700 text-sm font-medium mb-1">Card Number</label>
//                   <input 
//                     type="text" 
//                     placeholder="1234 5678 9012 3456" 
//                     className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//                   />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-gray-700 text-sm font-medium mb-1">Expiry Date</label>
//                     <input 
//                       type="text" 
//                       placeholder="MM/YY" 
//                       className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 text-sm font-medium mb-1">CVV</label>
//                     <input 
//                       type="text" 
//                       placeholder="123" 
//                       className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}
            
//             {paymentMethod === 'upi' && (
//               <div className="mb-6">
//                 <label className="block text-gray-700 text-sm font-medium mb-1">UPI ID</label>
//                 <input 
//                   type="text" 
//                   placeholder="name@upi" 
//                   className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//                 />
//               </div>
//             )}
            
//             {paymentMethod === 'wallet' && (
//               <div className="mb-6 grid grid-cols-3 gap-3">
//                 <button 
//                   className="border border-gray-200 rounded-xl p-3 hover:bg-orange-50 transition duration-300 flex flex-col items-center"
//                 >
//                   <img 
//                     src="../public/phonepe-icon.svg" 
//                     alt="PhonePe" 
//                     className="w-8 h-8 mb-1"
//                     onError={(e) => e.target.src = '/assets/default-wallet-icon.png'}
//                   />
//                   <span className="text-center text-sm font-medium text-gray-700">PhonePe</span>
//                 </button>
//                 <button 
//                   className="border border-gray-200 rounded-xl p-3 hover:bg-orange-50 transition duration-300 flex flex-col items-center"
//                 >
//                   <img 
//                     src="../public/paytm-icon.svg" 
//                     alt="Paytm" 
//                     className="w-8 h-8 mb-1"
//                     onError={(e) => e.target.src = '/assets/default-wallet-icon.png'}
//                   />
//                   <span className="text-center text-sm font-medium text-gray-700">Paytm</span>
//                 </button>
//                 <button 
//                   className="border border-gray-200 rounded-xl p-3 hover:bg-orange-50 transition duration-300 flex flex-col items-center"
//                 >
//                   <img 
//                     src="../public/google-pay-icon.svg" 
//                     alt="Google Pay" 
//                     className="w-8 h-8 mb-1"
//                     onError={(e) => e.target.src = '/assets/default-wallet-icon.png'}
//                   />
//                   <span className="text-center text-sm font-medium text-gray-700">Google Pay</span>
//                 </button>
//               </div>
//             )}
            
//             <button 
//               onClick={handlePurchase}
//               className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-bold hover:from-orange-600 hover:to-amber-600 transition duration-300 shadow-lg flex items-center justify-center"
//             >
//               Pay ₹{selectedCoupon.price}
//             </button>
            
//             <p className="text-xs text-gray-500 text-center mt-4">
//               By completing this purchase, you agree to our Terms of Service and Privacy Policy.
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
// export default CouponPage;




import React, { useState, useEffect } from 'react';
import { Search, Tag, Clock, Filter, ArrowRight, Heart, DollarSign, CreditCard, ShoppingCart, X, ShoppingBag, Star } from 'lucide-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CouponPage = () => {
  const [platform, setPlatform] = useState('All');
  const [value, setValue] = useState('All');
  const [category, setCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [purchasedCoupons, setPurchasedCoupons] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [sortBy, setSortBy] = useState('Newest'); 
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [copiedCode, setCopiedCode] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/coupon');
        const formattedCoupons = response.data.data
          .map((coupon, index) => ({
            id: coupon._id,
            platform: coupon.platform,
            value: coupon.valueRs || (coupon.valuePercent * 10),
            price: coupon.sellingPrice,
            expires: new Date(coupon.expiryDate).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit'
            }),
            code: coupon.couponCode,
            description: coupon.description || '',
            category: getCategoryFromPlatform(coupon.platform),
            cards: Math.floor(Math.random() * 200) + 1,
            seller: coupon.sellerName,
            rating: 4.5 + Math.random() * 0.4,
            discount: calculateDiscount(coupon.valueRs, coupon.valuePercent, coupon.sellingPrice),
            createdAt: new Date(coupon.createdAt) 
          }))
          .sort((a, b) => b.createdAt - a.createdAt); 
        setCoupons(formattedCoupons);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching coupons:', error);
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const getCategoryFromPlatform = (platform) => {
    const lowerPlatform = platform.toLowerCase();
    if (lowerPlatform.includes('food') || lowerPlatform.includes('zomato') || lowerPlatform.includes('swiggy')) {
      return 'Food & Dining';
    } else if (lowerPlatform.includes('amazon') || lowerPlatform.includes('flipkart') || lowerPlatform.includes('myntra') || lowerPlatform.includes('fastrack')) {
      return 'Shopping';
    } else if (lowerPlatform.includes('bookmyshow') || lowerPlatform.includes('coding')) {
      return 'Entertainment';
    } else {
      return 'Shopping';
    }
  };

  const calculateDiscount = (valueRs, valuePercent, sellingPrice) => {
    if (valueRs) {
      return Math.round((1 - sellingPrice / valueRs) * 100);
    } else if (valuePercent) {
      return valuePercent;
    }
    return 0;
  };

  const getFilteredAndSortedCoupons = () => {
    let filtered = coupons
      .filter(coupon => platform === 'All' || coupon.platform === platform)
      .filter(coupon => category === 'All' || coupon.category === category)
      .filter(coupon => {
        if (value === 'All') return true;
        if (value === '<₹500') return coupon.value < 500;
        if (value === '₹500-1000') return coupon.value >= 500 && coupon.value <= 1000;
        return coupon.value > 1000;
      })
      .filter(coupon => 
        searchTerm === '' || 
        coupon.platform.toLowerCase().includes(searchTerm.toLowerCase()) || 
        coupon.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

    switch(sortBy) {
      case 'Expiring Soon': 
        return filtered.sort((a, b) => new Date(a.expires) - new Date(b.expires));
      case 'Newest': 
        return filtered.sort((a, b) => b.createdAt - a.createdAt); 
      case 'Best Value': 
        return filtered.sort((a, b) => (b.value - b.price) - (a.value - a.price));
      case 'Price': 
        return filtered.sort((a, b) => a.price - b.price);
      case 'Rating': 
        return filtered.sort((a, b) => b.rating - a.rating);
      default: 
        return filtered.sort((a, b) => b.createdAt - a.createdAt); 
    }
  };

  const filteredCoupons = getFilteredAndSortedCoupons();
  const displayedCoupons = showAll ? filteredCoupons : filteredCoupons.slice(0, 6);
  const dealOfTheDay = filteredCoupons[0];

  const toggleFavorite = (id) => {
    setFavorites(favorites.includes(id) 
      ? favorites.filter(favId => favId !== id) 
      : [...favorites, id]);
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success("Coupon code copied to clipboard!", {
      position: "top-right",
      autoClose: 2000,
    });
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const openPaymentModal = (coupon) => {
    setSelectedCoupon(coupon);
    setShowPaymentModal(true);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedCoupon(null);
    setPaymentMethod('card');
  };

  const handlePurchase = () => {
    if (!selectedCoupon) return;
    setTimeout(() => {
      setPurchasedCoupons([...purchasedCoupons, selectedCoupon.id]);
      toast.success(`Successfully purchased ${selectedCoupon.platform} ₹${selectedCoupon.value} coupon!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      closePaymentModal();
    }, 1500);
  };

  const categoryCounts = {
    'All': coupons.length,
    'Food & Dining': coupons.filter(c => c.category === 'Food & Dining').length,
    'Shopping': coupons.filter(c => c.category === 'Shopping').length,
    'Travel': coupons.filter(c => c.category === 'Travel').length,
    'Entertainment': coupons.filter(c => c.category === 'Entertainment').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="text-2xl font-bold text-orange-600">Loading coupons...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 font-sans">
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-400 text-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 C50,120 80,20 100,100 L100,0 Z" fill="white" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg">Premium Gift Cards Marketplace</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto drop-shadow-md">Unlock amazing savings with digital gift cards from your favorite brands</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Deal of the Day */}
        {dealOfTheDay && (
          <div className="relative bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 rounded-3xl p-8 mb-12 shadow-2xl transform hover:scale-105 transition duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-opacity-30 bg-white rounded-3xl"></div>
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 z-10">
              <div className="text-white text-center md:text-left">
                <h2 className="text-4xl font-bold mb-3 drop-shadow-lg">✨ Premium Deal of the Day</h2>
                <p className="text-xl">{dealOfTheDay.platform} - {dealOfTheDay.description}</p>
                <p className="text-md mt-2">Expires: {dealOfTheDay.expires}</p>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-5xl font-extrabold text-white drop-shadow-lg">₹{dealOfTheDay.price}</span>
                <button 
                  onClick={() => openPaymentModal(dealOfTheDay)}
                  className="bg-white text-orange-600 px-8 py-3 rounded-full font-bold hover:bg-orange-50 transition duration-300 shadow-xl"
                >
                  Purchase Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white bg-opacity-90 rounded-3xl shadow-xl p-8 mb-12 backdrop-blur-md">
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Search brands or gift cards..."
              className="w-full pl-14 pr-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-4 focus:ring-orange-300 transition duration-300 bg-gradient-to-r from-white to-gray-50 shadow-inner text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Tag size={20} className="text-orange-500 mr-3" />
                <span className="font-semibold text-gray-800 text-lg">Category</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {Object.keys(categoryCounts).map(cat => (
                  <button
                    key={cat}
                    className={`px-5 py-2 rounded-full text-md font-medium transition duration-300 shadow-sm ${category === cat ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    onClick={() => setCategory(cat)}
                  >
                    {cat} ({categoryCounts[cat]})
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <Filter size={20} className="text-orange-500 mr-3" />
                <span className="font-semibold text-gray-800 text-lg">Brand</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {['All', ...new Set(coupons.map(c => c.platform))].map(option => (
                  <button
                    key={option}
                    className={`px-5 py-2 rounded-full text-md font-medium transition duration-300 shadow-sm ${platform === option ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    onClick={() => setPlatform(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <DollarSign size={20} className="text-orange-500 mr-3" />
                <span className="font-semibold text-gray-800 text-lg">Value</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {['All', '<₹500', '₹500-1000', '>₹1000'].map(option => (
                  <button
                    key={option}
                    className={`px-5 py-2 rounded-full text-md font-medium transition duration-300 shadow-sm ${value === option ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    onClick={() => setValue(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results and Sorting */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Discover Amazing Deals ({filteredCoupons.length} available)
          </h2>
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <span className="text-gray-600 text-lg">Sort by:</span>
            <select 
              className="bg-white border border-gray-200 rounded-xl px-5 py-2 focus:outline-none focus:ring-4 focus:ring-orange-300 transition duration-300 shadow-md text-lg"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option>Newest</option>
              <option>Expiring Soon</option>
              <option>Best Value</option>
              <option>Price</option>
              <option>Rating</option>
            </select>
          </div>
        </div>

        {/* Coupons Grid with Body's Cart UI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayedCoupons.map((coupon) => (
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
                    <span className="text-sm text-gray-600">{coupon.rating.toFixed(1)}</span>
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

        {/* Show More Button */}
        {filteredCoupons.length > 6 && (
          <div className="text-center mb-16">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="px-12 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full font-bold hover:from-orange-600 hover:to-amber-600 transition duration-500 flex items-center mx-auto shadow-xl"
            >
              {showAll ? 'Show Less' : 'Discover More Gift Cards'}
              <ArrowRight size={24} className="ml-3" />
            </button>
          </div>
        )}

        {/* Newsletter */}
        <div className="relative bg-gradient-to-r from-orange-600 to-amber-500 rounded-3xl shadow-2xl p-10 text-white text-center mb-16 overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,0 C30,80 70,20 100,100 L100,0 Z" fill="white" />
            </svg>
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold mb-4 drop-shadow-lg">Stay Updated with Exclusive Deals</h2>
            <p className="text-lg mb-6">Subscribe to receive special offers directly to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-orange-300 w-full sm:w-96 shadow-inner"
              />
              <button className="px-8 py-4 bg-white text-orange-600 font-bold rounded-full hover:bg-orange-100 transition duration-300 shadow-xl">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>

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
                    src="../public/upi-payment-icon.svg" 
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
                    src="../public/phonepe-icon.svg" 
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
                    src="../public/paytm-icon.svg" 
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
                    src="../public/google-pay-icon.svg" 
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
    </div>
  );
};

export default CouponPage;