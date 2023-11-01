import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './views/homePage/Home';
import Contact from './views/contactPage/Contact';
import Register from './views/registerPage/Register';
import Login from './views/loginPage/Login';
import NotFound from './views/notFound/NotFound';
import Activation from './views/activationPage/Activation';
import Products from './views/productsPage/Products';
import Sellers from './views/sellersPage/Sellers';
import Events from './views/eventsPage/Events';
import BestSellings from './views/bestSellingpage/BestSellings';

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
          <Route path="/activation/:activation_token" element={<Activation />} />
          <Route path="/products" element={<Products />} />
          <Route path="/best-sellings" element={<BestSellings />} />
          <Route path="/seller" element={<Sellers />} />
          <Route path="/events" element={<Events />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
