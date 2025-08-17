import { useParams, Link } from "react-router-dom";
import Shimmer from "./Shimmer";
import { IMG_CDN_URL } from "../constants";
import useRestrauntMenuData from "../hooks/useRestrauntMenuData";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";

const RestaurantMenu = () => {
  console.log("This is original one RestaurantMenu.js is rendered")
  const { resId } = useParams(); 
  console.log("Pass this id to useRestrauntMenuData:", resId)
  const [restaurant, menuItems] = useRestrauntMenuData(resId);
  const dispatch = useDispatch();

  const addFoodItem = (item) => {
    console.log("ADD this food item to cart that is in redux:",item)
    dispatch(addItem(item));
  };

  if (!restaurant) {
    return (
      <>
        <Shimmer />
      </>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-orange-500">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/" className="hover:text-orange-500">Restaurants</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700 font-medium">{restaurant.name}</span>
      </div>

      {/* Restaurant Header */}
      <div className="flex flex-col md:flex-row gap-6 pb-6 border-b border-gray-200">
        <div className="md:w-2/3">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{restaurant.name}</h1>
          <p className="text-gray-600 text-sm md:text-base mb-3">{restaurant.cuisines?.join(", ")}</p>
          <p className="text-gray-500 text-sm">{restaurant.areaName} • {restaurant.sla?.slaString}</p>
        </div>
        <div className="md:w-1/3 flex flex-col items-start md:items-end justify-center">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 w-full max-w-xs">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center">
                <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center">
                  <span className="text-yellow-300 mr-1">★</span>
                  {restaurant.avgRatingString}
                </span>
                <span className="ml-2 text-sm font-medium">{restaurant.totalRatingsString} ratings</span>
              </div>
            </div>
            <div className="pt-3">
              <p className="text-green-600 font-medium text-sm">{restaurant.costForTwoMessage}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Offers */}
      {restaurant.aggregatedDiscountInfo?.header && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                {restaurant.aggregatedDiscountInfo.header}
              </h3>
              <div className="mt-1 text-sm text-yellow-700">
                <p>{restaurant.aggregatedDiscountInfo.descriptionList?.[0]?.meta}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Menu Categories */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100">Recommended ({menuItems.length})</h2>
        
        <div className="space-y-6">
          {menuItems.length > 0 ? (
            menuItems.map((item) => {
              const dish = item;
              if (!dish) return null;
              
              return (
                <div key={dish.id} className="flex justify-between p-4 border-b border-gray-100 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="pr-4 flex-1">
                    <div className="flex items-start">
                      {dish.isVeg ? (
                        <span className="text-green-600 border border-green-600 p-0.5 rounded mr-2 mt-1">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1" y="1" width="10" height="10" rx="1" fill="#0F8A65" stroke="#0F8A65" strokeWidth="2"/>
                            <path d="M8 4.5L5.5 7L4 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      ) : (
                        <span className="text-red-600 border border-red-600 p-0.5 rounded mr-2 mt-1">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1" y="1" width="10" height="10" rx="1" fill="#E43B4C" stroke="#E43B4C" strokeWidth="2"/>
                            <path d="M3 3L9 9M3 9L9 3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        </span>
                      )}
                      <div>
                        <h3 className="font-medium text-gray-900">{dish.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          ₹{dish.price ? dish.price  : dish.defaultPrice}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          {dish.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  {dish.image ? (
                    <div className="relative w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover"
                      />
                      <button 
                        onClick={() => addFoodItem(dish)}
                        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-green-600 text-xs font-bold py-1 px-3 rounded shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
                      >
                        ADD
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => addFoodItem(dish)}
                      className="self-start bg-white text-green-600 text-xs font-bold py-1 px-3 rounded border border-gray-300 hover:shadow-md transition-shadow"
                    >
                      ADD
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 text-gray-500">
              No menu items available at the moment.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
