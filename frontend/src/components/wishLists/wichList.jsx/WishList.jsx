import React from 'react';
import './WishList.scss';
import { Link } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import SingleWishList from '../singleWishList/SingleWishList';

const WishList = ({ setOpenWishList }) => {
  const cartData = [
    {
      price: 1099,
      discount_price: 1049,
      name: 'Computers & Laptop',
    },
    {
      price: 4645,
      discount_price: 1049,
      name: 'Computers & Laptop',
    },
    {
      price: 688,
      discount_price: 1049,
      name: 'Computers & Laptop',
    },
  ];
  return (
    <div className="wish-list">
      <section className="wish-list-container">
        <MdClose onClick={() => setOpenWishList(false)} className="close" />

        <h2 className="title">Your Order: 3 items</h2>

        {cartData &&
          cartData.map((item, index) => (
            <SingleWishList key={index} data={item} />
          ))}

        <Link to={'/checkout'}></Link>
      </section>
    </div>
  );
};


export default WishList;
