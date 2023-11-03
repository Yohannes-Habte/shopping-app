import React, { useState } from 'react';
import './WishList.scss';
import { BsCartPlusFill, BsFillBagHeartFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { MdClose, MdDelete } from 'react-icons/md';

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

const SingleWishList = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;
  return (
    <div className="single-wish-list">
      <MdDelete className="icon-delete" />

      <figure>
        <img src="" alt="" />
      </figure>

      <article>
        <h2> {data.name} </h2>
        <p> Price: ${data.price} </p>
        <p> Total Price: ${totalPrice} </p>
      </article>
      <BsCartPlusFill />
    </div>
  );
};

export default WishList;
