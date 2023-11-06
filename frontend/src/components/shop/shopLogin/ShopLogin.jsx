import { React, useState } from 'react';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { HiOutlineEye } from 'react-icons/hi';

const ShopLogin = () => {
  const navigate = useNavigate();

  // Local state variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { loading, setLoading } = useState(false);

  // Function to show/hide password
  const displayPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Hanlde submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `$/shop/login-shop`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success('Login Success!');
        navigate('/dashboard');
        window.location.reload(true);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <section className="create-shop-wrapper">
      <h2 className="subTitle">Login to your Shop</h2>

      <form className="seller-login-form" onSubmit={handleSubmit}>
        {/* email */}
        <div className="input-container">
          <MdEmail className="icon" />
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            className="input-field"
          />
          <label htmlFor="email" className="input-label">
            Email address
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* password */}
        <div className="input-container">
          <RiLockPasswordFill className="icon" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            id="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            <input type="checkbox" name="login" className="login-checkbox" />
            <span className="keep-me-login">Keep me signed in</span>
          </div>
          <div className="forget-password">
            <Link className="link" to={'/forget-password'}>
              Forgot your password?
            </Link>
          </div>
        </div>

        <button type="submit" disabled={loading} className="login-button">
          {/* {loading && <ButtonSpinner />} */}
          {loading && <span>Loading...</span>}
          {!loading && <span>Log In</span>}
        </button>

        <p className="haveNoAccount">
          Don't have an account?{' '}
          <NavLink to="/create-shop" className={'link-to'}>
            Sign Up
          </NavLink>
        </p>
      </form>
    </section>
  );
};

export default ShopLogin;
