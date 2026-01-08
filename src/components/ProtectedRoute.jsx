import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AdminAuthContext } from '../admin/AdminAuthContext';

const ProtectedRoute = ({ children, adminOnly }) => {
  const { user } = useContext(AuthContext);
  const { admin } = useContext(AdminAuthContext);

  if (adminOnly) {
    if (!admin) return <Navigate to="/admin/login" />;
    return children;
  }

  if (!user) return <Navigate to="/login" />;
  return children;
};

export default ProtectedRoute;
