import React, { useEffect, useState } from 'react';
import './AllShopsWithdraws.scss';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { BsPencil } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { MdOutlineClose } from 'react-icons/md';
import { API } from '../../../utils/security/secreteKey';

const AllShopsWithdraws = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [withdrawData, setWithdrawData] = useState();
  const [withdrawStatus, setWithdrawStatus] = useState('Processing');

  const [withdraws, setWithdraws] = useState([]);

  useEffect(() => {
    const allWithdraws = async () => {
      try {
        const { data } = await axios.get(`${API}/wthdraws`);
        setWithdraws(data.withdraws);
      } catch (error) {
        console.log(error);
      }
    };
    allWithdraws();
  }, []);

  const columns = [
    { field: 'id', headerName: 'Withdraw Id', minWidth: 150, flex: 0.7 },
    {
      field: 'name',
      headerName: 'Shop Name',
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: 'shopId',
      headerName: 'Shop Id',
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: 'status',
      headerName: 'status',
      type: 'text',
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: 'createdAt',
      headerName: 'Request given at',
      type: 'number',
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: ' ',
      headerName: 'Update Status',
      type: 'number',
      minWidth: 130,
      flex: 0.6,
      renderCell: (params) => {
        return (
          <BsPencil
            size={20}
            className={params.row.status !== 'Processing' ? 'hidden' : ''}
            onClick={() => setOpen(true) || setWithdrawData(params.row)}
          />
        );
      },
    },
  ];

  const handleSubmit = async () => {
    await axios
      .put(
        `withdraw/update-withdraw-request/${withdrawData.id}`,
        {
          sellerId: withdrawData.shopId,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success('Withdraw request updated successfully!');
        setData(res.data.withdraws);
        setOpen(false);
      });
  };

  const row = [];

  withdraws &&
    withdraws.forEach((withdraw) => {
      row.push({
        id: withdraw._id,
        shopId: withdraw.seller._id,
        name: withdraw.seller.name,
        amount: '$ ' + withdraw.amount,
        status: withdraw.status,
        createdAt: withdraw.createdAt.slice(0, 10),
      });
    });
  return (
    <article className="">
      <h2> Shops Withdraws</h2>
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />

      {open && (
        <section className="">
          <MdOutlineClose onClick={() => setOpen(false)} />

          <h1 className="">Update Withdraw status</h1>

          <select
            name=""
            id=""
            onChange={(e) => setWithdrawStatus(e.target.value)}
            className=""
          >
            <option value={withdrawStatus}>{withdrawData.status}</option>
            <option value={withdrawStatus}>Succeed</option>
          </select>

          <button type="submit" className={``} onClick={handleSubmit}>
            Update
          </button>
        </section>
      )}
    </article>
  );
};

export default AllShopsWithdraws;
