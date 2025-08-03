import React, { useState } from "react";
import './MerchantDashboard.css';
import { MerchantProvider } from "../../context/MerchantContext";
import RecipeManager from "./RecipeManager";
import OrderManager from "./OrderManager";
import MerchantProfile from "./MerchantProfile";

const Sidebar = ({ currentTab, setCurrentTab }) => (
  <aside className="merchant-sidebar">
    <div className="merchant-logo">🍽️ FoodVilla</div>
    <nav>
      <ul>
        <li className={currentTab === "recipes" ? "active" : ""} onClick={() => setCurrentTab("recipes")}>Recipes</li>
        <li className={currentTab === "orders" ? "active" : ""} onClick={() => setCurrentTab("orders")}>Orders</li>
        <li className={currentTab === "profile" ? "active" : ""} onClick={() => setCurrentTab("profile")}>Profile</li>
      </ul>
    </nav>
  </aside>
);

const MerchantDashboard = () => {
  const [currentTab, setCurrentTab] = useState("recipes");

  return (
    <MerchantProvider>
      <div className="merchant-dashboard-container">
        <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
        <main className="merchant-main-content">
          {currentTab === "recipes" && <RecipeManager />}
          {currentTab === "orders" && <OrderManager /> }
          {currentTab === "profile" && <MerchantProfile /> }
        </main>
      </div>
    </MerchantProvider>
  );
};

export default MerchantDashboard;
