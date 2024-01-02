import React, { useEffect } from 'react';
import './AdminDashboardOverview.scss';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { GiProfit } from 'react-icons/gi';
import { FaShopSlash } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';
import { getAllOrdersOfAdmin } from '../../../redux/actions/order';
import { getAllSellers } from '../../../redux/actions/seller';

const AdminDashboardOverview = () => {
  const dispatch = useDispatch();

  const { adminOrders, adminOrderLoading } = useSelector(
    (state) => state.order
  );
  const { sellers } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
    dispatch(getAllSellers());
  }, []);

  const adminEarning =
    adminOrders &&
    adminOrders.reduce((acc, item) => acc + item.totalPrice * 0.1, 0);

  const adminBalance = adminEarning?.toFixed(2);

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 150, flex: 0.7 },

    {
      field: 'status',
      headerName: 'Status',
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, 'status') === 'Delivered'
          ? 'greenColor'
          : 'redColor';
      },
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
      field: 'createdAt',
      headerName: 'Order Date',
      type: 'number',
      minWidth: 130,
      flex: 0.8,
    },
  ];

  const row = [];
  adminOrders &&
    adminOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
        total: item?.totalPrice + ' $',
        status: item?.status,
        createdAt: item?.createdAt.slice(0, 10),
      });
    });

  return (
    <>
      {adminOrderLoading ? (
        <h1> Loading...</h1>
      ) : (
        <section className="admin-dashboard-overview-wrapper">
          <h3 className="admin-dashboard-overview-title">Overview</h3>
          <div className="overview-container">
            <article className="box">
              <aside className="icon-subTitle">
                <GiProfit className="icon" />
                <h3 className={`subTitle`}>Total Earning</h3>
              </aside>
              <h5 className="outcome">$ {adminBalance}</h5>
            </article>

            <article className="box">
              <aside className="icon-subTitle">
                <FaShopSlash />
                <h3 className={`subTitle`}>All Sellers</h3>
              </aside>
              <h5 className="outcome">{sellers && sellers.length}</h5>
              <Link to="/admin-shops">
                <h5 className="view">View Sellers</h5>
              </Link>
            </article>

            <article className="box">
              <aside className="icon-subTitle">
                <FaCartShopping />
                <h3 className={`subTitle`}>All Orders</h3>
              </aside>
              <h5 className="outcome">{adminOrders && adminOrders.length}</h5>
              <Link to="/admin-orders" className='link'>
                <h5 className="view">View Orders</h5>
              </Link>
            </article>
          </div>

          <h3 className="latest-orders">Latest Orders</h3>
          <div className="table-wrapper">
            <DataGrid
              rows={row}
              columns={columns}
              pageSize={4}
              disableSelectionOnClick
              autoHeight
            />
          </div>
        </section>
      )}
    </>
  );
};

export default AdminDashboardOverview;
