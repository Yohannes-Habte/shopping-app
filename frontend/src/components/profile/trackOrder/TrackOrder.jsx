import React, { useEffect } from 'react';
import './TrackOrder.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const TrackOrder = () => {
  // Global state variables
  const { orders } = useSelector((state) => state.order);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    //dispatch(getAllOrdersOfUser(currentUser._id));
  }, [dispatch]);

  // Find orders
  const data = orders && orders.find((order) => order._id === id);

  return (
    <section className="user-orders-wrraper">
      {data && data?.status === 'Processing' ? (
        <h2 className="subTitle">Your Order is processing in shop.</h2>
      ) : data?.status === 'Transferred to delivery partner' ? (
        <h2 className="subTitle">
          Your Order is on the way for delivery partner.
        </h2>
      ) : data?.status === 'Shipping' ? (
        <h2 className="subTitle">
          Your Order is on the way with our delivery partner.
        </h2>
      ) : data?.status === 'Received' ? (
        <h2 className="subTitle">
          Your Order is in your city. Our Delivery person will deliver it.
        </h2>
      ) : data?.status === 'On the way' ? (
        <h2 className="subTitle">
          Our Delivery person is going to deliver your order.
        </h2>
      ) : data?.status === 'Delivered' ? (
        <h2 className="subTitle">Your order is delivered!</h2>
      ) : data?.status === 'Processing refund' ? (
        <h2 className="subTitle">Your refund is processing!</h2>
      ) : data?.status === 'Refund Success' ? (
        <h2 className="subTitle">Your Refund is success!</h2>
      ) : null}
    </section>
  );
};

export default TrackOrder;
