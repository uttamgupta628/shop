import React, { useState } from 'react';
import { Search, Heart, ShoppingCart, User, Home, Star, Truck, RotateCcw, Plus, Minus } from 'lucide-react';
import shoe from '../assets/shoe.png';
import shoe1 from '../assets/shoe1.png';
import shoe2 from '../assets/shoe2.png';
import shoe3 from '../assets/shoe3.png';    
import shoe4 from '../assets/shoe4.png';
import tsirt from '../assets/thsirt.png';
import headphone from '../assets/headphone.png';
import watch1 from '../assets/watch1.png';
import mouse from '../assets/mouse.png';
import game from '../assets/game.png';

const productData = {
  id: '1',
  title: 'Casual Sneakers',
  price: 1999.00,
  originalPrice: 2500.00,
  rating: 4.5,
  reviewCount: 192,
  description: 'Comfortable everyday sneakers with breathable fabric and durable sole',
  images: [
    shoe,
    shoe1,
    shoe2,
    shoe3,
    shoe4
    
  ],
  colors: ['brown', 'red'],
  sizes: ['7', '8', '9', '10', '11'],
  inStock: true,
  category: 'Gaming'
};

// Related products data
const relatedProducts = [
  {
    id: '2',
    title: 'HAVIT HV-G92 Gamepad',
    price: 120,
    originalPrice: 160,
    image: headphone,
    rating: 4.5,
    reviewCount: '88',
    status: '-40%'
  },
  {
    id: '3',
    title: 'AK-900 Wired Keyboard',
    price: 960,
    originalPrice: 1160,
    image: watch1,
    rating: 4,
    reviewCount: '75',
    status: '-35%'
  },
  {
    id: '4',
    title: 'IPS LCD Gaming Monitor',
    price: 370,
    originalPrice: 400,
    image: mouse,
    rating: 4.5,
    reviewCount: '99',
    status: '-30%'
  },
  {
    id: '5',
    title: 'S-Series Comfort Chair',
    price: 375,
    originalPrice: 400,
    image: tsirt,
    rating: 4.5,
    reviewCount: '10',
    status: '-25%'
  }
];

const ProductDetails: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const [selectedSize, setSelectedSize] = useState('9');
  const [quantity, setQuantity] = useState(2);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      brown: 'bg-amber-600',
      red: 'bg-red-500',
      blue: 'bg-blue-500',
      black: 'bg-black'
    };
    return colorMap[color] || 'bg-gray-400';
  };

  return (
    <div className="min-h-screen bg-white">
     
      

      {/* Breadcrumb */}
      <nav className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm text-gray-500">
            <span className="hover:text-orange-500 cursor-pointer">Account</span>
            <span className="mx-2">/</span>
            <span className="hover:text-orange-500 cursor-pointer">Gaming</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{productData.title}</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Product Images */}
            <div className="flex gap-4">
              {/* Thumbnail Images */}
              <div className="flex flex-col gap-4">
                {productData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-20 h-20 border-2 rounded-lg overflow-hidden ${
                      selectedImageIndex === index ? 'border-orange-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Product Image */}
              <div className="flex-2 bg-gray-100 ">
                <img
                  src={productData.images[selectedImageIndex]}
                  alt={productData.title}
                  className="w-full h-150 object-cover "
                />
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{productData.title}</h1>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">{renderStars(productData.rating)}</div>
                  <span className="text-gray-500">({productData.reviewCount} Reviews)</span>
                  <span className="text-gray-300">|</span>
                  <span className="text-green-500 font-medium">In Stock</span>
                </div>

                {/* Price */}
                <div className="text-2xl font-bold text-gray-900 mb-4">
                  ₹{productData.price.toFixed(2)}
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6">{productData.description}</p>
              </div>

              {/* Colors */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Colours:</h3>
                <div className="flex gap-3">
                  {productData.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${getColorClass(color)} ${
                        selectedColor === color ? 'border-gray-800' : 'border-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Size:</h3>
                <div className="flex gap-2">
                  {productData.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded ${
                        selectedSize === size
                          ? 'bg-orange-500 text-white border-orange-500'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Buy Now */}
              <div className="flex gap-4">
                {/* Quantity */}
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Buy Now Button */}
                <button className="bg-orange-500 text-white px-8 py-2 rounded hover:bg-orange-600 transition-colors">
                  Buy Now
                </button>

                {/* Wishlist */}
                <button className="border border-gray-300 p-2 rounded hover:bg-gray-50">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              {/* Delivery Information */}
              <div className="border border-gray-200 rounded-lg p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Free Delivery</p>
                    <p className="text-sm text-gray-600">Enter your postal code for Delivery Availability</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Return Delivery</p>
                    <p className="text-sm text-gray-600">Free 30 Days Delivery Returns. Details</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Items */}
      <section className="border-t border-gray-200 bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-12 bg-orange-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">Related Item</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg p-4 group hover:shadow-lg transition-shadow">
                <div className="relative mb-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-40 h-40 object-cover mx-auto"
                  />
                  
                  <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                    {product.status}
                  </div>

                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-full bg-black text-white py-2 rounded-b-lg hover:bg-gray-800 transition-colors">
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
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;