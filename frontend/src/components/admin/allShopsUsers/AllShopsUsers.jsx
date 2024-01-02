import React, { useEffect, useState } from 'react';
import './AllShopsUsers.scss';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AiFillDelete } from 'react-icons/ai';
import { MdOutlineClose } from 'react-icons/md';

const AllShopsUsers = () => {
  const dispatch = useDispatch();
  // const { users } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState('');

  const [users, setUser] = useState([]);

  useEffect(() => {
    const allOrders = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/users`);
        setUser(data.users);
      } catch (error) {
        console.log(error);
      }
    };
    allOrders();
  }, []);

  const handleDelete = async (id) => {
    await axios
      .delete(`/user/delete-user/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
      });

    dispatch('getAllUsers'());
  };

  const columns = [
    { field: 'id', headerName: 'User ID', minWidth: 150, flex: 0.7 },

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
      field: 'role',
      headerName: 'User Role',
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
      field: ' ',
      flex: 1,
      minWidth: 150,
      headerName: 'Delete User',
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
  users &&
    users.forEach((user) => {
      row.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        joinedAt: user.createdAt.slice(0, 10),
      });
    });

  return (
    <section className="">
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
          <MdOutlineClose onClick={() => setOpen(false)} />

          <h3 className="">Are you sure you want delete this user?</h3>
          <div className="">
            <span className={``} onClick={() => setOpen(false)}>
              cancel
            </span>
            <span
              className={``}
              onClick={() => setOpen(false) || handleDelete(userId)}
            >
              confirm
            </span>
          </div>
        </article>
      )}
    </section>
  );
};

export default AllShopsUsers;
