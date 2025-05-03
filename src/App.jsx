import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Profile from './pages/Profile';
import Header from './components/Header'; // Adjust path as needed
import Login from './pages/Login'; // Adjust path as needed
import Register from './pages/Register'; // Adjust path as needed
import CountryDetails from './pages/CountryDetails'; // Adjust path as needed
import Home from './pages/Home'; // Adjust path as needed

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    setIsAuthenticated(!!user);
  }, []);

  const toggleFavorite = (country) => {
    setFavorites((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country]
    );
  };

  return (
    <Router>
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            isAuthenticated ? (
              <Home isDarkMode={isDarkMode} favorites={favorites} toggleFavorite={toggleFavorite} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <Profile isDarkMode={isDarkMode} favorites={favorites} toggleFavorite={toggleFavorite} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/country/:name"
          element={
            isAuthenticated ? (
              <CountryDetails isDarkMode={isDarkMode} favorites={favorites} toggleFavorite={toggleFavorite} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;