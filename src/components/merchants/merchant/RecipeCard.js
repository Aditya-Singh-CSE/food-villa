import React, { useState } from 'react';
import { Edit2, Trash2, Star, Clock, IndianRupee, Eye, EyeOff } from 'lucide-react';

const RecipeCard = ({ recipe, onEdit, onDelete, onToggleAvailability }) => {
  const [showIngredients, setShowIngredients] = useState(false);
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 ${!recipe.isAvailable ? 'opacity-60' : ''}`}>
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={recipe.imageUrl}
          alt={recipe.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <button
            onClick={() => onToggleAvailability(recipe.id)}
            className={`p-2 rounded-full ${recipe.isAvailable ? 'bg-green-500' : 'bg-gray-500'} text-white hover:opacity-80 transition-opacity`}
            title={recipe.isAvailable ? 'Available' : 'Unavailable'}
          >
            {recipe.isAvailable ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
        </div>
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
            {recipe.category}
          </span>
        </div>
      </div>
      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800 mb-1">{recipe.name}</h3>
            <p className="text-gray-600 text-sm line-clamp-2">{recipe.description}</p>
          </div>
        </div>
        {/* Stats */}
        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1 fill-current" />
            <span>{recipe.rating}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{recipe.prepTime} min</span>
          </div>
          <div className="flex items-center">
            <IndianRupee className="w-4 h-4 mr-1" />
            <span className="font-semibold text-gray-800">{recipe.price}</span>
          </div>
        </div>
        {/* Ingredients Toggle */}
        <button
          onClick={() => setShowIngredients(!showIngredients)}
          className="text-pink-500 hover:text-pink-600 text-sm font-medium mb-3 transition-colors"
        >
          {showIngredients ? 'Hide' : 'Show'} Ingredients
        </button>
        {/* Ingredients */}
        {showIngredients && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex flex-wrap gap-2">
              {recipe.ingredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-white rounded-full text-xs text-gray-600 border border-gray-200"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        )}
        {/* Actions */}
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(recipe)}
            className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2 px-4 rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-200 flex items-center justify-center"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Edit
          </button>
          <button
            onClick={() => onDelete(recipe.id)}
            className="flex-1 bg-gray-100 text-gray-600 py-2 px-4 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-200 flex items-center justify-center"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;