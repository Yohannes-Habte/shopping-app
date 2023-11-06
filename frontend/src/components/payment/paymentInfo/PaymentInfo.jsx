import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from '@stripe/react-stripe-js';

const PaymentInfo = ({
  user,
  open,
  setOpen,
  onApprove,
  createOrder,
  paymentHandler,
  cashOnDeliveryHandler,
}) => {
  // Local state variables
  const [select, setSelect] = useState(1);

  return (
    <div className="payment-info-wrapper">
      {/* pay with card */}
      <div className="cart-payment-wrapper">
        <article className="cart-payment">
          <div className="seletected-wrapper" onClick={() => setSelect(1)}>
            {select === 1 ? <div className="seletected" /> : null}
          </div>
          <h4 className="subTitle">Pay with Debit/credit card</h4>
        </article>

        {select === 1 ? (
          <div className="w-full flex border-b">
            <form className="w-full" onSubmit={paymentHandler}>
              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Name On Card</label>
                  <input
                    required
                    placeholder={user && user.name}
                    className={`#444`}
                    value={user && user.name}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">Exp Date</label>
                  <CardExpiryElement
                    className={``}
                    options={{
                      style: {
                        base: {
                          fontSize: '19px',
                          lineHeight: 1.5,
                          color: '#444',
                        },
                        empty: {
                          color: '#3a120a',
                          backgroundColor: 'transparent',
                          '::placeholder': {
                            color: '#444',
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Card Number</label>
                  <CardNumberElement
                    className={`x] !w-[95%]`}
                    options={{
                      style: {
                        base: {
                          fontSize: '19px',
                          lineHeight: 1.5,
                          color: '#444',
                        },
                        empty: {
                          color: '#3a120a',
                          backgroundColor: 'transparent',
                          '::placeholder': {
                            color: '#444',
                          },
                        },
                      },
                    }}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">CVV</label>
                  <CardCvcElement
                    className={`px]`}
                    options={{
                      style: {
                        base: {
                          fontSize: '19px',
                          lineHeight: 1.5,
                          color: '#444',
                        },
                        empty: {
                          color: '#3a120a',
                          backgroundColor: 'transparent',
                          '::placeholder': {
                            color: '#444',
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
              <input
                type="submit"
                value="Submit"
                className={`3b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              />
            </form>
          </div>
        ) : null}
      </div>

      {/* paypal payment */}
      <div>
        <article className="paypal-payment-wrapper">
          <div className="seletected-wrapper" onClick={() => setSelect(2)}>
            {select === 2 ? <div className="selected" /> : null}
          </div>
          <h4 className="subTitle">Pay with Paypal</h4>
        </article>

        {/* pay with paypal payement */}
        {select === 2 ? (
          <article className="pay-using-paypal-wrapper">
            <h4 className={`subTitle`} onClick={() => setOpen(true)}>
              Pay Now
            </h4>
            {open && (
              <div className="">
                <div className="">
                  <RxCross1 className="icon" onClick={() => setOpen(false)} />
                </div>
                <PayPalScriptProvider
                  options={{
                    'client-id':
                      'Aczac4Ry9_QA1t4c7TKH9UusH3RTe6onyICPoCToHG10kjlNdI-qwobbW9JAHzaRQwFMn2-k660853jn',
                  }}
                >
                  <PayPalButtons
                    style={{ layout: 'vertical' }}
                    onApprove={onApprove}
                    createOrder={createOrder}
                  />
                </PayPalScriptProvider>
              </div>
            )}
          </article>
        ) : null}
      </div>

      {/* cash on delivery */}
      <div>
        <article className="cash-on-delivery">
          <div className="seletected-wrapper" onClick={() => setSelect(3)}>
            {select === 3 ? <div className="selected" /> : null}
          </div>
          <h4 className="subTitle">Cash on Delivery</h4>
        </article>

        {/* cash on delivery */}
        {select === 3 ? (
          <form
            className="cash-on-deliver-form"
            onSubmit={cashOnDeliveryHandler}
          >
            <input type="submit" value="Confirm" className="" />
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default PaymentInfo;
