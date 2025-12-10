import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PortfolioProvider } from './context/PortfolioContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import AdminLogin from './pages/AdminLogin';
import AdminPortal from './pages/AdminPortal';
import './App.css';

const AppContent = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    localStorage.getItem('isAdminLoggedIn') === 'true'
  );

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
  };

  return (
    <div className="app">
      {!isAdminLoggedIn && window.location.pathname === '/admin' ? null : <Navbar />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route
            path="/admin-login"
            element={<AdminLogin onLoginSuccess={handleAdminLoginSuccess} />}
          />
          <Route
            path="/admin"
            element={
              isAdminLoggedIn ? (
                <AdminPortal />
              ) : (
                <AdminLogin onLoginSuccess={handleAdminLoginSuccess} />
              )
            }
          />
        </Routes>
      </main>
      {!isAdminLoggedIn && window.location.pathname === '/admin' ? null : <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <PortfolioProvider>
          <AppContent />
        </PortfolioProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
