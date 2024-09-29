import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from 'react';
import Shimmer from "./Shimmer";


const Body = () => {
  const [listOfRestaurent, setListOfRestaurent] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurant,setFilteredRestaurant]=useState([]);



  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.7195687&lng=75.8577258&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

    const json = await data.json();
    console.log(json);

    setListOfRestaurent(json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants);
    setFilteredRestaurant(json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants);

  }



  return listOfRestaurent.length === 0 ? <Shimmer /> : (

    <div className="body">
      <div className="filter">
        <div className="search">
          <input type="text" className="search-box" value={searchText}
            onChange={e => setSearchText(e.target.value)}
          ></input>

          <button onClick={() => {
            console.log(searchText)

            const filteredRes = listOfRestaurent.filter((res) => 
              
              res.info.name.toLowerCase().includes(searchText.toLowerCase()) )
              console.log(filteredRes)
            setFilteredRestaurant(filteredRes)
          }
          }>Search</button>

        </div>
        <button className="filter-btn" onClick={() => {
          const filteredList = listOfRestaurent.filter((res) => res.info.avgRating > 4.3)
          setFilteredRestaurant(filteredList)
        }}>Top Rated Restaurant </button>
      </div>
      <div className="res-container">
        {
          filteredRestaurant.map(restraunt => <RestaurantCard key={restraunt.info.id} resData={restraunt} />)
        }


      </div>

    </div>


  );
}
export default Body;
