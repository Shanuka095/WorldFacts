import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CountryDetails from "./pages/CountryDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDarkMode(savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode ? "dark" : "light";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    setIsAuthenticated(!!user);
  }, []);

  const toggleFavorite = (countryName) => {
    setFavorites((prev) =>
      prev.includes(countryName)
        ? prev.filter((name) => name !== countryName)
        : [...prev, countryName]
    );
  };

  return (
    <Router>
      <div style={{ background: isDarkMode ? "#1F1B2E" : "#F9F5FF", minHeight: "100vh" }}>
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} favorites={favorites} setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
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
                <CountryDetails
                  isDarkMode={isDarkMode}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/home" replace />
              ) : (
                <Login isDarkMode={isDarkMode} setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? (
                <Navigate to="/home" replace />
              ) : (
                <Register isDarkMode={isDarkMode} setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;