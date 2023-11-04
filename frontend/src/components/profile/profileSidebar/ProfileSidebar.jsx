import React from 'react';
import "./ProfileSidebar.scss"
import { AiOutlineLogin, AiOutlineMessage } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from 'react-icons/hi';
import {
  MdDelete,
  MdOutlineAdminPanelSettings,
  MdOutlineTrackChanges,
} from 'react-icons/md';
import { TbAddressBook } from 'react-icons/tb';
import { RxPerson } from 'react-icons/rx';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserFailure, deleteUserSuccess, userLogoutFailure, userLogoutStart, userLogoutSuccess } from '../../../redux/reducers/userReducer';

const ProfileSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();
  // Global state variables
  const { currentUser, loading, error, successMessage } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  // Log out user function
  const handleLogout = async () => {
    try {
      dispatch(userLogoutStart());
      const { data } = await axios.get(
        `http://localhost:5000/api/auths/logout/${currentUser.rest._id}`,
        { withCredentials: true }
      );

      dispatch(userLogoutSuccess());
      toast.success(data.message);
      window.location.reload(true);
      navigate('/login');
    } catch (error) {
      dispatch(userLogoutFailure(error.response.data.message));
    }
  };

  // Delete user account
  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserFailure());
      const { data } = await axios.delete(
        `http://localhost:5000/api/auths/delete-account/${currentUser.rest._id}`,
        { withCredentials: true }
      );
      dispatch(deleteUserSuccess());
      toast.success(data.message);
      window.location.reload(true);
      navigate('/register');
    } catch (error) {
      dispatch(deleteUserFailure(error.response.data.message));
    }
  };

  return (
    <div className="profile-infos-wrapper">
      {/* Profile section */}
      <div onClick={() => setActive(1)} className="tab-box profile">
        <RxPerson className={active === 1 ? 'active-icon ' : 'passive-icon'} />
        <span className={active === 1 ? 'active' : 'passive'}>Profile</span>
      </div>

      {/* Orders section */}
      <div className="tab-box orders" onClick={() => setActive(2)}>
        <HiOutlineShoppingBag
          className={active === 2 ? 'active-icon ' : 'passive-icon'}
        />
        <span className={active === 2 ? 'active' : 'passive'}>Order</span>
      </div>

      {/* Orders section */}
      <div className="tab-box refunds" onClick={() => setActive(3)}>
        <HiOutlineReceiptRefund
          className={active === 3 ? 'active-icon ' : 'passive-icon'}
        />
        <span className={active === 3 ? 'active' : 'passive'}>Refunds</span>
      </div>

      {/* Index section */}
      <div
        className="tab-box inbox"
        onClick={() => setActive(4) || navigate('/inbox')}
      >
        <AiOutlineMessage
          className={active === 4 ? 'active-icon ' : 'passive-icon'}
        />
        <span className={active === 4 ? 'active' : 'passive'}>Inbox</span>
      </div>

      {/* Track order section */}
      <div className="tab-box track-order" onClick={() => setActive(5)}>
        <MdOutlineTrackChanges
          className={active === 5 ? 'active' : 'passive'}
        />
        <span className={active === 5 ? 'active' : 'passive'}>Track Order</span>
      </div>

      {/* Change password section */}
      <div className="tab-box changePassword" onClick={() => setActive(6)}>
        <RiLockPasswordLine className={active === 6 ? 'active' : 'passive'} />
        <span className={active === 6 ? 'active' : 'passive'}>
          Change Password
        </span>
      </div>

      {/* Address section */}
      <div className="tab-box address" onClick={() => setActive(7)}>
        <TbAddressBook className={active === 7 ? 'active' : 'passive'} />
        <span className={active === 7 ? 'active' : 'passive'}>Address</span>
      </div>

      {/* Admin dashboar section */}
      {currentUser && currentUser?.role === 'admin' && (
        <Link to="/admin/dashboard">
          <div className="tab-box dashboard" onClick={() => setActive(8)}>
            <MdOutlineAdminPanelSettings
              className={active === 8 ? 'active' : 'passive'}
            />
            <span className={active === 8 ? 'active' : 'passive'}>
              Admin Dashboard
            </span>
          </div>
        </Link>
      )}

      {/* Log out  section */}
      <div className="tab-box logout" onClick={handleLogout}>
        <AiOutlineLogin className={active === 9 ? 'active' : 'passive'} />
        <span className={active === 9 ? 'active' : 'passive'}>Log out</span>
      </div>

      {/* Delete Account section */}
      <div className="tab-box address" onClick={handleDeleteAccount}>
        <MdDelete className={active === 10 ? 'active' : 'passive'} />
        <span className={active === 10 ? 'active' : 'passive'}>
          Delete Account
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;