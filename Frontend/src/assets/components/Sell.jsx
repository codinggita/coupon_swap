import React, { useState } from 'react';

const SellCoupon = () => {
  const [formData, setFormData] = useState({
    platform: '',
    couponCode: '',
    value: '',
    expiryDate: '',
    password: '',
    sellingPrice: '',
    description: '',
  });
  const [isHovered, setIsHovered] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const platforms = ['Google Pay', 'Paytm', 'Amazon Pay', 'PhonePe', 'Flipkart'];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.platform && formData.couponCode && formData.value && formData.expiryDate && formData.sellingPrice) {
      console.log('Coupon listed:', formData);
      alert('Your coupon has been listed successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center p-4">
      <div className="relative max-w-lg w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
        {/* Floating Premium Badge */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
          Premium Listing
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-orange-600 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-500">
            Sell Your Coupon
          </h2>
          <p className="text-gray-600 mt-2 font-medium text-lg md:text-xl">
            Reach buyers instantly with a stunning listing!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-4">
            {/* Platform Dropdown */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">Platform</label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleInputChange}
                className="w-full p-3 rounded-xl bg-white/50 border border-gray-200 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                required
              >
                <option value="">Select Platform</option>
                {platforms.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </div>

            {/* Coupon Code */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Coupon Code <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                name="couponCode"
                value={formData.couponCode}
                onChange={handleInputChange}
                placeholder="Enter code"
                className="w-full p-3 rounded-xl bg-white/50 border border-gray-200 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Password <span className="text-gray-400 text-xs">(optional)</span>
              </label>
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                className="w-full p-3 rounded-xl bg-white/50 border border-gray-200 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
              />
            </div>

            {/* Coupon Value */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Coupon Value <span className="text-orange-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">₹</span>
                <input
                  type="number"
                  name="value"
                  value={formData.value}
                  onChange={handleInputChange}
                  placeholder="e.g., 500"
                  className="w-full p-3 pl-8 rounded-xl bg-white/50 border border-gray-200 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                  required
                />
              </div>
            </div>

            {/* Selling Price */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Selling Price <span className="text-orange-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">₹</span>
                <input
                  type="number"
                  name="sellingPrice"
                  value={formData.sellingPrice}
                  onChange={handleInputChange}
                  placeholder="e.g., 400"
                  className="w-full p-3 pl-8 rounded-xl bg-white/50 border border-gray-200 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                  required
                />
              </div>
            </div>

            {/* Expiry Date */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">
                Expiry Date <span className="text-orange-500">*</span>
              </label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-3 rounded-xl bg-white/50 border border-gray-200 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                required
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">
                Description <span className="text-gray-400 text-xs">(optional)</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Add usage conditions or restrictions"
                className="w-full p-3 rounded-xl bg-white/50 border border-gray-200 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md resize-none h-24"
              />
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">
                Upload Screenshot <span className="text-gray-400 text-xs">(optional)</span>
              </label>
              <div className="flex items-center gap-4">
                <label className="flex-1 p-4 border-2 border-dashed border-orange-300 rounded-xl bg-white/50 hover:border-orange-500 cursor-pointer transition-all duration-300 shadow-sm">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <span className="text-orange-600 font-medium flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Add Image
                  </span>
                </label>
                {previewImage && (
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shadow-md">
                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setPreviewImage(null)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-all duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="relative mt-8">
            <button
              type="submit"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <span>List Coupon Now</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <div
              className={`absolute -top-12 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white text-sm py-2 px-4 rounded-lg shadow-md transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
            >
              Instantly reach thousands of buyers!
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-orange-600 rotate-45" />
            </div>
          </div>
        </form>

        {/* Preview Card */}
        <div className="mt-8 p-5 bg-white/50 rounded-xl shadow-inner border border-gray-100/50">
          <h3 className="text-lg font-semibold text-orange-600 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Listing Preview
          </h3>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-gray-700">
            <p><span className="font-medium text-orange-700">Platform:</span> {formData.platform || 'Not set'}</p>
            <p><span className="font-medium text-orange-700">Value:</span> {formData.value ? `₹${formData.value}` : 'Not set'}</p>
            <p><span className="font-medium text-orange-700">Price:</span> {formData.sellingPrice ? `₹${formData.sellingPrice}` : 'Not set'}</p>
            <p><span className="font-medium text-orange-700">Expires:</span> {formData.expiryDate || 'Not set'}</p>
            <p className="col-span-2">
              <span className="font-medium text-orange-700">Discount:</span>{' '}
              {formData.value && formData.sellingPrice
                ? `${Math.round((1 - formData.sellingPrice / formData.value) * 100)}% off`
                : 'N/A'}
            </p>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-6 border-t border-gray-100/50 pt-4 text-center">
          <p className="font-medium text-orange-600 flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Pro Tips
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6 mt-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-orange-100 rounded-full">
                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
              </div>
              <span>30-40% off sells faster</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-orange-100 rounded-full">
                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 10-2 0v1H8a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Screenshots boost trust</span>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center bg-green-50 px-3 py-1 rounded-full shadow-sm">
            <svg className="w-4 h-4 text-green-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-medium text-green-800">100% Secure</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellCoupon;