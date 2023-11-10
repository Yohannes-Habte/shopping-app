import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { IoBagHandleOutline } from 'react-icons/io5';
import { HiOutlineMinus, HiPlus } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

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
    <main className="cart-page">
      {cart && cart.length === 0 ? (
        <article className="empty-cart-wrapper">
          <RxCross1 className="icon" onClick={() => setOpenCart(false)} />

          <h5>Cart Items is empty!</h5>
        </article>
      ) : (
        <>
          <div>
            <RxCross1 className="icon" onClick={() => setOpenCart(false)} />

            {/* Item length */}
            <div className={`cart-length`}>
              <IoBagHandleOutline className="icon" />
              <h5 className="subTitle">{cart && cart.length} items</h5>
            </div>

            {/* cart Single Items */}
            <div className="cart-single-item">
              {cart &&
                cart.map((i, index) => (
                  <CartSingle
                    key={index}
                    data={i}
                    quantityChangeHandler={quantityChangeHandler}
                    removeFromCartHandler={removeFromCartHandler}
                  />
                ))}
            </div>
          </div>

          {/* checkout buttons */}
          <Link to="/checkout">
            <button className="checkout-now-btn">
              Checkout Now (USD${totalPrice})
            </button>
          </Link>
        </>
      )}
    </main>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  // Local state variables
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  // Incremental function
  const increment = (data) => {
    if (data.stock < value) {
      toast.error('Product stock limited!');
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  // decremental function
  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

  return (
    <div className="single-cart-container">
      <article className="quantity-management-wrapper">
        <HiPlus className="icon" onClick={() => increment(data)} />

        <h3 className="subTitle">{data.qty}</h3>

        <HiOutlineMinus className="icon" onClick={() => decrement(data)} />
      </article>

      <figure className="image-container">
        <img src={`${data?.images[0]?.url}`} alt="" className="image" />
      </figure>

      <article className="pl-[5px]">
        <h3 className="subTitle">{data.name}</h3>
        <p className="price">
          ${data.discountPrice} * {value}
        </p>
        <p className="price">US${totalPrice}</p>
      </article>

      <RxCross1 className="icon" onClick={() => removeFromCartHandler(data)} />
    </div>
  );
};

export default Cart;
