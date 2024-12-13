import { useState } from "react";
import { CDN_URL} from "../utils/constants";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import ResMenuShimmer from "./ResMenuShimmer";

const RestaurantMenu = () => {
    const { resId } = useParams();
    const resInfo = useRestaurantMenu(resId);
    const [showIndex, setShowIndex] = useState(null);


    if (resInfo === null)
      return (
        <div className="body">
          <ResMenuShimmer />
        </div>
      );
      console.log("Mamta",resInfo?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards);


    const {
        name,
        cuisines,
        avgRating,
        costForTwoMessage,
        cloudinaryImageId,
        veg,aggregatedDiscountInfo:{header}
        
      } = resInfo?.data?.cards[2]?.card?.card?.info;
    

      const categories =
    resInfo?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (cat) =>
        cat?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

    return (
        <div className="mx-5 min-h-[calc(100vh_-_152px)]">
      <div className="h-36 flex justify-start mb-8 gap-8 sm:gap-14">
        <img
          src={CDN_URL + cloudinaryImageId}
          className="rounded-md h-36 w-48 object-cover mb-2"
          alt="FoodItem "
        />

        <div className="flex flex-col justify-between">
          <div>
            <p className="text-xl font-bold mb-3">{name}</p>
            <p>{cuisines.join(", ")}</p>
          </div>

          <div className="w-60 flex justify-between">
            <span
              className={`px-2 py-0.5 rounded-md ${
                avgRating >= 4 ? "bg-green-200" : "bg-yellow-100"
              }`}
            >
              ⭐️ {avgRating}
            </span>
            <span>{veg ? "🟢" : "🔺"}</span>
            <span>{costForTwoMessage}</span>
            <span className="bg-yellow-100 mx-0.
            5 py-0.9 rounded-md font-bold">{header}</span>
          </div>
        </div>
      </div>
      {categories?.map((category, index) => (
        <RestaurantCategory
          key={category?.card?.card?.title}
          data={category?.card?.card}
          showItems={index === showIndex ? true : false}
          setShowIndex={() => setShowIndex(index === showIndex ? null : index)}
        />
      ))}

    </div>
    );
};

export default RestaurantMenu;
