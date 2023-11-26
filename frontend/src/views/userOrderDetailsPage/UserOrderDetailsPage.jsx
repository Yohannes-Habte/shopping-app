import React from 'react';
import './UserOrderDetailsPage.scss';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/footer/Footer';
import { useSelector } from 'react-redux';
import UserOrderDetails from '../../components/cart/userOrderDetails/UserOrderDetails';

const UserOrderDetailsPage = () => {
  // Global state variables
  const { currentUser } = useSelector((state) => state.user);

  return (
    <main className="user-order-details-page">
      <Header />
      <section className="user-order-details-page-container">
        <h1 className="user-order-details-page-title">
          User Order Details
        </h1>
        <UserOrderDetails />
      </section>
      <Footer />
    </main>
  );
};

export default UserOrderDetailsPage;
