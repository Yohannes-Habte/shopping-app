import React from 'react';
import './HeaderDashboard.scss';
import { AiOutlineGift } from 'react-icons/ai';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { FiPackage, FiShoppingBag } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { BiMessageSquareDetail } from 'react-icons/bi';

const HeaderDashboard = () => {
  const { currentSeller } = useSelector((state) => state.seller);
  console.log('The seller is', currentSeller);

  // Style active and none active link
  const active = ({ isActive }) =>
    isActive ? 'active-link' : 'none-active-link';

  return (
    <header className="header-dashboard">
      {/* Logo */}
      <h1>
        <Link to="/dashboard">Logo</Link>
      </h1>

      {/* Links to various pages */}
      <div className="header-icons">
        <NavLink to="/dashboard/cupouns" className={active}>
          <AiOutlineGift className="header-dashboar-icon" />
        </NavLink>

        <NavLink to="/dashboard-events" className={active}>
          <MdOutlineLocalOffer className="header-dashboar-icon" />
        </NavLink>

        <NavLink to="/dashboard-products" className={active}>
          <FiShoppingBag className="header-dashboar-icon" />
        </NavLink>

        <NavLink to="/dashboard-orders" className={active}>
          <FiPackage className="header-dashboar-icon" />
        </NavLink>

        <NavLink to="/dashboard-messages" className={active}>
          <BiMessageSquareDetail className="header-dashboar-icon" />
        </NavLink>

        <NavLink to={`/shop/${currentSeller._id}`} className={active}>
          <img
            src={
              currentSeller
                ? 'https://i.ibb.co/4pDNDk1/avatar.png'
                : 'https://i.ibb.co/4pDNDk1/avatar.png'
            }
            alt=""
            className="image"
          />
        </NavLink>
      </div>
    </header>
  );
};

export default HeaderDashboard;
