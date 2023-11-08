import React, { useEffect, useState } from 'react';
import "./ShopProfile.scss"
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../../products/productCart/ProductCard';
import Ratings from '../../products/ratings/Ratings';

const ShopProfile = ({ isOwner }) => {
  const { id } = useParams();
  // Global state variables
  const { products } = useSelector((state) => state.product);
  const { events } = useSelector((state) => state.event);
  const dispatch = useDispatch();

  // Local state variables
  const [active, setActive] = useState(1);

  // useEffect(() => {
  //   dispatch(getAllProductsShop(id));
  //   dispatch(getAllEventsShop(id));
  // }, [dispatch]);

  // All reviews
  const allReviews =
    products && products.map((product) => product.reviews).flat();

  return (
    <div className="shop-profile-contianer">
      <article className="box-article">
        <div className="items-wrapper">
          <aside className="item" onClick={() => setActive(1)}>
            <h5 className={active === 1 ? 'active' : 'passive'}>
              Shop Products
            </h5>
          </aside>

          <aside className="item" onClick={() => setActive(2)}>
            <h5 className={active === 1 ? 'active' : 'passive'}>
              Running Events
            </h5>
          </aside>

          <aside className="item" onClick={() => setActive(3)}>
            <h5 className={active === 1 ? 'active' : 'passive'}>
              Shop Reviews
            </h5>
          </aside>
        </div>

        {isOwner && (
          <h3 className="subTitle">
            <Link to="/dashboard">
              <span className="go-board">Go Dashboard</span>
            </Link>
          </h3>
        )}
      </article>

      {active === 1 && (
        <div className="shop-products">
          {products &&
            products.map((i, index) => (
              <ProductCard data={i} key={index} isShop={true} />
            ))}
        </div>
      )}

      {active === 2 && (
        <article className="shop-events-wrapper">
          <div className="shop-events">
            {events &&
              events.map((i, index) => (
                <ProductCard
                  data={i}
                  key={index}
                  isShop={true}
                  isEvent={true}
                />
              ))}
          </div>
          {events && events.length === 0 && (
            <h3 className="subTitle">No Events have for this shop!</h3>
          )}
        </article>
      )}

      {active === 3 && (
        <article className="reviews-wrapper">
          {allReviews &&
            allReviews.map((item, index) => (
              <div className="ratings">
                <img
                  src={`${item.user.image}`}
                  className="image"
                  alt=""
                />
                <section className="user-rating">
                  <h3 className="subTitle">{item.user.name}</h3>
                  <Ratings rating={item.rating} />

                  <p className="comment">{item?.comment}</p>
                  <p className="comment">{'2days ago'}</p>
                </section>
              </div>
            ))}
          {allReviews && allReviews.length === 0 && (
            <h3 className="subTitle">No Reviews have for this shop!</h3>
          )}
        </article>
      )}
    </div>
  );
};

export default ShopProfile;
