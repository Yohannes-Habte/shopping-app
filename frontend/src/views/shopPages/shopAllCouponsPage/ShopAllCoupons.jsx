import React from 'react';
import './ShopAllCoupons.scss';
import HeaderDashboard from '../../../components/shopDashboard/headerDashboard/HeaderDashboard';
import SidebarDashboard from '../../../components/shopDashboard/sidebarDashboard/SidebarDashboard';
import AllCoupons from '../../../components/shop/allCoupons/AllCoupons';

const ShopAllCoupons = () => {
  return (
    <main className="shop-all-coupons-page">
      <HeaderDashboard />
      <section className="shop-all-coupons-container">
        <SidebarDashboard />

        <AllCoupons />
      </section>
    </main>
  );
};

export default ShopAllCoupons;
