import React from 'react';
import './ShopHome.scss';
import HeaderDashboard from '../../../components/shopDashboard/headerDashboard/HeaderDashboard';
import ShopBiodata from '../../../components/shop/shopBiodata/ShopBiodata';
import ShopInfo from '../../../components/shop/shopInfo/ShopInfo';

const ShopHome = () => {
  return (
    <main className="shop-home-page">
      <HeaderDashboard isOwner={true} />
      <section className="shop-home-container">
        <ShopBiodata isOwner={true} />
        <ShopInfo isOwner={true} />
      </section>
    </main>
  );
};

export default ShopHome;
