import { useState, useEffect } from 'react';
   import { useParams, Link } from 'react-router-dom';
   import { getCountryByName } from '../services/api';
   export default function CountryDetails() {
     const { name } = useParams();
     const [country, setCountry] = useState(null);
     const [loading, setLoading] = useState(true);
     useEffect(() => {
       const fetchCountry = async () => {
         setLoading(true);
         try {
           const data = await getCountryByName(name);
           setCountry(Array.isArray(data) ? data[0] : data);
         } catch (error) {
           console.error('Error:', error);
           setCountry(null);
         }
         setLoading(false);
       };
       fetchCountry();
     }, [name]);
     if (loading) return (
       <div className="flex justify-center items-center">
         <div className="w-12 h-12 border-4 border-[#740938] border-t-transparent rounded-full animate-spin"></div>
         <p className="ml-4 text-[#740938] text-xl font-bold">Loading...</p>
       </div>
     );
     if (!country) return <p className="text-center text-[#740938] text-xl font-bold animate-fadeIn">Country not found.</p>;
     return (
       <div className="container mx-auto p-8 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen animate-fadeInUp">
         <Link to="/" className="text-[#740938] font-bold text-xl mb-8 inline-block hover:text-[#4e0625] transition-all duration-500 hover:scale-110 hover:rotate-3 transform">← Back</Link>
         <div className="bg-gradient-to-br from-white to-gray-50 shadow-2xl rounded-2xl p-10 flex flex-col md:flex-row gap-10 animate-slideInRight">
           <img src={country.flags.png} alt={country.name.common} className="w-full md:w-1/2 h-96 object-cover rounded-xl shadow-lg" />
           <div>
             <h2 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">{country.name.common}</h2>
             <p className="text-gray-700 text-lg mb-3"><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
             <p className="text-gray-700 text-lg mb-3"><strong>Population:</strong> {country.population.toLocaleString()}</p>
             <p className="text-gray-700 text-lg mb-3"><strong>Region:</strong> {country.region}</p>
             <p className="text-gray-700 text-lg"><strong>Languages:</strong> {Object.values(country.languages || {}).join(', ')}</p>
           </div>
         </div>
       </div>
     );
   }