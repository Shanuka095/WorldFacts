import { useState } from 'react';
   import { useNavigate, Link } from 'react-router-dom';

   export default function Register() {
     const [firstName, setFirstName] = useState('');
     const [lastName, setLastName] = useState('');
     const [email, setEmail] = useState('');
     const [phone, setPhone] = useState('');
     const [password, setPassword] = useState('');
     const [confirmPassword, setConfirmPassword] = useState('');
     const [profilePic, setProfilePic] = useState(null);
     const [error, setError] = useState('');
     const navigate = useNavigate();

     const handleRegister = (e) => {
       e.preventDefault();
       setError('');
       if (password !== confirmPassword) {
         setError('Passwords do not match!');
         return;
       }
       const users = JSON.parse(localStorage.getItem('users') || '[]');
       if (users.find(user => user.email === email)) {
         setError('Email already registered!');
         return;
       }
       const reader = new FileReader();
       reader.onload = () => {
         const userData = {
           firstName,
           lastName,
           email,
           phone,
           password,
           profilePic: profilePic ? reader.result : null,
           registrationDate: new Date().toISOString(),
           favorites: []
         };
         users.push(userData);
         localStorage.setItem('users', JSON.stringify(users));
         alert('Registration successful! Please login.');
         navigate('/login');
       };
       if (profilePic) reader.readAsDataURL(profilePic);
       else reader.onload();
     };

     return (
       <div className="container mx-auto p-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen animate-fadeInUp flex items-center justify-center">
         <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 max-w-md w-full transform transition-all duration-500 hover:scale-105">
           <h2 className="text-4xl font-extrabold text-[#000080] dark:text-[#0000b3] mb-6 tracking-tight text-center">Create Account</h2>
           {error && <p className="text-red-500 text-center mb-4 animate-pulse">{error}</p>}
           <form onSubmit={handleRegister} className="flex flex-col gap-6">
             <div className="relative">
               <input
                 type="text"
                 placeholder="First Name"
                 value={firstName}
                 onChange={(e) => setFirstName(e.target.value)}
                 className="border-2 border-[#000080] dark:border-[#0000b3] bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 text-gray-900 dark:text-gray-100 p-4 rounded-xl w-full shadow-lg focus:outline-none focus:ring-4 focus:ring-[#000080]/50 dark:focus:ring-[#0000b3]/50 transition-all duration-500 focus:scale-105 transform"
                 required
               />
               <span className="absolute right-3 top-4 text-gray-500 dark:text-gray-300">👤</span>
             </div>
             <div className="relative">
               <input
                 type="text"
                 placeholder="Last Name"
                 value={lastName}
                 onChange={(e) => setLastName(e.target.value)}
                 className="border-2 border-[#000080] dark:border-[#0000b3] bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 text-gray-900 dark:text-gray-100 p-4 rounded-xl w-full shadow-lg focus:outline-none focus:ring-4 focus:ring-[#000080]/50 dark:focus:ring-[#0000b3]/50 transition-all duration-500 focus:scale-105 transform"
                 required
               />
               <span className="absolute right-3 top-4 text-gray-500 dark:text-gray-300">👤</span>
             </div>
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
                 type="tel"
                 placeholder="Phone Number"
                 value={phone}
                 onChange={(e) => setPhone(e.target.value)}
                 className="border-2 border-[#000080] dark:border-[#0000b3] bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 text-gray-900 dark:text-gray-100 p-4 rounded-xl w-full shadow-lg focus:outline-none focus:ring-4 focus:ring-[#000080]/50 dark:focus:ring-[#0000b3]/50 transition-all duration-500 focus:scale-105 transform"
                 required
               />
               <span className="absolute right-3 top-4 text-gray-500 dark:text-gray-300">📞</span>
             </div>
             <div className="relative">
               <input
                 type="password"
                 placeholder="Password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="border-2 border-[#000080] dark:border-[#0000b3] bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 text-gray-900 dark:text-gray-100 p-4 rounded-xl w-full shadow-lg focus:outline-none focus:ring-4 focus:ring-[#000080]/50 dark:focus:ring-[#0000b3]/50 transition-all duration-500 focus:scale-105 transform"
                 required
               />
               <span className="absolute right-3 top-4 text-gray-500 dark:text-gray-300">🔒</span>
             </div>
             <div className="relative">
               <input
                 type="password"
                 placeholder="Confirm Password"
                 value={confirmPassword}
                 onChange={(e) => setConfirmPassword(e.target.value)}
                 className="border-2 border-[#000080] dark:border-[#0000b3] bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 text-gray-900 dark:text-gray-100 p-4 rounded-xl w-full shadow-lg focus:outline-none focus:ring-4 focus:ring-[#000080]/50 dark:focus:ring-[#0000b3]/50 transition-all duration-500 focus:scale-105 transform"
                 required
               />
               <span className="absolute right-3 top-4 text-gray-500 dark:text-gray-300">🔒</span>
             </div>
             <div className="relative">
               <input
                 type="file"
                 accept="image/*"
                 onChange={(e) => setProfilePic(e.target.files[0])}
                 className="border-2 border-[#000080] dark:border-[#0000b3] bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 text-gray-900 dark:text-gray-100 p-4 rounded-xl w-full shadow-lg focus:outline-none focus:ring-4 focus:ring-[#000080]/50 dark:focus:ring-[#0000b3]/50 transition-all duration-500 focus:scale-105 transform"
               />
               <span className="absolute right-3 top-4 text-gray-500 dark:text-gray-300">🖼️</span>
             </div>
             <button
               type="submit"
               className="bg-[#000080] dark:bg-[#0000b3] text-white p-4 rounded-xl shadow-lg hover:bg-[#000066] dark:hover:bg-[#000099] transition-all duration-300 hover:scale-105 transform"
             >
               Sign Up
             </button>
           </form>
           <p className="mt-6 text-gray-700 dark:text-gray-300 text-center">
             Already have an account? <Link to="/login" className="text-[#000080] dark:text-[#0000b3] hover:text-[#000066] dark:hover:text-[#000099] transition-all duration-300">Login</Link>
           </p>
         </div>
       </div>
     );
   }