import React, { useEffect, useState } from 'react';
import './ShopProfile.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Ratings from '../../products/ratings/Ratings';
import { eventsShopFetchSuccess } from '../../../redux/reducers/eventReducer';
import { productsShopFetchSuccess } from '../../../redux/reducers/productReducer';
import ProductCard from '../../products/productCard/ProductCard';
import axios from 'axios';

// The isOwner comes from ShopHome.jsx page
const ShopProfile = ({ isOwner }) => {
  const { id } = useParams();
  // Global state variables
  const { currentSeller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.product);
  const { events } = useSelector((state) => state.event);
  const dispatch = useDispatch();

  // Local state variables
  const [active, setActive] = useState(1);
  const [shopProducts, setShopProducts] = useState([]);

  // Display products for a single shop
  useEffect(() => {
    const shopProducts = async () => {
      try {
        // dispatch(productsShopFetchStart());
        const { data } = await axios.get(
          `http://localhost:5000/api/products/${currentSeller._id}/shop-products`
        );
        // dispatch(productsShopFetchSuccess(data));
        setShopProducts(data);
        console.log('Selam shop products are', data);
      } catch (error) {
        console.log(error);
        // dispatch(productsShopFetchFailure(error.response.data.message));
      }
    };
    shopProducts();
  }, []);

  useEffect(() => {
    dispatch(eventsShopFetchSuccess(id));
    dispatch(productsShopFetchSuccess(id));
  }, [dispatch]);

  // All reviews
  // const allReviews =
  //   products && products.map((product) => product.reviews).flat();

  return (
    <section className="shop-profile-contianer">
      <h1 className='title'> {currentSeller.name} Shop </h1>
      <article className="box-article">
        <div className="items-wrapper">
          <aside className="item" onClick={() => setActive(1)}>
            <h5 className={active === 1 ? 'active' : 'passive'}>
              Shop Products
            </h5>
          </aside>

          <aside className="item" onClick={() => setActive(2)}>
            <h5 className={active === 2 ? 'active' : 'passive'}>
              Running Events
            </h5>
          </aside>

          <aside className="item" onClick={() => setActive(3)}>
            <h5 className={active === 3 ? 'active' : 'passive'}>
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
          {shopProducts &&
            shopProducts.map((product, index) => (
              <ProductCard product={product} key={index} isShop={true} />
            ))}
        </div>
      )}

      {active === 2 && (
        <article className="shop-events-wrapper">
          <div className="shop-events">
            {/* {events &&
              events.map((i, index) => (
                <ProductCard
                  data={i}
                  key={index}
                  isShop={true}
                  isEvent={true}
                />
              ))} */}
          </div>
          {events && events.length === 0 && (
            <h3 className="subTitle">No Events have for this shop!</h3>
          )}
        </article>
      )}

      {active === 3 && (
        <article className="reviews-wrapper">
          {'allReviews' &&
            'allReviews'.map((item, index) => (
              <div className="ratings">
                <img src={`${item.user.image}`} className="image" alt="" />
                <section className="user-rating">
                  <h3 className="subTitle">{item.user.name}</h3>
                  <Ratings rating={item.rating} />

                  <p className="comment">{item?.comment}</p>
                  <p className="comment">{'2days ago'}</p>
                </section>
              </div>
            ))}
          {'allReviews' && 'allReviews'.length === 0 && (
            <h3 className="subTitle">No Reviews have for this shop!</h3>
          )}
        </article>
      )}
    </section>
  );
};

export default ShopProfile;
