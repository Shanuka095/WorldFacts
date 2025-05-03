import { Link, useNavigate } from 'react-router-dom';
   import { useState } from 'react';

   export default function Header({ isDarkMode, toggleDarkMode }) {
     const navigate = useNavigate();
     const [isProfileOpen, setIsProfileOpen] = useState(false);

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
       <header className="bg-gradient-to-r from-[#000080] to-[#0000b3] text-white p-6 shadow-2xl animate-fadeInDown backdrop-blur-md">
         <div className="container mx-auto flex justify-between items-center">
           <Link to="/" className="text-4xl font-extrabold tracking-tighter hover:text-gray-100 transition-all duration-300 hover:scale-110 hover:rotate-2 transform">REST Countries</Link>
           <div className="flex items-center gap-8">
             <nav className="flex items-center gap-8">
               <Link to="/" className="text-xl font-semibold hover:text-gray-100 transition-all duration-300 hover:scale-110 hover:rotate-2 transform">Home</Link>
               <Link to="/about" className="text-xl font-semibold hover:text-gray-100 transition-all duration-300 hover:scale-110 hover:rotate-2 transform">About</Link>
             </nav>
             <button
               onClick={toggleDarkMode}
               className="text-white transition-all duration-500 transform hover:scale-110"
               style={{ animation: isDarkMode ? 'spinMoon 0.5s ease-in-out' : 'spinSun 0.5s ease-in-out' }}
             >
               {isDarkMode ? (
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"></path>
                 </svg>
               ) : (
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                 </svg>
               )}
             </button>
             {currentUser.email ? (
               <div
                 className="relative"
                 onMouseEnter={() => setIsProfileOpen(true)}
                 onMouseLeave={() => setIsProfileOpen(false)}
               >
                 <span className="text-xl font-semibold cursor-pointer hover:text-gray-100 transition-all duration-300">{currentUser.fullName}</span>
                 {isProfileOpen && (
                   <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 animate-fadeIn">
                     <Link to="/profile" className="block text-gray-900 dark:text-gray-100 hover:text-[#000080] dark:hover:text-[#0000b3] transition-all duration-300">Profile</Link>
                     <button
                       onClick={handleLogout}
                       className="block w-full text-left text-gray-900 dark:text-gray-100 hover:text-[#000080] dark:hover:text-[#0000b3] transition-all duration-300 mt-2"
                     >
                       Sign Out
                     </button>
                   </div>
                 )}
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