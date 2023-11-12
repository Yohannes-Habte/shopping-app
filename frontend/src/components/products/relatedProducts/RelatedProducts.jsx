import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../productCart/ProductCard';

const RelatedProducts = ({ data }) => {
  const { products } = useSelector((state) => state.product);
  const [productData, setProductData] = useState();

  useEffect(() => {
    const infos =
      products &&
      products.filter((product) => product.category === data.category);
    setProductData(infos);
  }, []);

  return data ? (
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
