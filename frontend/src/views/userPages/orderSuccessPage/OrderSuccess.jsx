import React from 'react';
import './OrderSuccess.scss';
import Header from '../../../components/userLayout/header/Header';
import Footer from '../../../components/userLayout/footer/Footer';
import { useSelector } from 'react-redux';

const OrderSuccess = () => {
  // Global state variables
  const { currentUser } = useSelector((state) => state.user);
  return (
    <main className="order-success-page">
      <Header />

      <section className="order-success-page-container">
        <h2 className="success-title">Successful Order 😍</h2>
        <p className="welcome-back">
          Hello <strong>{currentUser.name}</strong> your order is successful. We
          will inform you in good time about the delivery of your order. You are
          always welcome to Lisa Shopping! We are always ready to serve you
          according to your wishes, wish fulfils your desire.
        </p>
      </section>

      <Footer />
    </main>
  );
};

export default OrderSuccess;
