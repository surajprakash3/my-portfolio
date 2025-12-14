import React, { useEffect, useRef, useState } from 'react';
import { initVantaNet } from './utils/vantaBackground';
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
  const vantaRef = useRef(null);
  const vantaEffectRef = useRef(null);


  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
  };

  // Initialize Vanta.js NET background
  useEffect(() => {
    // Initialize Vanta NET for the requested moving network animation
    let cleanup = null;
    initVantaNet(vantaRef.current, {
      color: 0xff3f81, // neon magenta lines (matches screenshot)
      backgroundColor: 0x0a0a1a,
      points: 12.0,
      maxDistance: 24.0,
      spacing: 16.0,
      showDots: true,
    }).then((destroy) => {
      cleanup = destroy;
    });

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div className="vanta-wrapper" ref={vantaRef}>
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
