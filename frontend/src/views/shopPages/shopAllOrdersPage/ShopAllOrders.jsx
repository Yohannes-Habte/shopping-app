import React from 'react';
import './ShopAllOrders.scss';
import HeaderDashboard from '../../../components/shopDashboard/headerDashboard/HeaderDashboard';
import SidebarDashboard from '../../../components/shopDashboard/sidebarDashboard/SidebarDashboard';
import AllSellerOrders from '../../../components/shop/allOrders/AllSellerOrders';

const ShopAllOrders = () => {
  return (
    <main className="shop-all-orders-page">
      <HeaderDashboard />
      <section className="shop-all-orders-page-container">
        <h1 className='title'> All Orders of Shop </h1>
        <div className='sidebar-and-orders'>
          <SidebarDashboard />
          <AllSellerOrders />
        </div>
      </section>
    </main>
  );
};

export default ShopAllOrders;
