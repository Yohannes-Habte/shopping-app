import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './views/homePage/Home';
import Contact from './views/contactPage/Contact';
import Register from './views/registerPage/Register';
import Login from './views/loginPage/Login';
import NotFound from './views/notFound/NotFound';
import Products from './views/productsPage/Products';
import EventsPage from './views/eventsPage/EventsPage';
import BestSellings from './views/bestSellingpage/BestSellings';
import Profile from './views/userProtectedPages/profilePage/Profile';
import Forgotpassword from './views/passwordPage/Forgotpassword';
import ResetPassword from './views/passwordPage/ResetPassword';
import UserInbox from './views/inboxPage/UserInbox';
import CheckoutPage from './views/userProtectedPages/checkoutPage/CheckoutPage';
import SellerProtectedRoute from './protectedRoutes/SellerProtectedRoute';
import UserProtectedRoute from './protectedRoutes/UserProtectedRoute';
import ShopSettingsPage from './views/shopPages/shopSettingsPage/ShopSettingsPage';
import ShopLoginPage from './views/shopPages/shopLoginPage/ShopLoginPage';
import CreateNewShop from './views/shopPages/shopCreatePage/CreateNewShop';
import ShopCreateProduct from './views/shopPages/shopCreateProductPage/ShopCreateProduct';
import ShopCreateEvent from './views/shopPages/shopCreateEventPage/ShopCreateEvent';
import ShopProducts from './views/shopPages/shopProductsPage/ShopProducts';
import ShopEvents from './views/shopPages/shopEventsPage/ShopEvents';
import ShopAllCoupons from './views/shopPages/shopAllCouponsPage/ShopAllCoupons';
import SingleProduct from './views/productPage/SingleProduct';
import ShopHome from './views/shopPages/shopHomePage/ShopHome';
import ShopDashboard from './views/shopPages/shopDashboarPage/ShopDashboard';
import ShopPreviewPage from './views/shopPages/shopPreviewPage/ShopPreviewPage';
import PaymentPage from './views/paymentPage/PaymentPage';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './views/orderSuccessPage/OrderSuccess';
import ShopAllOrders from './views/shopPages/shopAllOrdersPage/ShopAllOrders';
import UserOrderDetailsPage from './views/userOrderDetailsPage/UserOrderDetailsPage';
import ShopOrderDetailsPage from './views/shopPages/shopOrderDetailsPage/ShopOrderDetailsPage';

const App = () => {
  const [stripeApikey, setStripeApiKey] = useState('');

  const getStripeApikey = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/payment/stripeapikey`
      );
      setStripeApiKey(data.stripeApikey);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getStripeApikey();
  });

  return (
    <div>
      <Router>
        {stripeApikey && (
          <Elements stripe={loadStripe(stripeApikey)}>
            <Routes>
              <Route
                path="/payment"
                element={
                  <UserProtectedRoute>
                    <PaymentPage />
                  </UserProtectedRoute>
                }
              />
            </Routes>
          </Elements>
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<Forgotpassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productID" element={<SingleProduct />} />
          <Route path="/inbox" element={<UserInbox />} />
          <Route path="/best-sellings" element={<BestSellings />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
          <Route path="/order/success" element={<OrderSuccess />} />

          {/* User Pages */}
          <Route
            path="/profile"
            element={
              <UserProtectedRoute>
                <Profile />
              </UserProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <UserProtectedRoute>
                <CheckoutPage />
              </UserProtectedRoute>
            }
          />

          <Route
            path="/user/order/:id"
            element={
              <UserProtectedRoute>
                <UserOrderDetailsPage />
              </UserProtectedRoute>
            }
          />

          {/* Shope Pages */}
          <Route
            path="/login-shop"
            element={
              <UserProtectedRoute>
                <ShopLoginPage />
              </UserProtectedRoute>
            }
          />

          <Route
            path="/create-shop"
            element={
              <UserProtectedRoute>
                <CreateNewShop />
              </UserProtectedRoute>
            }
          />

          <Route
            path="/dashboard-create-product"
            element={
              <SellerProtectedRoute>
                <ShopCreateProduct />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="/dashboard-create-event"
            element={
              <SellerProtectedRoute>
                <ShopCreateEvent />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="/dashboard-products"
            element={
              <SellerProtectedRoute>
                <ShopProducts />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="/dashboard-events"
            element={
              <SellerProtectedRoute>
                <ShopEvents />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="dashboard-coupouns"
            element={
              <SellerProtectedRoute>
                <ShopAllCoupons />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="/shop/order/:id"
            element={
              <SellerProtectedRoute>
                <ShopOrderDetailsPage />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="dashboard-orders"
            element={
              <SellerProtectedRoute>
                <ShopAllOrders />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <SellerProtectedRoute>
                <ShopSettingsPage />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="/shop/:id"
            element={
              <SellerProtectedRoute>
                <ShopHome />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <SellerProtectedRoute>
                <ShopDashboard />
              </SellerProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>

        <ToastContainer
          position="top-right"
          limit={1}
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </div>
  );
};

export default App;
