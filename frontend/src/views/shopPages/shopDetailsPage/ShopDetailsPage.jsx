import React from 'react';
import './ShopDetailsPage.scss';
import ShopBiodata from '../../../components/shop/shopBiodata/ShopBiodata';
import ShopInfo from '../../../components/shop/shopInfo/ShopInfo';


const ShopDetailsPage = () => {
  return (
    <main className="shop-detials-page">
      <section className="shop-details-container">
        <ShopBiodata isOwner={false} />

        <ShopInfo isOwner={false} />
      </section>
    </main>
  );
};

export default ShopDetailsPage;
