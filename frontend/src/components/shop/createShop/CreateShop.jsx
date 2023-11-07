import { React, useState } from 'react';
import './ShopCreate.scss';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { RxAvatar } from 'react-icons/rx';
import { HiOutlineEye } from 'react-icons/hi';
import { FaAddressCard, FaPhoneVolume, FaUserTie } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiFileZipFill, RiLockPasswordFill } from 'react-icons/ri';

const ShopCreate = () => {
  const navigate = useNavigate();

  // Local state variables
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState();
  const [image, setImage] = useState();
  const [showPassword, setShowPassword] = useState(false);

  // Function to show/hide password
  const displayPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

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
      case 'phoneNumber':
        setPhoneNumber(e.target.value);
        break;
      case 'address':
        setAddress(e.target.value);
        break;

      case 'zipCode':
        setZipCode(e.target.value);
        break;

      default:
        break;
    }
  };

  // Reset input data
  const reset = () => {
    setName('');
    setEmail('');
    setPassword('');
    setPhoneNumber('');
    setAddress('');
    setZipCode('');
  };

  // Submit created shop
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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
        phoneNumber: phoneNumber,
        address: address,
        zipCode: zipCode,
        image: url,
      };

      const { data } = await axios.post(
        'http://localhost:5000/api/shops/create-shop',
        newUser
      );
      reset();
      navigate('/login-shop');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="create-shop-wrapper">
      <h1 className="title">Register as a Seller</h1>

      <form className="seller-signup-form" onSubmit={handleSubmit}>
        {/* name */}
        <div className="input-container">
          <FaUserTie className="icon" />
          <input
            type="name"
            name="name"
            id="name"
            required
            value={name}
            onChange={updateChange}
            placeholder="Enter Shop name"
            className="input-field"
          />
          <label htmlFor="name" className="input-label">
            Shop Name
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
            onChange={updateChange}
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
            onChange={updateChange}
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

        {/* phone */}
        <div className="input-container">
          <FaPhoneVolume className="icon" />
          <input
            type="number"
            name="phoneNumber"
            id="phoneNumber"
            required
            value={phoneNumber}
            onChange={updateChange}
            placeholder="Enter Phone Number"
            className="input-field"
          />
          <label htmlFor="phoneNumber" className="input-label">
            Phone Number
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
            onChange={updateChange}
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
            onChange={updateChange}
            placeholder="Enter Zip Code"
            className="input-field"
          />
          <label htmlFor="zipCode" className="input-label">
            Zip Code
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* image */}
        <div className="file-container">
          <label htmlFor="file-input" className="input-label">
            <label htmlFor="image" className="image-label">
              <RxAvatar className="icon" />
              Upload Photo 
            </label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={updateImage}
              className="input-field"
            />
          </label>
        </div>

        <button type="submit" className="create-shop-btn">
          Submit
        </button>

        <article className={`already-have-account`}>
          <h4>Already have an account?</h4>
          <p className="sign-in">
            <Link to="/login-shop" className="link">
              Sign in
            </Link>
          </p>
        </article>
      </form>
    </section>
  );
};

export default ShopCreate;
