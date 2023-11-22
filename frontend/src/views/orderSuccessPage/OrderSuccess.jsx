import React from 'react';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/footer/Footer';

const OrderSuccess = () => {
  return (
    <main className="order-success-page">
      <Header />

      <section className="order-success-page-container">
        <h2 className="success-title">Your order is successful 😍</h2>
        <p> Welcome back</p>
      </section>

      <Footer />
    </main>
  );
};

export default OrderSuccess;
