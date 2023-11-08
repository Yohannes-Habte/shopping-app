import axios from 'axios';
import "./ShopInfo.scss"
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const ShopInfo = ({ isOwner }) => {
  const { id } = useParams();

  // Global state variables
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  // Local state variables
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Get shop info
  useEffect(() => {
    const getShopInfo = async () => {
      try {
        // dispatch(getAllProductsShop(id));
        setIsLoading(true);
        const { data } = await axios.get(
          `http://localhost:5000/shop/get-shop-info/${id}`
        );
        setData(data.shop);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
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

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const averageRating = totalRatings / totalReviewsLength || 0;

  return (
    <div className='shop-info-container'>
      <article className="article-box">
        <figure className="image-container">
          <img src={`${data.image}`} alt="Profile" className="image" />
        </figure>
        <h3 className="subTitle">{data.name}</h3>
        <p className="text description">{data.description}</p>
      </article>

      <article className="article-box">
        <h3 className="subTitle">Address</h3>
        <p className="text address">{data.address}</p>
      </article>

      <article className="article-box">
        <h3 className="subTitle">Phone Number</h3>
        <p className="text phone">{data.phoneNumber}</p>
      </article>

      <div className="article-box">
        <h3 className="subTitle">Total Products</h3>
        <p className="text product-length">{products && products.length}</p>
      </div>

      <article className="article-box">
        <h3 className="subTitle">Shop Ratings</h3>
        <p className="text average">{averageRating}/5</p>
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

export default ShopInfo;
