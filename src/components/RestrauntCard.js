import { IMG_CDN_URL } from "../constants";
import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

const RestrauntCard = ({
  id,
  name, 
  cuisines, 
  cloudinaryImageId, 
  lastMileTravelString, 
  areaName
}) => {
  const { user } = useContext(UserContext);

  return (
    <Link 
      to={"/restaurant/" + id}
      className="block w-full h-full"
    >
      <div className="w-full h-full p-2 shadow-lg bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
        <div className="h-32 sm:h-36 md:h-40 lg:h-48 overflow-hidden rounded-t-lg">
          <img 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300" 
            src={IMG_CDN_URL + cloudinaryImageId} 
            alt={name} 
            loading="lazy"
          />
        </div>
      <div className="p-2 sm:p-3 flex-grow flex flex-col">
        <h2 className="font-bold text-base sm:text-lg md:text-xl mb-1 sm:mb-2 text-gray-800 truncate">{name}</h2>
        <h3 className="text-gray-600 text-xs sm:text-sm mb-1 sm:mb-2 line-clamp-2">
          {cuisines.join(", ")}
        </h3>
        <div className="mt-auto pt-1 sm:pt-2 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm text-gray-500 truncate pr-2">{areaName}</span>
            {lastMileTravelString && (
              <span className="text-xs sm:text-sm bg-green-100 text-green-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full whitespace-nowrap">
                {lastMileTravelString} min
              </span>
            )}
          </div>
        </div>
      </div>
        {/* {user && (
          <div className="p-2 bg-gray-50 text-xs text-gray-500">
            {user.name} • {user.email}
          </div>
        )} */}
      </div>
    </Link>
  );
};

export default RestrauntCard;