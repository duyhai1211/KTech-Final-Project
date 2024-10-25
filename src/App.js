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

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
