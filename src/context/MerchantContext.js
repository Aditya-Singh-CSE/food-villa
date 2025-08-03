import React, { createContext, useContext, useState } from "react";

const MerchantContext = createContext();

export const useMerchant = () => useContext(MerchantContext);

export const MerchantProvider = ({ children }) => {
  // Recipes and orders would ideally come from API/backend
  const [recipes, setRecipes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [merchantProfile, setMerchantProfile] = useState({ name: "", email: "" });

  // CRUD for recipes
  const addRecipe = (recipe) => setRecipes([...recipes, recipe]);
  const updateRecipe = (id, updatedRecipe) => setRecipes(recipes.map(r => r.id === id ? updatedRecipe : r));
  const deleteRecipe = (id) => setRecipes(recipes.filter(r => r.id !== id));

  // Order actions
  const acceptOrder = (orderId) => setOrders(orders.map(o => o.id === orderId ? { ...o, status: "accepted" } : o));
  const rejectOrder = (orderId) => setOrders(orders.map(o => o.id === orderId ? { ...o, status: "rejected" } : o));

  return (
    <MerchantContext.Provider
      value={{
        recipes,
        setRecipes,
        addRecipe,
        updateRecipe,
        deleteRecipe,
        orders,
        setOrders,
        acceptOrder,
        rejectOrder,
        merchantProfile,
        setMerchantProfile,
      }}
    >
      {children}
    </MerchantContext.Provider>
  );
};
