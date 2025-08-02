import React from 'react';
import MerchantCard from './MerchantCard';
import Shimmer from '../Shimmer';

const MerchantList = ({ merchants, isLoading }) => {
  if (isLoading) {
    return <Shimmer count={8} />;
  }

  if (!merchants || merchants.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-700">No merchants found</h3>
        <p className="text-gray-500 mt-2">Try adjusting your search or filter</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {merchants.map((merchant) => (
          <MerchantCard key={merchant.id} merchant={merchant} />
        ))}
      </div>
    </div>
  );
};

export default MerchantList;
