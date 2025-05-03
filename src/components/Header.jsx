import { Link, useNavigate } from 'react-router-dom';

   export default function Header({ isDarkMode, toggleDarkMode }) {
     const navigate = useNavigate();
     let currentUser = {};
     try {
       const userData = localStorage.getItem('currentUser');
       if (userData) currentUser = JSON.parse(userData);
     } catch (error) {
       console.error('Error parsing currentUser:', error);
       localStorage.removeItem('currentUser');
     }
     const handleLogout = () => {
       localStorage.removeItem('currentUser');
       navigate('/login');
     };
     return (
       <header className="bg-gradient-to-r from-[#740938] to-[#a0114e] text-white p-6 shadow-2xl animate-fadeInDown backdrop-blur-md">
         <div className="container mx-auto flex justify-between items-center">
           <Link to="/" className="text-4xl font-extrabold tracking-tighter hover:text-gray-100 transition-all duration-300 hover:scale-110 hover:rotate-2 transform">REST Countries</Link>
           <div className="flex items-center gap-8">
             <nav className="flex items-center gap-8">
               <Link to="/" className="text-xl font-semibold hover:text-gray-100 transition-all duration-300 hover:scale-110 hover:rotate-2 transform">Home</Link>
               <Link to="/about" className="text-xl font-semibold hover:text-gray-100 transition-all duration-300 hover:scale-110 hover:rotate-2 transform">About</Link>
             </nav>
             <button
               onClick={toggleDarkMode}
               className="text-2xl transition-all duration-500 transform hover:scale-110 hover:rotate-45"
               style={{ animation: isDarkMode ? 'spinMoon 0.5s ease-in-out' : 'spinSun 0.5s ease-in-out' }}
             >
               {isDarkMode ? '🌙' : '☀️'}
             </button>
             {currentUser.email ? (
               <div className="flex items-center gap-4">
                 <span className="text-xl font-semibold">{currentUser.fullName}</span>
                 <button
                   onClick={handleLogout}
                   className="bg-[#a0114e] text-white px-4 py-2 rounded-xl hover:bg-[#740938] transition-all duration-300 hover:scale-105 transform"
                 >
                   Logout
                 </button>
               </div>
             ) : (
               <div className="flex gap-4">
                 <Link to="/login" className="text-xl font-semibold hover:text-gray-100 transition-all duration-300 hover:scale-110 hover:rotate-2 transform">Login</Link>
                 <Link to="/register" className="text-xl font-semibold hover:text-gray-100 transition-all duration-300 hover:scale-110 hover:rotate-2 transform">Register</Link>
               </div>
             )}
           </div>
         </div>
       </header>
     );
   }