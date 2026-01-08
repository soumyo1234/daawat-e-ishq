import React, { createContext, useState } from 'react';

export const AdminDataContext = createContext();

export const AdminDataProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [analytics, setAnalytics] = useState({});

  return (
    <AdminDataContext.Provider value={{ orders, setOrders, reservations, setReservations, analytics, setAnalytics }}>
      {children}
    </AdminDataContext.Provider>
  );
};
