import { createContext, useEffect, useState } from 'react';
import api from '../utils/api';

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminAuth = async () => {
      const token = localStorage.getItem('adminToken');
      const storedAdmin = localStorage.getItem('admin');
      
      if (token && storedAdmin) {
        try {
          // Verify token with backend via shared api instance (attaches adminToken automatically)
          const response = await api.get('/admin/auth/profile');
          if (response.status === 200) {
            setAdmin(response.data);
          } else {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('admin');
            setAdmin(null);
          }
        } catch (error) {
          console.error('Token verification error:', error);
          localStorage.removeItem('adminToken');
          localStorage.removeItem('admin');
          setAdmin(null);
        }
      } else {
        setAdmin(null);
      }
      setLoading(false);
    };

    checkAdminAuth();
  }, []);

  const login = (adminData) => {
    setAdmin(adminData);
    localStorage.setItem('admin', JSON.stringify(adminData));
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('admin');
    localStorage.removeItem('adminToken');
  };

  return (
    <AdminAuthContext.Provider value={{ 
      admin, 
      login, 
      logout, 
      loading, 
      isAuthenticated: !!admin 
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
