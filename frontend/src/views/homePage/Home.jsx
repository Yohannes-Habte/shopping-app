import React from 'react';
import './Home.scss';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Blog from '../../components/blog/Blog';
import BestDeals from '../../components/bestDeals/BestDeals';
import Event from '../../components/event/Event';
import CountDown from '../../components/countDown/CountDown';
import Categories from '../../components/categories/Categories';
import FeaturedProducts from '../../components/products/featuredProducts/FeaturedProducts';


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
