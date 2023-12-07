import React, { useState } from 'react';
import './Contact.scss';
import { Helmet } from 'react-helmet-async';
import { FiPhoneCall } from 'react-icons/fi';
import { MdEmail, MdLocationOn } from 'react-icons/md';
import { FaCloudUploadAlt, FaTwitterSquare, FaUserAlt } from 'react-icons/fa';
import { BiSolidMessageDetail } from 'react-icons/bi';
import axios from 'axios';
import Header from '../../components/userLayout/header/Header';
import Footer from '../../components/userLayout/footer/Footer';


// Initial State
const initialSate = {
  firstName: '',
  lastName: '',
  email: '',
  message: '',
};

const Contact = () => {
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

  // Delete single comment
  const deleteComment = async (id) => {
    try {
      await axios.delete(
        process.env.REACT_APP_BACKEND_URL + `/api/comments/${id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="contact-page">
      <Helmet>
        <title>Contact </title>
      </Helmet>

      <Header />

      <section className="contact-container">
        <h1 className="contact-title">We Would Love to Hear From You</h1>
        <div className="form-communication-tools">
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

                  <label htmlFor="image" className='label'> Upload Image</label>

                
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

          <article className="fast-contact-tools">
            <h5 className="sub-title"> Would you like a prompt reply? </h5>
            <div className="contact-tools">
              <FiPhoneCall className="contact-icon" />
              <p className="link-container">
                <a className="link" href="tel:+4917581005650">
                  Call us
                </a>
              </p>
            </div>
            <div className="contact-tools">
              <MdEmail className="contact-icon" />
              <p className="link-container">
                <a className="link" href="mailto:uelandrae@gmail.com">
                  Email Us
                </a>
              </p>
            </div>
            <div className="contact-tools">
              <FaTwitterSquare className="contact-icon" />
              <p className="link-container">
                <a className="link" href="twitter">
                  Tweet us
                </a>
              </p>
            </div>
            <div className="contact-tools">
              <MdLocationOn className="contact-icon" />
              <p className="link-container">
                <a className="link" href="#">
                  {' '}
                  Straße 31, 4657 Hamburg, Germany
                </a>
              </p>
            </div>
            <figure className="image-display">
              <img
                src={
                  imagePreview
                    ? imagePreview
                    : 'https://icon-library.com/images/no-image-icon//no-image-icon-0.jpg'
                }
                alt="Testimanial"
                className="image"
              />
            </figure>
          </article>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Contact;
