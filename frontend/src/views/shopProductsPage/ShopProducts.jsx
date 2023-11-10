import React from 'react';
import './ShopProducts.scss';
import HeaderDashboard from '../../components/shopDashboard/headerDashboard/HeaderDashboard';
import SidebarDashboard from '../../components/shopDashboard/sidebarDashboard/SidebarDashboard';
import AllShopProducts from '../../components/shop/allShopProducts/AllShopProducts';

const ShopProducts = () => {
  return (
    <main className="shop-products-page">
      <HeaderDashboard />
      <section className="shop-products-container">
        <SidebarDashboard />

        <AllShopProducts />
      </section>
    </main>
  );
};

export default ShopProducts;
