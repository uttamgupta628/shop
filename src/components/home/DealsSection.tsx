import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../products/WishlistContext';
import { useCart } from '../products/CartContext';
import type { Product } from '../types/product';
import watch1 from '../../assets/watch1.png';
import tshirt from '../../assets/thsirt.png';
import mouse from '../../assets/mouse.png';
import headPhone from '../../assets/headPhone.png';

const FlashSales: React.FC = () => {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56
  });

  // Sample flash sale products
  const flashSaleProducts: Product[] = [
    {
      id: '1',
      title: 'HAVIT HV-G92 Gamepad',
      brand: 'HAVIT',
      price: 120,
      originalPrice: 160,
      image: headPhone,
      rating: 4.5,
      reviewCount: '88',
      status: '-40%',
      category: 'Gaming',
      description: 'Professional gaming controller with ergonomic design'
    },
    {
      id: '2',
      title: 'AK-900 Wired Keyboard',
      brand: 'AK',
      price: 960,
      originalPrice: 1160,
      image: watch1,
      rating: 4,
      reviewCount: '75',
      status: '-35%',
      category: 'Electronics',
      description: 'Mechanical keyboard with RGB lighting'
    },
    {
      id: '3',
      title: 'IPS LCD Gaming Monitor',
      brand: 'Samsung',
      price: 370,
      originalPrice: 400,
      image: mouse,
      rating: 4.5,
      reviewCount: '99',
      status: '-30%',
      category: 'Monitors',
      description: '27-inch gaming monitor with 144Hz refresh rate'
    },
    {
      id: '4',
      title: 'S-Series Comfort Chair',
      brand: 'Herman Miller',
      price: 375,
      originalPrice: 400,
      image: tshirt,
      rating: 4.5,
      reviewCount: '99',
      status: '-25%',
      category: 'Furniture',
      description: 'Ergonomic office chair with lumbar support'
    }
  ];

  const handleProductClick = (productId: string, event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest('button')) {
      return;
    }
    navigate(`/product/${productId}`);
  };

  const handleWishlistClick = (product: Product, event: React.MouseEvent) => {
    event.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (product: Product, event: React.MouseEvent) => {
    event.stopPropagation();
    addToCart(product);
  };

  // Timer and other functions remain the same
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { days, hours, minutes, seconds } = prevTime;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, flashSaleProducts.length - 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, flashSaleProducts.length - 3)) % Math.max(1, flashSaleProducts.length - 3));
  };

  const formatTime = (time: number) => {
    return time.toString().padStart(2, '0');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-sm ${
          index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));
  };

  const getVisibleProducts = () => {
    return flashSaleProducts.slice(currentIndex, currentIndex + 4);
  };

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-1 h-12 bg-orange-500 rounded-full"></div>
              <div>
                <div className="text-orange-500 font-semibold text-lg">Today's</div>
                <h2 className="text-3xl font-bold text-gray-900">Flash Sales</h2>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-xs text-gray-600 mb-1">Days</div>
                <div className="text-3xl font-bold text-gray-900">{formatTime(timeLeft.days)}</div>
              </div>
              <div className="text-2xl text-orange-500 font-bold">:</div>
              <div className="text-center">
                <div className="text-xs text-gray-600 mb-1">Hours</div>
                <div className="text-3xl font-bold text-gray-900">{formatTime(timeLeft.hours)}</div>
              </div>
              <div className="text-2xl text-orange-500 font-bold">:</div>
              <div className="text-center">
                <div className="text-xs text-gray-600 mb-1">Minutes</div>
                <div className="text-3xl font-bold text-gray-900">{formatTime(timeLeft.minutes)}</div>
              </div>
              <div className="text-2xl text-orange-500 font-bold">:</div>
              <div className="text-center">
                <div className="text-xs text-gray-600 mb-1">Seconds</div>
                <div className="text-3xl font-bold text-gray-900">{formatTime(timeLeft.seconds)}</div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={prevSlide} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button onClick={nextSlide} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {getVisibleProducts().map((product) => (
            <div 
              key={product.id} 
              className="bg-gray-50 rounded-lg p-4 group hover:shadow-lg transition-shadow cursor-pointer"
              onClick={(e) => handleProductClick(product.id, e)}
            >
              <div className="relative mb-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-40 h-40 object-cover mx-auto"
                />
                
                <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                  {product.status}
                </div>

                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    className={`p-2 rounded-full shadow-md transition-colors ${
                      isInWishlist(product.id) ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                    onClick={(e) => handleWishlistClick(product, e)}
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button 
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    className="w-full bg-black text-white py-2 rounded-b-lg hover:bg-gray-800 transition-colors"
                    onClick={(e) => handleAddToCart(product, e)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 truncate">{product.title}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-orange-500 font-bold">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-gray-400 line-through text-sm">${product.originalPrice}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="text-gray-500 text-sm">({product.reviewCount})</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-12 py-4 rounded-lg transition-colors">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default FlashSales;