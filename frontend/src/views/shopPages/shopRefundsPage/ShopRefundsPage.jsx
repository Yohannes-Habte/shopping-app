import React from 'react';
import './ShopRefundsPage.scss';
import HeaderDashboard from '../../../components/shopDashboard/headerDashboard/HeaderDashboard';
import SidebarDashboard from '../../../components/shopDashboard/sidebarDashboard/SidebarDashboard';
import ShopRefunds from '../../../components/shop/allShopRefunds/ShopRefunds';

const ShopRefundsPage = () => {
  return (
    <main className="shop-refunds-page">
      <HeaderDashboard />
      <section className="shop-refunds-page-container">
        <SidebarDashboard />

        <ShopRefunds />
      </section>
    </main>
  );
};

export default ShopRefundsPage;
