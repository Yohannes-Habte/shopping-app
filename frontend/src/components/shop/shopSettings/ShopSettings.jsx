import React, { useState } from 'react';
import './ShopSettings.scss';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdEmojiEvents } from 'react-icons/md';
import { FaAddressCard, FaPhoneVolume, FaUpload } from 'react-icons/fa';
import { FaAudioDescription } from 'react-icons/fa';
import { RiFileZipFill } from 'react-icons/ri';
import {
  updateSellerFilure,
  updateSellerStart,
  updateSellerSuccess,
} from '../../../redux/reducers/sellerReducer';

const ShopSettings = () => {
  // Global state variables
  const { currentSeller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  // Local state variables
  const [image, setImage] = useState(
    currentSeller && currentSeller.image ? currentSeller.image : ''
  );
  const [name, setName] = useState(
    currentSeller && currentSeller.name ? currentSeller.name : ''
  );
  const [zipCode, setZipcode] = useState(
    currentSeller && currentSeller.zipCode ? currentSeller.zipCode : ''
  );
  const [phoneNumber, setPhoneNumber] = useState(
    currentSeller && currentSeller.phoneNumber ? currentSeller.phoneNumber : ''
  );
  const [shopAddress, setShopAddress] = useState(
    currentSeller && currentSeller.shopAddress ? currentSeller.shopAddress : ''
  );
  const [description, setDescription] = useState(
    currentSeller && currentSeller.description ? currentSeller.description : ''
  );

  // Handle image change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle Setting update
  const updateSettingHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateSellerStart());
      const shopImage = new FormData();
      shopImage.append('file', image);
      shopImage.append('cloud_name', 'dzlsa51a9');
      shopImage.append('upload_preset', 'upload');

      // Save image to cloudinary
      const response = await axios.put(
        `https://api.cloudinary.com/v1_1/dzlsa51a9/image/upload`,
        shopImage
      );
      const { url } = response.data;

      const updateShopProfile = {
        image: url,
        name: name,
        zipCode: zipCode,
        phoneNumber: phoneNumber,
        shopAddress: shopAddress,
        description: description,
      };
      const { data } = await axios.put(
        'http://localhost:5000/api/shops/update-shop-profile',
        updateShopProfile,
        {
          withCredentials: true,
        }
      );

      toast.success('Shop info updated succesfully!');
      dispatch(updateSellerSuccess(data));
    } catch (error) {
      dispatch(updateSellerFilure(error.response.data.message));
    }
  };

  return (
    <section className="shop-settings-wrapper">
      <h1 className="title"> Shop Settings</h1>
      <div className="image-form-wrapper">
        <figure className="image-container">
          <img
            src={currentSeller ? currentSeller.image : image}
            alt="Profile"
            className="image"
          />
        </figure>
        <form className="image-form">
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="input-field"
          />
          <label htmlFor="image" className="image-label">
            <FaUpload className="icon" /> Uplad Image
          </label>
        </form>
      </div>

      {/* setting form */}
      <form className="form" onSubmit={updateSettingHandler}>
        {/* Event name */}
        <div className="input-container">
          <MdEmojiEvents className="icon" />
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={
              currentSeller?.name ? currentSeller.name : 'Enter Shop Name'
            }
            className="input-field"
          />
          <label htmlFor="name" className="input-label">
            Shop Name
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* phone number */}
        <div className="input-container">
          <FaPhoneVolume className="icon" />
          <input
            type="number"
            name="phoneNumber"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder={
              currentSeller?.phoneNumber
                ? currentSeller.phoneNumber
                : 'Enter Phone Number'
            }
            className="input-field"
          />
          <label htmlFor="phoneNumber" className="input-label">
            Shop Phone Number
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* address */}
        <div className="input-container">
          <FaAddressCard className="icon" />
          <input
            type="text"
            name="shopAddress"
            id="shopAddress"
            value={shopAddress}
            onChange={(e) => setShopAddress(e.target.value)}
            placeholder={
              currentSeller?.shopAddress
                ? currentSeller.shopAddress
                : 'Enter Shop Address'
            }
            className="input-field"
          />
          <label htmlFor="shopAddress" className="input-label">
           Shop Address
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
            onChange={(e) => setZipcode(e.target.value)}
            placeholder={
              currentSeller?.zipCode ? currentSeller.zipCode : 'Enter Zip Code'
            }
            className="input-field"
          />
          <label htmlFor="zipCode" className="input-label">
            Zip Code
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* Shop Description */}
        <div className="input-container">
          <FaAudioDescription className="icon" />
          <textarea
            type="text"
            name="description"
            id="description"
            cols="30"
            rows="7"
            autoComplete="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={
              currentSeller?.description
                ? currentSeller.description
                : 'Enter your shop description'
            }
            className="input-field"
          ></textarea>
          <label htmlFor="description" className="input-label">
            Shop Description
          </label>
          <span className="input-highlight"></span>
        </div>

        <button type="submit" className="shop-settings-btn">
          Submit
        </button>
      </form>
    </section>
  );
};

export default ShopSettings;
