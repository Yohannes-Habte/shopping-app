import React, { useState } from 'react';
import './ContactForm.scss';
import { FaCloudUploadAlt, FaUserAlt } from 'react-icons/fa';
import { BiSolidMessageDetail } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md';
import axios from 'axios';

// Initial State
const initialSate = {
  firstName: '',
  lastName: '',
  email: '',
  message: '',
};
const ContactForm = () => {
  // Local state variables
  const [testimonies, setTestimonies] = useState(initialSate);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Distructure the initial values
  const { firstName, lastName, email, message } = testimonies;

  // Function that handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTestimonies({ ...testimonies, [name]: value });
  };

  // Handle image change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  // Submit user testimonial or comment
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // new comment
      const newComment = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        message: message,
      };

      const { data } = await axios.post(
        process.env.REACT_APP_BACKEND_URL + '/api/comments/new-comment',
        newComment,
        { withCredentials: true }
      );

      // Reset
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article className="form-container">
      <h3 className="sub-title"> Drop us a message below </h3>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="user-data">
          <div className="input-container">
            <FaUserAlt className="input-icon" />
            <input
              type="text"
              required
              name={'firstName'}
              id={'firstName'}
              value={firstName}
              onChange={handleInputChange}
              placeholder="First Name"
              className="input-field"
            />

            <label htmlFor={'firstName'} className="input-label">
              First Name
            </label>
            <span className="input-highlight"></span>
          </div>

          <div className="input-container">
            <FaUserAlt className="input-icon" />
            <input
              type="text"
              name={'lastName'}
              id={'lastName'}
              required
              value={lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
              className="input-field"
            />

            <label htmlFor={'lastName'} className="input-label">
              Last Name
            </label>
            <span className="input-highlight"></span>
          </div>

          <div className="input-container">
            <MdEmail className="input-icon" />
            <input
              type="email"
              name={'email'}
              id={'email'}
              value={email}
              onChange={handleInputChange}
              placeholder="Email"
              className="input-field"
            />
            <label htmlFor={'email'} className="input-label">
              Email Address
            </label>
            <span className="input-highlight"></span>
          </div>

          <div className="file-container">
            <FaCloudUploadAlt className="input-icon" />
            <input
              type="file"
              accept="image/*" // accept any type of image
              name={'image'}
              id="image"
              onChange={handleImageChange}
              className="input-field"
            />

            <label htmlFor="image" className="label">
              {' '}
              Upload Image
            </label>

            <span className="input-highlight"></span>
          </div>
        </div>

        <div className="text-message-container">
          <BiSolidMessageDetail className="input-icon" />
          <textarea
            name="message"
            id="message"
            value={message}
            onChange={handleInputChange}
            rows="7"
            placeholder="We value your message"
            className="text-area-input-field"
          />

          <label htmlFor={'message'} className="input-label">
            Text Message
          </label>
          <span className="input-highlight"></span>
        </div>

        <button className="contact-form-btn">Submit</button>
      </form>
    </article>
  );
};

export default ContactForm;
