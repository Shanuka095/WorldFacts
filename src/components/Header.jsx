import { Link, useNavigate } from 'react-router-dom';
   import { useState } from 'react';

   export default function Header({ isDarkMode, toggleDarkMode, favorites }) {
     const navigate = useNavigate();
     const [isProfileOpen, setIsProfileOpen] = useState(false);
     const [showFavorites, setShowFavorites] = useState(false);

     let currentUser = {};
     try {
       const userData = localStorage.getItem('currentUser');
       if (userData) currentUser = JSON.parse(userData);
     } catch (error) {
       console.error('Error parsing currentUser:', error);
       localStorage.removeItem('currentUser');
     }

     const initials = currentUser.fullName
       ? currentUser.fullName
           .split(' ')
           .map(name => name[0])
           .slice(0, 2)
           .join('')
           .toUpperCase()
       : 'NA';

     const handleLogout = () => {
       localStorage.removeItem('currentUser');
       navigate('/login');
     };

     return (
       <header className="bg-gradient-to-r from-[#20B2AA] to-[#1A8E88] text-white p-4 shadow-lg animate-fadeInDown sticky top-0 z-50 backdrop-blur-md">
         <div className="container mx-auto flex justify-between items-center">
           <Link to="/" className="text-3xl font-bold tracking-tight hover:text-gray-100 transition-all duration-300 hover:scale-105 transform">
             REST Countries
           </Link>
           <div className="flex items-center gap-6">
             {currentUser.email && (
               <button
                 onClick={() => {
                   setShowFavorites(!showFavorites);
                   navigate('/');
                 }}
                 className="bg-white text-[#20B2AA] dark:text-[#1A8E88] px-3 py-1 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
               >
                 {showFavorites ? 'All Countries' : 'Favorites'}
               </button>
             )}
             <button
               onClick={toggleDarkMode}
               className="relative inline-flex items-center justify-center w-10 h-10 bg-white dark:bg-gray-700 text-[#20B2AA] dark:text-[#1A8E88] rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
             >
               {isDarkMode ? (
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                   <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                 </svg>
               ) : (
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                   <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 11-2 0 1 1 0 012 0zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 11-2 0 1 1 0 012 0zm-1-1z" clipRule="evenodd" />
                 </svg>
               )}
             </button>
             {currentUser.email ? (
               <div
                 className="relative"
                 onMouseEnter={() => setIsProfileOpen(true)}
                 onMouseLeave={() => setIsProfileOpen(false)}
               >
                 <button className="flex items-center justify-center w-10 h-10 bg-white dark:bg-gray-700 text-[#20B2AA] dark:text-[#1A8E88] rounded-full font-medium hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105">
                   {initials}
                 </button>
                 {isProfileOpen && (
                   <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 animate-fadeIn border border-gray-200 dark:border-gray-700">
                     <Link to="/profile" className="block text-gray-900 dark:text-gray-100 hover:text-[#20B2AA] dark:hover:text-[#1A8E88] transition-all duration-300 py-1">Profile</Link>
                     <button
                       onClick={handleLogout}
                       className="block w-full text-left text-gray-900 dark:text-gray-100 hover:text-[#20B2AA] dark:hover:text-[#1A8E88] transition-all duration-300 py-1"
                     >
                       Sign Out
                     </button>
                   </div>
                 )}
               </div>
             ) : (
               <div className="flex gap-4">
                 <Link to="/login" className="text-lg font-medium hover:text-gray-100 transition-all duration-300 hover:scale-105 transform">Login</Link>
                 <Link to="/register" className="text-lg font-medium hover:text-gray-100 transition-all duration-300 hover:scale-105 transform">Register</Link>
               </div>
             )}
           </div>
         </div>
       </header>
     );
   }