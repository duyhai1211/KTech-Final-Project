import React from 'react';
import Navbar from './Component/Navbar/Navbar'; // Đường dẫn đúng đến Navbar.js
import './App.css'; // Đảm bảo App.css được liên kết

// Import các component bạn muốn hiển thị
import Home from './Component/Home';
import RestaurantCards from './Component/RestaurantCards';
import SearchBar from './Component/SearchBar';

function App() {
  return (
    <div className="App">
      {/* Hiển thị Navbar */}
      <Navbar />
      
      {/* Hiển thị các thành phần khác */}
      <Home />
      <SearchBar />
      <RestaurantCards />
    </div>
  );
}

export default App;
