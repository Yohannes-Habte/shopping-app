import React, { useEffect, useState } from 'react';
import './UserOrderDetails.scss';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RxCross1 } from 'react-icons/rx';
import { MdTextsms } from 'react-icons/md';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  userOrdersFail,
  userOrdersRequest,
  userOrdersSuccess,
} from '../../../redux/reducers/orderReducer';

const UserOrderDetails = () => {
  const { id } = useParams();
  // Global state variables
  const { orders } = useSelector((state) => state.order);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Local state variables
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);

  // Display all orders of a user
  useEffect(() => {
    const userOrders = async () => {
      try {
        dispatch(userOrdersRequest());

        const { data } = await axios.get(
          `http://localhost:5000/api/orders/user/${currentUser._id}`
        );

        dispatch(userOrdersSuccess(data.orders));
      } catch (error) {
        dispatch(userOrdersFail(error.response.data.message));
      }
    };
    userOrders();
  }, []);
  // Find order
  const data = orders && orders.find((item) => item._id === id);

  // Review handler
  const reviewHandler = async (e) => {
    try {
      const newReview = {
        user: currentUser,
        rating: rating,
        comment: comment,
        productId: selectedItem?._id,
        orderId: id,
      };
      const { data } = await axios.put(
        `http://localhost:5000/product/create-new-review`,
        newReview,
        { withCredentials: true }
      );

      toast.success(data.message);
      dispatch('getAllOrdersOfUser'(currentUser._id));
      setComment('');
      setRating(null);
      setOpen(false);
    } catch (error) {
      toast.error(error);
    }
  };

  // Refund handler
  const refundHandler = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/order/order-refund/${id}`,
        {
          status: 'Processing refund',
        }
      );
      toast.success(data.message);
      dispatch('getAllOrdersOfUser'(currentUser._id));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className={`user-order-details-container`}>
      <h1 className="title"> Order Details</h1>
      {/* order id and date */}
      <article className="order-id-and-date">
        <p className="order-id">
          Order ID: <span>#{data?._id?.slice(0, 8)}</span>
        </p>
        <h5 className="order-placed-date">
          Order placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
        </h5>
      </article>
      {/* order items */}
      <div className="ordered-items-wrapper">
        {data &&
          data?.cart.map((item, index) => {
            return (
              <section key={index} className="image-name-quantity-wrapper">
                <figure className="image-container">
                  <img src={item.images} alt="" className="image" />
                </figure>

                <article className="name-price-wrapper">
                  <h4 className="subTitle">{item.name}</h4>
                  <p className="price">
                   PQ: ${item.discountPrice} x {item.qty}
                  </p>
                </article>
                {!item.isReviewed && data?.status === 'Delivered' ? (
                  <h4
                    className={`review-btn`}
                    onClick={() => setOpen(true) || setSelectedItem(item)}
                  >
                    Write a review
                  </h4>
                ) : null}
              </section>
            );
          })}
      </div>
      {/* review popup */}
      {open && (
        <div className="modal-container">
          <article className="review-order-wrapper">
            <RxCross1 onClick={() => setOpen(false)} className="close-icon" />

            <h2 className="review-title">Give a Review</h2>

            <div className="selected-item-wrapper">
              <figure className="image-container">
                <img src={selectedItem?.images} alt="" className="image" />
              </figure>

              <article className="name-quantity-rating">
                <h3 className="name">{selectedItem?.name}</h3>
                <p className="quanity">
                  ${selectedItem?.discountPrice} x {selectedItem?.qty}
                </p>

                {/* ratings */}
                <h3 className="rating">
                  Rating <span style={{ color: 'red' }}>*</span>
                </h3>
                <div className="rating-wrapper">
                  {[1, 2, 3, 4, 5].map((i) =>
                    rating >= i ? (
                      <AiFillStar
                        key={i}
                        className="icon"
                        onClick={() => setRating(i)}
                      />
                    ) : (
                      <AiOutlineStar
                        key={i}
                        className="icon"
                        onClick={() => setRating(i)}
                      />
                    )
                  )}
                </div>
              </article>
            </div>

            <form className="form">
              <div className="input-container">
                <textarea
                  name="comment"
                  id="comment"
                  cols="20"
                  rows="5"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="How was your product? Write your feeling about it!"
                  className="text-area"
                ></textarea>
                <label htmlFor="comment" className="input-label">
                  Write a comment
                </label>
                <span className="input-highlight"></span>
              </div>
              <button className="comment-btn" type="submit">
                Submit
              </button>
            </form>
          </article>
        </div>
      )}
      <hr className="hr" />
      {/* Total Price */}
      <h2 className="total-price">
        Total Price: <strong>${data?.totalPrice}</strong>
      </h2>
      <hr className="hr" />
      {/* Shopping address */}
      <div className="shipping-paymentinfo-refund-container">
        <article className="shipping-address">
          <h4 className="subTitle">Shipping Address:</h4>
          <p className="address">
            {`${data?.shippingAddress.address1} / ${data?.shippingAddress.address2}`}
          </p>
          <p className="address">{data?.shippingAddress.country}</p>
          <p className="address">{data?.shippingAddress.state}</p>
          <p className="address">{data?.shippingAddress.city}</p>
          <p className="address">{data?.user?.phoneNumber}</p>
        </article>

        <article className="status-wrapper">
          <h4 className="subTitle">Payment Info:</h4>
          <p>
            Status:
            {data?.paymentInfo?.status ? data?.paymentInfo?.status : 'Not Paid'}
          </p>

          {data?.status === 'Delivered' && (
            <button className={`give-refund-btn`} onClick={refundHandler}>
              Give a Refund
            </button>
          )}
        </article>
      </div>
      <Link to="/">
        <button className={`send-message-btn`}>Send Message</button>
      </Link>{' '}
    </section>
  );
};

export default UserOrderDetails;
