import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import axios from 'axios';
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
import { useSelector } from 'react-redux';
import ShopCreatePage from './views/sellersPage/ShopCreatePage';
import Cart from './views/cartPage/Cart';

const App = () => {
  // Global state variables using redux
  const { currentUser } = useSelector((state) => state.user);
  // Protected route
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to={'/login'} />;
    }
    return children;
  };

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
            path="/create-shop"
            element={
              <ProtectedRoute>
                <ShopCreatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
