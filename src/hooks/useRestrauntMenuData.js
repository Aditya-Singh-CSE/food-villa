import {useState, useEffect} from 'react';
import { swiggy_menu_api_URL,RESTAURANT_TYPE_KEY, MENU_ITEM_TYPE_KEY } from '../constants';

const useRestrauntMenuData = (id)=>{
    const [restaurant, setRestaurant] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
  
    useEffect(() => {
      getRestaurantInfo();
    }, []);
  
    async function getRestaurantInfo() {
      const data = await fetch(swiggy_menu_api_URL + id);
      console.log("URL:", swiggy_menu_api_URL + id);
      const json = await data.json();
      console.log(json);
      // Set restaurant data
      const restaurantData =
        json?.data?.cards
          ?.map((x) => x.card)
          ?.find((x) => x && x.card["@type"] === RESTAURANT_TYPE_KEY)?.card
          ?.info || null;
      setRestaurant(restaurantData);
  
      // Set menu item data
      const menuItemsData =
        json?.data?.cards
          .find((x) => x.groupedCard)
          ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map((x) => x.card?.card)
          ?.filter((x) => x["@type"] === MENU_ITEM_TYPE_KEY)
          ?.map((x) => x.itemCards)
          .flat()
          .map((x) => x.card?.info) || [];
  
         const uniqueMenuItems = [];
         menuItemsData.forEach((item) => {
         if (!uniqueMenuItems.find((x) => x.id === item.id)) {
          uniqueMenuItems.push(item);
        }
      });
      setMenuItems(uniqueMenuItems);
    }

    return [restaurant, menuItems];

};
export default useRestrauntMenuData;