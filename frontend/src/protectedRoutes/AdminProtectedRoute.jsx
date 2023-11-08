import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
  // Global state variables
  const { currentAdmin } = useSelector((state) => state.admin);
  if (!currentAdmin) {
    return <Navigate to={`/dashboard`} />;
  }
  return children;
};

export default AdminProtectedRoute;
