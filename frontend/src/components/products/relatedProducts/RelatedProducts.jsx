import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ProductCard from '../productCard/ProductCard';

const RelatedProducts = ({ product }) => {
  // Global state variables
  const { currentSeller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.product);
  const [productData, setProductData] = useState();

 

  useEffect(() => {
    const infos =
      products &&
      products.filter((product) => product.category === product.category);
    setProductData(infos);
  }, []);

  return product ? (
    <section className={`related-products`}>
      <h2 className={`related-products-title`}>Related Product</h2>
      <div className="related-products-wrapper">
        {productData &&
          productData.map((product, index) => (
            <ProductCard data={product} key={index} />
          ))}
      </div>
    </section>
  ) : null;
};

export default RelatedProducts;
