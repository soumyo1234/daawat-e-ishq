import React from 'react';
import AdminSidebar from '../admin/AdminSidebar';

const AdminPanel = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="p-6 w-full">
        <h2 className="text-2xl font-bold text-red-800 mb-4">Admin Dashboard</h2>

        {/* Admin widgets or sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Reservations</h3>
            <p className="text-gray-600 mt-1">View and manage table bookings</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Menu Management</h3>
            <p className="text-gray-600 mt-1">Add or edit menu items</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Reviews</h3>
            <p className="text-gray-600 mt-1">Moderate customer feedback</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
