import axios from 'axios';
import './ShopBiodata.scss';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ShopBiodata = ({ isOwner }) => {
  // Global state variables
  const { products } = useSelector((state) => state.product);
  const { currentSeller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  // Local state variables
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
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
      } catch (error) {
        console.log(error);
        // dispatch(productsShopFetchFailure(error.response.data.message));
      }
    };
    shopProducts();
  }, []);

  // Get shop info
  useEffect(() => {
    const getShopInfo = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `http://localhost:5000/api/shops/${currentSeller._id}`,
          { withCredentials: true }
        );
        setData(data);
        setIsLoading(false);
      } catch (err) {
        toast.error(err.response.data.message);
        setIsLoading(false);
      }
    };
    getShopInfo();
  }, []);

  // Logout handler
  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/shop/logout`, {
        withCredentials: true,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // How many times a particular product is reviewed
  const totalReviewsLength =
    shopProducts &&
    shopProducts.reduce((acc, product) => acc + product.reviews.length, 0);

  // The total sum of rating done by users
  const totalRatings =
    shopProducts &&
    shopProducts.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const averageRating = totalRatings / totalReviewsLength || 0;

  return (
    <div className="shop-biodata-container">
      <article className="article-box">
        <figure className="image-container">
          <img src={`${data.image}`} alt={data.name} className="image" />
        </figure>
        <h3 className="subTitle">{data.name}</h3>
        <p className="text description">{data.description}</p>
      </article>

      <article className="article-box">
        <h3 className="subTitle">Address</h3>
        <p className="text address">{data.shopAddress}</p>
      </article>

      <article className="article-box">
        <h3 className="subTitle">Phone Number</h3>
        <p className="text phone">{data.phoneNumber}</p>
      </article>

      <div className="article-box">
        <h3 className="subTitle">Total Products</h3>
        <p className="text product-length">
          {shopProducts && shopProducts.length}
        </p>
      </div>

      <article className="article-box">
        <h3 className="subTitle">Shop Ratings</h3>
        <p className="text average"> {averageRating} </p>
      </article>

      <article className="article-box">
        <h3 className="subTitle">Joined On</h3>
        <p className="text createdAt">{data?.createdAt?.slice(0, 10)}</p>
      </article>

      {isOwner && (
        <article className="article-box">
          <Link to="/settings">
            <p className="edit-shop">Edit Shop</p>
          </Link>
          <h3 onClick={logoutHandler} className="logout">
            Log Out
          </h3>
        </article>
      )}
    </div>
  );
};

export default ShopBiodata;
