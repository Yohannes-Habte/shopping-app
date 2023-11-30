import React, { useEffect, useState } from 'react';
import './ShopOrderDetails.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  sellerOrdersFail,
  sellerOrdersRequest,
  sellerOrdersSuccess,
} from '../../../redux/reducers/orderReducer';

const ShopOrderDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Global vairables
  const { orders, loading } = useSelector((state) => state.order);
  const { currentSeller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  // Local variables
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchAllShopOrders = async () => {
      try {
        dispatch(sellerOrdersRequest());
        const { data } = await axios.get(
          `http://localhost:5000/api/orders/shop/${currentSeller._id}`
        );
        dispatch(sellerOrdersSuccess(data.orders));
      
      } catch (error) {
        dispatch(sellerOrdersFail(error.response.data.message));
      }
    };
    fetchAllShopOrders();
  }, [dispatch]);

  // Order details
  const data = orders && orders.find((item) => item._id === id);
  console.log('Order data is:', orders);

  // Update order
  const orderUpdateHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/orders/update-order-status/${id}`,
        {
          status,
        },
        { withCredentials: true }
      );

      toast.success('Order updated!');
      navigate('/dashboard-orders');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Refund order
  const refundOrderUpdateHandler = async (e) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/orders/order-refund-success/${id}`,
        {
          status,
        },
        { withCredentials: true }
      );

      toast.success('Order updated!');
      dispatch('getAllOrdersOfShop'(currentSeller._id));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className={`order-detail-wrapper`}>
      {/* order details and list*/}
      <article className="order-details-list-container">
        <h1 className="subTitle">Order Details</h1>

        <p className="order-list">
          <Link to="/dashboard-orders" className="link">
            Order List{' '}
          </Link>
        </p>
      </article>

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
      <div className="order-items-wrapper">
        {data &&
          data?.cart.map((item) => (
            <article key={item._id} className="order">
              <figure className="image-container">
                <img src={item.images} alt="" className="image" />
              </figure>
              <section className="name-and-quantity">
                <h5 className="subTitle">{item.name}</h5>
                <p className="price">
                  PQ: ${item.discountPrice} x {item.qty}
                </p>
              </section>
            </article>
          ))}
      </div>

      <hr className="hr" />
      <h2 className="total-price">
        Total Price: <strong>US${data?.totalPrice}</strong>
      </h2>
      <hr className="hr" />

      {/* Shipping adddress */}
      <section className="shipping-address-wrapper">
        <article className="shipping-box">
          <h4 className="subTitle">Shipping Address:</h4>
          <p className="address">
            {`${data?.shippingAddress.address1} / ${data?.shippingAddress.address2}`}
          </p>
          <p className="address">Country: {data?.shippingAddress.country}</p>
          <p className="address"> State: {data?.shippingAddress.state}</p>
          <p className="address">City:{data?.shippingAddress.city}</p>
          <p className="address"> Phone: {data?.user?.phone}</p>
        </article>

        <h4 className="payment-info">Payment Info:</h4>
        <h4 className="subTitle">
          Status:
          {data?.paymentInfo?.status ? data?.paymentInfo?.status : 'Not Paid'}
        </h4>
      </section>

      {/* Order Processing */}
      <h4 className="order-status">Order Status:</h4>
      {data?.status !== 'Processing refund' &&
        data?.status !== 'Refund Success' && (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="section-option"
          >
            {[
              'Processing',
              'Transferred to delivery partner',
              'Shipping',
              'Received',
              'On the way',
              'Delivered',
            ]
              .slice(
                [
                  'Processing',
                  'Transferred to delivery partner',
                  'Shipping',
                  'Received',
                  'On the way',
                  'Delivered',
                ].indexOf(data?.status)
              )
              .map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
          </select>
        )}

      {/* Refund Processing */}
      {data?.status === 'Processing refund' ||
      data?.status === 'Refund Success' ? (
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="section-option"
        >
          {['Processing refund', 'Refund Success']
            .slice(
              ['Processing refund', 'Refund Success'].indexOf(data?.status)
            )
            .map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
        </select>
      ) : null}

      {/* Update status */}
      <button
        type="submit"
        className={`update-status-btn`}
        onClick={
          data?.status !== 'Processing refund'
            ? orderUpdateHandler
            : refundOrderUpdateHandler
        }
      >
        Update Status
      </button>
    </section>
  );
};

export default ShopOrderDetails;
