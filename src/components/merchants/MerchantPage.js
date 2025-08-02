import React, { useState, useEffect } from 'react';

import MerchantHero from './MerchantHero';
import MerchantCategories from './MerchantCategories';
import MerchantList from './MerchantList';

const MerchantPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [merchants, setMerchants] = useState([]);
  const [filteredMerchants, setFilteredMerchants] = useState([]);

  useEffect(() => {
    // In a real app, fetch merchant data here
    setIsLoading(false);
    setMerchants([]);
    setFilteredMerchants([]);
  }, []);

  // Filter merchants based on search query and active category
  useEffect(() => {
    let results = [...merchants];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (merchant) =>
          merchant.info.name.toLowerCase().includes(query) ||
          (merchant.info.cuisines &&
            merchant.info.cuisines.some((cuisine) =>
              cuisine.toLowerCase().includes(query)
            ))
      );
    }

    // Note: In a real app, you would filter by category here
    // This is a simplified example
    setFilteredMerchants(results);
  }, [searchQuery, activeCategory, merchants]);

  return (
    <div className="min-h-screen bg-gray-50">
      <MerchantHero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <MerchantCategories
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <MerchantList
        merchants={filteredMerchants.map((m) => ({
          id: m.info.id,
          name: m.info.name,
          cuisines: m.info.cuisines,
          areaName: m.info.areaName,
          avgRating: m.info.avgRating,
          cloudinaryImageId: m.info.cloudinaryImageId,
        }))}
        isLoading={isLoading}
      />
    </div>
  );
};

export default MerchantPage;
