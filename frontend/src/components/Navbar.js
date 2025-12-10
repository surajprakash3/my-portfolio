import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/Navbar.css';

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';

  const handleLogout = () => {
    logout();
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('portfolioUserId');
    navigate('/');
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
          {isAdminLoggedIn && (
            <>
              <li>
                <Link to="/admin">Admin Portal</Link>
              </li>
              <li>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
