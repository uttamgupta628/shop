import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Smartphone, Camera, Headphones, Shirt, Sofa } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const BrowseByCategory: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const categories: Category[] = [
    { id: '1', name: 'Electronics', icon: <Smartphone className="w-8 h-8" /> },
    {
      id: '2',
      name: 'Footwear',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M2 18h20l-2-6H4l-2 6zM4 10h16l1.5 4.5H2.5L4 10z" />
        </svg>
      )
    },
    { id: '3', name: 'Clothing', icon: <Shirt className="w-8 h-8" /> },
    { id: '4', name: 'Camera', icon: <Camera className="w-8 h-8" /> },
    { id: '5', name: 'HeadPhones', icon: <Headphones className="w-8 h-8" /> },
    { id: '6', name: 'Home Decor', icon: <Sofa className="w-8 h-8" /> }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, categories.length - 5));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, categories.length - 5)) % Math.max(1, categories.length - 5));
  };

  const getVisibleCategories = () => {
    return categories.slice(currentIndex, currentIndex + 6);
  };

  const handleCategoryClick = (categoryId: string) => {
    console.log('Category clicked:', categoryId);
    // Handle category navigation here
  };

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-1 h-12 bg-orange-500 rounded-full"></div>
            <div>
              <div className="text-orange-500 font-semibold text-lg">Categories</div>
              <h2 className="text-3xl font-bold text-gray-900">Browse By Category</h2>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {getVisibleCategories().map((category) => {
            const isActive = hoveredId === category.id;

            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                onMouseEnter={() => setHoveredId(category.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`
                  relative p-8 rounded-lg border transition-all duration-200 hover:shadow-lg
                  ${isActive
                    ? 'bg-red-500 text-white border-red-500'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-orange-500'}
                `}
              >
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className={isActive ? 'text-white' : 'text-gray-700'}>
                    {category.icon}
                  </div>
                </div>

                {/* Category Name */}
                <div className={`text-center font-medium ${isActive ? 'text-white' : 'text-gray-900'}`}>
                  {category.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Border Line */}
        <div className="mt-16 border-b border-gray-200"></div>
      </div>
    </section>
  );
};

export default BrowseByCategory;
