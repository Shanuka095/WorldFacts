import { useState } from 'react';
   import { useNavigate } from 'react-router-dom';
   export default function Register() {
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');
     const navigate = useNavigate();
     const handleRegister = (e) => {
       e.preventDefault();
       const users = JSON.parse(localStorage.getItem('users') || '[]');
       if (users.find(user => user.username === username)) {
         alert('Username already exists!');
         return;
       }
       users.push({ username, password });
       localStorage.setItem('users', JSON.stringify(users));
       alert('Registration successful! Please login.');
       navigate('/login');
     };
     return (
       <div className="container mx-auto p-8 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen animate-fadeInUp">
         <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md mx-auto">
           <h2 className="text-4xl font-extrabold text-[#740938] mb-6 tracking-tight">Register</h2>
           <form onSubmit={handleRegister} className="flex flex-col gap-6">
             <input
               type="text"
               placeholder="Username"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
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
               Register
             </button>
           </form>
           <p className="mt-4 text-gray-700 text-center">
             Already have an account? <a href="/login" className="text-[#740938] hover:text-[#4e0625] transition-all duration-300">Login</a>
           </p>
         </div>
       </div>
     );
   }