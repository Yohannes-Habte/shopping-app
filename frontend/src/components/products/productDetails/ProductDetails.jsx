import React, { useEffect, useState } from 'react';
import './ProductDtails.scss';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdAddBox } from 'react-icons/md';
import { TbSquareMinusFilled } from 'react-icons/tb';
import { AiOutlineMessage } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import RelatedProducts from '../relatedProducts/RelatedProducts';
import { productsShopFetchSuccess } from '../../../redux/reducers/productReducer';
import ProductInfos from '../productInfos/ProductInfos';
import { addToCart } from '../../../redux/reducers/cartReducer';
import {
  addToWishlist,
  removeFromWishlist,
} from '../../../redux/reducers/wishListReducer';

/**
 1. ProductDetails component receive data from SinglePage.jsx page
 2. The date received by ProductDetails from SinglePage.jsx further transfered to ProductInfos.jsx component
 3. Data is further used for the Ratings.jx component
 */
//
const ProductDetails = ({ data }) => {
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
    dispatch(productsShopFetchSuccess(data && data._id));
    if (wishList && wishList.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishList]);

  // Increasing count by one
  const incrementCount = () => {
    if (data.stock > count) {
      setCount(count + 1);
    } else {
      toast.error(
        'The maximum available in the stock is reached! If you want more, please send us message!'
      );
    }
  };

  // Decreasing count by one
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  // Add wishlist
  const addToWishlistHandler = (id) => {
    setClick(!click);
    dispatch(addToWishlist(id));
  };

  // Remove wishlist
  const removeFromWishlistHandler = (id) => {
    setClick(!click);
    dispatch(removeFromWishlist(id));
  };

  // Add to cart
  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error('Item already in cart!');
    } else if (data.stock < count) {
      toast.error('Product is out of stock!');
    } else {
      const cartData = { ...data, qty: count };
      dispatch(addToCart(cartData));
      toast.success('Item added to cart successfully!');
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
          <img className="image" src={data.images} alt="" />
        </figure>

        {/* Product Description and add to cart */}
        <section className="product-description">
          <h3 className={'subTitle'}> {data.name} </h3>
          <p className="description">{data.description}</p>

          {/* Add to cart aside */}
          <aside className="add-to-cart">
            <div className="amount">
              <TbSquareMinusFilled
                onClick={decrementCount}
                className="icon-add-to-cart"
              />

              <h3 className="amount-subTitle"> {count} </h3>

              <MdAddBox onClick={incrementCount} className="icon-add-to-cart" />
            </div>

            <button
              onClick={() => addToCartHandler(data)}
              className="btn-add-to-cart"
            >
              Add to Cart
            </button>
          </aside>

          {/* Product rating message */}
          <aside className="product-rating">
            <img src="" alt="" />
            <h3> {data.name} </h3>
            <p> Rating (4.5) </p>
            <span onClick={handleMessageSubmit} className="send-message">
              Send Message <AiOutlineMessage />
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

export default ProductDetails;
