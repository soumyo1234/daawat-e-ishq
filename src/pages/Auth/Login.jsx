import { jwtDecode } from 'jwt-decode';
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GoogleAuth from '../../components/GoogleAuth';
import { OAUTH_CONFIG } from '../../config/oauth';
import { AuthContext } from '../../context/AuthContext';
import api from '../../utils/api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
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

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});
    
    try {
      try {
        const res = await api.post('/auth/login', {
          email: formData.email.trim(),
          password: formData.password
        });
        const data = res.data;
        localStorage.setItem('userToken', data.token);
        login(data.user, data.token);
        navigate('/profile');
      } catch (err) {
        const message = err.response?.data?.error || 'Login failed. Please try again.';
        setErrors({ general: message });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    setErrors({});
    
    try {
      console.log('Google credentialResponse:', credentialResponse);
      const token = credentialResponse?.credential;
      if (!token) {
        throw new Error('No credential returned from Google');
      }
      const userData = jwtDecode(token);
      console.log('User Data:', userData);

      const res = await api.post('/auth/google', { token });
      
      const data = res.data;
      localStorage.setItem('userToken', data.token);
      login(data.user, data.token);
      navigate('/profile');
    } catch (error) {
      console.error('Google auth error:', error);
      // if axios error has response, include it for debugging
      if (error.response) {
        console.error('Server response:', error.response.status, error.response.data);
        setErrors({ general: error.response.data?.error || 'Google authentication failed.' });
      } else {
        setErrors({ general: error.message || 'Google authentication failed.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookLogin = () => {
    setIsLoading(true);
    setErrors({});
    
    // Load Facebook SDK
    if (!window.FB) {
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      
      script.onload = () => {
        initializeFacebookSDK();
      };
    } else {
      initializeFacebookSDK();
    }
  };

  const initializeFacebookSDK = () => {
    try {
      // Initialize Facebook SDK
      window.FB.init({
        appId: OAUTH_CONFIG.FACEBOOK.APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v18.0'
      });

      // Login with Facebook
      window.FB.login((response) => {
        if (response.authResponse) {
          handleFacebookCallback(response.authResponse.accessToken);
        } else {
          setErrors({ general: 'Facebook login was cancelled.' });
          setIsLoading(false);
        }
      }, { scope: OAUTH_CONFIG.FACEBOOK.SCOPES });
    } catch (error) {
      console.error('Facebook SDK initialization error:', error);
      setErrors({ general: 'Failed to initialize Facebook login.' });
      setIsLoading(false);
    }
  };

  const handleFacebookCallback = async (accessToken) => {
    try {
      try {
  const res = await api.post('/auth/facebook', { accessToken });
        const data = res.data;
        localStorage.setItem('userToken', data.token);
        login(data.user, data.token);
        navigate('/profile');
      } catch (err) {
        const message = err.response?.data?.error || 'Facebook login failed.';
        setErrors({ general: message });
      }
    } catch (error) {
      console.error('Facebook auth error:', error);
      setErrors({ general: 'Facebook authentication failed.' });
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
          max-width: 450px;
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
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 14px;
          color: #666;
        }

        .checkbox-label input[type="checkbox"] {
          width: 18px;
          height: 18px;
          accent-color: #667eea;
        }

        .forgot-link {
          color: #667eea;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .forgot-link:hover {
          color: #5a67d8;
          text-decoration: underline;
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

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
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

        .social-login {
          position: relative;
        }

        .divider {
          text-align: center;
          margin: 24px 0;
          position: relative;
        }

        .divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: #e1e5e9;
        }

        .divider span {
          background: rgba(255, 255, 255, 0.95);
          padding: 0 16px;
          color: #666;
          font-size: 14px;
        }

        .social-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 16px;
          border: 2px solid #e1e5e9;
          border-radius: 12px;
          background: white;
          color: #333;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 14px;
          text-decoration: none;
        }

        .social-btn:hover {
          border-color: #667eea;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .social-btn svg {
          width: 20px;
          height: 20px;
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

          .social-buttons {
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
              <h1>Welcome Back</h1>
              <p>Sign in to your account to continue your culinary journey</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {errors.general && (
                <div className="error-banner">
                  {errors.general}
                </div>
              )}

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
                    placeholder="Enter your password"
                    autoComplete="current-password"
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

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="forgot-link">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="loading-spinner"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Don't have an account?{' '}
                <Link to="/register" className="auth-link">
                  Sign up here
                </Link>
              </p>
            </div>

            <div className="social-login">
              <div className="divider">
                <span>Or continue with</span>
              </div>
                             <div className="social-buttons">
                 {OAUTH_CONFIG.GOOGLE.CLIENT_ID && (
                   <GoogleAuth
                     onSuccess={handleGoogleSuccess}
                     onError={() => {
                       console.log('Login Failed');
                       setErrors({ general: 'Google login failed' });
                     }}
                   />
                 )}
                 <button 
                   className="social-btn facebook"
                   onClick={handleFacebookLogin}
                   disabled={isLoading}
                 >
                   <svg fill="#1877F2" viewBox="0 0 24 24">
                     <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                   </svg>
                   {isLoading ? 'Signing in...' : 'Facebook'}
                 </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;