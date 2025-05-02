import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
   import Header from './components/Header.jsx';
   import Home from './pages/Home.jsx';
   import CountryDetails from './pages/CountryDetails.jsx';
   import About from './pages/About.jsx';
   import Login from './pages/Login.jsx';
   import Register from './pages/Register.jsx';
   export default function App() {
     const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
     return (
       <Router>
         <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
           <Header />
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