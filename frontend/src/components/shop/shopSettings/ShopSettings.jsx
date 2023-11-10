import React, { useState } from 'react';
import './ShopSettings.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineCamera } from 'react-icons/ai';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdEmojiEvents } from 'react-icons/md';
import { FaAddressCard, FaPhoneVolume, FaUpload } from 'react-icons/fa';
import { FaAudioDescription } from 'react-icons/fa';
import { RiFileZipFill } from 'react-icons/ri';

const ShopSettings = () => {
  // Global state variables
  const { currentSeller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  // Local state variables
  const [image, setImage] = useState();
  const [name, setName] = useState(currentSeller && currentSeller.name);
  const [description, setDescription] = useState(
    currentSeller && currentSeller.description ? currentSeller.description : ''
  );
  const [address, setAddress] = useState(
    currentSeller && currentSeller.address
  );
  const [phoneNumber, setPhoneNumber] = useState(
    currentSeller && currentSeller.phoneNumber
  );
  const [zipCode, setZipcode] = useState(
    currentSeller && currentSeller.zipCode
  );

  // Hanlde image
  const handleImage = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
        axios
          .put(
            `http/shop/update-shop-avatar`,
            { avatar: reader.result },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            dispatch('loadSeller'());
            toast.success('Avatar updated successfully!');
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  // Handle update
  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      const seller = {
        name: name,
        address: address,
        zipCode: zipCode,
        phoneNumber: phoneNumber,
        description: description,
      };
      const { data } = await axios.put(`http/shop/update-seller-info`, seller, {
        withCredentials: true,
      });

      toast.success('Shop info updated succesfully!');
      dispatch('loadSeller'());
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="shop-settings-wrapper">
      <h1 className="title"> Shop Settings</h1>
      <div className="image-form-wrapper">
        <figure className="image-container">
          <img
            src={image ? currentSeller.image : image}
            alt="Profile"
            className="image"
          />
        </figure>
        <form className="image-form">
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImage}
            className="input-field"
          />
          <label htmlFor="image" className="image-label">
            <FaUpload className="icon" /> Uplad Image
          </label>
        </form>
      </div>

      {/* setting form */}
      <form aria-aria-required={true} className="form" onSubmit={updateHandler}>
        {/* Event name */}
        <div className="input-container">
          <MdEmojiEvents className="icon" />
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={`${currentSeller.name}`}
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
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder={currentSeller?.phoneNumber}
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
            type="address"
            name="address"
            id="address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={currentSeller?.address}
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
            onChange={(e) => setZipcode(e.target.value)}
            placeholder={currentSeller?.zipCode}
            className="input-field"
          />
          <label htmlFor="zipCode" className="input-label">
            Shop Zip Code
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
            placeholder={`${
              currentSeller?.description
                ? currentSeller.description
                : 'Enter your shop description'
            }`}
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
