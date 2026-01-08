import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { AdminAuthContext } from './AdminAuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/admin/auth/login', { email, password });
      const data = res.data;
      // Store token in localStorage
      localStorage.setItem('adminToken', data.token);
      login(data.admin);
      navigate('/admin');
    } catch (err) {
      console.error('Login error:', err);
      const message = err.response?.data?.message || 'Network error. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h2>
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <button 
          type="submit" 
          className={`w-full bg-orange-600 text-white py-2 rounded font-bold transition ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-700'
          }`}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>Demo Credentials:</p>
          <p>Email: soumikvv@gmail.com</p>
          <p>Password: admin123</p>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
