import React from 'react';
import './SidebarDashboard.scss';
import {  AiOutlineGift } from 'react-icons/ai';
import { FiPackage, FiShoppingBag } from 'react-icons/fi';
import { MdCreateNewFolder, MdOutlineLocalOffer } from 'react-icons/md';
import { RxDashboard } from 'react-icons/rx';
import { VscNewFile } from 'react-icons/vsc';
import { CiSettings } from 'react-icons/ci';
import { NavLink } from 'react-router-dom';
import { BiMessageSquareDetail, BiMoneyWithdraw } from 'react-icons/bi';
import { HiOutlineReceiptRefund } from 'react-icons/hi';

const SidebarDashboard = () => {
  // Active NavLinks styling
  const dashboardActiveLink = ({ active }) =>
    active ? `active-sidebar-dashboard-link` : 'passive-sidebar-dashboard-link';
  return (
    <nav className="sidebar-dashboar">
      {/* single item */}
      <ul className="sidebar-dashboard-items">
        <li className="sidebar-dashboard-item">
          <RxDashboard className="sidebar-dashboard-icon" />
          <NavLink to={'/dashboard'} className={dashboardActiveLink}>
            Dashboard
          </NavLink>
        </li>

        <li className="sidebar-dashboard-item">
          <FiShoppingBag className="sidebar-dashboard-icon" />
          <NavLink to={'/dashboard-orders'} className={dashboardActiveLink}>
            All Orders
          </NavLink>
        </li>

        <li className="sidebar-dashboard-item">
          <FiPackage className="sidebar-dashboard-icon" />
          <NavLink to={'/dashboard-products'} className={dashboardActiveLink}>
            All Products
          </NavLink>
        </li>

        <li className="sidebar-dashboard-item">
          <MdCreateNewFolder  className="sidebar-dashboard-icon" />
          <NavLink
            to={'/dashboard-create-product'}
            className={dashboardActiveLink}
          >
            Create Product
          </NavLink>
        </li>

        <li className="sidebar-dashboard-item">
          <MdOutlineLocalOffer className="sidebar-dashboard-icon" />
          <NavLink to={'/dashboard-events'} className={dashboardActiveLink}>
            All Events
          </NavLink>
        </li>

        <li className="sidebar-dashboard-item">
          <VscNewFile className="sidebar-dashboard-icon" />
          <NavLink
            to={'/dashboard-create-event'}
            className={dashboardActiveLink}
          >
            Create Event
          </NavLink>
        </li>

        <li className="sidebar-dashboard-item">
          <BiMoneyWithdraw className="sidebar-dashboard-icon" />
          <NavLink
            to={'/dashboard-withdraw-money'}
            className={dashboardActiveLink}
          >
            Withdraw Money
          </NavLink>
        </li>

        <li className="sidebar-dashboard-item">
          <BiMessageSquareDetail className="sidebar-dashboard-icon" />
          <NavLink to={'/dashboard-messages'} className={dashboardActiveLink}>
            Shop Inbox
          </NavLink>
        </li>

        <li className="sidebar-dashboard-item">
          <AiOutlineGift className="sidebar-dashboard-icon" />
          <NavLink to={'/dashboard-coupouns'} className={dashboardActiveLink}>
            Discount Codes
          </NavLink>
        </li>

        <li className="sidebar-dashboard-item">
          <HiOutlineReceiptRefund className="sidebar-dashboard-icon" />
          <NavLink to={'/dashboard-refunds'} className={dashboardActiveLink}>
            Refunds
          </NavLink>
        </li>

        <li className="sidebar-dashboard-item">
          <CiSettings className="sidebar-dashboard-icon" />
          <NavLink to={'/settings'} className={dashboardActiveLink}>
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarDashboard;
