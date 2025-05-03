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
       <div className="container mx-auto p-6 bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
         <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full transition-all duration-300 hover:shadow-xl">
           <h2 className="text-3xl font-bold text-[#20B2AA] dark:text-[#1A8E88] mb-6 text-center">Welcome Back</h2>
           {error && <p className="text-red-500 text-center mb-4">{error}</p>}
           <form onSubmit={handleLogin} className="flex flex-col gap-4">
             <div className="relative">
               <input
                 type="email"
                 placeholder="Email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="border border-[#20B2AA] dark:border-[#1A8E88] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#20B2AA] dark:focus:ring-[#1A8E88] transition-all duration-300"
                 required
               />
               <span className="absolute right-3 top-3 text-gray-500 dark:text-gray-400">📧</span>
             </div>
             <div className="relative">
               <input
                 type={showPassword ? 'text' : 'password'}
                 placeholder="Password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="border border-[#20B2AA] dark:border-[#1A8E88] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#20B2AA] dark:focus:ring-[#1A8E88] transition-all duration-300"
                 required
               />
               <button
                 type="button"
                 onClick={() => setShowPassword(!showPassword)}
                 className="absolute right-3 top-3 text-gray-500 dark:text-gray-400"
               >
                 {showPassword ? '🙈' : '👁️'}
               </button>
             </div>
             <button
               type="submit"
               className="bg-[#20B2AA] dark:bg-[#1A8E88] text-white p-3 rounded-lg hover:bg-[#1A8E88] dark:hover:bg-[#20B2AA] transition-all duration-300"
             >
               Sign In
             </button>
           </form>
           <p className="mt-4 text-gray-600 dark:text-gray-400 text-center">
             Don't have an account? <Link to="/register" className="text-[#20B2AA] dark:text-[#1A8E88] hover:text-[#1A8E88] dark:hover:text-[#20B2AA] transition-all duration-300">Register</Link>
           </p>
         </div>
       </div>
     );
   }