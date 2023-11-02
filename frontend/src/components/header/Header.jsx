import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaSearch } from 'react-icons/fa';
import { RiArrowRightSLine } from 'react-icons/ri';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { BsCart } from 'react-icons/bs';
import './Header.scss';
import axios, { Axios } from 'axios';
import DropDown from '../dropDown/DropDown';
import Navbar from '../navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  userLogoutFailure,
  userLogoutStart,
  userLogoutSuccess,
} from '../../redux/reducers/userReducer';

const Header = () => {
  const navigate = useNavigate();

  // Global state variables using redux
  const { currentUser, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  // Local state variables
  const [searchItem, setSearchItem] = useState('');
  const [dropDown, setDropDown] = useState(false);
  const [open, setOpen] = useState(false);
  const categoriesData = 'categoriesData';

  // Handle search submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);

    urlParams.set('searchItem', searchItem);
    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };

  //! If you want to display on the search bar what you write on url, you need to apply useEffect hook
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchItem(searchTermFromUrl);
    }
  }, [window.location.search]);

  // Log out user function
  const handleLogout = async () => {
    try {
      dispatch(userLogoutStart());
      const { data } = await axios.get(
        `http://localhost:5000/api/auths/logout/${currentUser.rest._id}`
      );

      dispatch(userLogoutSuccess());

      navigate('/login');
    } catch (error) {
      dispatch(userLogoutFailure(error.response.data.message));
    }
  };

  // Delete user account
  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const { data } = await axios.delete(
        `http://localhost:5000/api/auths/delete-account/${currentUser.rest._id}`
      );
      dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(deleteUserFailure(error.response.data.message));
    }
  };

  return (
    <header className="header">
      <section className="wrapper">
        <NavLink to={'/'}>
          <h1 className="logo">
            Lisa <span className="shopping">Shopping</span>
          </h1>
        </NavLink>

        {/* Search bar form */}
        <form onSubmit={handleSubmit} action="" className="search">
          <div className="input-container">
            <input
              type="text"
              name="searchItem"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              placeholder="Search..."
              className="input-field"
            />
            <span className="input-highlight"></span>
          </div>

          <button className="search-btn">
            <FaSearch className="search-icon" />
          </button>
        </form>

        {/* Become Seller */}
        <article className="become-seller">
          <Link to={'/seller'} className="link">
            <h3 className="sub-title">Become Seller</h3>
          </Link>
          <RiArrowRightSLine className="icon" />
        </article>
      </section>

      {/* Navbar */}
      <div className="navbar-cart-user-wrapper">
        {/* All categories */}
        <div action="" className="categories">
          <FaBars className="top-icon" />
          <button className="btn">All Categories</button>
          <MdKeyboardArrowDown
            onClick={() => setDropDown(!dropDown)}
            className="bottom-icon"
          />

          {dropDown ? (
            <DropDown
              categoriesData={categoriesData}
              setDropDown={setDropDown}
            />
          ) : null}
        </div>

        {/* Navbar items*/}
        <Navbar />

        {/* Cart and Logged in User*/}
        <div className="cart-user-wrapper">
          <div className="icon-wrapper">
            <AiOutlineHeart className="icon" />
            <span className="size">0</span>
          </div>

          <div className="icon-wrapper">
            <BsCart className="icon" />
            <span className="size">0</span>
          </div>

          <div className="logged-in-user">
            {currentUser ? (
              <React.Fragment>
                <img
                  className="image"
                  src={currentUser.rest.image}
                  alt={currentUser.rest.name}
                  onClick={() => setOpen(!open)}
                />

                {open && (
                  <ul className="user-history">
                    <li className="list-item">
                      <NavLink to={`/profile`} className={'link'}>
                        Profile
                      </NavLink>
                    </li>

                    <li className="list-item">
                      <NavLink to={`/orders`} className={'link'}>
                        Orders
                      </NavLink>
                    </li>

                    <li onClick={handleLogout} className="list-item">
                      Log Out
                    </li>
                    <li onClick={handleDeleteAccount} className="list-item">
                      Delete Account
                    </li>
                  </ul>
                )}
              </React.Fragment>
            ) : (
              <Link to={'/login'} className="link">
                <BiUserCircle className="icon" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
