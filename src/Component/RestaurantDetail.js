import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    // Gọi API để lấy thông tin chi tiết của nhà hàng
    axios.get(`https://api.yourbackend.com/restaurants/${id}`)
      .then(response => setRestaurant(response.data))
      .catch(error => console.error('Error fetching restaurant details:', error));
  }, [id]);

  if (!restaurant) return <p>Loading...</p>;

  return (
    <div>
      <h1>{restaurant.name}</h1>
      <p>{restaurant.description}</p>
      <h3>Menu:</h3>
      <ul>
        {restaurant.menu.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h3>Chỗ ngồi:</h3>
      <p>Loại: {restaurant.seatType}</p>
      <p>Số lượng chỗ ngồi: {restaurant.capacity}</p>
      <Link to={`/reservation/${restaurant.id}`}>Đặt chỗ</Link>
    </div>
  );
};

export default RestaurantDetail;
