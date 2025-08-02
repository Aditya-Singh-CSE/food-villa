import React from 'react';

const categories = [
  { id: 1, name: 'All', icon: '🍽️' },
  { id: 2, name: 'Pizza', icon: '🍕' },
  { id: 3, name: 'Burger', icon: '🍔' },
  { id: 4, name: 'Sushi', icon: '🍣' },
  { id: 5, name: 'Chinese', icon: '🥡' },
  { id: 6, name: 'Desserts', icon: '🍰' },
  { id: 7, name: 'Beverages', icon: '🥤' },
];

const MerchantCategories = ({ activeCategory, setActiveCategory }) => {
  return (
    <div className="bg-white py-4 px-4 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex space-x-4 overflow-x-auto pb-2 hide-scrollbar">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`flex flex-col items-center px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeCategory === category.id
                  ? 'bg-pink-100 text-pink-600'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="text-2xl mb-1">{category.icon}</span>
              <span className="text-xs font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default MerchantCategories;
