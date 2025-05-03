import { useState, useEffect } from 'react';
   import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
   import Header from './components/Header.jsx';
   import Home from './pages/Home.jsx';
   import CountryDetails from './pages/CountryDetails.jsx';
   import About from './pages/About.jsx';
   import Login from './pages/Login.jsx';
   import Register from './pages/Register.jsx';
   import Profile from './pages/Profile.jsx';

   export default function App() {
     let currentUser = {};
     try {
       const userData = localStorage.getItem('currentUser');
       if (userData) currentUser = JSON.parse(userData);
     } catch (error) {
       console.error('Error parsing currentUser:', error);
       localStorage.removeItem('currentUser');
     }

     const [isDarkMode, setIsDarkMode] = useState(() => {
       const savedMode = localStorage.getItem('darkMode');
       return savedMode ? JSON.parse(savedMode) : false;
     });

     const [favorites, setFavorites] = useState(() => {
       const users = JSON.parse(localStorage.getItem('users') || '[]');
       const user = users.find(user => user.email === currentUser.email);
       return user ? user.favorites || [] : [];
     });

     useEffect(() => {
       localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
     }, [isDarkMode]);

     const toggleDarkMode = () => {
       setIsDarkMode((prev) => !prev);
     };

     const toggleFavorite = (countryName) => {
       setFavorites((prev) => {
         const newFavorites = prev.includes(countryName)
           ? prev.filter(name => name !== countryName)
           : [...prev, countryName];
         const users = JSON.parse(localStorage.getItem('users') || '[]');
         const userIndex = users.findIndex(user => user.email === currentUser.email);
         if (userIndex !== -1) {
           users[userIndex].favorites = newFavorites;
           localStorage.setItem('users', JSON.stringify(users));
         }
         return newFavorites;
       });
     };

     return (
       <Router>
         <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-b from-gray-50 to-gray-100'}`}>
           <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
           <Routes>
             <Route path="/login" element={<Login />} />
             <Route path="/register" element={<Register />} />
             <Route path="/about" element={<About />} />
             <Route path="/profile" element={currentUser.email ? <Profile favorites={favorites} /> : <Navigate to="/login" />} />
             <Route path="/" element={currentUser.email ? <Home favorites={favorites} toggleFavorite={toggleFavorite} /> : <Navigate to="/login" />} />
             <Route path="/country/:name" element={currentUser.email ? <CountryDetails /> : <Navigate to="/login" />} />
           </Routes>
         </div>
       </Router>
     );
   }