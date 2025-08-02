import React from 'react';
import { Link } from 'react-router-dom';
import { IMG_CDN_URL } from '../../constants';

const MerchantCard = ({ merchant }) => {
  const { id, name, cuisines, areaName, avgRating, cloudinaryImageId } = merchant;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <Link to={`/app/restaurant/${id}`} className="block">
        <div className="relative pb-2/3 h-48">
          <img
            className="w-full h-full object-cover"
            src={`${IMG_CDN_URL}${cloudinaryImageId}`}
            alt={name}
          />
          <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded text-xs font-semibold flex items-center">
            <span>⭐ {avgRating}</span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1 truncate">{name}</h3>
          <p className="text-gray-600 text-sm mb-2 truncate">{cuisines?.join(', ')}</p>
          <p className="text-gray-500 text-xs">{areaName}</p>
        </div>
      </Link>
    </div>
  );
};

export default MerchantCard;
