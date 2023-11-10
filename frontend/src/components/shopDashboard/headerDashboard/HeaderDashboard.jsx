import React from 'react';
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

const HeaderDashboard = () => {
  const navigate = useNavigate();

  // Global state variables
  const { currentSeller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  // Logout seller
  const logoutSeller = async () => {
    try {
      dispatch(logoutSellerStart());
      const { data } = await axios.get(
        `http://localhost:5000/api/shops/logout-shop/${currentSeller._id}`,
        { withCredentials: true }
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

        <figure className="image-container">
          <img
            onClick={logoutSeller}
            src={
              currentSeller
                ? currentSeller.image
                : 'https://i.ibb.co/4pDNDk1/avatar.png'
            }
            alt=""
            className="image"
          />
        </figure>
      </div>
    </header>
  );
};

export default HeaderDashboard;
