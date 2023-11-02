import React from 'react';
import './Home.scss';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Blog from '../../components/blog/Blog';
import Categories from '../../components/categories/Categories';
import BestDeals from '../../components/bestDeals/BestDeals';
import Event from '../../components/event/Event';
import CountDown from '../../components/countDown/CountDown';
import FeaturedProduct from '../../components/featuredProduct/FeaturedProduct';

const Home = () => {
  return (
    <main className="home-page">
      <Header />
      <section className="home-page-container">
        <CountDown />

        <Blog />

        <Categories />

        <BestDeals />

        <Event />
        <FeaturedProduct />
      </section>

      <Footer />
    </main>
  );
};

export default Home;
