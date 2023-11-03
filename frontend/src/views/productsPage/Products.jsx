import React from 'react';
import './Products.scss';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

const Products = () => {
  return (
    <main className="products-page">
      <Header />

      <section className="products-container">
        <h1 className="products-title"> Products Title </h1>
      </section>

      <Footer />
    </main>
  );
};

export default Products;
