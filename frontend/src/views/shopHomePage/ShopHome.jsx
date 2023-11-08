import React from 'react';
import "./ShopHome.scss"
import ShopInfo from '../../components/shop/shopInfo/ShopInfo';
import ShopProfile from '../../components/shop/shopProfile/ShopProfile';

const ShopHome = () => {
  return (
    <main className="shop-home-page">
      <section className="shop-home-container">
        <ShopInfo isOwner={true} />
        <ShopProfile isOwner={true} />
      </section>
    </main>
  );
};

export default ShopHome;
