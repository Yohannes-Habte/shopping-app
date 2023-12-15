import React from 'react';
import './ContactTools.scss';
import { FaTwitterSquare } from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';
import { MdEmail } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';

const ContactTools = () => {
  return (
    <article className="fast-contact-tools">
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
        <FaLocationDot className="contact-icon" />
        <p className="link-container">
          <a className="link" href="#">
            {' '}
            Straße 31, 4657 Hamburg, Germany
          </a>
        </p>
      </div>
    </article>
  );
};

export default ContactTools;
