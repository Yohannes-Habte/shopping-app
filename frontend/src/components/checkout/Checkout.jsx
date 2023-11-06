import React, { useEffect, useState } from 'react';
import './Checkout.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import Shipping from './shipping/Shipping';
import CartInfo from './cartInfo/CartInfo';

const Checkout = () => {
  const navigate = useNavigate();
  // Global state variables
  const { currentUser } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  // Local state variables
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [zipCode, setZipCode] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);

  // Display
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Submit payment
  const paymentSubmit = () => {
    if (
      address1 === '' ||
      address2 === '' ||
      zipCode === null ||
      country === '' ||
      city === ''
    ) {
      toast.error('Please choose your delivery address!');
    } else {
      const shippingAddress = {
        address1,
        address2,
        zipCode,
        country,
        city,
      };

      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        discountPrice,
        shippingAddress,
        currentUser,
      };

      // update local storage with the updated orders array
      localStorage.setItem('latestOrder', JSON.stringify(orderData));
      navigate('/payment');
    }
  };

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  // this is shipping cost variable
  const shipping = subTotalPrice * 0.1;

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = couponCode;

    await axios.get(`/coupon/get-coupon-value/${name}`).then((res) => {
      const shopId = res.data.couponCode?.shopId;
      const couponCodeValue = res.data.couponCode?.value;
      if (res.data.couponCode !== null) {
        const isCouponValid =
          cart && cart.filter((item) => item.shopId === shopId);

        if (isCouponValid.length === 0) {
          toast.error('Coupon code is not valid for this shop');
          setCouponCode('');
        } else {
          const eligiblePrice = isCouponValid.reduce(
            (acc, item) => acc + item.qty * item.discountPrice,
            0
          );
          const discountPrice = (eligiblePrice * couponCodeValue) / 100;
          setDiscountPrice(discountPrice);
          setCouponCodeData(res.data.couponCode);
          setCouponCode('');
        }
      }
      if (res.data.couponCode === null) {
        toast.error("Coupon code doesn't exists!");
        setCouponCode('');
      }
    });
  };

  // Discount percentage
  const discountPercentenge = couponCodeData ? discountPrice : '';

  // Total price
  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentenge).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  console.log(discountPercentenge);

  return (
    <section className="cart-wrapper">
      <Shipping
        user={currentUser}
        country={country}
        setCountry={setCountry}
        city={city}
        setCity={setCity}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        address1={address1}
        setAddress1={setAddress1}
        address2={address2}
        setAddress2={setAddress2}
        zipCode={zipCode}
        setZipCode={setZipCode}
      />

      <CartInfo
        handleSubmit={handleSubmit}
        totalPrice={totalPrice}
        shipping={shipping}
        subTotalPrice={subTotalPrice}
        couponCode={couponCode}
        setCouponCode={setCouponCode}
        discountPercentenge={discountPercentenge}
      />

      <h5 onClick={paymentSubmit} className="payment">
        Proceed to Payment
      </h5>
    </section>
  );
};

export default Checkout;
