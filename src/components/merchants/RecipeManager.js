import React, { useState } from "react";
import { useMerchant } from "../../context/MerchantContext";
import "./RecipeManager.css";

const initialRecipe = {
  id: "",
  name: "",
  description: "",
  price: "",
  imageUrl: "",
  ingredients: "",
};

const RecipeManager = () => {
  const { recipes, addRecipe, updateRecipe, deleteRecipe } = useMerchant();
  const [form, setForm] = useState(initialRecipe);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateRecipe(editingId, { ...form, id: editingId });
    } else {
      addRecipe({ ...form, id: Date.now().toString() });
    }
    setForm(initialRecipe);
    setEditingId(null);
  };

  const handleEdit = (recipe) => {
    setForm(recipe);
    setEditingId(recipe.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      deleteRecipe(id);
    }
  };

  return (
    <div className="recipe-manager">
      <h2>Recipes</h2>
      <form className="recipe-form" onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Recipe Name" required />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" required />
        <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Image URL" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
        <textarea name="ingredients" value={form.ingredients} onChange={handleChange} placeholder="Ingredients (comma separated)" />
        <button type="submit">{editingId ? "Update" : "Add"} Recipe</button>
        {editingId && <button type="button" onClick={() => { setForm(initialRecipe); setEditingId(null); }}>Cancel</button>}
      </form>
      <div className="recipe-list">
        {recipes.length === 0 && <p>No recipes yet.</p>}
        {recipes.map((recipe) => (
          <div className="recipe-card" key={recipe.id}>
            {recipe.image && <img src={recipe.image} alt={recipe.name} className="recipe-img" />}
            <div className="recipe-info">
              <h3>{recipe.name}</h3>
              <p>{recipe.description}</p>
              <div className="recipe-meta">
                <span>₹{recipe.price}</span>
                <span>{recipe.ingredients}</span>
              </div>
              <div className="recipe-actions">
                <button onClick={() => handleEdit(recipe)}>Edit</button>
                <button onClick={() => handleDelete(recipe.id)} className="danger">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeManager;
