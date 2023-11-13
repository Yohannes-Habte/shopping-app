import React, { useState } from 'react'
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
            Seller Information
          </h5>
        </article>
  
        {active === 1 ? (
          <div className="active-tab">
            <p className="description">
              {/* {data.description} */}
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. In,
              voluptas voluptate sequi atque eveniet architecto quam expedita.
            </p>
          </div>
        ) : null}
  
        {active === 2 ? (
          <div className="active-tab">
            {data &&
              data.reviews.map((item, index) => (
                <div className="comment-container">
                  <img
                    src={`${item.user.avatar?.url}`}
                    alt=""
                    className="image"
                  />
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
            <div className="average-rating-wrapper">
              <Link to={`/shop/preview/${data.shop._id}`}>
                <div className="preview">
                  <img
                    src={`${data?.shop?.avatar?.url}`}
                    className="image"
                    alt=""
                  />
                  <div className="pl-3">
                    <h3 className={`shop-name`}>{data.shop.name}</h3>
                    <h5 className="shop-rating">({'averageRating'}/5) Ratings</h5>
                  </div>
                </div>
              </Link>
              <p className="pt-2">{data.shop.description}</p>
            </div>
            <div className="created-at-wrapper">
              <div className="text-left">
                <h5 className="subTitle">
                  Joined on:
                  <span className="shop">
                    {data.shop?.createdAt?.slice(0, 10)}
                  </span>
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
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

export default ProductInfos