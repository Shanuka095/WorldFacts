import { Link, useNavigate } from 'react-router-dom';
   export default function Header() {
     const navigate = useNavigate();
     const currentUser = localStorage.getItem('currentUser');
     const handleLogout = () => {
       localStorage.removeItem('currentUser');
       navigate('/login');
     };
     return (
       <header className="bg-gradient-to-r from-[#740938] to-[#a0114e] text-white p-6 shadow-2xl animate-fadeInDown backdrop-blur-md">
         <div className="container mx-auto flex justify-between items-center">
           <Link to="/" className="text-4xl font-extrabold tracking-tighter hover:text-gray-100 transition-all duration-300 hover:scale-110 hover:rotate-2 transform">REST Countries</Link>
           <nav className="flex items-center gap-8">
             <Link to="/" className="text-xl font-semibold hover:text-gray-100 transition-all duration-300 hover:scale-110 hover:rotate-2 transform">Home</Link>
             <Link to="/about" className="text-xl font-semibold hover:text-gray-100 transition-all duration-300 hover:scale-110 hover:rotate-2 transform">About</Link>
             {currentUser ? (
               <button
                 onClick={handleLogout}
                 className="text-xl font-semibold bg-[#a0114e] text-white px-4 py-2 rounded-xl hover:bg-[#740938] transition-all duration-300 hover:scale-105 transform"
               >
                 Logout
               </button>
             ) : (
               <>
                 <Link to="/login" className="text-xl font-semibold hover:text-gray-100 transition-all duration-300 hover:scale-110 hover:rotate-2 transform">Login</Link>
                 <Link to="/register" className="text-xl font-semibold hover:text-gray-100 transition-all duration-300 hover:scale-110 hover:rotate-2 transform">Register</Link>
               </>
             )}
           </nav>
         </div>
       </header>
     );
   }