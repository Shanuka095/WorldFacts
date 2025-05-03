import { useState } from 'react';
   import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
   import Header from './components/Header.jsx';
   import Home from './pages/Home.jsx';
   import CountryDetails from './pages/CountryDetails.jsx';
   import About from './pages/About.jsx';
   import Login from './pages/Login.jsx';
   import Register from './pages/Register.jsx';

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
       return localStorage.getItem('darkMode') === 'true';
     });

     const toggleDarkMode = () => {
       setIsDarkMode((prev) => {
         const newMode = !prev;
         localStorage.setItem('darkMode', newMode);
         return newMode;
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
             <Route path="/" element={currentUser.email ? <Home /> : <Navigate to="/login" />} />
             <Route path="/country/:name" element={currentUser.email ? <CountryDetails /> : <Navigate to="/login" />} />
           </Routes>
         </div>
       </Router>
     );
   }