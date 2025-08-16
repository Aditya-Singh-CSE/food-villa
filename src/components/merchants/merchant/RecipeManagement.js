import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import RecipeCard from './RecipeCard';
import RecipeForm from './RecipeForm';
import { useAuth } from '../../../context/AuthContext';
import {
  getRecipes,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  toggleRecipeAvailability
} from '../../../services/recipeService';

export default function RecipeManagement() {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ['All', 'Appetizer', 'Main Course', 'Dessert', 'Beverage', 'Side Dish', 'Soup'];

  // Fetch recipes on component mount
  useEffect(() => {
    fetchRecipes();
  }, [user]);

  const fetchRecipes = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const merchantId = user.id || user.email; // Use user ID or email as merchant identifier
      const fetchedRecipes = await getRecipes(merchantId);
      console.log("fetchedRecipes:",fetchedRecipes)
      setRecipes(fetchedRecipes.recipes);
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setError('Failed to load recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddRecipe = () => {
    setEditingRecipe(undefined);
    setIsFormOpen(true);
  };

  const handleEditRecipe = (recipe) => {
    setEditingRecipe(recipe);
    setIsFormOpen(true);
  };

  const handleDeleteRecipe = async (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await deleteRecipe(id);
        setRecipes(recipes.filter(recipe => recipe.id !== id));
      } catch (err) {
        console.error('Error deleting recipe:', err);
        setError('Failed to delete recipe. Please try again.');
      }
    }
  };

  const handleToggleAvailability = async (id) => {
    const recipe = recipes.find(r => r.id === id);
    if (!recipe) return;

    try {
      const updatedRecipe = await toggleRecipeAvailability(id, !recipe.isAvailable);
      setRecipes(recipes.map(r => 
        r.id === id ? { ...r, isAvailable: !r.isAvailable } : r
      ));
    } catch (err) {
      console.error('Error toggling recipe availability:', err);
      setError('Failed to update recipe availability. Please try again.');
    }
  };

  const handleSaveRecipe = async (recipeData) => {
    try {
      if (editingRecipe) {
        // Update existing recipe
        const updatedRecipe = await updateRecipe(editingRecipe.id, recipeData);
        setRecipes(recipes.map(recipe => 
          recipe.id === editingRecipe.id 
            ? { ...recipe, ...recipeData }
            : recipe
        ));
      } else {
        // Add new recipe
        const merchantId = user.id || user.email;
        const newRecipeData = {
          ...recipeData,
          merchantId,
          rating: 0
        };
        const newRecipe = await addRecipe(newRecipeData);
        console.log("after adding newRecipe the response is :",newRecipe)
        setRecipes([...recipes, newRecipe.recipe]);
      }
      setIsFormOpen(false);
      setEditingRecipe(undefined);
    } catch (err) {
      console.error('Error saving recipe:', err);
      setError('Failed to save recipe. Please try again.');
    }
  };

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || selectedCategory === 'All' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <div className="text-red-600">
              <p className="font-medium">Error</p>
              <p className="text-sm">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-600 hover:text-red-800"
            >
              ×
            </button>
          </div>
        </div>
      )}

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

      {filteredRecipes.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {recipes.length === 0 ? 'No recipes yet' : 'No recipes found'}
          </h3>
          <p className="text-gray-600">
            {recipes.length === 0 
              ? 'Start by adding your first recipe to the menu' 
              : 'Try adjusting your search or filter criteria'
            }
          </p>
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