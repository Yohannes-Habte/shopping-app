import React, { useEffect, useState } from 'react';
import './BestSellings.scss';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/footer/Footer';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../components/products/productCard/ProductCard';

const BestSellings = () => {
  // Global state variables
  const { products } = useSelector((state) => state.product);

  // Local state variables
  const [data, setData] = useState([]);
  console.log('Sorted data are', data);

  useEffect(() => {
    const fetchBestSellingProducts = async () => {
      try {
        const { data } = await axios(`http://localhost:5000/api/products`);

        const allProductsData = data ? [...data] : [];

        const sortedData = allProductsData?.sort(
          (a, b) => b.sold_out - a.sold_out
        );
        setData(sortedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBestSellingProducts();
    //==========
  }, [products]);

  return (
    <main className="best-sellings-page">
      <Header />
      <section className="best-selleings-container">
        <h1 className="best-sellings-title">Best Selling Products </h1>

        <div className="products-wrapper">
          {data &&
            data.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}{' '}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BestSellings;
