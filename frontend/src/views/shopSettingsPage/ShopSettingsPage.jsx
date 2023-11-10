import React from 'react';
import './ShopSettingsPage.scss';
import HeaderDashboard from '../../components/shopDashboard/headerDashboard/HeaderDashboard';
import SidebarDashboard from '../../components/shopDashboard/sidebarDashboard/SidebarDashboard';
import ShopSettings from '../../components/shop/shopSettings/ShopSettings';

const ShopSettingsPage = () => {
  return (
    <main className="shop-settings-page">
      <HeaderDashboard />
      <section className="shop-settings-container">
        <SidebarDashboard />

        <ShopSettings />
      </section>
    </main>
  );
};

export default ShopSettingsPage;
