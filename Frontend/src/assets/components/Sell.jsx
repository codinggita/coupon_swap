import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const SellCoupon = () => {
  const [formData, setFormData] = useState({
    platform: '',
    customPlatform: '',
    couponCode: '',
    valueRs: '',
    valuePercent: '',
    expiryDate: '',
    sellingPrice: '',
    minimumBuyPrice: '',
    description: '',
    sellerName: '',
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const platforms = ['fastrack', 'Amazon Pay', 'Zomato', 'Flipkart', 'Nike', 'Other'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const platformToSubmit = formData.platform === 'Other' ? formData.customPlatform : formData.platform;
    const couponData = {
      platform: platformToSubmit,
      couponCode: formData.couponCode,
      valueRs: formData.valueRs || null,
      valuePercent: formData.valuePercent || null,
      expiryDate: formData.expiryDate,
      sellingPrice: formData.sellingPrice,
      minimumBuyPrice: formData.minimumBuyPrice,
      description: formData.description,
      sellerName: formData.sellerName,
      image: previewImage || null,
    };

    if (
      platformToSubmit &&
      formData.couponCode &&
      (formData.valueRs || formData.valuePercent) &&
      formData.expiryDate &&
      formData.sellingPrice &&
      formData.minimumBuyPrice
    ) {
      try {
        const response = await axios.post('http://localhost:5000/api/coupon', couponData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Coupon listed:', response.data);
        alert('Coupon listed successfully!');
        navigate('/CoupenVerification');
      } catch (error) {
        console.error('Error listing coupon:', error);
        alert('Failed to list coupon. Please try again.');
      }
    } else {
      alert('Please fill all required fields (Value can be ₹ or %, Minimum Buy Price is required)!');
    }
    setLoading(false);
  };
  const calculateDiscount = () => {
    if (formData.sellingPrice && formData.valueRs) {
      const discount = Math.round((1 - formData.sellingPrice / formData.valueRs) * 100);
      return `${discount}% off`;
    } else if (formData.valuePercent) {
      return `${formData.valuePercent}% off`;
    }
    return 'N/A';
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-yellow-100 to-orange-200 flex items-center justify-center p-4">
      <div className="w-full max-w-[360px] sm:max-w-md md:max-w-lg lg:max-w-4xl flex flex-col lg:flex-row bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-orange-400 to-yellow-400 p-4 sm:p-6 flex flex-col items-center justify-center relative">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-md">
            Sell Your Coupon!
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-white mt-2 text-center">
            Turn your coupons into cash instantly!
          </p>
          <svg
            className="absolute w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 opacity-30 animate-spin-slow"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="40" fill="none" stroke="#fff" strokeWidth="4" />
            <path d="M50 10 A40 40 0 0 1 90 50" fill="none" stroke="#fff" strokeWidth="4" />
          </svg>
        </div>
        <div className="w-full lg:w-1/2 p-4 sm:p-6 bg-white flex flex-col relative">
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold text-xs sm:text-sm">
                Platform <span className="text-red-500">*</span>
              </label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleInputChange}
                className="w-full p-2 sm:p-3 rounded-lg border border-orange-300 bg-orange-50 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-xs sm:text-sm outline-none"
                required
              >
                <option value="">Choose a platform</option>
                {platforms.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
              {formData.platform === 'Other' && (
                <input
                  type="text"
                  name="customPlatform"
                  value={formData.customPlatform}
                  onChange={handleInputChange}
                  placeholder="Enter custom platform"
                  className="w-full mt-2 p-2 sm:p-3 rounded-lg border border-orange-300 bg-orange-50 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-xs sm:text-sm outline-none"
                  required
                />
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-semibold text-xs sm:text-sm">Seller Name</label>
              <input
                type="text"
                name="sellerName"
                value={formData.sellerName}
                onChange={handleInputChange}
                placeholder="e.g., Nagesh Jagtap"
                className="w-full p-2 sm:p-3 rounded-lg border border-orange-300 bg-orange-50 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-xs sm:text-sm outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold text-xs sm:text-sm">
                Coupon Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="couponCode"
                value={formData.couponCode}
                onChange={handleInputChange}
                placeholder="e.g., SAVE50"
                className="w-full p-2 sm:p-3 rounded-lg border border-orange-300 bg-orange-50 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-xs sm:text-sm outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold text-xs sm:text-sm">
                Value <span className="text-red-500">*</span> (₹ or %)
              </label>
              <div className="flex gap-2 sm:gap-3">
                <div className="relative flex-1">
                  <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs sm:text-sm">
                    ₹
                  </span>
                  <input
                    type="number"
                    name="valueRs"
                    value={formData.valueRs}
                    onChange={handleInputChange}
                    placeholder="500"
                    className="w-full p-2 sm:p-3 pl-6 sm:pl-8 rounded-lg border border-orange-300 bg-orange-50 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-xs sm:text-sm outline-none"
                  />
                </div>
                <div className="relative flex-1">
                  <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs sm:text-sm">
                    %
                  </span>
                  <input
                    type="number"
                    name="valuePercent"
                    value={formData.valuePercent}
                    onChange={handleInputChange}
                    placeholder="50"
                    className="w-full p-2 sm:p-3 pr-6 sm:pr-8 rounded-lg border border-orange-300 bg-orange-50 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-xs sm:text-sm outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold text-xs sm:text-sm">
                Selling Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs sm:text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  name="sellingPrice"
                  value={formData.sellingPrice}
                  onChange={handleInputChange}
                  placeholder="400"
                  className="w-full p-2 sm:p-3 pl-6 sm:pl-8 rounded-lg border border-orange-300 bg-orange-50 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-xs sm:text-sm outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold text-xs sm:text-sm">
                Minimum Buy Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs sm:text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  name="minimumBuyPrice"
                  value={formData.minimumBuyPrice}
                  onChange={handleInputChange}
                  placeholder="1000"
                  className="w-full p-2 sm:p-3 pl-6 sm:pl-8 rounded-lg border border-orange-300 bg-orange-50 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-xs sm:text-sm outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold text-xs sm:text-sm">
                Expiry Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-2 sm:p-3 rounded-lg border border-orange-300 bg-orange-50 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-xs sm:text-sm outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold text-xs sm:text-sm">Description (optional)</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="e.g., Valid for new users only"
                className="w-full p-2 sm:p-3 rounded-lg border border-orange-300 bg-orange-50 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-xs sm:text-sm outline-none resize-none h-16 sm:h-20"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold text-xs sm:text-sm">Screenshot</label>
              <label className="w-full p-2 sm:p-3 border-2 border-dashed border-orange-300 bg-orange-50/50 hover:bg-orange-100 flex items-center justify-center cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <span className="text-orange-600 font-semibold text-xs sm:text-sm flex items-center gap-2">
                  <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Upload Image
                </span>
              </label>
              {previewImage && (
                <div className="mt-2 relative w-16 sm:w-20 h-16 sm:h-20 rounded-lg overflow-hidden shadow-md">
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setPreviewImage(null)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    <svg className="w-3 sm:w-4 h-3 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-orange-400 to-yellow-400 text-white py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:from-orange-500 hover:to-yellow-500 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Listing...' : 'List Coupon'}
              {!loading && (
                <svg className="w-4 sm:w-5 h-4 sm:h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          </form>

          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-orange-50 rounded-lg shadow-inner">
            <h3 className="text-sm sm:text-base font-semibold text-orange-600">Preview</h3>
            <div className="mt-2 text-xs sm:text-sm text-gray-700 space-y-1">
              <p>
                <span className="font-semibold text-orange-600">Seller:</span> {formData.sellerName || 'N/A'}
              </p>
              <p>
                <span className="font-semibold text-orange-600">Platform:</span>{' '}
                {formData.platform === 'Other' ? formData.customPlatform || 'N/A' : formData.platform || 'N/A'}
              </p>
              <p>
                <span className="font-semibold text-orange-600">Value:</span>{' '}
                {formData.valueRs ? `₹${formData.valueRs}` : formData.valuePercent ? `${formData.valuePercent}%` : 'N/A'}
              </p>
              <p>
                <span className="font-semibold text-orange-600">Price:</span>{' '}
                {formData.sellingPrice ? `₹${formData.sellingPrice}` : 'N/A'}
              </p>
              <p>
                <span className="font-semibold text-orange-600">Min. Buy:</span>{' '}
                {formData.minimumBuyPrice ? `₹${formData.minimumBuyPrice}` : 'N/A'}
              </p>
              <p>
                <span className="font-semibold text-orange-600">Expires:</span> {formData.expiryDate || 'N/A'}
              </p>
              <p>
                <span className="font-semibold text-orange-600">Discount:</span> {calculateDiscount()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SellCoupon;