import React, { useEffect, useState } from 'react';
import './SingleProduct.scss';
import { useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RelatedProducts from '../../components/products/relatedProducts/RelatedProducts';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/footer/Footer';
import ProductDetails from '../../components/products/productDetails/ProductDetails';
import axios from 'axios';

const SingleProduct = () => {
  const { productID } = useParams();

  // Global state variables
  const { products } = useSelector((state) => state.product);
  const { currentSeller } = useSelector((state) => state.seller);

  // Global variables
  const [productData, setProductData] = useState([]);
  const { events } = useSelector((state) => state.event);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get('isEvent');

  // Display products
  // useEffect(() => {
  //   if (eventData !== null) {
  //     const data = events && events.find((i) => i._id === id);
  //     setData(data);
  //   } else {
  //     const data = products && products.find((i) => i._id === id);
  //     setData(data);
  //   }
  // }, [products, events]);

  // Display products for a single shop
  useEffect(() => {
    const shopProducts = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/products/${currentSeller._id}/shop-products`
        );
        setProductData(data);
      } catch (error) {
        console.log(error);
      }
    };
    shopProducts();
  }, []);

  // Find a single product
  const foundProduct = productData.find((product) => product._id === productID);

  return (
    <main className="single-product-page">
      <Header />

      <section className="single-product-container">
        <h1 className="product-title"> Single Product </h1>

        {/* Single product details */}
        {productData && foundProduct && <ProductDetails data={foundProduct} />}

        {/* Related product details */}
        {!eventData && (
          <>
            {productData &&
              productData.map((product) => {
                return <RelatedProducts data={product} key={product._id} />;
              })}
          </>
        )}
      </section>

      <Footer />
    </main>
  );
};

export default SingleProduct;