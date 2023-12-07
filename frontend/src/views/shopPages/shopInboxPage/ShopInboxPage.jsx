import React from 'react';
import "./ShopInboxPage.scss"
import HeaderDashboard from '../../../components/shopDashboard/headerDashboard/HeaderDashboard';
import SidebarDashboard from '../../../components/shopDashboard/sidebarDashboard/SidebarDashboard';
import DashboardMessages from '../../../components/shopDashboard/dashboardMessages/DashboardMessages';

const ShopInboxPage = () => {
  return (
    <main className="shop-inbox-page">
      <HeaderDashboard />
      <section className="shop-inbox-container">
        <SidebarDashboard />
        <DashboardMessages />
      </section>
    </main>
  );
};

export default ShopInboxPage;
