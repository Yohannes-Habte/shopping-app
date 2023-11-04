import React, { useState } from 'react';
import './Address.scss';
import { FaAddressCard } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { Country, State, City } from 'country-state-city';
import { toast } from 'react-toastify';
import { RiFileZipFill } from 'react-icons/ri';
import { MdLocationPin } from 'react-icons/md';

const Address = () => {
  // Global state variables
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Local state variables
  const [open, setOpen] = useState(false);
  const [addressType, setAddressType] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [zipCode, setZipCode] = useState();
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  // Address type
  const addressTypeData = [
    {
      name: 'Default',
    },
    {
      name: 'Home',
    },
    {
      name: 'Office',
    },
  ];

  // updateChange
  const updateChange = (e) => {
    switch (e.target.name) {
      case 'addressType':
        setAddressType(e.target.value);
        break;
      case 'address1':
        setAddress1(e.target.value);
        break;
      case 'address2':
        setAddress2(e.target.value);
        break;
      case 'zipCode':
        setZipCode(e.target.value);
        break;
      case 'city':
        setCity(e.target.value);
        break;
      case 'state':
        setState(e.target.value);
        break;
      case 'country':
        setCountry(e.target.value);
        break;
      default:
        break;
    }
  };

  // Reset variables
  const reset = () => {
    setOpen(false);
    setCountry('');
    setState('');
    setCity('');
    setAddress1('');
    setAddress2('');
    setZipCode(null);
    setAddressType('');
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === '' || country === '' || city === '') {
      toast.error('Please fill all the fields!');
    } else {
      dispatch(
        'updatUserAddress'(
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType
        )
      );
      reset();
    }
  };

  // Delete user address
  const handleDelete = (item) => {
    const id = item._id;
    // dispatch(deleteUserAddress(id));
  };

  return (
    <div className="addresses-wrapper">
      <div className="modal">
        {open && (
          <section className="new-address">
            <RxCross1
              className="address-close-icon"
              onClick={() => setOpen(false)}
            />
            <h2 className="new-address-title"> Add New Address </h2>

            <form onSubmit={handleSubmit} action="" className="form-address">
              {/* Address 1 */}
              <div className="input-container">
                <FaAddressCard className="icon" />
                <input
                  type="text"
                  name={'address1'}
                  id={'address1'}
                  autoComplete="address1"
                  required
                  value={address1}
                  onChange={updateChange}
                  placeholder="Address 1"
                  className="input-field"
                />

                <label htmlFor={'address1'} className="input-label">
                  Address 1
                </label>
                <span className="input-highlight"></span>
              </div>

              {/* Address 2 */}
              <div className="input-container">
                <FaAddressCard className="icon" />
                <input
                  type="text"
                  name={'address2'}
                  id={'address2'}
                  autoComplete="address2"
                  required
                  value={address2}
                  onChange={updateChange}
                  placeholder="Address 2"
                  className="input-field"
                />

                <label htmlFor={'address2'} className="input-label">
                  Address 2
                </label>
                <span className="input-highlight"></span>
              </div>

              {/* Zip Code */}
              <div className="input-container">
                <RiFileZipFill className="icon" />
                <input
                  type="number"
                  name={'zipCode'}
                  id={'zipCode'}
                  autoComplete="zipCode"
                  required
                  value={zipCode}
                  onChange={updateChange}
                  placeholder="Enter Zip Code"
                  className="input-field"
                />

                <label htmlFor={'zipCode'} className="input-label">
                  Zip Code
                </label>
                <span className="input-highlight"></span>
              </div>

              {/* Choose Country using select */}
              <div className="select-container">
                <MdLocationPin className="select-icon" />
                <div className="select-label-wrapper">
                  <label htmlFor={'country'} className="label">
                    Country:
                  </label>
                  <select
                    name="country"
                    id="country"
                    value={country}
                    onChange={updateChange}
                    className="select-options"
                  >
                    <option value=""> Choose your country </option>
                    {Country &&
                      Country.getAllCountries().map((item) => (
                        <option
                          className="option"
                          key={item.isoCode}
                          value={item.isoCode}
                        >
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Choose State using select */}
              <div className="select-container">
                <MdLocationPin className="select-icon" />
                <div className="select-label-wrapper">
                  <label htmlFor={'state'} className="label">
                    State:
                  </label>
                  <select
                    name="state"
                    id="state"
                    value={state}
                    onChange={updateChange}
                    className="select-options"
                  >
                    <option value=""> Choose your state </option>
                    {State &&
                      State.getStatesOfCountry().map((item) => (
                        <option
                          className="option"
                          key={item.isoCode}
                          value={item.isoCode}
                        >
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Choose City using select */}
              <div className="select-container">
                <MdLocationPin className="select-icon" />
                <div className="select-label-wrapper">
                  <label htmlFor={'city'} className="label">
                    City:
                  </label>
                  <select
                    name="city"
                    id="city"
                    value={city}
                    onChange={updateChange}
                    className="select-options"
                  >
                    <option value=""> Choose your city </option>
                    {City &&
                      City.getCitiesOfState().map((item) => (
                        <option
                          className="option"
                          key={item.isoCode}
                          value={item.isoCode}
                        >
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Address type using select */}
              <div className="select-container">
                <MdLocationPin className="select-icon" />
                <div className="select-label-wrapper">
                  <label htmlFor={'addressType'} className="label">
                    Address Type:
                  </label>
                  <select
                    name="addressType"
                    id="addressType"
                    value={addressType}
                    onChange={updateChange}
                    className="select-options"
                  >
                    <option value=""> Choose Address Type </option>
                    {addressTypeData &&
                      addressTypeData.map((address) => (
                        <option
                          className="option"
                          key={address.name}
                          value={address.name}
                        >
                          {address.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <button className="address-btn">Submit</button>
            </form>
          </section>
        )}
      </div>

      <section className="previous-address">
        <article className="title-add-new-address-wrapper">
          <h2 className="address-title">My Addresses</h2>
          <button onClick={() => setOpen(true)} className="add-new-address-btn">
            Add New Address
          </button>
        </article>

        {/* {currentUser &&
          currentUser.addresses.map((item, index) => (
            <article className="" key={index}>
              <h5 className="subTitle">{item.addressType}</h5>

              <h6 className="subTitle">
                {item.address1} {item.address2}
              </h6>

              <h6 className="subTitle">
                {currentUser && currentUser.phoneNumber}
              </h6>

              <button className="delete-btn">
                <AiOutlineDelete
                  className="delete-icon"
                  onClick={() => handleDelete(item)}
                />
              </button>
            </article>
          ))}

        {currentUser && currentUser.addresses.length === 0 && (
          <h5 className="text-center pt-8 text-[18px]">
            You not have any saved address!
          </h5>
        )} */}
      </section>
    </div>
  );
};

export default Address;