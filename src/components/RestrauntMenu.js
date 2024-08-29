import { useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import { IMG_CDN_URL } from "../constants";

const RestrauntMenu = () =>{
   // const params = useParams();
    const { resId } = useParams();
    // Use proper names
    const [restaurant, setRestaurant] = useState({})
    //console.log(params);


    useEffect(()=>{
        getRestrauntInfo();
    },[])

    async function getRestrauntInfo(){
        const data = await fetch(
            "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=29.9695121&lng=76.878282&restaurantId=850601"
        );
        const json = await data.json();

        console.log(json.data.cards[2].card.card.info)
        setRestaurant(json)
        console.log(restaurant)
    }


    return(
        <>
        <h1>Restraunt id:{resId}</h1>
        {/* <h2>{restaurant.data.cards[2].card.card.info.name}</h2> */}
        {/* <img src={IMG_CDN_URL + restaurant.data.cards[2].card.card.info.cloudinaryImageId}/> */}
        </>
    )
}

export default RestrauntMenu;