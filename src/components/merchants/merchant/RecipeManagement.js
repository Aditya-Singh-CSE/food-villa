import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import RecipeCard from './RecipeCard';
import RecipeForm from './RecipeForm';

export default function RecipeManagement() {
  const [recipes, setRecipes] = useState([
    {
      id: '1',
      name: 'Chicken Biryani',
      description: 'Aromatic basmati rice cooked with tender chicken and fragrant spices',
      price: 24.50,
      image: 'https://images.pexels.com/photos/8992991/pexels-photo-8992991.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'Main Course',
      prepTime: 45,
      rating: 4.8,
      isAvailable: true,
      ingredients: ['Basmati Rice', 'Chicken', 'Onions', 'Yogurt', 'Spices', 'Saffron']
    },
    {
      id: '2',
      name: 'Margherita Pizza',
      description: 'Classic pizza with fresh tomatoes, mozzarella, and basil',
      price: 18.00,
      image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'Main Course',
      prepTime: 20,
      rating: 4.6,
      isAvailable: true,
      ingredients: ['Pizza Dough', 'Tomato Sauce', 'Mozzarella', 'Basil', 'Olive Oil']
    },
    {
      id: '3',
      name: 'Chocolate Lava Cake',
      description: 'Decadent chocolate cake with a molten chocolate center',
      price: 12.50,
      image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'Dessert',
      prepTime: 25,
      rating: 4.9,
      isAvailable: false,
      ingredients: ['Dark Chocolate', 'Butter', 'Eggs', 'Sugar', 'Flour', 'Vanilla']
    }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ['All', 'Appetizer', 'Main Course', 'Dessert', 'Beverage', 'Side Dish', 'Soup'];

  const handleAddRecipe = () => {
    setEditingRecipe(undefined);
    setIsFormOpen(true);
  };

  const handleEditRecipe = (recipe) => {
    setEditingRecipe(recipe);
    setIsFormOpen(true);
  };

  const handleDeleteRecipe = (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      setRecipes(recipes.filter(recipe => recipe.id !== id));
    }
  };

  const handleToggleAvailability = (id) => {
    setRecipes(recipes.map(recipe => 
      recipe.id === id ? { ...recipe, isAvailable: !recipe.isAvailable } : recipe
    ));
  };

  const handleSaveRecipe = (recipeData) => {
    if (editingRecipe) {
      // Update existing recipe
      setRecipes(recipes.map(recipe => 
        recipe.id === editingRecipe.id 
          ? { ...recipe, ...recipeData }
          : recipe
      ));
    } else {
      // Add new recipe
      const newRecipe = {
        ...recipeData,
        id: Date.now().toString(),
        rating: 0
      };
      setRecipes([...recipes, newRecipe]);
    }
  };

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || selectedCategory === 'All' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Recipe Management</h2>
          <p className="text-gray-600">Manage your restaurant's menu items</p>
        </div>
        <button
          onClick={handleAddRecipe}
          className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all duration-200 flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Recipe
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent appearance-none bg-white min-w-[150px]"
            >
              {categories.map(category => (
                <option key={category} value={category === 'All' ? '' : category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">{recipes.length}</p>
            <p className="text-gray-600 text-sm">Total Recipes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{recipes.filter(r => r.isAvailable).length}</p>
            <p className="text-gray-600 text-sm">Available</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-600">{recipes.filter(r => !r.isAvailable).length}</p>
            <p className="text-gray-600 text-sm">Unavailable</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-pink-600">{filteredRecipes.length}</p>
            <p className="text-gray-600 text-sm">Filtered</p>
          </div>
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onEdit={handleEditRecipe}
            onDelete={handleDeleteRecipe}
            onToggleAvailability={handleToggleAvailability}
          />
        ))}
      </div>

      {filteredRecipes.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No recipes found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Recipe Form Modal */}
      <RecipeForm
        recipe={editingRecipe}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveRecipe}
      />
    </div>
  );
}