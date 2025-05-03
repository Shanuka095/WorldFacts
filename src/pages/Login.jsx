import { useState } from 'react';
   import { useNavigate, Link } from 'react-router-dom';

   export default function Login() {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [showPassword, setShowPassword] = useState(false);
     const [error, setError] = useState('');
     const navigate = useNavigate();

     const handleLogin = (e) => {
       e.preventDefault();
       setError('');
       const users = JSON.parse(localStorage.getItem('users') || '[]');
       const user = users.find(user => user.email === email && user.password === password);
       if (user) {
         localStorage.setItem('currentUser', JSON.stringify({
           email: user.email,
           fullName: `${user.firstName} ${user.lastName}`,
           phone: user.phone,
           profilePic: user.profilePic,
           registrationDate: user.registrationDate
         }));
         navigate('/');
       } else {
         setError('Invalid email or password!');
       }
     };

     return (
       <div className="container mx-auto p-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen animate-fadeInUp flex items-center justify-center">
         <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 max-w-md w-full transform transition-all duration-500 hover:scale-105">
           <h2 className="text-4xl font-extrabold text-[#000080] dark:text-[#0000b3] mb-6 tracking-tight text-center">Welcome Back</h2>
           {error && <p className="text-red-500 text-center mb-4 animate-pulse">{error}</p>}
           <form onSubmit={handleLogin} className="flex flex-col gap-6">
             <div className="relative">
               <input
                 type="email"
                 placeholder="Email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="border-2 border-[#000080] dark:border-[#0000b3] bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 text-gray-900 dark:text-gray-100 p-4 rounded-xl w-full shadow-lg focus:outline-none focus:ring-4 focus:ring-[#000080]/50 dark:focus:ring-[#0000b3]/50 transition-all duration-500 focus:scale-105 transform"
                 required
               />
               <span className="absolute right-3 top-4 text-gray-500 dark:text-gray-300">📧</span>
             </div>
             <div className="relative">
               <input
                 type={showPassword ? 'text' : 'password'}
                 placeholder="Password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="border-2 border-[#000080] dark:border-[#0000b3] bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 text-gray-900 dark:text-gray-100 p-4 rounded-xl w-full shadow-lg focus:outline-none focus:ring-4 focus:ring-[#000080]/50 dark:focus:ring-[#0000b3]/50 transition-all duration-500 focus:scale-105 transform"
                 required
               />
               <button
                 type="button"
                 onClick={() => setShowPassword(!showPassword)}
                 className="absolute right-3 top-4 text-gray-500 dark:text-gray-300"
               >
                 {showPassword ? '🙈' : '👁️'}
               </button>
             </div>
             <button
               type="submit"
               className="bg-[#000080] dark:bg-[#0000b3] text-white p-4 rounded-xl shadow-lg hover:bg-[#000066] dark:hover:bg-[#000099] transition-all duration-300 hover:scale-105 transform"
             >
               Sign In
             </button>
           </form>
           <p className="mt-6 text-gray-700 dark:text-gray-300 text-center">
             Don't have an account? <Link to="/register" className="text-[#000080] dark:text-[#0000b3] hover:text-[#000066] dark:hover:text-[#000099] transition-all duration-300">Register</Link>
           </p>
         </div>
       </div>
     );
   }