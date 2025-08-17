import { swiggy_api_URL, restaurantList } from "../constants";
import RestrauntCard from "./RestrauntCard";
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import Shimmer from "./Shimmer";
import { filterData } from "../utils/helper";
import useOnline from "../hooks/useOnline";
import UserContext from "../context/UserContext";
import { httpPost } from "../services/util";


// function filterData(searchText, items, keyPath) {
//   const searchLowerCase = searchText.toLowerCase();
//   const filteredData = items.filter(item => {
//     const valueAtPath = keyPath.reduce((accumulator, currentValue) => accumulator?.[currentValue], item);
//     return valueAtPath?.toLowerCase().includes(searchLowerCase);
//   });
//   return filteredData;
// }


const Body = ({ key }) => {
  const [allRestaurants, setAllRestaurants] = useState(null); // All restaurants from API
  const [filteredRestaurants, setFilteredRestaurants] = useState(null); // Filtered restaurants based on search
  const [searchText, setSearchText] = useState('');
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();

  // Fetch restaurants on initial render
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await httpPost("", {
                command: "get_restaurants"
              });
        // 
        // console.log("JSON:",data)
        // const json = await data.json();
        const restaurantAll = data.data.restaurants || [];
        console.log("JSON:",restaurantAll)
        console.log("length of recipes:",restaurantAll.length)
        setAllRestaurants(restaurantAll);
        setFilteredRestaurants(restaurantAll);
        setSearchText('');
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setAllRestaurants([]);
        setFilteredRestaurants([]);
      }
    };

    fetchRestaurants();
    
    // Reset search when path changes to '/'
    if (location.pathname === '/') {
      setSearchText('');
      if (allRestaurants) {
        setFilteredRestaurants([...allRestaurants]);
      } else {
        fetchRestaurants();
      }
    }
  }, [location.key]); // Using location.key to force re-render on navigation

  // Handle search
  const handleSearch = () => {
    if (!searchText.trim()) {
      // If search is empty, show all restaurants
      setFilteredRestaurants(allRestaurants || []);
    } else {
      // Filter restaurants based on search text
      const filtered = filterData(searchText, allRestaurants || [], ['info', 'name']);
      setFilteredRestaurants(filtered);
    }
  };
  
  // Handle home navigation
  const handleHomeClick = (e) => {
    e.preventDefault();
    window.location.href = '/';
  };


  const isOnline = useOnline();
  if(!isOnline){
    return <h1>🔴 Offline, please check your internet connection!!</h1>;
  }


  // Show loading state only on initial load
  if (filteredRestaurants === null) {
    return (
      <div className="loading">
        <Shimmer />
      </div>
    );
  }

 



  return (
    <div className="w-full px-2 sm:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Search Bar */}
        <div className="my-6 px-2 sm:px-0">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="relative w-full sm:max-w-md">
              <input
                type="text"
                className="w-full p-3 pl-10 pr-10 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent shadow-sm transition-all duration-200"
                placeholder="Search for restaurants and food"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {searchText && (
                <button 
                  onClick={() => setSearchText('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  aria-label="Clear search"
                >
                  <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <button 
              data-testid="search-btn"
              className="w-full sm:w-auto px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        {/* Restaurant Grid */}
        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-500 text-lg font-medium mb-2">No restaurants found</div>
            <p className="text-gray-400">We couldn't find any restaurants matching your search.</p>
            <button 
              onClick={() => {
                setSearchText('');
                setFilteredRestaurants(allRestaurants);
              }} 
              className="mt-4 px-4 py-2 bg-pink-100 text-pink-600 rounded-md hover:bg-pink-200 transition-colors"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6" data-testid="res-list">
            {filteredRestaurants.map((restaurant) => (
              <div key={restaurant?.id} className="h-full">
                <RestrauntCard 
                  id={restaurant?.id}
                  {...restaurant} 
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Body;
