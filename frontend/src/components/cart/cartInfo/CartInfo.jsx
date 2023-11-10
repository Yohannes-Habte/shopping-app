import React from 'react';

const CartInfo = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentenge,
}) => {
  return (
    <section className="cart-info-wrapper">
      {/* subtotal */}
      <article className="info-container">
        <h3 className="subTitle">subtotal:</h3>
        <p className="outcome">${subTotalPrice}</p>
      </article>

      {/* shiping */}
      <article className="info-container">
        <h3 className="subTitle">shipping:</h3>
        <p className="outcome">${shipping.toFixed(2)}</p>
      </article>

      {/* Discount */}
      <article className="info-container">
        <h3 className="subTitle">Discount:</h3>
        <p className="outcome">
          - {discountPercentenge ? '$' + discountPercentenge.toString() : null}
        </p>
      </article>

      {/* Total Price */}
      <h2 className="title">${totalPrice}</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Coupoun code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          required
          className="input-field"
        />

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </section>
  );
};

export default CartInfo;
