import React from 'react';
import { FiSearch } from 'react-icons/fi';

const MerchantHero = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="bg-gradient-to-r from-pink-100 to-orange-100 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Discover the best food & drinks
        </h1>
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search for restaurants and food"
            className="w-full px-6 py-4 pr-12 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-2 top-2 bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700 transition-colors">
            <FiSearch className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MerchantHero;
