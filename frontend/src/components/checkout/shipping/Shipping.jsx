import React from 'react';
import { Country, State } from 'country-state-city';
import { FaAddressCard, FaPhoneSquareAlt, FaUserTie } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiFileZipFill } from 'react-icons/ri';

const Shipping = ({
  user,
  country,
  setCountry,
  city,
  setCity,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
  address2,
  setAddress2,
  zipCode,
  setZipCode,
}) => {
  return (
    <section className="shipping-wrapper">
      <h3 className="subTitle">Shipping Address</h3>

      <form className="shipping-form">
        {/*  name */}
        <div className="input-container">
          <FaUserTie className="icon" />
          <div className="w-[50%]">
            <input
              type="text"
              value={user && user.name}
              required
              className="input-field"
            />

            <label htmlFor="name" className="input-label">
              Full Name
            </label>
            <span className="input-highlight"></span>
          </div>

          {/*  email */}
          <div className="input-container">
            <MdEmail className="icon" />

            <input
              type="email"
              value={user && user.email}
              required
              className="input-field"
            />
          </div>
          <label htmlFor="email" className="input-label">
            Email Address
          </label>
          <span className="input-highlight"></span>
        </div>

        {/*  phone */}
        <div className="input-container">
          <FaPhoneSquareAlt className="icon" />
          <div className="w-[50%]">
            <input
              type="number"
              required
              value={user && user.phoneNumber}
              className="input-field"
            />
            <label className="input-label">Phone Number</label>
            <span className="input-highlight"></span>
          </div>

          {/*  zipcode */}
          <div className="input-container">
            <RiFileZipFill className="icon" />
            <input
              type="number"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
              className="input-field"
            />
            <label className="input-label">Zip Code</label>
            <span className="input-highlight"></span>
          </div>
        </div>

        {/*  country */}
        <div className="input-container">
          <div className="w-[50%]">
            <label className="input-label">Country</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option className="block pb-2" value="">
                Choose your country
              </option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>

          {/*  City */}
          <div className="input-container">
            <label className="input-label">City</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option className="block pb-2" value="">
                Choose your City
              </option>
              {State &&
                State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/*  address 1 */}
        <div className="input-container">
          <FaAddressCard className="icon" />
          <input
            type="address"
            required
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            className="input-field"
          />
          <label className="input-label">Address1</label>
          <span className="input-highlight"></span>
        </div>

        {/*  address 2 */}
        <div className="input-container">
          <FaAddressCard className="icon" />
          <input
            type="address"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            required
            className="input-field"
          />
          <label className="input-label">Address2</label>
          <span className="input-highlight"></span>
        </div>
      </form>
      <h3 className="subTitle" onClick={() => setUserInfo(!userInfo)}>
        Choose From saved address
      </h3>
      {userInfo && (
        <div>
          {user &&
            user.addresses.map((item, index) => (
              <div className="address-info">
                <input
                  type="checkbox"
                  className="mr-3"
                  value={item.addressType}
                  onClick={() =>
                    setAddress1(item.address1) ||
                    setAddress2(item.address2) ||
                    setZipCode(item.zipCode) ||
                    setCountry(item.country) ||
                    setCity(item.city)
                  }
                />
                <h2>{item.addressType}</h2>
              </div>
            ))}
        </div>
      )}
    </section>
  );
};

export default Shipping;
