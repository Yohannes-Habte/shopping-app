import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './views/homePage/Home';
import Contact from './views/contactPage/Contact';
import Register from './views/registerPage/Register';
import Login from './views/loginPage/Login';
import NotFound from './views/notFound/NotFound';
import Products from './views/productsPage/Products';
import Events from './views/eventsPage/Events';
import BestSellings from './views/bestSellingpage/BestSellings';
import Orders from './views/ordersPage/Orders';
import Profile from './views/userProtectedPages/profilePage/Profile';
import Forgotpassword from './views/passwordPage/Forgotpassword';
import ResetPassword from './views/passwordPage/ResetPassword';
import UserInbox from './views/inboxPage/UserInbox';
import Cart from './views/userProtectedPages/cartPage/Cart';

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

const App = () => {
  return (
    <div>
      <Router>
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

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<Forgotpassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productID" element={<SingleProduct />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/inbox" element={<UserInbox />} />
          <Route path="/best-sellings" element={<BestSellings />} />
          <Route path="/events" element={<Events />} />

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
                <Cart />
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
      </Router>
    </div>
  );
};

export default App;
