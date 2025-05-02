import { Link } from 'react-router-dom';
   export default function Header() {
     return (
       <header className="bg-gradient-to-r from-[#740938] to-[#a0114e] text-white p-6 shadow-2xl animate-fadeInDown backdrop-blur-md">
         <div className="container mx-auto flex justify-between items-center">
           <Link to="/" className="text-4xl font-extrabold tracking-tighter hover:text-gray-100 transition-all duration-300 hover:scale-110 hover:rotate-2 transform">REST Countries</Link>
           <nav className="flex items-center gap-8">
             <Link to="/" className="text-xl font-semibold hover:text-gray-100 transition-all duration-300 hover:scale-110 hover:rotate-2 transform">Home</Link>
             <Link to="/about" className="text-xl font-semibold hover:text-gray-100 transition-all duration-300 hover:scale-110 hover:rotate-2 transform">About</Link>
           </nav>
         </div>
       </header>
     );
   }