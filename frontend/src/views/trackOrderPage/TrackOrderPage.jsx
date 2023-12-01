import React from 'react';
import './TrackOrderPage.scss';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/footer/Footer';
import TrackOrder from '../../components/profile/trackOrder/TrackOrder';

const TrackOrderPage = () => {
  return (
    <main className="track-order-page">
      <Header />
      <section className="track-order-page-container">
        <h1 className="track-order-title">Track Order</h1>
        <TrackOrder />
      </section>
      <Footer />
    </main>
  );
};

export default TrackOrderPage;
