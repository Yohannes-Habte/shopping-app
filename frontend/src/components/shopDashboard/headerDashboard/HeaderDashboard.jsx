import React, { useState } from 'react';
import './HeaderDashboard.scss';
import { AiOutlineGift } from 'react-icons/ai';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { FiPackage, FiShoppingBag } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BiMessageSquareDetail } from 'react-icons/bi';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  logoutSellerFailure,
  logoutSellerStart,
  logoutSellerSuccess,
} from '../../../redux/reducers/sellerReducer';

const HeaderDashboard = ({ isOwner }) => {
  const navigate = useNavigate();

  // Global state variables
  const { currentSeller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  // Local state variables
  const [open, setOpen] = useState(false);

  // Logout seller
  const logoutSeller = async () => {
    try {
      dispatch(logoutSellerStart());
      const { data } = await axios.get(
        `http://localhost:5000/api/shops/logout-shop/${currentSeller._id}`
      );

      dispatch(logoutSellerSuccess());

      toast.success(data.message);
      window.location.reload(true);
      navigate('/login-shop');
    } catch (error) {
      dispatch(logoutSellerFailure(error.response.data.message));
      console.log(error);
    }
  };

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
          <AiOutlineGift className="header-dashboar-icon" title="Coupons" />
        </NavLink>

        <NavLink to="/dashboard-events" className={active}>
          <MdOutlineLocalOffer
            className="header-dashboar-icon"
            title="Events"
          />
        </NavLink>

        <NavLink to="/dashboard-products" className={active}>
          <FiShoppingBag className="header-dashboar-icon" title="Products" />
        </NavLink>

        <NavLink to="/dashboard-orders" className={active}>
          <FiPackage className="header-dashboar-icon" title="Orders" />
        </NavLink>

        <NavLink to="/dashboard-messages" className={active}>
          <BiMessageSquareDetail
            className="header-dashboar-icon"
            title="Messages"
          />
        </NavLink>

        <figure onClick={() => setOpen(!open)} className="image-container">
          <img
            src={
              currentSeller
                ? currentSeller.image
                : 'https://i.ibb.co/4pDNDk1/avatar.png'
            }
            alt=""
            className="image"
          />
        </figure>

        {currentSeller && open && (
          <ul className="shop-profile-logout-wrapper">
            <li className="item shop-profile">
              <Link
                to={`/shop/${currentSeller._id}`}
                onClick={() => setOpen(false)}
                className="link"
              >
                Shop Profile
              </Link>
            </li>

            <li className="item user-profile">
              <NavLink to={`/profile`} className={'link'}>
                User Profile
              </NavLink>
            </li>

            <li className="item shop-board">
              <Link
                to={`/dashboard`}
                onClick={() => setOpen(false)}
                className="link"
              >
                Shop Dashboard
              </Link>
            </li>

            <li onClick={logoutSeller} className="item shop-logout">
              <Link to={'/login-shop'} className="link">
                Shop Log Out
              </Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default HeaderDashboard;
