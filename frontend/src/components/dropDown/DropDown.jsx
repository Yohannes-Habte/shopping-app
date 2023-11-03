import React from 'react';
import { useNavigate } from 'react-router-dom';

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate;

  // Handle submit
  const hanleSubmit = (e) => {
    navigate(`/products?category=${e.title}`);
    setDropDown(false);
    window.location.reload();
  };
  return (
    <div>
      {categoriesData &&
        categoriesData.map((product, index) => {
          return (
            <div
              key={index}
              onClick={() => hanleSubmit(product)}
              className="product"
            >
              <figure>
                <img src={product.image} alt="" />
              </figure>
              <h3> {product.title} </h3>
            </div>
          );
        })}
    </div>
  );
};

export default DropDown;
