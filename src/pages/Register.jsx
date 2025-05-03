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
       <div className="container mx-auto p-6 bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
         <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full transition-all duration-300 hover:shadow-xl">
           <h2 className="text-3xl font-bold text-[#20B2AA] dark:text-[#1A8E88] mb-6 text-center">Create Account</h2>
           {error && <p className="text-red-500 text-center mb-4">{error}</p>}
           <form onSubmit={handleRegister} className="flex flex-col gap-4">
             <div className="relative">
               <input
                 type="text"
                 placeholder="First Name"
                 value={firstName}
                 onChange={(e) => setFirstName(e.target.value)}
                 className="border border-[#20B2AA] dark:border-[#1A8E88] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#20B2AA] dark:focus:ring-[#1A8E88] transition-all duration-300"
                 required
               />
               <span className="absolute right-3 top-3 text-gray-500 dark:text-gray-400">👤</span>
             </div>
             <div className="relative">
               <input
                 type="text"
                 placeholder="Last Name"
                 value={lastName}
                 onChange={(e) => setLastName(e.target.value)}
                 className="border border-[#20B2AA] dark:border-[#1A8E88] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#20B2AA] dark:focus:ring-[#1A8E88] transition-all duration-300"
                 required
               />
               <span className="absolute right-3 top-3 text-gray-500 dark:text-gray-400">👤</span>
             </div>
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
                 type="tel"
                 placeholder="Phone Number"
                 value={phone}
                 onChange={(e) => setPhone(e.target.value)}
                 className="border border-[#20B2AA] dark:border-[#1A8E88] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#20B2AA] dark:focus:ring-[#1A8E88] transition-all duration-300"
                 required
               />
               <span className="absolute right-3 top-3 text-gray-500 dark:text-gray-400">📞</span>
             </div>
             <div className="relative">
               <input
                 type="password"
                 placeholder="Password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="border border-[#20B2AA] dark:border-[#1A8E88] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#20B2AA] dark:focus:ring-[#1A8E88] transition-all duration-300"
                 required
               />
               <span className="absolute right-3 top-3 text-gray-500 dark:text-gray-400">🔒</span>
             </div>
             <div className="relative">
               <input
                 type="password"
                 placeholder="Confirm Password"
                 value={confirmPassword}
                 onChange={(e) => setConfirmPassword(e.target.value)}
                 className="border border-[#20B2AA] dark:border-[#1A8E88] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#20B2AA] dark:focus:ring-[#1A8E88] transition-all duration-300"
                 required
               />
               <span className="absolute right-3 top-3 text-gray-500 dark:text-gray-400">🔒</span>
             </div>
             <div className="relative">
               <input
                 type="file"
                 accept="image/*"
                 onChange={(e) => setProfilePic(e.target.files[0])}
                 className="border border-[#20B2AA] dark:border-[#1A8E88] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#20B2AA] dark:focus:ring-[#1A8E88] transition-all duration-300"
               />
               <span className="absolute right-3 top-3 text-gray-500 dark:text-gray-400">🖼️</span>
             </div>
             <button
               type="submit"
               className="bg-[#20B2AA] dark:bg-[#1A8E88] text-white p-3 rounded-lg hover:bg-[#1A8E88] dark:hover:bg-[#20B2AA] transition-all duration-300"
             >
               Sign Up
             </button>
           </form>
           <p className="mt-4 text-gray-600 dark:text-gray-400 text-center">
             Already have an account? <Link to="/login" className="text-[#20B2AA] dark:text-[#1A8E88] hover:text-[#1A8E88] dark:hover:text-[#20B2AA] transition-all duration-300">Login</Link>
           </p>
         </div>
       </div>
     );
   }