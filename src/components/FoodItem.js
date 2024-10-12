import { IMG_CDN_URL } from "../constants";

const FoodItem = ({
  name,
  description,
  imageId,
  price,
}) => {

  console.log("ImageId:",imageId)
  

  return (
    <div className="w-56 p-2 m-2 shadow-lg bg-pink-50">
      {/* <img src={burgerKing.image} alt="Food logo"/> */}
      <img src={IMG_CDN_URL + imageId} alt="food " />
      <h2 className="font-bold text-xl">{name}</h2>
      <h3>{description}</h3>
      <h4>{price}</h4>

    </div>
  );
};

export default FoodItem;
