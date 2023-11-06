import React, { useState } from 'react';
import './PaymentMethod.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {
  CardNumberElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import PaymentInfo from '../paymentInfo/PaymentInfo';
import CartData from '../cartData/CartData';

const PaymentMethod = () => {
  const navigate = useNavigate();
  // Global state bariables
  const { currentUser } = useSelector((state) => state.user);

  // Local state variables
  const [orderData, setOrderData] = useState([]);
  const [open, setOpen] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem('latestOrder'));
    setOrderData(orderData);
  }, []);

  // Create order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: 'Sunflower',
            amount: {
              currency_code: 'USD',
              value: orderData?.totalPrice,
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: 'NO_SHIPPING',
        },
      })
      .then((orderID) => {
        return orderID;
      });
  };

  // Order
  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: currentUser && currentUser,
    totalPrice: orderData?.totalPrice,
  };

  // On Approve
  const onApprove = async (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;

      let paymentInfo = payer;

      if (paymentInfo !== undefined) {
        paypalPaymentHandler(paymentInfo);
      }
    });
  };

  // Paypal payment handler

  const paypalPaymentHandler = async (paymentInfo) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    order.paymentInfo = {
      id: paymentInfo.payer_id,
      status: 'succeeded',
      type: 'Paypal',
    };

    await axios
      .post(`http//:5000/order/create-order`, order, config)
      .then((res) => {
        setOpen(false);
        navigate('/order/success');
        toast.success('Order successful!');
        localStorage.setItem('cartItems', JSON.stringify([]));
        localStorage.setItem('latestOrder', JSON.stringify([]));
        window.location.reload();
      });
  };

  // payment data
  const paymentData = {
    amount: Math.round(orderData?.totalPrice * 100),
  };

  // Payment handler
  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `http//:5000/payment/process`,
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          order.paymnentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: 'Credit Card',
          };

          await axios
            .post(`http//:5000//order/create-order`, order, config)
            .then((res) => {
              setOpen(false);
              navigate('/order/success');
              toast.success('Order successful!');
              localStorage.setItem('cartItems', JSON.stringify([]));
              localStorage.setItem('latestOrder', JSON.stringify([]));
              window.location.reload();
            });
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };

  // Cash on delivery handler
  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    order.paymentInfo = {
      type: 'Cash On Delivery',
    };

    await axios
      .post(`http//:5000/order/create-order`, order, config)
      .then((res) => {
        setOpen(false);
        navigate('/order/success');
        toast.success('Order successful!');
        localStorage.setItem('cartItems', JSON.stringify([]));
        localStorage.setItem('latestOrder', JSON.stringify([]));
        window.location.reload();
      });
  };

  return (
    <section className="payment-methods-wrapper">
      <article className='title-wrapper'>
        <h1 className="title"> Payment Methods </h1>
        <span className="add-new">Add New </span>
      </article>

      <PaymentInfo
        user={currentUser}
        open={open}
        setOpen={setOpen}
        onApprove={onApprove}
        createOrder={createOrder}
        paymentHandler={paymentHandler}
        cashOnDeliveryHandler={cashOnDeliveryHandler}
      />

      <CartData orderData={orderData} />
    </section>
  );
};

export default PaymentMethod;
