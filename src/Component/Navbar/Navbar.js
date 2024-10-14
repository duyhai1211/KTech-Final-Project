import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>LOGO</h1>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/restaurants">Restaurants</Link></li>
        <li><Link to="/reservation">Reservations</Link></li>
        <li><Link to="/my-reservations">My Reservations</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <div className="navbar-auth">
        <Link to="/signin" className="signin">Sign In</Link>
        <Link to="/signup" className="signup">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
