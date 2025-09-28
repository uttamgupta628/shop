import React, { useState } from "react";
import { Search, Home, Heart, ShoppingCart, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../products/WishlistContext";
import { useCart } from "../products/CartContext";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { wishlistCount } = useWishlist();
  const { getTotalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1
              className="text-2xl font-bold text-orange-500 cursor-pointer"
              onClick={() => navigate("/")}
            >
              QuickShop
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative flex items-center">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search Item"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-full bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                onClick={handleSearch}
                className="absolute inset-y-0 right-0 flex items-center px-6 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-200"
              >
                Search
              </button>
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-6">
            {/* Home Icon */}
            <button
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              onClick={() => navigate("/")}
            >
              <Home className="h-6 w-6" />
            </button>

            {/* Heart/Wishlist Icon */}
            <button
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200 relative"
              onClick={() => navigate("/wishlist")}
            >
              <Heart className="h-6 w-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Icon */}
            <button
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200 relative"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart className="h-6 w-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* User Profile Icon */}
            <button
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              onClick={() => navigate("/profile")}
            >
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
