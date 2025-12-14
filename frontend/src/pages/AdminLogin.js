import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AdminLogin.css';

const AdminLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Try to login with backend
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      if (response.data && response.data.token) {
        // Get or create default portfolio user
        const portfolioUser = await getOrCreatePortfolioUser();
        
        // Store admin token and user info in localStorage
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('isAdminLoggedIn', 'true');
        localStorage.setItem('portfolioUserId', portfolioUser._id);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        onLoginSuccess();
        navigate('/admin');
      } else {
        setError('Login failed: Invalid response from server');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Login failed';
      setError(errorMsg);
      console.error('Login error:', err);
    }

    setLoading(false);
  };

  const getOrCreatePortfolioUser = async () => {
    try {
      // Try to get existing portfolio user
      const response = await axios.get(`${API_URL}/portfolio/user`);
      return response.data;
    } catch (err) {
      // If user doesn't exist, create one
      try {
        const createResponse = await axios.post(`${API_URL}/portfolio/user`, {
          firstName: 'Portfolio',
          lastName: 'Owner',
          email: 'portfolio@admin.local',
        });
        return createResponse.data.user;
      } catch (createErr) {
        console.error('Failed to create portfolio user:', createErr);
        throw new Error('Could not initialize portfolio user');
      }
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h1>Admin Login</h1>
        <p>Access your portfolio management panel</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              disabled={loading}
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="demo-credentials">
          <p><strong>Demo Credentials:</strong></p>
          <p>Email: <code>demo@portfolio.local</code></p>
          <p>Password: <code>demo123</code></p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
