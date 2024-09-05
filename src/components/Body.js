import { swiggy_api_URL,restaurantList } from "../constants";
import RestrauntCard from "./RestrauntCard";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Shimmer from "./Shimmer";


function filterData(searchText, items, keyPath) {
  const searchLowerCase = searchText.toLowerCase();
  const filteredData = items.filter(item => {
    const valueAtPath = keyPath.reduce((accumulator, currentValue) => accumulator?.[currentValue], item);
    return valueAtPath?.toLowerCase().includes(searchLowerCase);
  });
  return filteredData;
}


const Body = () => {
  const [restaurants, setRestaurants] = useState([]);

  // searchText is a local state variable
  const [searchText, setSearchText] = useState(); // returns [variable name, set function to update the variable]

  //const[searchClicked, setSearchClicked] = useState("false")


  useEffect(()=>{
    getrestaurants();
  },[])

  // getRestaurant to fetch Swiggy API data
  const getrestaurants = async () =>{
    const data = await fetch(swiggy_api_URL);
    const json = await data.json();
    // we get the Swiggy API data in json format
    console.log("json: " + JSON.stringify(json));
    //Optional Chaining
     const restaurantAll = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    console.log("restaurants: " + restaurantAll)
    // console.log(JSON.stringify(restaurantAll));

   setRestaurants(restaurantAll)
   
      // console.log(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants[0].info.name)
    
  };

  //Conditional Rendering
  if (restaurants.length === 0){
    return (
      <div className="loading">
        <Shimmer />
      </div>
    );
  }

 



  return (
    <>
   
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => {
            //e.target.value => whatever you write in input
            setSearchText(e.target.value);
          }}
        />
        <button
          className="search-btn"
          onClick={() => {
            const filteredRestaurants = filterData(searchText, restaurants, ['info', 'name']);
            setRestaurants(filteredRestaurants);
          }}
        >
          Search
        </button>
      </div>
      <div className="restaurant-list">
        {restaurants.map((restaurant) => {
          return (
            <Link to={"/restaurant/" +restaurant?.info?.id} key={restaurant?.info?.id}>
            <RestrauntCard {...restaurant.info} />
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Body;
