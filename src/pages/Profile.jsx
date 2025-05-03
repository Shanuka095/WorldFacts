import { Link } from 'react-router-dom';

   export default function Profile({ favorites }) {
     let currentUser = {};
     try {
       const userData = localStorage.getItem('currentUser');
       if (userData) currentUser = JSON.parse(userData);
     } catch (error) {
       console.error('Error parsing currentUser:', error);
       localStorage.removeItem('currentUser');
     }

     return (
       <div className="container mx-auto p-6 bg-gray-50 dark:bg-gray-900 min-h-screen animate-fadeIn">
         <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-2xl mx-auto">
           <h2 className="text-3xl font-bold text-[#20B2AA] dark:text-[#1A8E88] mb-6">User Profile</h2>
           <div className="flex flex-col md:flex-row gap-6">
             <div className="flex-shrink-0">
               <img
                 src={currentUser.profilePic || 'https://via.placeholder.com/150'}
                 alt="Profile"
                 className="w-28 h-28 rounded-full object-cover shadow-sm"
               />
             </div>
             <div>
               <p className="text-gray-600 dark:text-gray-400 text-base mb-2"><strong>Full Name:</strong> {currentUser.fullName}</p>
               <p className="text-gray-600 dark:text-gray-400 text-base mb-2"><strong>Email:</strong> {currentUser.email}</p>
               <p className="text-gray-600 dark:text-gray-400 text-base mb-2"><strong>Phone:</strong> {currentUser.phone || 'N/A'}</p>
               <p className="text-gray-600 dark:text-gray-400 text-base mb-2"><strong>Registration Date:</strong> {new Date(currentUser.registrationDate).toLocaleDateString()}</p>
             </div>
           </div>
           <h3 className="text-xl font-bold text-[#20B2AA] dark:text-[#1A8E88] mt-6 mb-4">Favorite Countries</h3>
           {favorites.length ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {favorites.map((countryName) => (
                 <Link
                   key={countryName}
                   to={`/country/${countryName}`}
                   className="text-[#20B2AA] dark:text-[#1A8E88] hover:text-[#1A8E88] dark:hover:text-[#20B2AA] transition-all duration-300"
                 >
                   {countryName}
                 </Link>
               ))}
             </div>
           ) : (
             <p className="text-gray-600 dark:text-gray-400">No favorite countries yet.</p>
           )}
         </div>
       </div>
     );
   }