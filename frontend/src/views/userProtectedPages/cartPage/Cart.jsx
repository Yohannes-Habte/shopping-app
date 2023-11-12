import React from 'react';
import './Cart.scss';
import Header from '../../../components/layout/header/Header';
import Footer from '../../../components/layout/footer/Footer';

const Cart = () => {
  return (
    <main className="checkout-page">
      <Header />
      <section className="checkout-container">
        <h1 className="title"> Checkout </h1>
      </section>
      <Footer />
    </main>
  );
};

export default Cart;
