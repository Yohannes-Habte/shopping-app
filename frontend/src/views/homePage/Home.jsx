import React from 'react';
import './Home.scss';
import Blog from '../../components/blog/Blog';
import BestDeals from '../../components/bestDeals/BestDeals';
import Event from '../../components/event/Event';
import CountDown from '../../components/countDown/CountDown';
import Categories from '../../components/categories/Categories';
import FeaturedProducts from '../../components/products/featuredProducts/FeaturedProducts';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/footer/Footer';


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

        <FeaturedProducts />
      </section>

      <Footer />
    </main>
  );
};

export default Home;
