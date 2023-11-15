import React from 'react';
import './Cart.scss';
import { RxCross1 } from 'react-icons/rx';
import { IoBagHandleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SingleCart from '../singleCart/SingleCart';

const Cart = ({ setOpenCart }) => {
  // Global state variables
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Remove from cart handler
  const removeFromCartHandler = (data) => {
    dispatch('removeFromCart'(data));
  };

  // Total price
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  // Change quantity handler
  const quantityChangeHandler = (data) => {
    dispatch('addTocart'(data));
  };

  return (
    <main className="cart">
      <article className="cart-container">
        {cart && cart.length === 0 ? (
          <section className="empty-cart-wrapper">
            <RxCross1
              className="close-icon"
              onClick={() => setOpenCart(false)}
            />
            <h2 className="empty-cart">Cart Items is empty!</h2>
          </section>
        ) : (
          <>
            <section className="cart-order-wrapper">
              <RxCross1
                className="close-icon"
                onClick={() => setOpenCart(false)}
              />

              {/* Item length */}

              <IoBagHandleOutline className="icon" />
              <h5 className="subTitle">
                {' '}
                There are {cart && cart.length} items in the shopping cart
              </h5>

              {/* cart Single Items */}
              <div className="single-cart-wrapper">
                {cart &&
                  cart.map((i, index) => (
                    <SingleCart
                      key={index}
                      data={i}
                      quantityChangeHandler={quantityChangeHandler}
                      removeFromCartHandler={removeFromCartHandler}
                    />
                  ))}
              </div>
            </section>
            <hr />
            <h2 className="total-price">
              Total Pirce: <span className="amount">${totalPrice}</span>
            </h2>
            <hr />

            {/* checkout buttons */}
            <Link to="/checkout">
              <button className="checkout-now-btn">Checkout Now</button>
            </Link>
          </>
        )}
      </article>
    </main>
  );
};

export default Cart;
