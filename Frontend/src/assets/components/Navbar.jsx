import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  Plus,
  ShoppingCart,
  User,
  Bell,
  Star,
  Menu,
  X,
} from "lucide-react";
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const getActiveTab = (pathname) => {
    const pathMap = {
      "/": "home",
      "/browse": "browse",
      "/sell": "sell",
      "/cart": "cart",
      "/account": "account",
      "/faq": "faq",
      "/about": "about",
      "/notifications": "notifications" 
    };
    return pathMap[pathname] || "home";
  };
  const [activeTab, setActiveTab] = useState(getActiveTab(location.pathname));
  useEffect(() => {
    setActiveTab(getActiveTab(location.pathname));
  }, [location.pathname]);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const handleNavigation = (tab, path) => {
    setActiveTab(tab);
    navigate(path);
    setMobileMenuOpen(false);
  };
  const navItems = [
    { tab: "home", label: "Home", to: "/home" },
    { tab: "browse", label: "Browse", to: "/browse" },
    { tab: "sell", label: "Sell", to: "/sell" },
    { tab: "faq", label: "FAQ", to: "/faq" },
    { tab: "about", label: "About Us", to: "/about" },
  ];
  const bottomNavItems = [
    { tab: "home", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Home", path: "/home" },
    { tab: "browse", icon: Search, label: "Browse", path: "/browse" },
    { tab: "sell", icon: Plus, label: "Sell", path: "/sell" },
    { tab: "cart", icon: ShoppingCart, label: "Cart", path: "/cart" },
    { tab: "account", icon: User, label: "Account", path: "/account" },
  ];
  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-extrabold text-orange-600 tracking-tight">CouponSwap</h1>
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                <Star size={16} className="text-yellow-400" />
                <span>4.8 (2.5k reviews)</span>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              {navItems.map(({ tab, label, to }) => (
                <Link
                  key={tab}
                  to={to}
                  className={`relative text-lg font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? "text-orange-600 after:w-full"
                      : "text-gray-600 hover:text-orange-500"
                  } after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:h-1 after:bg-orange-600 after:rounded-full after:transition-all after:duration-300`}
                  onClick={() => setActiveTab(tab)}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => handleNavigation("notifications", "/notifications")}
                className={`p-2 rounded-full transition-colors ${
                  activeTab === "notifications" ? "bg-orange-50 text-orange-600" : "hover:bg-gray-100"
                }`}
              >
                <Bell size={20} className="text-gray-600" />
              </button>
              <button 
                onClick={() => handleNavigation("account", "/account")}
                className={`p-2 rounded-full transition-colors ${
                  activeTab === "account" ? "bg-orange-50 text-orange-600" : "hover:bg-gray-100"
                }`}
              >
                <User size={20} className="text-gray-600" />
              </button>
              <button 
                onClick={() => handleNavigation("cart", "/cart")}
                className={`p-2 rounded-full transition-colors ${
                  activeTab === "cart" ? "bg-orange-50 text-orange-600" : "hover:bg-gray-100"
                }`}
              >
                <ShoppingCart size={20} className="text-gray-600" />
              </button>
              <button className="px-5 py-2 text-orange-600 font-medium rounded-full hover:bg-orange-50 transition">
                <Link to="/Login">Login</Link>
              </button>
              <button className="px-5 py-2 bg-orange-600 text-white font-medium rounded-full hover:bg-orange-700 transition shadow-md">
                <Link to="/Signin">Sign Up</Link>
              </button>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={toggleMobileMenu} className="text-gray-600 hover:text-orange-600">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg z-50 border-b border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map(({ tab, label, to }) => (
                <Link
                  key={tab}
                  to={to}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    activeTab === tab ? "text-orange-600 bg-orange-50" : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => handleNavigation(tab, to)}
                >
                  {label}
                </Link>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200 px-4">
              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md mb-2">
                <Link to="/Signin">Sign Up</Link>
              </button>
              <button className="w-full text-orange-600 hover:text-orange-800 font-medium py-2 px-4">
                <Link to="/Login">Login</Link>
              </button>
            </div>
          </div>
        )}
      </header>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg py-3 rounded-t-xl border-t border-gray-200 z-50">
        <div className="grid grid-cols-5 gap-2 px-4">
          {bottomNavItems.map(({ tab, icon: Icon, label, path }) => (
            <button
              key={tab}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                activeTab === tab ? "text-orange-600 bg-orange-50" : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => handleNavigation(tab, path)}
            >
              {typeof Icon === "string" ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={Icon} />
                </svg>
              ) : (
                <Icon size={24} />
              )}
              <span className="text-xs mt-1">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
export default Navbar;