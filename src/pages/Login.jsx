import { useState } from 'react';
   import { useNavigate } from 'react-router-dom';
   export default function Login() {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const navigate = useNavigate();
     const handleLogin = (e) => {
       e.preventDefault();
       const users = JSON.parse(localStorage.getItem('users') || '[]');
       const user = users.find(user => user.email === email && user.password === password);
       if (user) {
         localStorage.setItem('currentUser', JSON.stringify({ email, fullName: `${user.firstName} ${user.lastName}` }));
         navigate('/');
       } else {
         alert('Invalid email or password!');
       }
     };
     return (
       <div className="container mx-auto p-8 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen animate-fadeInUp">
         <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md mx-auto">
           <h2 className="text-4xl font-extrabold text-[#740938] mb-6 tracking-tight">Login</h2>
           <form onSubmit={handleLogin} className="flex flex-col gap-4">
             <input
               type="email"
               placeholder="Email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="border-2 border-[#740938] bg-gradient-to-r from-white to-gray-50 p-4 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-[#740938]/50 transition-all duration-500 focus:scale-105 transform"
               required
             />
             <input
               type="password"
               placeholder="Password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="border-2 border-[#740938] bg-gradient-to-r from-white to-gray-50 p-4 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-[#740938]/50 transition-all duration-500 focus:scale-105 transform"
               required
             />
             <button
               type="submit"
               className="bg-[#740938] text-white p-4 rounded-xl shadow-lg hover:bg-[#4e0625] transition-all duration-300 hover:scale-105 transform"
             >
               Login
             </button>
           </form>
           <p className="mt-4 text-gray-700 text-center">
             Don't have an account? <a href="/register" className="text-[#740938] hover:text-[#4e0625] transition-all duration-300">Register</a>
           </p>
         </div>
       </div>
     );
   }