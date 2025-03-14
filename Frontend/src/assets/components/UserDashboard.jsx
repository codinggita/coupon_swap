import React, { useState } from "react";
import {
  ShoppingBag,
  Tag,
  DollarSign,
  Settings,
  ChevronRight,
  Menu,
  X,
  Heart,
  BarChart,
  Copy,
} from "lucide-react";
import { useNavigate } from "react-router-dom"; 

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
  const navigate = useNavigate(); 

 
  const dashboardData = {
    listedCoupons: 3,
    soldCoupons: 5,
    purchasedCoupons: 2,
    earningsThisMonth: 150,
    totalEarnings: 1200,
  };

  const listedCoupons = [
    { id: 1, platform: "Google Pay", value: 100, price: 80, code: "GPAY100", status: "Active" },
    { id: 2, platform: "Paytm", value: 50, price: 40, code: "PAYTM50", status: "Active" },
    { id: 3, platform: "Amazon", value: 250, price: 200, code: "AMZ250", status: "Pending" },
  ];

  const soldCoupons = [
    { id: 4, platform: "Flipkart", value: 500, price: 400, code: "FK500", dateSold: "10/03/25" },
    { id: 5, platform: "Myntra", value: 300, price: 240, code: "MYN300", dateSold: "12/03/25" },
  ];

  const purchasedCoupons = [
    { id: 6, platform: "Paytm", value: 150, price: 120, code: "PAYTM150", dateBought: "11/03/25" },
    { id: 7, platform: "Google Pay", value: 75, price: 60, code: "GPAY75", dateBought: "13/03/25" },
  ];

  const tabs = [
    { name: "Overview", icon: BarChart },
    { name: "Listed Coupons", icon: Tag },
    { name: "Sold Coupons", icon: ShoppingBag },
    { name: "Purchased Coupons", icon: Heart },
    { name: "Earnings", icon: DollarSign },
    { name: "Settings", icon: Settings },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Tag, label: "Listed Coupons", value: dashboardData.listedCoupons },
                { icon: ShoppingBag, label: "Sold Coupons", value: dashboardData.soldCoupons },
                { icon: Heart, label: "Purchased Coupons", value: dashboardData.purchasedCoupons },
                { icon: DollarSign, label: "This Month", value: `₹${dashboardData.earningsThisMonth}` },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white bg-opacity-80 backdrop-blur-md p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-orange-100/50 transform hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3">
                    <stat.icon className="text-orange-600" size={24} />
                    <div>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white bg-opacity-80 backdrop-blur-md p-6 rounded-xl shadow-md border border-orange-100/50">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-orange-600 to-amber-500 text-white py-2 px-6 rounded-lg font-semibold hover:from-orange-700 hover:to-amber-600 transition duration-300 flex items-center gap-2 shadow-md">
                  <ShoppingBag size={18} />
                  Sell a Coupon
                </button>
                <button className="border-2 border-orange-600 text-orange-600 py-2 px-6 rounded-lg font-semibold hover:bg-orange-50 transition duration-300 flex items-center gap-2">
                  <DollarSign size={18} />
                  Withdraw Earnings
                </button>
              </div>
            </div>
          </div>
        );
      case "Listed Coupons":
        return (
          <div className="space-y-4">
            {listedCoupons.map((coupon) => (
              <div
                key={coupon.id}
                className="bg-white bg-opacity-80 backdrop-blur-md p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center border border-orange-100/50"
              >
                <div>
                  <h3 className="text-md font-semibold text-gray-900">{coupon.platform}</h3>
                  <p className="text-sm text-gray-600">Value: ₹{coupon.value} | Price: ₹{coupon.price}</p>
                  <p className="text-sm text-green-600">Code: {coupon.code}</p>
                </div>
                <span
                  className={`mt-2 sm:mt-0 px-2 py-1 rounded-full text-xs font-medium ${
                    coupon.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {coupon.status}
                </span>
              </div>
            ))}
          </div>
        );
      case "Sold Coupons":
        return (
          <div className="space-y-4">
            {soldCoupons.map((coupon) => (
              <div
                key={coupon.id}
                className="bg-white bg-opacity-80 backdrop-blur-md p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center border border-orange-100/50"
              >
                <div>
                  <h3 className="text-md font-semibold text-gray-900">{coupon.platform}</h3>
                  <p className="text-sm text-gray-600">Value: ₹{coupon.value} | Sold for: ₹{coupon.price}</p>
                  <p className="text-sm text-green-600">Code: {coupon.code}</p>
                </div>
                <p className="mt-2 sm:mt-0 text-xs text-gray-500">Sold on: {coupon.dateSold}</p>
              </div>
            ))}
          </div>
        );
      case "Purchased Coupons":
        return (
          <div className="space-y-4">
            {purchasedCoupons.map((coupon) => (
              <div
                key={coupon.id}
                className="bg-white bg-opacity-80 backdrop-blur-md p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center border border-orange-100/50"
              >
                <div className="flex-1">
                  <h3 className="text-md font-semibold text-gray-900">{coupon.platform}</h3>
                  <p className="text-sm text-gray-600">Value: ₹{coupon.value} | Bought for: ₹{coupon.price}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-green-600">Code: {coupon.code}</p>
                    <button
                      onClick={() => copyCode(coupon.code)}
                      className="text-gray-500 hover:text-orange-600 transition duration-300"
                      title={copiedCode === coupon.code ? "Copied!" : "Copy Code"}
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
                <p className="mt-2 sm:mt-0 text-xs text-gray-500">Bought on: {coupon.dateBought}</p>
              </div>
            ))}
          </div>
        );
      case "Earnings":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-600 to-amber-500 text-white p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold">₹{dashboardData.totalEarnings}</h3>
              <p className="text-sm">Total Earnings</p>
              <p className="mt-2 text-md">You’ve earned ₹{dashboardData.earningsThisMonth} this month!</p>
            </div>
            <div className="bg-white bg-opacity-80 backdrop-blur-md p-6 rounded-xl shadow-md border border-orange-100/50">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Earnings History</h3>
              <p className="text-gray-600">Detailed breakdown coming soon...</p>
            </div>
          </div>
        );
      case "Settings":
        return (
          <div className="space-y-6">
            <div className="bg-white bg-opacity-80 backdrop-blur-md p-6 rounded-xl shadow-md border border-orange-100/50">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Settings</h3>
              <p className="text-gray-600">Manage your account details, payment methods, and preferences.</p>
              <button 
                onClick={() => navigate("/cart/ProfileSettings")} // Add navigation on click
                className="mt-4 bg-orange-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-orange-700 transition duration-300"
              >
                Edit Profile
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 font-sans">
      {/* Header */}
      <header className="bg-white bg-opacity-90 backdrop-blur-md shadow-md py-6 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">My Dashboard</h1>
            <p className="text-sm md:text-md text-gray-600">Manage your coupons, earnings, and more.</p>
          </div>
          <button className="md:hidden text-gray-600 focus:outline-none" onClick={toggleSidebar}>
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed inset-y-0 left-0 w-64 bg-white bg-opacity-90 backdrop-blur-md shadow-lg p-6 z-50 transition-transform duration-300 md:static md:w-72`}
        >
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => {
                  setActiveTab(tab.name);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition duration-300 ${
                  activeTab === tab.name
                    ? "bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-md"
                    : "text-gray-700 hover:bg-orange-100/50"
                }`}
              >
                <tab.icon size={20} />
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </nav>
          <button className="mt-6 w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-orange-700 hover:to-amber-600 transition duration-300 flex items-center justify-center gap-2 shadow-md">
            <ShoppingBag size={18} />
            Sell a Coupon
          </button>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1">
          <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 tracking-tight">{activeTab}</h2>
            {renderTabContent()}
          </div>

          {/* Future Features */}
          <div className="mt-6 bg-white bg-opacity-80 backdrop-blur-md p-6 rounded-xl shadow-md border border-orange-100/50">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What’s Coming Next?</h3>
            <p className="text-sm text-gray-600">
              Analytics, referral rewards, and more exciting features are on the way!
            </p>
            <button className="mt-4 bg-gradient-to-r from-orange-600 to-amber-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-orange-700 hover:to-amber-600 transition duration-300 flex items-center gap-2">
              Learn More <ChevronRight size={18} />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;