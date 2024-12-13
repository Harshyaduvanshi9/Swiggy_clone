import RestaurantCard, { withPromtedLabel } from "./RestaurantCard";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import ResCardShimmer from "./ResCardShimmer";


const Body = () => {
  const [listOfRestaurent, setListOfRestaurent] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const RestaurantCardPromoted = withPromtedLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.7195687&lng=75.8577258&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

      const json = await data.json();

      setListOfRestaurent(json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants);
      setFilteredRestaurant(json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants);

    }
    catch (error) {

      console.error("Error fetching data:", error);
    }
  }

  const handleTopResFilter = () => {
    const filteredList = listOfRestaurent?.filter(
      (res) => res?.info?.avgRating > 4
    );
    setFilteredRestaurant(filteredList);
  };

  const handleVegResFilter = () => {
    const filteredList = listOfRestaurent?.filter((res) => res?.info?.veg);
    setFilteredRestaurant(filteredList);
  };

  const handleResetFilter = () => {
    setFilteredRestaurant(listOfRestaurent);
  };


  return listOfRestaurent.length === 0 ? <ResCardShimmer /> : (

    <div className="min-h-[calc(100vh_-_152px)]">
      <div className="flex justify-center items-center">
        <input type="text" data-testid="searchInput"
          placeholder="Search for restaurants"
          className="py-2 px-3 w-64 mr-4 text-sm border border-orange-400 focus:outline-none focus:drop-shadow-md rounded-md" value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <button className="py-2 bg-orange-400 hover:drop-shadow-md text-sm text-white px-6 rounded-md"
          onClick={() => {
            console.log(searchText)

            const filteredRes = listOfRestaurent.filter((res) =>

              res.info.name.toLowerCase().includes(searchText.toLowerCase()))
            console.log(filteredRes)
            setFilteredRestaurant(filteredRes)
          }
          }>Search</button>

      </div>
      <div className="flex justify-center items-center my-4">
      <button
          className="mx-2 text-xs bg-orange-400 hover:drop-shadow-md text-white px-3 py-1 rounded-md"
          onClick={handleResetFilter}
        >
          All restaurants
        </button>

        <button className="mx-2 text-xs bg-orange-400 hover:drop-shadow-md text-white px-3 py-1 rounded-md" onClick={() => {
          const filteredList = listOfRestaurent.filter((res) => res.info.avgRating > 4.3)
          setFilteredRestaurant(filteredList)
        }}>Top Rated Restaurant </button>

<button
          className="mx-2 text-xs bg-orange-400 hover:drop-shadow-md text-white px-3 py-1 rounded-md"
          onClick={handleVegResFilter}
        >
          Veg restaurants
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-6 px-2">
        {
          filteredRestaurant.map((restaurant) => <Link
            key={restaurant?.info.id}
            to={"/restaurants/" + restaurant?.info.id}
          >
            {restaurant?.info.veg ? (
              <RestaurantCardPromoted resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>)
        }

      </div>

    </div>


  );
}
export default Body;
