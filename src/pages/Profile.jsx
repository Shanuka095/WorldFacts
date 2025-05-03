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
       <div className="container mx-auto p-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen animate-fadeInUp">
         <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 max-w-2xl mx-auto">
           <h2 className="text-4xl font-extrabold text-[#000080] dark:text-[#0000b3] mb-6 tracking-tight">User Profile</h2>
           <div className="flex flex-col md:flex-row gap-6">
             <div className="flex-shrink-0">
               <img
                 src={currentUser.profilePic || 'https://via.placeholder.com/150'}
                 alt="Profile"
                 className="w-32 h-32 rounded-full object-cover shadow-lg"
               />
             </div>
             <div>
               <p className="text-gray-700 dark:text-gray-300 text-lg mb-2"><strong>Full Name:</strong> {currentUser.fullName}</p>
               <p className="text-gray-700 dark:text-gray-300 text-lg mb-2"><strong>Email:</strong> {currentUser.email}</p>
               <p className="text-gray-700 dark:text-gray-300 text-lg mb-2"><strong>Phone:</strong> {currentUser.phone || 'N/A'}</p>
               <p className="text-gray-700 dark:text-gray-300 text-lg mb-2"><strong>Registration Date:</strong> {new Date(currentUser.registrationDate).toLocaleDateString()}</p>
             </div>
           </div>
           <h3 className="text-2xl font-bold text-[#000080] dark:text-[#0000b3] mt-6 mb-4">Favorite Countries</h3>
           {favorites.length ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {favorites.map((countryName) => (
                 <Link
                   key={countryName}
                   to={`/country/${countryName}`}
                   className="text-[#000080] dark:text-[#0000b3] hover:text-[#000066] dark:hover:text-[#000099] transition-all duration-300"
                 >
                   {countryName}
                 </Link>
               ))}
             </div>
           ) : (
             <p className="text-gray-700 dark:text-gray-300">No favorite countries yet.</p>
           )}
         </div>
       </div>
     );
   }