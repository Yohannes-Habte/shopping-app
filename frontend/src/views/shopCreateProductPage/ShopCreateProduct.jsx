import React from 'react';
import './ShopCreateProduct.scss';
import HeaderDashboard from '../../components/shopDashboard/headerDashboard/HeaderDashboard';
import SidebarDashboard from '../../components/shopDashboard/sidebarDashboard/SidebarDashboard';
import CreateProduct from '../../components/shop/createProduct/CreateProduct';

const ShopCreateProduct = () => {
  return (
    <main className="shop-create-product-page">
      <HeaderDashboard />
      <section className="shop-create-product-container">
        <SidebarDashboard />

        <CreateProduct />
      </section>
    </main>
  );
};

export default ShopCreateProduct;
