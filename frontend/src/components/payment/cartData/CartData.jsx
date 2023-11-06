import React from 'react';

const CartData = ({ orderData }) => {
  const shipping = orderData?.shipping?.toFixed(2);
  return (
    <section className="cart-data-wrapper">
      <article className="flex justify-between">
        <h3 className="cart-data-subTitle">subtotal:</h3>
        <p className="cart-data-paragraph">${orderData?.subTotalPrice}</p>
      </article>

      <article className="flex justify-between">
        <h3 className="cart-data-subTitle">shipping:</h3>
        <p className="cart-data-paragraph">${shipping}</p>
      </article>

      <article className="flex justify-between border-b pb-3">
        <h3 className="cart-data-tsubTitle">Discount:</h3>
        <p className="cart-data-paragraph">
          {orderData?.discountPrice ? '$' + orderData.discountPrice : '-'}
        </p>
      </article>

      <h5 className="cart-data-title">${orderData?.totalPrice}</h5>
    </section>
  );
};

export default CartData;
