import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  PersonStanding,
  Sparkles,
  Shirt,
  Baby
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const BrowseByCategory: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const categories: Category[] = [
    { id: "1", name: "Men", icon: <PersonStanding className="w-8 h-8" /> },
    { id: "2", name: "Women", icon: <Sparkles className="w-8 h-8" /> },
    { id: "3", name: "Boys", icon: <Shirt className="w-8 h-8" /> },
    { id: "4", name: "Girls", icon: <Baby className="w-8 h-8" /> }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      (prev + 1) % Math.max(1, categories.length - 5)
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      (prev - 1 + Math.max(1, categories.length - 5)) %
      Math.max(1, categories.length - 5)
    );
  };

  const getVisibleCategories = () => {
    return categories.slice(currentIndex, currentIndex + 6);
  };

  const handleCategoryClick = (categoryId: string) => {
    console.log("Category clicked:", categoryId);
  };

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-1 h-12 bg-orange-500 rounded-full"></div>

            <div>
              <div className="text-orange-500 font-semibold text-lg">
                Categories
              </div>

              <h2 className="text-3xl font-bold text-gray-900">
                Browse By Category
              </h2>
            </div>
          </div>

          {/* Arrows */}
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            <button
              onClick={nextSlide}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {getVisibleCategories().map((category) => {
            const isActive = hoveredId === category.id;

            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                onMouseEnter={() => setHoveredId(category.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`p-8 rounded-lg border transition-all duration-200 hover:shadow-lg
                ${
                  isActive
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white border-gray-200 text-gray-700 hover:border-orange-500"
                }`}
              >
                <div className="flex justify-center mb-4">
                  {category.icon}
                </div>

                <div
                  className={`text-center font-medium ${
                    isActive ? "text-white" : "text-gray-900"
                  }`}
                >
                  {category.name}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-16 border-b border-gray-200"></div>
      </div>
    </section>
  );
};

export default BrowseByCategory;