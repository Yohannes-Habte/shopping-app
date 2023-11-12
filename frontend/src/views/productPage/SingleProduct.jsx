import React, { useEffect, useState } from 'react';
import './SingleProduct.scss';
import { useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductDtails from '../../components/products/productDetails/ProductDtails';
import RelatedProducts from '../../components/products/relatedProducts/RelatedProducts';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/footer/Footer';

const SingleProduct = () => {
  const { id } = useParams();

  // Global variables
  const { products } = useSelector((state) => state.product);
  const { events } = useSelector((state) => state.event);
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get('isEvent');
  console.log('the name of the product is', data);

  // Display products
  useEffect(() => {
    if (eventData !== null) {
      const data = events && events.find((i) => i._id === id);
      setData(data);
    } else {
      const data = products && products.find((i) => i._id === id);
      setData(data);
    }
  }, [products, events]);

  return (
    <main className="single-product-page">
      <Header />

      <section className="single-product-container">
        <h1 className="product-title"> Single Product </h1>

        {/* Single product details */}
        <ProductDtails data={data} />

        {/* Related product details */}
        {!eventData && <>{data && <RelatedProducts data={data} />}</>}
      </section>

      <Footer />
    </main>
  );
};

export default SingleProduct;
