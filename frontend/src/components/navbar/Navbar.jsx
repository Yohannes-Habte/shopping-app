import React from 'react';
import './Navbar.scss';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  // Active NavLink styling
  const activeLink = ({ isActive }) => (isActive ? `active` : 'not-active');
  return (
    <nav className="navbar">
      {/* Navbar items*/}
      <ul className="list-items">
        <li className="list-item">
          <NavLink className={activeLink} to={'/'}>
            Home
          </NavLink>
        </li>

        <li className="list-item">
          <NavLink className={activeLink} to={'/best-sellings'}>
            Best Selling
          </NavLink>
        </li>

        <li className="list-item">
          <NavLink className={activeLink} to={'/products'}>
            Products
          </NavLink>
        </li>

        <li className="list-item">
          <NavLink className={activeLink} to={'/events'}>
            Events
          </NavLink>
        </li>

        <li className="list-item">
          <NavLink className={activeLink} to={'/contact'}>
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
