import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
    const [resInfo, setResInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        try {
            const response = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.7195687&lng=75.8577258&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
            const data = await response.json();
            const restaurantInfo = data?.data?.cards?.[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants?.[0]?.info;
            console.log(restaurantInfo);

            setResInfo(restaurantInfo);
        } catch (error) {
            console.error("Error fetching menu:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Shimmer />;
    }

    if (!resInfo) {
        return <div>No restaurant information available.</div>;
    }

    const { name,cuisines,costForTwo } = resInfo;

    return (
        <div className="menu">
            <h1>Name of Restaurant: {name}</h1>
            <h1>{cuisines.join(", ")} - {costForTwo}</h1>
            <h2>Menu</h2>
            <ul>
                {/* Replace the placeholders with actual menu items */}
                <li>Menu Item 1</li>
                <li>Menu Item 2</li>
                <li>Menu Item 3</li>
                <li>Menu Item 4</li>
            </ul>
        </div>
    );
};

export default RestaurantMenu;
