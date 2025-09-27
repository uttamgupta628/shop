import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import watch from '../../assets/watch.png';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gray-100 min-h-[600px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Discover the{' '}
                <span className="text-orange-500">Best Deals</span>
                <br />
                on Trendy Products
              </h1>
              
              <p className="text-xl text-gray-600 mt-6 leading-relaxed max-w-lg">
                QuickShop is your one-stop shop for top-quality items at unbeatable 
                prices. Explore our latest arrivals and exclusive offers today!
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-full transition-colors duration-200 text-lg">
                Shop Now
              </button>
              
              <button className="bg-white hover:bg-gray-50 border-2 border-gray-200 p-4 rounded-full transition-colors duration-200 group">
                <ArrowUpRight className="w-6 h-6 text-gray-700 group-hover:text-orange-500 transition-colors" />
              </button>
            </div>
          </div>

          {/* Right Content - Product Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Background Decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-orange-100 rounded-full blur-3xl opacity-30 scale-110"></div>
              
              {/* Main Product Image */}
              <div className="relative z-10">
                <img
                  src={watch}
                  alt="Premium Smartwatch"
                  className="w-96 h-96 lg:w-[500px] lg:h-[500px] object-contain"
                />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-8 -left-4 bg-white rounded-lg shadow-lg p-3 animate-bounce">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">In Stock</span>
                </div>
              </div>
              
              {/* <div className="absolute bottom-8 -right-4 bg-white rounded-lg shadow-lg p-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">$299</div>
                  <div className="text-sm text-gray-500">Best Price</div>
                </div>
              </div> */}
              
              {/* <div className="absolute top-1/2 -right-8 bg-orange-500 text-white rounded-lg shadow-lg p-3">
                <div className="text-center">
                  <div className="text-lg font-bold">50%</div>
                  <div className="text-xs">OFF</div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;