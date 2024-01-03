import React, { useEffect, useState } from 'react';
import './AllShops.scss';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { HiOutlineEye } from 'react-icons/hi';
import { AiFillDelete } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';

const AllShops = () => {
  const dispatch = useDispatch();
  const { sellers } = useSelector((state) => state.seller);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState('');

  const [shops, setShops] = useState([]);

  useEffect(() => {
    const allShops = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/shops`, {
          withCredentials: true,
        });
        setShops(data.shops);
      } catch (error) {
        console.log(error);
      }
    };
    allShops();
  }, []);

  const handleDelete = async (id) => {
    await axios
      .delete(`/shop/delete-seller/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
      });

    dispatch('getAllSellers'());
  };

  const columns = [
    { field: 'id', headerName: 'Seller ID', minWidth: 150, flex: 0.7 },

    {
      field: 'name',
      headerName: 'name',
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'text',
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: 'address',
      headerName: 'Seller Address',
      type: 'text',
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: 'joinedAt',
      headerName: 'joinedAt',
      type: 'text',
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: '  ',
      flex: 1,
      minWidth: 150,
      headerName: 'Preview Shop',
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/shop/preview/${params.id}`}>
            <HiOutlineEye size={20} />
          </Link>
        );
      },
    },
    {
      field: ' ',
      flex: 1,
      minWidth: 150,
      headerName: 'Delete Seller',
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <button onClick={() => setUserId(params.id) || setOpen(true)}>
            <AiFillDelete />
          </button>
        );
      },
    },
  ];

  const row = [];
  shops &&
    shops.forEach((shop) => {
      row.push({
        id: shop._id,
        name: shop?.name,
        email: shop?.email,
        joinedAt: shop.createdAt.slice(0, 10),
        address: shop.address,
      });
    });

  return (
    <section className="all-shops-wrapper">
      <h3 className="">All Users</h3>

      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />

      {open && (
        <article className="">
          <IoClose onClick={() => setOpen(false)} />

          <h3 className="">Are you sure you want delete this user?</h3>
          <aside className="">
            <p className={``} onClick={() => setOpen(false)}>
              cancel
            </p>
            <h3
              className={``}
              onClick={() => setOpen(false) || handleDelete(userId)}
            >
              confirm
            </h3>
          </aside>
        </article>
      )}
    </section>
  );
};

export default AllShops;
