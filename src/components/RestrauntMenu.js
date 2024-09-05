import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { swiggy_menu_api_URL, IMG_CDN_URL, RESTAURANT_TYPE_KEY,MENU_ITEM_TYPE_KEY } from "../constants";
import Shimmer from "./Shimmer";
import "./RestrauntMenu.css";

const RestrauntMenu = () => {
  //How to read a dynamic URL params
  const params = useParams();
  const { id } = params;

  const [restaurant, setRestaurant] = useState(null);
  const[menuItems, setMenuItems] = useState([])

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  async function getRestaurantInfo() {
    const data = await fetch(swiggy_menu_api_URL + id);
    console.log("URL:", swiggy_menu_api_URL + id);
    const json = await data.json();
    console.log(json);
     // Set restaurant data
     const restaurantData = json?.data?.cards?.map(x => x.card)?.find(x => x && x.card['@type'] === RESTAURANT_TYPE_KEY)?.card?.info || null;
setRestaurant(restaurantData);

 // Set menu item data
const menuItemsData = json?.data?.cards.find(x=> x.groupedCard)?.
 groupedCard?.cardGroupMap?.REGULAR?.
 cards?.map(x => x.card?.card)?.
 filter(x=> x['@type'] == MENU_ITEM_TYPE_KEY)?.
 map(x=> x.itemCards).flat().map(x=> x.card?.info) || [];

const uniqueMenuItems = [];
menuItemsData.forEach((item) => {
        if (!uniqueMenuItems.find(x => x.id === item.id)) {
          uniqueMenuItems.push(item);
        }
      })
      setMenuItems(uniqueMenuItems);

    //setRestaurant(json.data?.cards[2]?.card?.card?.info);
}

  return !restaurant ? (
    <>
      <Shimmer />
    </>
  ) : (
    <>
      <div className="menu">
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
        <div>
            <h1>Recommended</h1>
            <p>{menuItems.length} Items</p>
            <ul>
                {menuItems.map((item)=>{
                    return <li key={item.id}>{item.name}</li>
                })}
            </ul>
        </div>
      </div>
    </>
  );
};
export default RestrauntMenu;
