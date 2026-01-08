import { createContext, useEffect, useState } from 'react';
import api from '../utils/api';

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const normalize = (items = []) =>
      items.map(item => ({
        id: item.id || item._id || Date.now() + Math.floor(Math.random() * 1000),
        name: item.name,
        description: item.description || item.desc || '',
        price: item.price ?? 0,
        image: item.image || 'https://via.placeholder.com/400',
        tags: item.tags || [],
        rating: item.rating || 0,
        reviewCount: item.reviewCount || 0,
        cookTime: item.cookTime || '30 min',
        isVeg: item.isVeg ?? true,
        isSpicy: item.isSpicy ?? false,
        status: item.status || 'available',
        category: item.category || 'uncategorized'
      }));

    const fetchMenu = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await api.get('/menu');
        if (!mounted) return;

        const data = Array.isArray(res.data) ? res.data : [];
        setMenuItems(normalize(data));
      } catch (err) {
        if (!mounted) return;
        console.error('Failed to fetch menu from API', err);

        setMenuItems([]);
        setError('Failed to load menu. Please try again later.');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchMenu();

    return () => {
      mounted = false;
    };
  }, []);

  /* ========= CRUD HELPERS ========= */

  const addMenuItem = (item) => {
    const newItem = {
      ...item,
      id: Date.now(),
      image:
        item.image ||
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop',
      status: item.status || 'available'
    };

    setMenuItems(prev => [newItem, ...prev]);
  };

  const updateMenuItem = (updatedItem) => {
    setMenuItems(prev =>
      prev.map(item =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
  };

  const deleteMenuItem = (itemId) => {
    setMenuItems(prev =>
      prev.filter(item => item.id !== itemId)
    );
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        loading,
        error,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
