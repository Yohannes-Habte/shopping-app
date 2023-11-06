import { React, useState } from 'react';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { RxAvatar } from 'react-icons/rx';
import { HiOutlineEye } from 'react-icons/hi';
import { FaAddressCard, FaPhoneVolume, FaUserTie } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiFileZipFill, RiLockPasswordFill } from 'react-icons/ri';

const ShopCreate = () => {
  // Local state variables
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState();
  const [avatar, setAvatar] = useState();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Function to show/hide password
  const displayPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(`http//sfslfslf/shop/create-shop`, {
        name,
        email,
        password,
        avatar,
        zipCode,
        address,
        phoneNumber,
      })
      .then((res) => {
        toast.success(res.data.message);
        setName('');
        setEmail('');
        setPassword('');
        setAvatar();
        setZipCode();
        setAddress('');
        setPhoneNumber();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleFileInputChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <section className="create-shop-wrapper">
      <h2 className="subTitle">Register as a Seller</h2>

      <form className="seller-form" onSubmit={handleSubmit}>
        {/* name */}
        <div className="input-container">
          <FaUserTie className="icon" />
          <input
            type="name"
            name="name"
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Shop name"
            className="input-field"
          />
          <label htmlFor="name" className="input-label">
            Shop Name
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* phone */}
        <div className="input-container">
          <FaPhoneVolume className="icon" />
          <input
            type="number"
            name="phoneNumber"
            id="phoneNumber"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter Phone Number"
            className="input-field"
          />
          <label htmlFor="phoneNumber" className="input-label">
            Phone Number
          </label>
          <span className="input-highlight"></span>
        </div>

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

        {/* address */}
        <div className="input-container">
          <FaAddressCard className="icon" />
          <input
            type="address"
            name="address"
            id="address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Address"
            className="input-field"
          />
          <label htmlFor="email" className="input-label">
            Address
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* zip code */}
        <div className="input-container">
          <RiFileZipFill className="icon" />
          <input
            type="number"
            name="zipCode"
            id="zipCode"
            required
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="Enter Zip Code"
            className="input-field"
          />
          <label htmlFor="zipCode" className="input-label">
            Zip Code
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

        {/* image */}
        <div className="file-container">
          <span className="user-image">
            {avatar ? (
              <img src={avatar} alt="avatar" className="image" />
            ) : (
              <RxAvatar className="icon" />
            )}
          </span>
          <label htmlFor="file-input" className="input-label">
            <span>Upload a file</span>
            <input
              type="file"
              name="avatar"
              id="file-input"
              onChange={handleFileInputChange}
              className="input-field"
            />
          </label>
        </div>

        <button type="submit" className="create-shop-btn">
          Submit
        </button>

        <article className={`alread-have-account`}>
          <h4>Already have an account?</h4>
          <p className="sign-in">
            <Link to="/shop-login" className="link">
              Sign in
            </Link>
          </p>
        </article>
      </form>
    </section>
  );
};

export default ShopCreate;
