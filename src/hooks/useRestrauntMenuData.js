import {useState, useEffect} from 'react';
import { swiggy_menu_api_URL,RESTAURANT_TYPE_KEY, MENU_ITEM_TYPE_KEY } from '../constants';
import { httpPost } from '../services/util';

const useRestrauntMenuData = (id)=>{
    const [restaurant, setRestaurant] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
  
    useEffect(() => {
      getRestaurantInfo();
    }, []);
  
    async function getRestaurantInfo() {
      // const data = await fetch(swiggy_menu_api_URL + id);
      // console.log("URL:", swiggy_menu_api_URL + id);
      // const json = await data.json();

        const data = await httpPost("", {
                       command: "get_restaurant_by_id",
                       data:{
                        restaurantId: id
                       }
                     });



      // console.log(json);
      // Set restaurant data
      const restaurantData =
        data?.data?.restaurant || null;
        console.log("Specific Res data:",restaurantData)
      setRestaurant(restaurantData);
  
      // Set menu item data
      const menuItemsData =
        restaurantData?.recipes || [];
  
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