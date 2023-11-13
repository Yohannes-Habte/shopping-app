import React from 'react';
import './ShopHome.scss';
import ShopInfo from '../../../components/shop/shopInfo/ShopInfo';
import ShopProfile from '../../../components/shop/shopProfile/ShopProfile';
import HeaderDashboard from '../../../components/shopDashboard/headerDashboard/HeaderDashboard';

const ShopHome = () => {
  return (
    <main className="shop-home-page">
      <HeaderDashboard />
      <section className="shop-home-container">
        <ShopInfo isOwner={true} />
        <ShopProfile isOwner={true} />
      </section>
    </main>
  );
};

export default ShopHome;
