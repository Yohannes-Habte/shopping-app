import React, { useEffect } from 'react';
import './AllSellerOrders.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RxArrowRight } from 'react-icons/rx';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import {
  sellerOrdersFail,
  sellerOrdersRequest,
  sellerOrdersSuccess,
} from '../../../redux/reducers/orderReducer';

const AllSellerOrders = () => {
  // Global variables
  const { currentSeller } = useSelector((state) => state.seller);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    const sellerOrders = async () => {
      try {
        dispatch(sellerOrdersRequest());

        const { data } = await axios.get(
          `http://localhost:5000/api/orders/seller/${currentSeller._id}`
        );

        dispatch(sellerOrdersSuccess(data.orders));
      } catch (error) {
        dispatch(sellerOrdersFail(error.response.data.message));
      }
    };
    sellerOrders();
  }, []);

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 250, flex: 0.7 },

    {
      field: 'status',
      headerName: 'Status',
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      type: 'number',
      minWidth: 150,
      flex: 0.7,
    },

    {
      field: 'total',
      headerName: 'Total',
      type: 'number',
      minWidth: 150,
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
        quantity: item.cart.length,
        total: 'US$ ' + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="shop-orders-wrapper">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

export default AllSellerOrders;
