import React from 'react';
import './Home.scss';
import Blog from '../../components/blog/Blog';
import Categories from '../../components/categories/Categories';
import FeaturedProducts from '../../components/products/featuredProducts/FeaturedProducts';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/footer/Footer';
import CountDown from '../../components/events/countDown/CountDown';
import Event from '../../components/events/event/Event';
import BestDealProducts from '../../components/products/bestDealProducts/BestDealProducts';

const Home = () => {
  return (
    <main className="home-page">
      <Header />
      <section className="home-page-container">
        <CountDown />

        <Blog />

        <Categories />

        <BestDealProducts />

        <Event />

        <FeaturedProducts />
      </section>

      <Footer />
    </main>
  );
};

export default Home;
