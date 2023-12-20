import React from 'react';
import './ShopDashboard.scss';
import HeaderDashboard from '../../../components/shopDashboard/headerDashboard/HeaderDashboard';
import SidebarDashboard from '../../../components/shopDashboard/sidebarDashboard/SidebarDashboard';
import OverviewDashboard from '../../../components/shopDashboard/dashboardOverview/DashboardOverview';

const ShopDashboard = () => {
  return (
    <main className="shop-dashboar-page">
      <HeaderDashboard />
      <section className="shop-dashboard-container">
        <SidebarDashboard />
        <OverviewDashboard />
      </section>
    </main>
  );
};

export default ShopDashboard;
