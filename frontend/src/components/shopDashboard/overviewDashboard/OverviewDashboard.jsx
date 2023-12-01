import React, { useEffect, useState } from 'react';
import './OverviewDashboard.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { RxArrowRight } from 'react-icons/rx';
import { MdPriceChange } from 'react-icons/md';
import { FaFirstOrderAlt } from 'react-icons/fa6';
import { FaProductHunt } from 'react-icons/fa';
import {
  sellerOrdersFail,
  sellerOrdersRequest,
  sellerOrdersSuccess,
} from '../../../redux/reducers/orderReducer';

const OverviewDashboard = () => {
  // Global state variables
  const { orders } = useSelector((state) => state.order);
  const { currentSeller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  // Local state variables
  const [shopProducts, setShopProducts] = useState([]);
  const [deliveredShopOrders, setDeliveredShopOrders] = useState([]);

  // Display shop products
  useEffect(() => {
    const getShopProducts = async () => {
      try {
        // dispatch(productsShopFetchStart());
        const { data } = await axios.get(
          `http://localhost:5000/api/products/${currentSeller._id}/shop-products`
        );
        setShopProducts(data);
      } catch (error) {
        console.log(error);
        // dispatch(productsShopFetchFailure(error.response.data.message));
      }
    };
    getShopProducts();
  }, []);

  // Display all delivered shop orders
  useEffect(() => {
    const getShopOrders = async () => {
      try {
        dispatch(sellerOrdersRequest());
        const { data } = await axios.get(
          `http://localhost:5000/api/orders/shop/${currentSeller._id}`
        );
        const orderData = data.orders.filter(
          (shopOrderData) => shopOrderData.status === 'Delivered'
        );
        setDeliveredShopOrders(orderData);
      } catch (error) {
        console.log(error);
      }
    };
    getShopOrders();
  }, []);

  // Total earning without tax
  const totalEaringWithoutTax =
    deliveredShopOrders &&
    deliveredShopOrders.reduce((acc, order) => acc + order.totalPrice, 0);

  const serviceCharge = totalEaringWithoutTax * 0.1;
  const totalEarning = totalEaringWithoutTax - serviceCharge;
  const shopIncome = totalEarning.toFixed(2);

  //! Available Balance will be done in the backend
  const availableBalance = currentSeller?.availableBalance.toFixed(2);

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 250, flex: 0.7 },

    {
      field: 'status',
      headerName: 'Status',
      minWidth: 130,
      flex: 0.7,
      // cellClassName: (params) => {
      //   return params.getValue(params.id, 'status') === 'Delivered'
      //     ? 'greenColor'
      //     : 'redColor';
      // },
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      type: 'number',
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: 'total',
      headerName: 'Total',
      type: 'number',
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: ' ',
      flex: 1,
      minWidth: 150,
      headerName: '',
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/shop/order/${params.id}`}>
            <RxArrowRight size={20} />
          </Link>
        );
      },
    },
  ];

  const row = [];

  deliveredShopOrders &&
    deliveredShopOrders.forEach((order) => {
      row.push({
        id: order._id,
        quantity: order.cart.reduce((acc, item) => acc + item.qty, 0),
        total: '$' + order.totalPrice,
        status: order.status,
      });
    });

  return (
    <section className="overview-dashbaord-wrapper">
      <h3 className="overview-dashboard-title">Overview</h3>

      <div className="summary-overview">
        {/* Account balance wrapper */}
        <article className="article-box account-balance">
          <aside className=" aside-box account-balance">
            <MdPriceChange className="icon" />
            <h3 className={`subTitle`}>
              Account Balance of {currentSeller.name}
            </h3>
          </aside>

          <h3 className="subTitle">${shopIncome}</h3>
          <Link to="/dashboard-withdraw-money" className="link">
            Withdraw Money
          </Link>
        </article>

        {/* Orders wrapper */}
        <article className="article-box orders-wrapper">
          <aside className="aside-box all-orders">
            <FaFirstOrderAlt className="icon" />
            <h3 className={`subTitle`}>
              All Orders from {currentSeller.name}{' '}
            </h3>
          </aside>
          <h3 className="subTitle">{orders ? orders.length : '0'}</h3>
          <Link to="/dashboard-orders" className="link">
            View Orders
          </Link>
        </article>

        {/* Products wrapper */}
        <article className="article-box all-products-wrapper">
          <aside className="aside-box all-products">
            <FaProductHunt className="icon" />
            <h3 className={`subTitle`}>All Products of {currentSeller.name}</h3>
          </aside>
          <h3 className="subTitle">
            {shopProducts ? shopProducts.length : '0'}
          </h3>
          <Link to="/dashboard-products">View Products</Link>
        </article>
      </div>

      {/* Latest orders */}
      <h3 className="latest-orders">
        Delivered Orders of {currentSeller.name}
      </h3>

      {/* Data Grid */}
      <div className="data-grid-wrapper">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </section>
  );
};

export default OverviewDashboard;
