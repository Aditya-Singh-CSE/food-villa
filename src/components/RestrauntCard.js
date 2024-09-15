import { IMG_CDN_URL } from "../constants";
import { useContext } from "react";
import UserContext from "../context/UserContext";

const RestrauntCard = ({name, cuisines,cloudinaryImageId, lastMileTravelString,areaName}) =>{

  const { user } = useContext(UserContext);

    return(
      <div className="w-56 p-2 m-2 shadow-lg bg-pink-50">
        {/* <img src={burgerKing.image} alt="Food logo"/> */}
        <img src={IMG_CDN_URL + cloudinaryImageId} alt="food "/>
        <h2 className="font-bold text-xl">{name}</h2>
        <h3>{cuisines.join(", ")}</h3>
        <h4>{areaName}</h4>
        <h5 className="font-bold">{user.name} - {user.email}</h5>
        {/* <h4>{lastMileTravelString} minutes</h4> */}
      </div>
  
    );
  };

  export default RestrauntCard;