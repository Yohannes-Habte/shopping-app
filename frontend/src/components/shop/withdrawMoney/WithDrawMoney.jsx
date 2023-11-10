import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RxCross1 } from 'react-icons/rx';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AiFillTags, AiOutlineDelete } from 'react-icons/ai';

const WithdrawMoney = () => {
  // Global state variables
  const dispatch = useDispatch();
  const { currentSeller } = useSelector((state) => state.seller);

  // Local state variables
  const [open, setOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(50);
  const [bankInfo, setBankInfo] = useState({
    bankName: '',
    bankCountry: '',
    bankSwiftCode: null,
    bankAccountNumber: null,
    bankHolderName: '',
    bankAddress: '',
  });

  // Display all orders of a shop
  useEffect(() => {
    dispatch('getAllOrdersOfShop'(currentSeller._id));
  }, [dispatch]);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const withdrawMethod = {
        bankName: bankInfo.bankName,
        bankCountry: bankInfo.bankCountry,
        bankSwiftCode: bankInfo.bankSwiftCode,
        bankAccountNumber: bankInfo.bankAccountNumber,
        bankHolderName: bankInfo.bankHolderName,
        bankAddress: bankInfo.bankAddress,
      };
      const { data } = await axios.put(
        `http/shop/update-payment-methods`,
        {
          withdrawMethod,
        },
        { withCredentials: true }
      );
      setPaymentMethod(false);

      toast.success('Withdraw method added successfully!');

      dispatch('loadSeller'());

      setBankInfo({
        bankName: '',
        bankCountry: '',
        bankSwiftCode: null,
        bankAccountNumber: null,
        bankHolderName: '',
        bankAddress: '',
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  // Delete handler
  const deleteHandler = async () => {
    try {
      const { data } = await axios.delete(`http/shop/delete-withdraw-method`, {
        withCredentials: true,
      });

      toast.success('Withdraw method deleted successfully!');
      dispatch('loadSeller'());
    } catch (error) {
      toast.error('You not have enough balance to withdraw!');
    }
  };

  // Error
  const error = () => {};

  // Withdraw handler
  const withdrawHandler = async () => {
    try {
      if (withdrawAmount < 50 || withdrawAmount > availableBalance) {
        toast.error("You can't withdraw this amount!");
      } else {
        const amount = withdrawAmount;
        const { data } = await axios.post(
          `http/withdraw/create-withdraw-request`,
          { amount },
          { withCredentials: true }
        );

        toast.success('Withdraw money request is successful!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const availableBalance = currentSeller?.availableBalance.toFixed(2);

  return (
    <section className="withdraw-money-container">
      <h1 className="title"> Withdraw Money</h1>
      <article className="box-wrapper">
        <h5 className="subTitle">Available Balance: ${availableBalance}</h5>
        <p
          className={`withdraw`}
          onClick={() => (availableBalance < 50 ? error() : setOpen(true))}
        >
          Withdraw
        </p>
      </article>
      {open && (
        <div className={paymentMethod ? 'payment-method' : 'no-method'}>
          <RxCross1
            onClick={() => setOpen(false) || setPaymentMethod(false)}
            className="icon"
          />

          {paymentMethod ? (
            <section className="form-wrapper">
              <h3 className="subTitle">Add new Withdraw Method:</h3>
              <form onSubmit={handleSubmit} className="form">
                {/*  Bank Name */}
                <div className="input-container">
                  <AiFillTags className="icon" />
                  <input
                    type="text"
                    name="bankName"
                    id="bankName"
                    autoComplete="bankName"
                    required
                    value={bankInfo.bankName}
                    onChange={(e) =>
                      setBankInfo({ ...bankInfo, bankName: e.target.value })
                    }
                    placeholder="Enter your Bank name"
                    className="input-field"
                  />
                  <label htmlFor="bankName" className="input-label">
                    Bank Name
                  </label>
                  <span className="input-highlight"></span>
                </div>

                {/*   Bank Country */}
                <div className="input-container">
                  <AiFillTags className="icon" />
                  <input
                    type="text"
                    name="bankCountry"
                    id="bankCountry"
                    autoComplete="bankCountry"
                    required
                    value={bankInfo.bankCountry}
                    onChange={(e) =>
                      setBankInfo({
                        ...bankInfo,
                        bankCountry: e.target.value,
                      })
                    }
                    placeholder="Enter your bank Country"
                    className="input-field"
                  />
                  <label htmlFor="bankCountry" className="input-label">
                    Bank Name
                  </label>
                  <span className="input-highlight"></span>
                </div>

                {/*   Bank Swift Code */}
                <div className="input-container">
                  <AiFillTags className="icon" />
                  <input
                    type="text"
                    name="bankSwiftCode"
                    id="bankSwiftCode"
                    autoComplete="bankSwiftCode"
                    required
                    value={bankInfo.bankSwiftCode}
                    onChange={(e) =>
                      setBankInfo({
                        ...bankInfo,
                        bankSwiftCode: e.target.value,
                      })
                    }
                    placeholder="Enter your Bank Swift Code!"
                    className="input-field"
                  />
                  <label htmlFor="bankSwiftCode" className="input-label">
                    Bank Swift Code
                  </label>
                  <span className="input-highlight"></span>
                </div>

                {/* Bank Account Number*/}
                <div className="input-container">
                  <AiFillTags className="icon" />
                  <input
                    type="text"
                    name="bankAccountNumber"
                    id="bankAccountNumber"
                    autoComplete="bankAccountNumber"
                    required
                    value={bankInfo.bankAccountNumber}
                    onChange={(e) =>
                      setBankInfo({
                        ...bankInfo,
                        bankAccountNumber: e.target.value,
                      })
                    }
                    placeholder="Enter your bank account number!"
                    className="input-field"
                  />
                  <label htmlFor="bankAccountNumber" className="input-label">
                    Bank Account Number
                  </label>
                  <span className="input-highlight"></span>
                </div>

                {/* Bank Holder Name */}
                <div className="input-container">
                  <AiFillTags className="icon" />
                  <input
                    type="text"
                    name="bankHolderName"
                    id="bankHolderName"
                    autoComplete="bankHolderName"
                    required
                    value={bankInfo.bankHolderName}
                    onChange={(e) =>
                      setBankInfo({
                        ...bankInfo,
                        bankHolderName: e.target.value,
                      })
                    }
                    placeholder="Enter your bank Holder name!"
                    className="input-field"
                  />
                  <label htmlFor="bankHolderName" className="input-label">
                    Bank Holder Name
                  </label>
                  <span className="input-highlight"></span>
                </div>

                {/*  Bank Address */}
                <div className="input-container">
                  <AiFillTags className="icon" />
                  <input
                    type="text"
                    name="bankAddress"
                    id="bankAddress"
                    autoComplete="bankAddress"
                    required
                    value={bankInfo.bankAddress}
                    onChange={(e) =>
                      setBankInfo({
                        ...bankInfo,
                        bankAddress: e.target.value,
                      })
                    }
                    placeholder="Enter your bank address!"
                    className="input-field"
                  />
                  <label htmlFor="bankAddress" className="input-label">
                    Bank Address
                  </label>
                  <span className="input-highlight"></span>
                </div>

                <button type="submit" className={`button`}>
                  Add
                </button>
              </form>
            </section>
          ) : (
            <section className="withdraw-method-wrapper">
              <h3 className="subTitle">Available Withdraw Methods:</h3>

              {currentSeller && currentSeller?.withdrawMethod ? (
                <section>
                  <article className="account-number">
                    <h5 className="subTitle">
                      Account Number:{' '}
                      {'*'.repeat(
                        currentSeller?.withdrawMethod.bankAccountNumber.length -
                          3
                      ) +
                        currentSeller?.withdrawMethod.bankAccountNumber.slice(
                          -3
                        )}
                    </h5>
                    <p className="bank-name">
                      Bank Name: {currentSeller?.withdrawMethod.bankName}
                    </p>
                  </article>

                  <AiOutlineDelete
                    className="icon"
                    onClick={() => deleteHandler()}
                  />

                  <h3 className="subTitle">
                    Available Balance: {availableBalance}$
                  </h3>

                  <article className="input-container">
                    <input
                      type="number"
                      placeholder="Amount..."
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="input-field"
                    />
                    <h4 className={`subTitle`} onClick={withdrawHandler}>
                      Withdraw
                    </h4>
                  </article>
                </section>
              ) : (
                <section className="no-withdraw-method-wrapper">
                  <h3 className="subTitle">No Withdraw Methods available!</h3>

                  <span
                    className={`add-new`}
                    onClick={() => setPaymentMethod(true)}
                  >
                    Add new
                  </span>
                </section>
              )}
            </section>
          )}
        </div>
      )}
    </section>
  );
};

export default WithdrawMoney;
