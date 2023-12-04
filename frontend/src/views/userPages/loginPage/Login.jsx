import React, { useEffect, useState } from 'react';
import './Login.scss';
import axios from 'axios';
import { FaUserAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { HiOutlineEye } from 'react-icons/hi';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from '../../../redux/reducers/userReducer';

const Login = () => {
  const navigate = useNavigate();
  // Global state variables using redux
  const { loading, error, currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Local State variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // If user is logged in, uer will not see the login page
  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [navigate, currentUser]);

  // Update input data
  const updateChange = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  // Function to show/hide password
  const displayPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Reset all state variables for the login form
  const resetVariables = () => {
    setEmail('');
    setPassword('');
  };

  // Submit logged in user Function
  const submitLoginUser = async (event) => {
    event.preventDefault();

    // if (!email) {
    //   return toast.error('Please fill in the email fields!');
    // }

    // if (!validateEmail(email)) {
    //   return toast.error('Please enter a valid email!');
    // }

    try {
      dispatch(loginStart());
      // The body
      const loginUser = {
        email: email,
        password: password,
      };
      const { data } = await axios.post(
        'http://localhost:5000/api/auths/login',
        loginUser
      );

      if (data.success === false) {
        dispatch(loginSuccess(data.message));
        return;
      }

      dispatch(loginSuccess(data));

      resetVariables();
      navigate('/');
    } catch (err) {
      dispatch(loginFailure(err.response.data.message));
    }
  };

  return (
    <main className="lagin-page">
      <Helmet>
        <title> Log In </title>
      </Helmet>

      <section className="login-container">
        {error ? <p className="error-message"> {error} </p> : null}
        <h1 className="login-title"> Login To Your Account </h1>
        <figure className="login-icon-container">
          <FaUserAlt className="login-icon" />
        </figure>
        <fieldset className="login-fieldset">
          <legend className="login-legend">User Login </legend>
          <form onSubmit={submitLoginUser} className="login-form">
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

            <div className="login-checkbox-forget-password">
              <div className="login-checkbox-keep-signed-in">
                <input
                  type="checkbox"
                  name="login"
                  className="login-checkbox"
                />
                <span className="keep-me-login">Keep me signed in</span>
              </div>
              <div className="forget-password">
                <Link className="link" to={'/forget-password'}>
                  Forgot your password?
                </Link>
              </div>
            </div>

            <button
              // onClick={handleClick}
              type="submit"
              disabled={loading}
              className="login-button"
            >
              {/* {loading && <ButtonSpinner />} */}
              {loading && <span>Loading...</span>}
              {!loading && <span>Log In</span>}
            </button>

            <p className="haveNoAccount">
              Don't have an account?{' '}
              <NavLink to="/register" className={'link-to'}>
                Sign Up
              </NavLink>
            </p>
          </form>
        </fieldset>
      </section>
    </main>
  );
};

export default Login;
