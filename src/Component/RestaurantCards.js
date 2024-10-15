import React from 'react';
import './RestaurantCards.css';

const restaurants = [
  {
    id: 1,
    name: '을왕',
    description: 'T맵, 카카오맵등 네비게이션에 을왕 ...',
    image: 'link-to-image-1', // Thay bằng link hình ảnh của nhà hàng
  },
  {
    id: 2,
    name: '옛날 칼국수',
    description: '노원역 8번출구앞 스타벅스 사이로 ...',
    image: 'link-to-image-2',
  },
  // Thêm các nhà hàng khác...
];

const RestaurantCards = () => {
  return (
    <div className="restaurant-cards">
      {restaurants.map((restaurant) => (
        <div key={restaurant.id} className="card">
          <img src={restaurant.image} alt={restaurant.name} className="card-img" />
          <h3>{restaurant.name}</h3>
          <p>{restaurant.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RestaurantCards;
