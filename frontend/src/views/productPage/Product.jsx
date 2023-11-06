import React, { useEffect, useState } from 'react';
import './Product.scss';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductDtails from '../../components/products/productDetails/ProductDtails';
import RelatedProducts from '../../components/products/relatedProducts/RelatedProducts';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/footer/Footer';

const Product = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Global variables
  const { allProducts } = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.events);
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get('isEvent');

  // Display products
  useEffect(() => {
    if (eventData !== null) {
      const data = allEvents && allEvents.find((i) => i._id === id);
      setData(data);
    } else {
      const data = allProducts && allProducts.find((i) => i._id === id);
      setData(data);
    }
  }, [allProducts, allEvents]);

  return (
    <main className="single-product-page">
      <Header />

      <section className="single-product-container">
        <h1 className="product-title"> Sinle Product</h1>

        <ProductDtails data={data} />
        {!eventData && <>{data && <RelatedProducts data={data} />}</>}
      </section>

      <Footer />
    </main>
  );
};

export default Product;
