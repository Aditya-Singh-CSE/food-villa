import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  swiggy_menu_api_URL,
  IMG_CDN_URL,
  RESTAURANT_TYPE_KEY,
  MENU_ITEM_TYPE_KEY,
} from "../constants";
import Shimmer from "./Shimmer";
import useRestrauntMenuData from "../hooks/useRestrauntMenuData";
import { addItem } from "../utils/cartSlice";
import { useDispatch } from "react-redux";
import "./RestrauntMenu.css";

const RestrauntMenu = () => {
  //How to read a dynamic URL params
  const params = useParams();
  const { id } = params;

  const [restaurant, menuItems] = useRestrauntMenuData(id);

  const dispatch = useDispatch();



  const addFoodItem = (item) =>{
    dispatch(addItem(item));
  };


  return !restaurant ? (
    <>
      <Shimmer />
    </>
  ) : (
    <>
      <div className="flex">
        <div>
          <h1>Restaurat id: {id}</h1>
          <h2>{restaurant?.name}</h2>
          <img
            src={IMG_CDN_URL + restaurant.cloudinaryImageId}
            alt="FoodImage"
          />
          <h3>{restaurant.areaName}</h3>
          <h3>{restaurant.city}</h3>
          <h3>{restaurant.avgRating} stars</h3>
          <h3>{restaurant.costForTwoMessage}</h3>
        </div>
       
        <div className="p-5">
          <h1>Menu</h1>
          <p>{menuItems.length} Items</p>
          <ul>
            {menuItems.map((item) => {
              return <li key={item.id}>{item.name} - <button className="pa-1 bg-green-50" onClick={()=>{addFoodItem(item)}}>Add</button></li>;
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
export default RestrauntMenu;
