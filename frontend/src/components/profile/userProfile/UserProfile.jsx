import React, { useEffect, useState } from 'react';
import './UserProfile.scss';
import axios from 'axios';
import { FaUser, FaUserAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { HiOutlineEye } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import ButtonLoader from '../../loader/ButtonLoader';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUserFilure,
  updateUserStart,
  updateUserSuccess,
} from '../../../redux/reducers/userReducer';
import AllOrders from '../allOrders/AllOrders';
import AllRefundOrders from '../refunds/AllRefundOrders';
import ChangePassword from '../changePassword/ChangePassword';
import TrackOrderTable from '../trackOrderTable/TrackOrderTable';
import Address from '../address/Address';

const UserProfile = ({ active }) => {
  const navigate = useNavigate();
  // Global state variables
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Local State variables
  const [image, setImage] = useState('');
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState(currentUser.rest.name || '');
  const [email, setEmail] = useState(currentUser.rest.email || '');
  const [phone, setPhone] = useState(currentUser.rest.phoneNumber || '');
  const [password, setPassword] = useState('');

  // If user is not logged in, user will not access profile page
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  });
  // Update image
  const updateImage = (e) => {
    setImage(e.target.files[0]);
  };

  // Update input data
  const updateChange = (e) => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      case 'phone':
        setPhone(e.target.value);
        break;
      case 'agree':
        setAgree(e.target.checked);
        break;
      default:
        break;
    }
  };

  // Function to show/hide password
  const displayPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Reset all state variables for the profile form
  const resetVariables = () => {
    setEmail('');
    setPassword('');
  };

  // Submit logged in user Function
  const submitprofileUser = async (event) => {
    event.preventDefault();

    // if (!email) {
    //   return toast.error('Please fill in the email fields!');
    // }

    // if (!validateEmail(email)) {
    //   return toast.error('Please enter a valid email!');
    // }

    try {
      dispatch(updateUserStart());
      // Image validation
      const userPhoto = new FormData();
      userPhoto.append('file', image);
      userPhoto.append('cloud_name', 'dzlsa51a9');
      userPhoto.append('upload_preset', 'upload');

      // Save image to cloudinary
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dzlsa51a9/image/upload`,
        userPhoto
      );
      const { url } = response.data;
      // The body
      const newUser = {
        name: name,
        email: email,
        password: password,
        image: url,
      };

      const { data } = await axios.post(
        'http://localhost:5000/api/auths/profile',
        newUser
      );

      dispatch(updateUserSuccess(data));
      resetVariables();
      navigate('/login');

      return toast.success('Open your email to activate your account!');
    } catch (err) {
      console.log(err);
      dispatch(updateUserFilure(err.response.data.message));
    }
  };

  return (
    <main className="profile-form-page">
      <Helmet>
        <title> Update Profile </title>
      </Helmet>

      {active === 1 && (
        <section className="profile-form-container">
          {error ? <p className="error-message"> {error} </p> : null}
          <h1 className="profile-form-title">Update Your Profile</h1>

          <figure className="image-container">
            {currentUser ? (
              <img
                className="image"
                src={
                  currentUser.rest.image
                    ? currentUser.rest.image
                    : URL.createObjectURL(image)
                }
                alt={currentUser.rest.name}
              />
            ) : (
              <FaUser className="image" />
            )}
          </figure>

          <fieldset className="profile-fieldset">
            <legend className="profile-legend">
              {' '}
              {currentUser ? currentUser.rest.name : 'User Profile'}{' '}
            </legend>
            <form onSubmit={submitprofileUser} className="profile-form">
              <div className="input-container">
                <FaUserAlt className="icon" />
                <input
                  type="text"
                  name={'name'}
                  id={'name'}
                  autoComplete="name"
                  required
                  value={name}
                  onChange={updateChange}
                  placeholder="Enter First Name and Last Name"
                  className="input-field"
                />

                <label htmlFor={'firstName'} className="input-label">
                  First Name
                </label>
                <span className="input-highlight"></span>
              </div>

              <div className="input-container">
                <MdEmail className="icon" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={updateChange}
                  placeholder="Enter Email"
                  className="input-field"
                />
                <label htmlFor="email" className="input-label">
                  Email Address
                </label>
                <span className="input-highlight"></span>
              </div>

              <div className="input-container">
                <RiLockPasswordFill className="icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={updateChange}
                  //onBlur={checkPasswordFormat}
                  placeholder="Enter Password"
                  className="input-field"
                />
                <label htmlFor="password" className="input-label">
                  Password
                </label>
                <span className="input-highlight"></span>
                <span onClick={displayPassword} className="password-display">
                  {showPassword ? <AiFillEyeInvisible /> : <HiOutlineEye />}
                </span>
              </div>

              <div className="input-container">
                <FaUserAlt className="icon" />
                <input
                  type="text"
                  name={'phone'}
                  id={'phone'}
                  autoComplete="phone"
                  required
                  value={phone}
                  onChange={updateChange}
                  placeholder="Enter Phone Number"
                  className="input-field"
                />

                <label htmlFor={'phone'} className="input-label">
                  Phone Number
                </label>
                <span className="input-highlight"></span>
              </div>

              <div className="input-container">
                <RiLockPasswordFill className="icon" />
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={updateImage}
                  className="input-field"
                />
              </div>

              <div className="input-consent">
                <input
                  type="checkbox"
                  name="agree"
                  id="agree"
                  checked={agree}
                  onChange={updateChange}
                  className="profile-consent-input"
                />
                <label htmlFor="agree" className="accept">
                  I accept
                </label>

                <NavLink className={'terms-of-user'}> Terms of Use</NavLink>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="profile-button"
              >
                {loading && <ButtonLoader />}
                {!loading && <span> Update </span>}
              </button>
            </form>
          </fieldset>
        </section>
      )}

      <section className="profile-form-container">
        {active === 2 && <AllOrders />}

        {active === 3 && <AllRefundOrders />}

        {active === 5 && <TrackOrderTable />}

        {active === 6 && <ChangePassword />}

        {active === 7 && <Address />}
      </section>
    </main>
  );
};

export default UserProfile;