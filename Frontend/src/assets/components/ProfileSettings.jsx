import React, { useState, useEffect } from "react";
import { Settings, ChevronRight, Upload, X } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Added for navigation
const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
    bankUpi: "",
    address: "",
    password: "",
    profilePicture: null,
  });
  const [savedData, setSavedData] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ text: "", type: "" });
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("https://coupon-swap-backend.onrender.com/api/profile", {
          withCredentials: true,
        });
        const data = response.data;
        setSavedData(data);
        setFormData(data);
        if (data.profilePicture) setImagePreview(data.profilePicture);
      } catch (error) {
        console.error("Error fetching profile:", error.message);
        setMessage({ text: "Failed to load profile data.", type: "error" });
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setMessage({ text: "Please upload a valid image (e.g., JPG, PNG).", type: "error" });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ text: "Image size must be less than 5MB.", type: "error" });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profilePicture: reader.result }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setErrors((prev) => ({ ...prev, profilePicture: "" }));
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, profilePicture: null }));
    setImagePreview(null);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format.";
    if (!formData.phone) newErrors.phone = "Phone is required.";
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone must be a 10-digit number.";
    if (formData.password && formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (formData.bankName && !formData.accountNumber)
      newErrors.accountNumber = "Account Number is required if Bank Name is provided.";
    if (formData.accountNumber && !formData.bankName)
      newErrors.bankName = "Bank Name is required if Account Number is provided.";
    if (formData.ifscCode && !/^[A-Za-z0-9]{4,11}$/.test(formData.ifscCode))
      newErrors.ifscCode = "IFSC Code must be 4-11 alphanumeric characters (e.g., BARB0DBIDAR).";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setMessage({ text: "Please fix the errors below.", type: "error" });
      return;
    }

    setIsLoading(true);
    setMessage({ text: "Saving...", type: "info" });

    try {
      const response = await axios.post("https://coupon-swap-backend.onrender.com/api/profile", formData, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      const dataToSave = response.data;
      setSavedData(dataToSave);
      setMessage({ text: "Profile updated successfully!", type: "success" });
      setFormData(dataToSave);
      if (dataToSave.profilePicture) setImagePreview(dataToSave.profilePicture);
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Error saving profile. Check network or server.",
        type: "error",
      });
      console.error("Error saving profile:", error.message, error.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      accountHolderName: "",
      bankUpi: "",
      address: "",
      password: "",
      profilePicture: null,
    });
    setImagePreview(null);
    setErrors({});
    setMessage({ text: "Form reset.", type: "info" });
  };

  const handleLogout = async () => {
    try {
      await axios.post("https://coupon-swap-backend.onrender.com/api/logout", {}, {
        withCredentials: true,
      });
      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error.message);
      setMessage({ text: "Error logging out. Please try again.", type: "error" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 font-sans">
      <header className="bg-white bg-opacity-90 backdrop-blur-md shadow-md py-6 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Profile Settings
            </h1>
            <p className="text-sm md:text-md text-gray-600">Update your details here.</p>
          </div>
          {/* Added Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-orange-600 to-amber-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-orange-700 hover:to-amber-600 focus:ring-2 focus:ring-orange-600 focus:outline-none transition duration-300 shadow-md"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/3 order-1 lg:order-0">
          <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-xl shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Profile</h2>
            {savedData ? (
              <div className="space-y-4">
                {savedData.profilePicture && (
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto">
                    <img
                      src={savedData.profilePicture}
                      alt="Saved Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-700">Name:</p>
                  <p className="text-gray-900">{savedData.name || "Not set"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Email:</p>
                  <p className="text-gray-900">{savedData.email || "Not set"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Phone:</p>
                  <p className="text-gray-900">{savedData.phone || "Not set"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Address:</p>
                  <p className="text-gray-900">{savedData.address || "Not set"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Bank Name:</p>
                  <p className="text-gray-900">{savedData.bankName || "Not set"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Account Number:</p>
                  <p className="text-gray-900">{savedData.accountNumber || "Not set"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">IFSC Code:</p>
                  <p className="text-gray-900">{savedData.ifscCode || "Not set"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Account Holder Name:</p>
                  <p className="text-gray-900">{savedData.accountHolderName || "Not set"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">UPI ID:</p>
                  <p className="text-gray-900">{savedData.bankUpi || "Not set"}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">No profile data saved yet.</p>
            )}
          </div>
        </aside>

        <main className="flex-1 lg:w-2/3 order-0 lg:order-1">
          <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center gap-4 mb-6 border-b border-orange-100 pb-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-500 text-2xl font-semibold">
                    {formData.name.charAt(0) || "U"}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Settings size={24} className="text-orange-600" />
                  Profile Settings
                </h2>
                <p className="text-sm text-gray-600">Manage your account details.</p>
              </div>
            </div>

            {message.text && (
              <div
                className={`mb-6 p-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
                  message.type === "success"
                    ? "bg-green-100 text-green-700"
                    : message.type === "error"
                    ? "bg-red-100 text-red-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {isLoading && <span className="animate-spin">⏳</span>}
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={`w-full p-3 rounded-lg border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-orange-600 focus:border-orange-600 outline-none transition duration-300`}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-xs text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    required
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`w-full p-3 rounded-lg border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-orange-600 focus:border-orange-600 outline-none transition duration-300`}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone"
                    required
                    aria-invalid={errors.phone ? "true" : "false"}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    className={`w-full p-3 rounded-lg border ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-orange-600 focus:border-orange-600 outline-none transition duration-300`}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="text-xs text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-1">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    id="bankName"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    placeholder="e.g., Bank of Baroda"
                    aria-invalid={errors.bankName ? "true" : "false"}
                    aria-describedby={errors.bankName ? "bankName-error" : undefined}
                    className={`w-full p-3 rounded-lg border ${
                      errors.bankName ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-orange-600 focus:border-orange-600 outline-none transition duration-300`}
                  />
                  {errors.bankName && (
                    <p id="bankName-error" className="text-xs text-red-500 mt-1">{errors.bankName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    id="accountNumber"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    placeholder="e.g., 123456789012"
                    aria-invalid={errors.accountNumber ? "true" : "false"}
                    aria-describedby={errors.accountNumber ? "accountNumber-error" : undefined}
                    className={`w-full p-3 rounded-lg border ${
                      errors.accountNumber ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-orange-600 focus:border-orange-600 outline-none transition duration-300`}
                  />
                  {errors.accountNumber && (
                    <p id="accountNumber-error" className="text-xs text-red-500 mt-1">{errors.accountNumber}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700 mb-1">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    id="ifscCode"
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleChange}
                    placeholder="e.g., BARB0DBIDAR"
                    aria-invalid={errors.ifscCode ? "true" : "false"}
                    aria-describedby={errors.ifscCode ? "ifscCode-error" : undefined}
                    className={`w-full p-3 rounded-lg border ${
                      errors.ifscCode ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-orange-600 focus:border-orange-600 outline-none transition duration-300`}
                  />
                  {errors.ifscCode && (
                    <p id="ifscCode-error" className="text-xs text-red-500 mt-1">{errors.ifscCode}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="accountHolderName" className="block text-sm font-medium text-gray-700 mb-1">
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    id="accountHolderName"
                    name="accountHolderName"
                    value={formData.accountHolderName}
                    onChange={handleChange}
                    placeholder="e.g., John Doe"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-600 focus:border-orange-600 outline-none transition duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="bankUpi" className="block text-sm font-medium text-gray-700 mb-1">
                    UPI ID (Optional)
                  </label>
                  <input
                    type="text"
                    id="bankUpi"
                    name="bankUpi"
                    value={formData.bankUpi}
                    onChange={handleChange}
                    placeholder="e.g., john@upi"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-600 focus:border-orange-600 outline-none transition duration-300"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Your address"
                    rows={3}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-600 focus:border-orange-600 outline-none transition duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    aria-invalid={errors.password ? "true" : "false"}
                    aria-describedby={errors.password ? "password-error" : undefined}
                    className={`w-full p-3 rounded-lg border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-orange-600 focus:border-orange-600 outline-none transition duration-300`}
                  />
                  {errors.password && (
                    <p id="password-error" className="text-xs text-red-500 mt-1">{errors.password}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Picture
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      id="profilePicture"
                      name="profilePicture"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="profilePicture"
                      className="flex items-center gap-2 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-200 focus:ring-2 focus:ring-orange-600 focus:outline-none transition duration-300"
                    >
                      <Upload size={18} />
                      Upload
                    </label>
                    {formData.profilePicture && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Image uploaded</span>
                        <button
                          type="button"
                          onClick={removeImage}
                          className="text-gray-500 hover:text-red-600 focus:ring-2 focus:ring-orange-600 focus:outline-none transition duration-300"
                          aria-label="Remove profile picture"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="border-2 border-orange-600 text-orange-600 py-2 px-4 sm:px-6 rounded-lg font-semibold hover:bg-orange-50 focus:ring-2 focus:ring-orange-600 focus:outline-none transition duration-300"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-orange-600 to-amber-500 text-white py-2 px-4 sm:px-6 rounded-lg font-semibold hover:from-orange-700 hover:to-amber-600 focus:ring-2 focus:ring-orange-600 focus:outline-none transition duration-300 shadow-md"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mt-6 bg-white bg-opacity-80 backdrop-blur-md p-6 rounded-xl shadow-md border border-orange-100/50 transition-all duration-300 hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">What’s Coming Next?</h3>
          <p className="text-sm text-gray-600">
            Two-factor authentication, profile verification badges, custom payment methods, social media integration, and advanced privacy controls are on the way!
          </p>
          <button className="mt-4 bg-gradient-to-r from-orange-600 to-amber-500 text-white py-2 px-4 sm:px-6 rounded-lg font-semibold hover:from-orange-700 hover:to-amber-600 focus:ring-2 focus:ring-orange-600 focus:outline-none transition duration-300 flex items-center gap-2">
            Learn More <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;