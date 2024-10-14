import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // Gọi API để lấy danh sách nhà hàng
    axios.get('https://api.yourbackend.com/restaurants')
      .then(response => setRestaurants(response.data))
      .catch(error => console.error('Error fetching restaurants:', error));
  }, []);

  return (
    <div>
      <h1>Danh sách nhà hàng</h1>
      {restaurants.length > 0 ? (
        restaurants.map((restaurant) => (
          <div key={restaurant.id}>
            <Link to={`/restaurant/${restaurant.id}`}>
              <h2>{restaurant.name}</h2>
              <p>{restaurant.description}</p>
            </Link>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RestaurantList;
