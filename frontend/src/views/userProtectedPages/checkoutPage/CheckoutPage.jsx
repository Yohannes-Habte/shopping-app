import React from 'react';
import './CheckoutPage.scss';
import Header from '../../../components/layout/header/Header';
import Footer from '../../../components/layout/footer/Footer';
import Checkout from '../../../components/cart/checkout/Checkout';

const CheckoutPage = () => {
  return (
    <main className="checkout-page">
      <Header />
      <section className="checkout-container">
        <h1 className="title"> Checkout </h1>
        <Checkout />
      </section>
      <Footer />
    </main>
  );
};

export default CheckoutPage;
