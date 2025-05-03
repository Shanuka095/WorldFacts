import { useState, useEffect } from 'react';
   import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
       <Router>
         <div className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen text-gray-900 dark:text-gray-100">
           <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} favorites={favorites} />
           <Routes>
             <Route path="/" element={<Home favorites={favorites} toggleFavorite={toggleFavorite} />} />
             <Route path="/country/:name" element={<CountryDetails />} />
             <Route path="/login" element={<Login />} />
             <Route path="/register" element={<Register />} />
             <Route path="/profile" element={<Profile favorites={favorites} />} />
           </Routes>
         </div>
       </Router>
     );
   }