import React, { useState } from 'react';
import './ProductInfos.scss';
import Ratings from '../ratings/Ratings';
import { Link } from 'react-router-dom';

const ProductInfos = ({ data, product, totalReviewsLength, averageRating }) => {
  const [active, setActive] = useState(1);

  return (
    <div className="product-infos">
      <article className="tabs-wrapper">
        <h5
          className={active === 1 ? 'active' : 'passive'}
          onClick={() => setActive(1)}
        >
          Product Details
        </h5>

        <h5
          className={active === 2 ? 'active' : 'passive'}
          onClick={() => setActive(2)}
        >
          Product Reviews
        </h5>

        <h5
          className={active === 3 ? 'active' : 'passive'}
          onClick={() => setActive(3)}
        >
          Shop Information
        </h5>
      </article>

      {active === 1 ? (
        <div className="active-tab">
          <p className="description">{data.description}</p>
        </div>
      ) : null}

      {active === 2 ? (
        <div className="active-tab">
          {data &&
            data.reviews.map((item) => (
              <div className="comment-container">
                <img src={`${item.user.image}`} alt="" className="image" />
                <div className="rating-wrapper ">
                  <article className="rating">
                    <h3 className="subTitle">{item.user.name}</h3>
                    <Ratings rating={data?.ratings} />
                  </article>
                  <p className="comment">{item.comment}</p>
                </div>
              </div>
            ))}

          <div className="no-product-review">
            {data && data.reviews.length === 0 && (
              <h5>No Reviews have for this product!</h5>
            )}
          </div>
        </div>
      ) : null}

      {active === 3 && (
        <div className="active-tab">
          <article className="preview">
            <figure className="image-container">
              <Link to={`/shop/preview/${data._id}`} className="link">
                <img
                  src={`${data?.images}`}
                  alt={data.name}
                  className="image"
                />
              </Link>
            </figure>

            <Link to={`/shop/preview/${data.shop._id}`} className="link">
              <h3 className={`shop-name`}>{data.name}</h3>
              <p className="shop-rating">({'averageRating'}/5) Ratings</p>
              <p className="paragraph">{data.description}</p>{' '}
            </Link>
          </article>

          <article className="text-right">
            <h5 className="subTitle">
              Joined on:
              <span className="shop">{data.createdAt?.slice(0, 10)}</span>
            </h5>
            <h5 className="subTitle">
              Total Products:
              <span className="length">
                {/* {products && products.length} */}
              </span>
            </h5>
            <h5 className="subTitle">
              Total Reviews:
              <span className="total-review-length">
                {'totalReviewsLength'}
              </span>
            </h5>
            <Link to="/">
              <h4 className="visit-shop">Visit Shop</h4>
            </Link>
          </article>
        </div>
      )}
    </div>
  );
};

export default ProductInfos;
