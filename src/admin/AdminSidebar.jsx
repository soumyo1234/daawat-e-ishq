import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white p-4 space-y-2 min-h-screen">
      <h3 className="text-lg font-bold mb-4">Admin Panel</h3>
      <nav className="flex flex-col gap-2">
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/reservations">Reservations</Link>
        <Link to="/admin/menu">Menu Management</Link>
        <Link to="/admin/orders">Order Management</Link>
        <Link to="/admin/analytics">Analytics</Link>
        <Link to="/admin/blog">Blog & Gallery</Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;
