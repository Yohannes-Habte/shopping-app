import React from 'react';
import "./ShopCreateEvent.scss"
import HeaderDashboard from '../../components/shopDashboard/headerDashboard/HeaderDashboard';
import SidebarDashboard from '../../components/shopDashboard/sidebarDashboard/SidebarDashboard';
import CreateEvent from '../../components/shop/createEvent/CreateEvent';

const ShopCreateEvent = () => {
  return (
    <main className="shop-create-event-page">
      <HeaderDashboard />
      <section className="shop-create-event-container">
        <SidebarDashboard />

        <CreateEvent />
      </section>
    </main>
  );
};

export default ShopCreateEvent;
