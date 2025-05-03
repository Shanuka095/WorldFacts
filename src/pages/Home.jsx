import { useState, useEffect } from 'react';
   import CountryCard from '../components/CountryCard.jsx';
   import SearchFilter from '../components/SearchFilter.jsx';
   import { getAllCountries, getCountriesByRegion, getCountryByName, getCountriesByLanguage } from '../services/api';

   export default function Home({ favorites, toggleFavorite }) {
     const [countries, setCountries] = useState([]);
     const [searchTerm, setSearchTerm] = useState('');
     const [region, setRegion] = useState('');
     const [language, setLanguage] = useState('');
     const [showFavorites, setShowFavorites] = useState(false);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState('');

     useEffect(() => {
       const fetchCountries = async () => {
         setLoading(true);
         setError('');
         try {
           let data;
           if (showFavorites) {
             if (favorites.length === 0) {
               setCountries([]);
               return;
             }
             data = await Promise.all(favorites.map(name => getCountryByName(name).catch(() => null)));
             data = data.flat().filter(Boolean);
           } else if (searchTerm) {
             data = await getCountryByName(searchTerm).catch(() => []);
             data = Array.isArray(data) ? data : [data].filter(Boolean);
           } else if (language) {
             data = await getCountriesByLanguage(language);
           } else if (region) {
             data = await getCountriesByRegion(region);
           } else {
             data = await getAllCountries();
           }
           setCountries(Array.isArray(data) ? data : []);
         } catch (error) {
           console.error('Error fetching countries:', error);
           setError('Failed to load countries. Please try again.');
           setCountries([]);
         } finally {
           setLoading(false);
         }
       };
       fetchCountries();
     }, [searchTerm, region, language, showFavorites, favorites]);

     return (
       <div className="container mx-auto p-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen animate-fadeInUp">
         <div className="flex justify-between items-center mb-6">
           <SearchFilter
             searchTerm={searchTerm}
             setSearchTerm={setSearchTerm}
             region={region}
             setRegion={setRegion}
             language={language}
             setLanguage={setLanguage}
           />
           <button
             onClick={() => setShowFavorites(!showFavorites)}
             className="bg-[#000080] dark:bg-[#0000b3] text-white px-4 py-2 rounded-xl shadow-lg hover:bg-[#000066] dark:hover:bg-[#000099] transition-all duration-300 hover:scale-105 transform"
           >
             {showFavorites ? 'Show All Countries' : 'Show Favorites'}
           </button>
         </div>
         {loading ? (
           <div className="flex justify-center items-center">
             <div className="w-12 h-12 border-4 border-[#000080] dark:border-[#0000b3] border-t-transparent rounded-full animate-spin"></div>
             <p className="ml-4 text-[#000080] dark:text-[#0000b3] text-xl font-bold">Loading...</p>
           </div>
         ) : error ? (
           <p className="text-center text-[#000080] dark:text-[#0000b3] text-xl font-bold animate-fadeIn">{error}</p>
         ) : countries.length ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
             {countries.map((country) => (
               <CountryCard
                 key={country.name.common}
                 country={country}
                 toggleFavorite={toggleFavorite}
                 isFavorite={favorites.includes(country.name.common)}
               />
             ))}
           </div>
         ) : (
           <p className="text-center text-[#000080] dark:text-[#0000b3] text-xl font-bold animate-fadeIn">No countries found.</p>
         )}
       </div>
     );
   }