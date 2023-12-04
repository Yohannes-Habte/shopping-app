import React, { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import "./Footer.scss"

const Footer = () => {
  // Local State variables
  const [email, setEmail] = useState('');
  return (
    <footer className='footer'>
      <section className="subscription">
        <h3 className="subtTitle">
          Subscribe to be informed immediately about offers, news and events{' '}
        </h3>
        <form action="" className="form">
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
              Email Address
            </label>
            <span className="input-highlight"></span>
          </div>
          <button className="subscribe-btn">Subscribe</button>
        </form>
      </section>
    </footer>
  );
};

export default Footer;
