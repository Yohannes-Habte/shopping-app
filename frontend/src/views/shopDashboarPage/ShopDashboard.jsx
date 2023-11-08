import React from 'react';
import "./ShopDashboard.scss"
import SidebarDashboard from '../../components/shopDashboard/sidebarDashboard/SidebarDashboard';
import HeroDashboard from '../../components/shopDashboard/overviewDashboard/OverviewDashboard';
import HeaderDashboar from '../../components/shopDashboard/headerDashboard/HeaderDashboard';

const ShopDashboard = () => {
  return (
    <main className="shop-dashboar-page">
      <HeaderDashboar />
      <section className="shop-dashboard-container">
        <SidebarDashboard />
        <HeroDashboard />
      </section>
    </main>
  );
};

export default ShopDashboard;
