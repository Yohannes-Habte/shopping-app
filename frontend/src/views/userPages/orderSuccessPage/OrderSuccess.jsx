import React from 'react';
import './OrderSuccess.scss';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/footer/Footer';

const OrderSuccess = () => {
  return (
    <main className="order-success-page">
      <Header />

      <section className="order-success-page-container">
        <h2 className="success-title">Successful Order 😍</h2>
        <p className="welcome-back">
          Your order is successful. We will inform you in good time about the
          delivery of your order. You are always welcome to Lisa Shopping! We are always
          ready to serve you according to your wishes, wish fulfils your desire.
        </p>
      </section>

      <Footer />
    </main>
  );
};

export default OrderSuccess;
