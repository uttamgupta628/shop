import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Heart, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../types/product";
import tshit from "../../assets/thsirt.png";
import watch1 from "../../assets/watch1.png";
import mouse from "../../assets/mouse.png";
import headPhone from "../../assets/headPhone.png";
import game from "../../assets/game.png";
import shoe from "../../assets/shoe.png";

const ExploreProducts: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);

  // Sample products data
  const products: Product[] = [
    {
      id: "1",
      title: "HAVIT HV-G92 Gamepad",
      brand: "HAVIT",
      price: 120,
      originalPrice: 160,
      image: headPhone,
      rating: 4.5,
      reviewCount: "88",
      status: "-40%",
      category: "Gaming",
    },
    {
      id: "2",
      title: "AK-900 Wired Keyboard",
      brand: "AK",
      price: 960,
      originalPrice: 1160,
      image: watch1,
      rating: 4,
      reviewCount: "75",
      status: "-35%",
      category: "Electronics",
    },
    {
      id: "3",
      title: "IPS LCD Gaming Monitor",
      brand: "Samsung",
      price: 370,
      originalPrice: 400,
      image: tshit,
      rating: 4.5,
      reviewCount: "99",
      status: "-10%",
      category: "Monitors",
    },
    {
      id: "4",
      title: "S-Series Comfort Chair",
      brand: "Herman Miller",
      price: 375,
      originalPrice: 400,
      image: mouse,
      rating: 4.5,
      reviewCount: "99",
      status: "-25%",
      category: "Furniture",
    },
    {
      id: "5",
      title: "AK-900 Wired Keyboard",
      brand: "AK",
      price: 960,
      originalPrice: 1160,
      image: watch1,
      rating: 4,
      reviewCount: "75",
      status: "-35%",
      category: "Electronics",
    },
    {
      id: "6",
      title: "Jr. Zoom Soccer Cleats",
      brand: "Nike",
      price: 1160,
      originalPrice: 1300,
      image: shoe,
      rating: 5,
      reviewCount: "35",
      status: "NEW",
      category: "Sports",
    },
    {
      id: "7",
      title: "GP11 Shooter USB Gamepad",
      brand: "GP11",
      price: 660,
      originalPrice: 800,
      image: game,
      rating: 4.5,
      reviewCount: "55",
      status: "NEW",
      category: "Gaming",
    },
    {
      id: "8",
      title: "IPS LCD Gaming Monitor",
      brand: "Samsung",
      price: 370,
      originalPrice: 400,
      image: tshit,
      rating: 4.5,
      reviewCount: "99",
      status: "-30%",
      category: "Monitors",
    },
  ];

  // Navigation handler
  const handleProductClick = (productId: string, event: React.MouseEvent) => {
    // Prevent navigation when clicking on action buttons
    if ((event.target as HTMLElement).closest("button")) {
      return;
    }
    navigate(`/product/${productId}`);
  };

  const productsPerPage = 8;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getCurrentProducts = () => {
    const startIndex = currentPage * productsPerPage;
    return products.slice(startIndex, startIndex + productsPerPage);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-sm ${
          index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  const getBadgeColor = (status: string) => {
    if (status === "NEW") return "bg-green-500";
    return "bg-orange-500";
  };

  const getColorDots = (productId: string) => {
    const colorMap: { [key: string]: string[] } = {
      "6": ["bg-red-500", "bg-blue-500"],
      "7": ["bg-red-500", "bg-black"],
    };
    return colorMap[productId] || [];
  };

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-1 h-12 bg-orange-500 rounded-full"></div>
            <div>
              <div className="text-orange-500 font-semibold text-lg">
                Our Products
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Explore Our Products
              </h2>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <button
              onClick={prevPage}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={nextPage}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {getCurrentProducts().map((product) => (
            <div
              key={product.id}
              className="bg-gray-50 p-4 group hover:shadow-lg transition-shadow cursor-pointer"
              onClick={(e) => handleProductClick(product.id, e)}
            >
              {/* Product Image */}
              <div className="relative mb-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-40 h-48 object-cover mx-auto"
                />

                {/* Discount Badge */}
                <div
                  className={`absolute top-3 left-3 ${getBadgeColor(
                    product.status
                  )} text-white text-xs px-2 py-1 rounded`}
                >
                  {product.status}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                {/* Add to Cart Button - shows for all products on hover */}
                <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    className="w-full bg-black text-white py-2 rounded-b-lg hover:bg-gray-800 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 truncate">
                  {product.title}
                </h3>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-orange-500 font-bold">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-gray-400 line-through text-sm">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="text-gray-500 text-sm">
                    ({product.reviewCount})
                  </span>
                </div>

                {/* Color Variants */}
                {getColorDots(product.id).length > 0 && (
                  <div className="flex gap-2 pt-1">
                    {getColorDots(product.id).map((color, colorIndex) => (
                      <button
                        key={colorIndex}
                        className={`w-4 h-4 rounded-full ${color} border-2 border-gray-300 hover:border-gray-500`}
                        onClick={(e) => e.stopPropagation()}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View All Products Button */}
        <div className="text-center">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-12 py-4 rounded-lg transition-colors">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExploreProducts;
