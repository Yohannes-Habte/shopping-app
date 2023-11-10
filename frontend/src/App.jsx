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
import Profile from './views/profilePage/Profile';
import Forgotpassword from './views/passwordPage/Forgotpassword';
import ResetPassword from './views/passwordPage/ResetPassword';
import UserInbox from './views/inboxPage/UserInbox';
import Product from './views/productPage/Product';
import ShopCreatePage from './views/sellersPage/ShopCreatePage';
import Cart from './views/cartPage/Cart';
import ShopLoginPage from './views/shopLoginPage/ShopLoginPage';
import SellerProtectedRoute from './protectedRoutes/SellerProtectedRoute';
import UserProtectedRoute from './protectedRoutes/UserProtectedRoute';
import ShopDashboard from './views/shopDashboarPage/ShopDashboard';
import ShopHome from './views/shopHomePage/ShopHome';
import ShopCreateProduct from './views/shopCreateProductPage/ShopCreateProduct';
import ShopCreateEvent from './views/shopCreateEventPage/ShopCreateEvent';
import ShopSettingsPage from './views/shopSettingsPage/ShopSettingsPage';

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
          <Route path="/products/:name" element={<Product />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/inbox" element={<UserInbox />} />
          <Route path="/best-sellings" element={<BestSellings />} />
          <Route path="/events" element={<Events />} />
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
                <ShopCreatePage />
              </UserProtectedRoute>
            }
          />

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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
