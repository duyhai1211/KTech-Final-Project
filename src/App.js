<<<<<<< HEAD
import React from 'react';
import Navbar from './Component/Navbar/Navbar'; // Đường dẫn đúng đến Navbar.js
import './App.css'; // Đảm bảo App.css được liên kết

// Import các component bạn muốn hiển thị
import Home from './Component/Home';
import RestaurantCards from './Component/RestaurantCards';
import SearchBar from './Component/SearchBar';
=======
import './App.scss';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserHome from './components/User/UserHome';
import Volunteer from './components/User/UserCallVolunteer';
import DeviceView from './components/User/DeviceView';
import Test from './components/services/test';
import VolunteerHome from './components/Volunteer/VolunteerHomePage';
import MedicalHome from './components/Medical/MedicalHome';
import HomePage from './components/HomePage/HomePage';
import LogginView from './components/Loggin/LogginView';
import SignUpPage from './components/Loggin/SignUpView';
import ResAdminPage from './components/Restaurant/ResAdminPage';
>>>>>>> linh

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      {/* Hiển thị Navbar */}
      <Navbar />
      
      {/* Hiển thị các thành phần khác */}
      <Home />
      <SearchBar />
      <RestaurantCards />
=======
      {/* Conditionally render Sidebar only on the '/Medical' route */}
      {/* {location.pathname === '/Medical' && <SideBar />}  */}

      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/SignInPage" element={<LogginView />} />
          <Route path="/SignUpPage" element={<SignUpPage />} />
          <Route path="/RestaurantAdminPage" element={<ResAdminPage />} />
          <Route path="/Test" element={<Test />} />
          <Route path="/VolunteerHome" element={<VolunteerHome />} />
          <Route path="/MedicalHome" element={<MedicalHome />} />
        </Routes>
      </div>
>>>>>>> linh
    </div>
  );
}

export default App;
