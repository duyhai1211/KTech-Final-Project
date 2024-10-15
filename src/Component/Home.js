import React from 'react';
import SearchBar from './SearchBar';
import RestaurantCards from './RestaurantCards';

const Home = () => {
  return (
    <div>
      <SearchBar />
      <RestaurantCards />
      {/* Phần phân trang */}
      <div className="pagination">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
      </div>
    </div>
  );
};

export default Home;
