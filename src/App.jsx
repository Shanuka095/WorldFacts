import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import CountryDetails from './pages/CountryDetails.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [favorites, setFavorites] = useState(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return JSON.parse(localStorage.getItem(`favorites_${currentUser.email}`) || '[]');
  });

  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    localStorage.setItem(`favorites_${currentUser.email}`, JSON.stringify(favorites));
  }, [favorites]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const toggleFavorite = (countryName) => {
    setFavorites((prev) =>
      prev.includes(countryName)
        ? prev.filter((name) => name !== countryName)
        : [...prev, countryName]
    );
  };

  return (
    <div style={{ background: isDarkMode ? '#1F1B2E' : '#F9F5FF', minHeight: '100vh', color: isDarkMode ? '#E0DFFF' : '#2D1B4E' }}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} favorites={favorites} />
      <Routes>
        <Route path="/" element={<Home isDarkMode={isDarkMode} favorites={favorites} toggleFavorite={toggleFavorite} />} />
        <Route path="/country/:name" element={<CountryDetails isDarkMode={isDarkMode} favorites={favorites} toggleFavorite={toggleFavorite} />} />
        <Route path="/login" element={<Login isDarkMode={isDarkMode} />} />
        <Route path="/register" element={<Register isDarkMode={isDarkMode} />} />
        <Route path="/profile" element={<Profile isDarkMode={isDarkMode} favorites={favorites} />} />
      </Routes>
    </div>
  );
}