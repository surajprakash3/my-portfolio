import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/Navbar.css';

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    localStorage.getItem('isAdminLoggedIn') === 'true'
  );
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  // Listen for changes to isAdminLoggedIn
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAdminLoggedIn(localStorage.getItem('isAdminLoggedIn') === 'true');
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) setTheme(storedTheme);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('portfolioUserId');
    localStorage.removeItem('token');
    setIsAdminLoggedIn(false);
    navigate('/');
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Portfolio
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
          <li>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </li>
          {isAdminLoggedIn && (
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
