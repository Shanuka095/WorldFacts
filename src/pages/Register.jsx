import { useState } from 'react';
   import { useNavigate } from 'react-router-dom';

   export default function Register() {
     const [firstName, setFirstName] = useState('');
     const [lastName, setLastName] = useState('');
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [confirmPassword, setConfirmPassword] = useState('');
     const navigate = useNavigate();

     const handleRegister = (e) => {
       e.preventDefault();
       if (password !== confirmPassword) {
         alert('Passwords do not match!');
         return;
       }
       const users = JSON.parse(localStorage.getItem('users') || '[]');
       if (users.find(user => user.email === email)) {
         alert('Email already registered!');
         return;
       }
       users.push({ firstName, lastName, email, password });
       localStorage.setItem('users', JSON.stringify(users));
       alert('Registration successful! Please login.');
       navigate('/login');
     };

     return (
       <div className="container mx-auto p-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen animate-fadeInUp">
         <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 max-w-md mx-auto">
           <h2 className="text-4xl font-extrabold text-[#740938] dark:text-[#a0114e] mb-6 tracking-tight">Register</h2>
           <form onSubmit={handleRegister} className="flex flex-col gap-4">
             <input
               type="text"
               placeholder="First Name"
               value={firstName}
               onChange={(e) => setFirstName(e.target.value)}
               className="border-2 border-[#740938] dark:border-[#a0114e] bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 text-gray-900 dark:text-gray-100 p-4 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-[#740938]/50 dark:focus:ring-[#a0114e]/50 transition-all duration-500 focus:scale-105 transform"
               required
             />
             <input
               type="text"
               placeholder="Last Name"
               value={lastName}
               onChange={(e) => setLastName(e.target.value)}
               className="border-2 border-[#740938] dark:border-[#a0114e] bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 text-gray-900 dark:text-gray-100 p-4 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-[#740938]/50 dark:focus:ring-[#a0114e]/50 transition-all duration-500 focus:scale-105 transform"
               required
             />
             <input
               type="email"
               placeholder="Email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="border-2 border-[#740938] dark:border-[#a0114e] bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 text-gray-900 dark:text-gray-100 p-4 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-[#740938]/50 dark:focus:ring-[#a0114e]/50 transition-all duration-500 focus:scale-105 transform"
               required
             />
             <input
               type="password"
               placeholder="Password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="border-2 border-[#740938] dark:border-[#a0114e] bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 text-gray-900 dark:text-gray-100 p-4 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-[#740938]/50 dark:focus:ring-[#a0114e]/50 transition-all duration-500 focus:scale-105 transform"
               required
             />
             <input
               type="password"
               placeholder="Confirm Password"
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
               className="border-2 border-[#740938] dark:border-[#a0114e] bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 text-gray-900 dark:text-gray-100 p-4 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-[#740938]/50 dark:focus:ring-[#a0114e]/50 transition-all duration-500 focus:scale-105 transform"
               required
             />
             <button
               type="submit"
               className="bg-[#740938] dark:bg-[#a0114e] text-white p-4 rounded-xl shadow-lg hover:bg-[#4e0625] dark:hover:bg-[#740938] transition-all duration-300 hover:scale-105 transform"
             >
               Register
             </button>
           </form>
           <p className="mt-4 text-gray-700 dark:text-gray-300 text-center">
             Already have an account? <a href="/login" className="text-[#740938] dark:text-[#a0114e] hover:text-[#4e0625] dark:hover:text-[#740938] transition-all duration-300">Login</a>
           </p>
         </div>
       </div>
     );
   }