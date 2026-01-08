// ===== pages/Auth/Register.jsx =====
import { ArrowRight, Eye, EyeOff, Lock, Mail, Phone, User } from 'lucide-react';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../utils/api';



const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Register form submitted');
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const res = await api.post('/auth/register', {
        name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password
      });

      const data = res.data;
      localStorage.setItem('userToken', data.token);
      login(data.user, data.token);
      navigate('/profile');
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response && error.response.data) {
        const errData = error.response.data;
        if (errData.error) {
          setErrors({ general: errData.error });
        } else if (errData.errors) {
          setErrors(errData.errors);
        } else {
          setErrors({ general: 'Registration failed. Please try again.' });
        }
      } else if (error.message && error.message.includes('Network')) {
        setErrors({ general: 'Network error: Could not connect to the server. Please check your connection or proxy setup.' });
      } else {
        setErrors({ general: 'Registration failed. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .auth-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        .auth-page::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255,255,255,0.05) 0%, transparent 50%),
            radial-gradient(circle at 40% 70%, rgba(255,255,255,0.08) 0%, transparent 50%);
          pointer-events: none;
        }

        .auth-container {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(255, 255, 255, 0.2);
          padding: 40px;
          width: 100%;
          max-width: 500px;
          position: relative;
          z-index: 10;
          animation: slideUp 0.8s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .auth-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .auth-logo {
          display: inline-block;
          text-decoration: none;
          margin-bottom: 20px;
        }

        .script-font {
          font-size: 28px;
          font-weight: 700;
          color: #ffd700;
          font-family: 'Georgia', serif;
        }

        .auth-header h1 {
          font-size: 32px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
          margin: 0 0 8px 0;
        }

        .auth-header p {
          color: #666;
          font-size: 16px;
          line-height: 1.5;
          margin: 0;
        }

        .auth-form {
          margin-bottom: 24px;
        }

        .error-banner {
          background: linear-gradient(135deg, #ff6b6b, #ff5252);
          color: white;
          padding: 12px 16px;
          border-radius: 12px;
          margin-bottom: 20px;
          font-size: 14px;
          animation: shake 0.5s ease-in-out;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-group label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
          font-size: 14px;
        }

        .form-group input {
          width: 100%;
          padding: 16px 20px;
          border: 2px solid #e1e5e9;
          border-radius: 12px;
          font-size: 16px;
          transition: all 0.3s ease;
          background: #fafbfc;
          box-sizing: border-box;
          font-family: inherit;
        }

        .form-group input:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          transform: translateY(-1px);
        }

        .form-group input.error {
          border-color: #ff5252;
          background: #fff5f5;
        }

        .form-group input::placeholder {
          color: #a0a0a0;
        }

        .password-input {
          position: relative;
        }

        .password-input input {
          padding-right: 50px;
        }

        .password-toggle {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #666;
          padding: 4px;
          border-radius: 6px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .password-toggle:hover {
          background: #f0f0f0;
          color: #333;
        }

        .error-text {
          color: #ff5252;
          font-size: 12px;
          margin-top: 6px;
          display: block;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .form-options {
          margin-bottom: 32px;
        }

        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          cursor: pointer;
          font-size: 14px;
          color: #666;
          line-height: 1.4;
        }

        .checkbox-label input[type="checkbox"] {
          width: 18px;
          height: 18px;
          accent-color: #667eea;
          margin-top: 2px;
        }

        .auth-submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 16px 24px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          position: relative;
          overflow: hidden;
        }

        .auth-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }

        .auth-submit-btn:active {
          transform: translateY(0);
        }

        .auth-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .auth-footer {
          text-align: center;
          margin-bottom: 32px;
        }

        .auth-footer p {
          color: #666;
          font-size: 14px;
          margin: 0;
        }

        .auth-link {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .auth-link:hover {
          color: #5a67d8;
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .auth-container {
            margin: 10px;
            padding: 24px;
            border-radius: 16px;
          }

          .auth-header h1 {
            font-size: 28px;
          }

          .script-font {
            font-size: 24px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="auth-page">
        <div className="auth-container">
        <div className="auth-content">
          <div className="auth-header">
            <Link to="/" className="auth-logo">
              <span className="script-font">Daawat-E-Ishq</span>
            </Link>
            <h1>Create Account</h1>
            <p>Join us and start your culinary adventure today</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {errors.general && (
              <div className="error-banner">
                {errors.general}
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">
                  <User size={18} />
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={errors.firstName ? 'error' : ''}
                  placeholder="First name"
                />
                {errors.firstName && <span className="error-text">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">
                  <User size={18} />
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={errors.lastName ? 'error' : ''}
                  placeholder="Last name"
                />
                {errors.lastName && <span className="error-text">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <Mail size={18} />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
                placeholder="Enter your email"
                autoComplete="email"
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                <Phone size={18} />
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={errors.phone ? 'error' : ''}
                placeholder="Enter your phone number"
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <Lock size={18} />
                Password
              </label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={errors.password ? 'error' : ''}
                  placeholder="Create a password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">
                <Lock size={18} />
                Confirm Password
              </label>
              <div className="password-input">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={errors.confirmPassword ? 'error' : ''}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" required />
                <span>
                  I agree to the{' '}
                  <Link to="/terms" className="auth-link">Terms of Service</Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="auth-link">Privacy Policy</Link>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className={`auth-submit-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Register;