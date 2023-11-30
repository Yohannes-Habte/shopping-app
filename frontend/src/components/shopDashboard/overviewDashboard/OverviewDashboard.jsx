import React, { useEffect, useState } from 'react';
import './OverviewDashboard.scss';
import {AiOutlineMoneyCollect } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { MdBorderClear } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { RxArrowRight } from 'react-icons/rx';

const OverviewDashboard = () => {
  // Global state variables
  const { orders } = useSelector((state) => state.order);
  const { currentSeller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  // Local state variables
  const [shopProducts, setShopProducts] = useState([]);

  // useEffect(() => {
  //    dispatch(getAllOrdersOfShop(seller._id));
  //    dispatch(getAllProductsShop(seller._id));
  // }, [dispatch]);

  useEffect(() => {
    const bestdealtProducts = async () => {
      try {
        // dispatch(productsShopFetchStart());
        const { data } = await axios.get(
          `http://localhost:5000/api/products/${currentSeller._id}/shop-products`
        );
        // dispatch(productsShopFetchSuccess(data));
        setShopProducts(data);
      } catch (error) {
        console.log(error);
        // dispatch(productsShopFetchFailure(error.response.data.message));
      }
    };
    bestdealtProducts();
  }, []);

  const availableBalance = currentSeller?.availableBalance.toFixed(2);

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 150, flex: 0.7 },

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
      field: 'itemsQty',
      headerName: 'Items Qty',
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

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
        total: 'US$ ' + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <section className="overview-dashbaord-wrapper">
      <h3 className="overview-dashboard-title">Overview</h3>

      <div className="summary-overview">
        {/* Account balance wrapper */}
        <article className="article-box account-balance">
          <aside className=" aside-box account-balance">
            <AiOutlineMoneyCollect className="icon" />
            <h3 className={`subTitle`}>
              Account Balance of {currentSeller.name}
            </h3>
          </aside>

          <h3 className="subTitle">${availableBalance}</h3>
          <Link to="/dashboard-withdraw-money" className="link">
            Withdraw Money
          </Link>
        </article>

        {/* Orders wrapper */}
        <article className="article-box orders-wrapper">
          <aside className="aside-box all-orders">
            <MdBorderClear className="icon" />
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
            <AiOutlineMoneyCollect className="icon" />
            <h3 className={`subTitle`}>All Products of {currentSeller.name}</h3>
          </aside>
          <h3 className="subTitle">
            {shopProducts ? shopProducts.length : '0'}
          </h3>
          <Link to="/dashboard-products">View Products</Link>
        </article>
      </div>

      {/* Latest orders */}
      <h3 className="latest-orders">Latest Orders</h3>

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
