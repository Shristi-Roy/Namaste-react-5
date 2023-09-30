import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import resObj from "../utils/mockData";

const Body = () => {
    const [listofRestaurants, setListofRestaurants] = useState(resObj.restaurants);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);

    useEffect (() => {
        fetchData();
    },[]);

    const fetchData = async() => {
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );

        const json = await data.json();
        console.log(json)
        setListofRestaurants(
            json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants

        )
    };

    const filterTopRatedRestaurants = () => {
        const filteredList = listofRestaurants.filter(
            (res) => res.info.avgRating > 4.3
        );
        setFilteredRestaurants(filteredList);
    };

    return (
        <div className='body'>
            <div className="filter"> 
                <button
                    className="filter-btn"
                    onClick={filterTopRatedRestaurants}
                >
                    Top Rated Restaurants
                </button>
            </div>
            <div className='res-container'>
                <RestaurantCard resData={filteredRestaurants.length > 0 ? filteredRestaurants : listofRestaurants} />
            </div>
        </div>
    );
};

export default Body;