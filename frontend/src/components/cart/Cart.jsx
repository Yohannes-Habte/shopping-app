import React, { useState } from 'react';
import './Cart.scss';
import { BsFillBagCheckFill, BsFillPlusSquareFill } from 'react-icons/bs';
import { TbSquareMinusFilled } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { MdClose, MdDelete } from 'react-icons/md';

const Cart = ({ setOpenCart }) => {
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
    <main className="cart-page">
      <section className="cart-page-container">
        <MdClose onClick={() => setOpenCart(false)} className="close" />
        <h2 className="title">
         Your Order: 3 items
        </h2>

        {cartData &&
          cartData.map((item, index) => <CartSingle key={index} data={item} />)}

        <Link to={'/checkout'}></Link>
      </section>
    </main>
  );
};

const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;
  return (
    <div className="single-cart">
      <div>
        <div onClick={() => setValue(value + 1)}>
          <BsFillPlusSquareFill className="icon-plus" />
        </div>
        <span> {value} </span>

        <div onClick={() => setValue(value === 1 ? 1 : value - 1)}>
          <TbSquareMinusFilled className="icon-minu" />
        </div>
      </div>

      <figure>
        <img src="" alt="" />
      </figure>
      <article>
        <h2> {data.name} </h2>
        <p> Price: ${data.price} </p>
        <p> Total Price: ${totalPrice} </p>
      </article>
      <MdDelete className="icon-delete" />
    </div>
  );
};

export default Cart;
