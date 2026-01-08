import { useContext, useEffect } from 'react';
import api from '../utils/api';
import { AdminAuthContext } from './AdminAuthContext';
import { AdminDataContext } from './AdminDataContext';

const Analytics = () => {
  const { admin, isAuthenticated } = useContext(AdminAuthContext);
  const { analytics, setAnalytics } = useContext(AdminDataContext);

  useEffect(() => {
    if (isAuthenticated) {
      api.get('/admin/analytics')
        .then(res => setAnalytics(res.data))
        .catch(err => console.error('Failed to fetch analytics', err));
    }
  }, [isAuthenticated, admin, setAnalytics]);

  if (!isAuthenticated) return <div>Admin login required.</div>;

  return (
            <div>
      <h1 className="text-2xl font-bold mb-4">Analytics</h1>
      {/* Render analytics charts and data here using analytics state */}
      <pre>{JSON.stringify(analytics, null, 2)}</pre>
    </div>
  );
};

export default Analytics;