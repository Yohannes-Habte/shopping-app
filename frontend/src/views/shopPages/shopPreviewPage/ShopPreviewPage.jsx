import React from 'react';
import './ShopPreviewPage.scss';
import ShopInfo from '../../../components/shop/shopInfo/ShopInfo';
import ShopProfile from '../../../components/shop/shopProfile/ShopProfile';

const ShopPreviewPage = () => {
  return (
    <main className="shop-preview-page">
      <section className="shop-preview-container">
        <ShopInfo isOwner={false} />

        <ShopProfile isOwner={false} />
      </section>
    </main>
  );
};

export default ShopPreviewPage;
