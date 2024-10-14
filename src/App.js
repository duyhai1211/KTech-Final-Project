import React from 'react';
import Navbar from './Component/Navbar/Navbar'; // Đường dẫn đúng đến Navbar.js
import './App.css';  // Đảm bảo App.css được liên kết

function App() {
  return (
    <div className="App">
      {/* Hiển thị Navbar */}
      <Navbar />
      
      {/* Nội dung khác của trang */}
      <h1>Welcome to the Restaurant Reservation System</h1>
    </div>
  );
}

export default App;
