import React from 'react';
import './ShopOrderDetailsPage.scss';
import HeaderDashboard from '../../../components/shopDashboard/headerDashboard/HeaderDashboard';
import Footer from '../../../components/layout/footer/Footer';
import ShopOrderDetails from '../../../components/shop/shopOrderDetails/ShopOrderDetails';

const ShopOrderDetailsPage = () => {
  return (
    <main className="shop-order-details-page">
      <HeaderDashboard />
      <section className="shop-order-details-container">
        <h1 className="title"> Shop Order Details</h1>
        <ShopOrderDetails />
      </section>
      <Footer />
    </main>
  );
};

export default ShopOrderDetailsPage;
