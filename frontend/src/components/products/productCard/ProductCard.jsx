import React, { useState } from 'react';
import './ProductCard.scss';
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Ratings from '../ratings/Ratings';
import ProductCartDetails from '../productCartDetails/ProductCartDetails';

const ProductCard = ({ product, isEvent }) => {
  // Global state variables
  const { wishList } = useSelector((state) => state.wishList);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Local state variables
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  // Display wishlist
  useEffect(() => {
    if (wishList && wishList.find((i) => i._id === product._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishList]);

  // Remove from wishlist
  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch('removeFromWishlist'(data));
  };

  // Add to wishlist
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
      if (product.stock < 1) {
        toast.error('Product stock limited!');
      } else {
        const cartData = { ...product, qty: 1 };
        dispatch('addTocart'(cartData));
        toast.success('Item added to cart successfully!');
      }
    }
  };

  return (
    <section className="product-card">
      <figure className="image-container">
        <Link
          to={
            isEvent === true
              ? `/product/${product._id}?isEvent=true`
              : `/product/${product._id}`
          }
        >
          <img
            src={`${product.images && product.images}`}
            alt=""
            className="image"
          />
        </Link>
      </figure>

      <Link to={`/shop/preview/${product?.shop._id}`}>
        <h3 className="subTitle"> {product.shop.name} </h3>
      </Link>

      <Link
        to={`${
          isEvent === true
            ? `/product/${product._id}?isEvent=true`
            : `/product/${product._id}`
        }`}
      >
        <h4 className="subTitle">
          {product.name.length > 40
            ? product.name.slice(0, 40) + '...'
            : product.name}
        </h4>

        <Ratings rating={product?.ratings} />

        <article className="product-price-wrapper">
          <h5 className={`subTitle`}>
            Current Price{' '}
            <span className="current-price">
              $
              {product.originalPrice === 0
                ? product.originalPrice
                : product.discountPrice}
            </span>
          </h5>
          <span className={`old-price`}>
          ${product.originalPrice ? product.originalPrice : null}
          </span>

          <p className="sold-product">{product?.sold_out} sold</p>
        </article>
      </Link>

      {/* side options */}
      <figure className="icon-container">
        {click ? (
          <AiFillHeart
            className="icon"
            onClick={() => removeFromWishlistHandler(product)}
            color={click ? 'red' : 'black'}
            title="Remove from wishlist"
          />
        ) : (
          <AiOutlineHeart
            className="icon"
            onClick={() => addToWishlistHandler(product)}
            color={click ? 'active' : 'passive'}
            title="Add to wishlist"
          />
        )}
        <AiOutlineEye
          className="icon"
          onClick={() => setOpen(!open)}
          title="Quick view"
        />
        <AiOutlineShoppingCart
          className="icon"
          onClick={() => addToCartHandler(product._id)}
          title="Add to cart"
        />
        {open ? <ProductCartDetails setOpen={setOpen} data={product} /> : null}
      </figure>
    </section>
  );
};

export default ProductCard;
