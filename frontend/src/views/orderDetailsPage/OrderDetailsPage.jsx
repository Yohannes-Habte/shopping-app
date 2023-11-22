import React from 'react';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/footer/Footer';
import UserOrderDetails from '../../components/cart/userOrderDetails/UserOrderDetails';

const OrderDetailsPage = () => {
  return (
    <main className="order-details-page">
      <Header />
      <section className="order-details-page-container">
        <h1 className="order-details-page-title"> User Order Details </h1>
        <UserOrderDetails />
      </section>
      <Footer />
    </main>
  );
};

export default OrderDetailsPage;
