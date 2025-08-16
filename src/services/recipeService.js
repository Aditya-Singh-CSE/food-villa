import { apiPostRequest } from './api';
import { httpPost } from './util';

// Get all recipes for merchant
export const getRecipes = async (merchantId) => {
  // const payload = {
  //   merchantId,
  //   action: 'get_recipes'
  // };
  
  try {
    const response = await httpPost("", {
            command: "get_recipes"
            // commandPayload: {
            //   email: form.email,
            //   clientId: "merchant-app",
            //   role: "merchant",
            // },
          });
    // const response = await apiPostRequest('/recipes/merchant', payload);
    return response.data || [];
  } catch (error) {
    console.error('Failed to fetch recipes:', error);
    throw error;
  }
};

// Add new recipe
export const addRecipe = async (recipeData) => {
  const payload = {
   
    command: 'add_recipe',
    data:{
       ...recipeData
    }
  };
  
  try {
    const response = await httpPost('', payload);
    return response.data;
  } catch (error) {
    console.error('Failed to add recipe:', error);
    throw error;
  }
};

// Update existing recipe
export const updateRecipe = async (recipeId, recipeData) => {
  const payload = {
    command: 'update_recipe',
    data:{
        id:recipeId,
        ...recipeData
    }
  };
  
  try {
    const response = await httpPost('', payload);
    return response.data;
  } catch (error) {
    console.error('Failed to update recipe:', error);
    throw error;
  }
};

// Delete recipe
export const deleteRecipe = async (recipeId) => {
  const payload = {
    command: 'delete_recipe',
    data:{
      id: recipeId
    }
  };
  
  try {
    const response = await httpPost('', payload);
    return response.success;
  } catch (error) {
    console.error('Failed to delete recipe:', error);
    throw error;
  }
};

// Toggle recipe availability
export const toggleRecipeAvailability = async (recipeId, isAvailable) => {
  const payload = {
    recipeId,
    isAvailable,
    action: 'toggle_availability'
  };
  
  try {
    const response = await apiPostRequest('/recipes/availability', payload);
    return response.data;
  } catch (error) {
    console.error('Failed to toggle recipe availability:', error);
    throw error;
  }
};
