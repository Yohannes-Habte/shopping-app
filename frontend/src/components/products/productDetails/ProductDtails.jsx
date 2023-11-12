import React, { useEffect, useState } from 'react';
import './ProductDtails.scss';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { MdAddBox } from 'react-icons/md';
import { TbSquareMinusFilled } from 'react-icons/tb';
import { AiOutlineMessage } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import RelatedProducts from '../relatedProducts/RelatedProducts';
import Ratings from '../ratings/Ratings';
import Header from '../../layout/header/Header';
import Footer from '../../layout/footer/Footer';
import { productsShopFetchSuccess } from '../../../redux/reducers/productReducer';

const ProductDtails = ({ data }) => {
  const navigate = useNavigate();

  // Global state variables
  const { currentUser } = useSelector((state) => state.user);
  const { wishList } = useSelector((state) => state.wishList);
  const { cart } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  // Local variables
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);

  // Display all products for a shop
  useEffect(() => {
    dispatch(productsShopFetchSuccess(data && data?.shop._id));
    if (wishList && wishList.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishList]);

  // Increasing count by one
  const incrementCount = () => {
    setCount(count + 1);
  };

  // Decreasing count by one
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch('removeFromWishlist'(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch('addToWishlist'(data));
  };

  // Add to cart
  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error('Item already in cart!');
    } else {
      if (data.stock < 1) {
        toast.error('Product stock limited!');
      } else {
        const cartData = { ...data, qty: count };
        dispatch('addTocart'(cartData));
        toast.success('Item added to cart successfully!');
      }
    }
  };

  // const totalReviewsLength =
  //   products &&
  //   products.reduce((acc, product) => acc + product.reviews.length, 0);

  // const totalRatings =
  //   products &&
  //   products.reduce(
  //     (acc, product) =>
  //       acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
  //     0
  //   );

  // const avg = totalRatings / totalReviewsLength || 0;

  // const averageRating = avg.toFixed(2);

  const handleMessageSubmit = async () => {
    if ('isAuthenticated') {
      //   const groupTitle = data._id + user._id;
      //   const userId = user._id;
      //   const sellerId = data.shop._id;
      await axios
        .post(`/conversation/create-new-conversation`, {
          //   groupTitle,
          //   userId,
          //   sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error('Please login to create a conversation');
    }
  };

  return (
    <section className="single-product-details">
      <article className="product-details">
        {/* Product image */}
        <figure className="image-container">
          <img className="image" src={'productImage'} alt="" />
        </figure>

        {/* Product Description and add to cart */}
        <section className="product-description">
          <h3 className={'subTitle'}>Product Title </h3>
          <p className="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
            similique laudantium. Accusamus temporibus consectetur, et vel iusto
            pariatur excepturi fugiat mollitia illum, dolor eligendi libero
            assumenda deserunt minus totam perspiciatis!
          </p>

          {/* Add to cart aside */}
          <aside className="add-to-cart">
            <div className="amount">
              <TbSquareMinusFilled className="icon-add-to-cart" />
              <h3 className="amount-subTitle"> 1 </h3>
              <MdAddBox className="icon-add-to-cart" />
            </div>
            <button className="btn-add-to-cart">Add to Cart</button>
          </aside>

          {/* Product rating message */}
          <aside className="product-rating">
            <img src="" alt="" />
            <h3>Product name</h3>
            <p> Rating (4.5) </p>
            <span onClick={handleMessageSubmit} className="send-message">
              {' '}
              Send Message <AiOutlineMessage />{' '}
            </span>
          </aside>
        </section>
      </article>

      <ProductInfos
        data={data}
        products={products}
        // totalReviewsLength={totalReviewsLength}
        // averageRating={averageRating}
      />

      {/* Include related Products */}
      <RelatedProducts />
    </section>
  );
};

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

export default ProductDtails;
