import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RxCross1 } from 'react-icons/rx';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserOrderDetails = () => {
  const { id } = useParams();
  // Global state variables
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Local state variables
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);

  // Display all orders of a user
  useEffect(() => {
    dispatch('getAllOrdersOfUser'(user._id));
  }, [dispatch, user._id]);

  // Find order
  const data = orders && orders.find((item) => item._id === id);

  // Review handler
  const reviewHandler = async (e) => {
    try {
      const newReview = {
        user: user,
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
      dispatch('getAllOrdersOfUser'(user._id));
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
      dispatch('getAllOrdersOfUser'(user._id));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className={`user-order-details-container`}>
      <h1 className="title">Order Details</h1>

      <article className="order-id-and-date">
        <h5 className="subTitle">
          Order ID: <span>#{data?._id?.slice(0, 8)}</span>
        </h5>
        <p className="text-[#00000084]">
          Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
        </p>
      </article>

      {/* order items */}
      {data &&
        data?.cart.map((item, index) => {
          return (
            <div className="review-wrapper">
              <figure className="image-container">
                <img src={`${item.images[0]?.url}`} alt="" className="image" />
              </figure>

              <article className="price-wrapper">
                <h5 className="subTitle">{item.name}</h5>
                <p className="price">
                  US${item.discountPrice} x {item.qty}
                </p>
              </article>
              {!item.isReviewed && data?.status === 'Delivered' ? (
                <button
                  className={`review-btn`}
                  onClick={() => setOpen(true) || setSelectedItem(item)}
                >
                  Write a review
                </button>
              ) : null}
            </div>
          );
        })}

      {/* review popup */}
      {open && (
        <div className="review-container">
          <article className="">
            <RxCross1 onClick={() => setOpen(false)} className="icon" />

            <h2 className="title">Give a Review</h2>

            <div className="w-full flex">
              <img
                src={`${selectedItem?.images[0]?.url}`}
                alt=""
                className="w-[80px] h-[80px]"
              />
              <article>
                <p className="selected-item">{selectedItem?.name}</p>
                <h4 className="subTitle">
                  US${selectedItem?.discountPrice} x {selectedItem?.qty}
                </h4>
              </article>
            </div>

            {/* ratings */}
            <h5 className="subTitle">
              Give a Rating <span className="text-red-500">*</span>
            </h5>
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

            <form className="form">
              <label className="label">
                Write a comment
                <span className="optional">(optional)</span>
              </label>
              <textarea
                name="comment"
                id=""
                cols="20"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How was your product? write your expresion about it!"
                className="text-area"
              ></textarea>
              <button className="comment-btn" type="submit">
                Submit
              </button>
            </form>
          </article>
        </div>
      )}

      <h5 className="subTitle">
        Total Price: <strong>US${data?.totalPrice}</strong>
      </h5>

      <div className="shipping-address">
        <article className="shipping-address">
          <h4 className="subTitle">Shipping Address:</h4>
          <p className="address">
            {data?.shippingAddress.address1 +
              ' ' +
              data?.shippingAddress.address2}
          </p>
          <p className="address">{data?.shippingAddress.country}</p>
          <p className="address">{data?.shippingAddress.city}</p>
          <p className="address">{data?.user?.phoneNumber}</p>
        </article>

        <article className="w-full 800px:w-[40%]">
          <h4 className="subTitle">Payment Info:</h4>
          <p>
            Status:{' '}
            {data?.paymentInfo?.status ? data?.paymentInfo?.status : 'Not Paid'}
          </p>

          {data?.status === 'Delivered' && (
            <p className={`give-refund`} onClick={refundHandler}>
              Give a Refund
            </p>
          )}
        </article>
      </div>

      <Link to="/">
        <button className={`send-message-btn`}>Send Message</button>
      </Link>
    </section>
  );
};

export default UserOrderDetails;
