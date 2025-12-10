import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AdminLogin.css';

const AdminLogin = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
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
      // Simple hardcoded admin credentials
      if (username === 'admin' && password === 'admin') {
        // Create or get default portfolio user
        const portfolioUser = await getOrCreatePortfolioUser();
        
        // Store admin token in localStorage
        localStorage.setItem('adminToken', 'admin-authenticated-' + Date.now());
        localStorage.setItem('isAdminLoggedIn', 'true');
        localStorage.setItem('portfolioUserId', portfolioUser._id);
        
        onLoginSuccess();
        navigate('/admin');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed: ' + err.message);
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
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              disabled={loading}
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
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="demo-credentials">
          <p><strong>Demo Credentials:</strong></p>
          <p>Username: <code>admin</code></p>
          <p>Password: <code>admin</code></p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
