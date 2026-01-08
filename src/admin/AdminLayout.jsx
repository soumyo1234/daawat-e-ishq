import React from 'react';
import AdminSidebar from './AdminSidebar';
import { AdminAuthProvider } from './AdminAuthContext';
import { AdminDataProvider } from './AdminDataContext';

const AdminLayout = ({ children }) => {
  return (
    <AdminAuthProvider>
      <AdminDataProvider>
        <div className="flex min-h-screen bg-gray-100">
          <AdminSidebar />
          <div className="flex-1 p-6">
            {children}
          </div>
        </div>
      </AdminDataProvider>
    </AdminAuthProvider>
  );
};

export default AdminLayout;
