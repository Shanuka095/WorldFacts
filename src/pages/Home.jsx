import { useState, useEffect } from 'react';
   import CountryCard from '../components/CountryCard.jsx';
   import SearchFilter from '../components/SearchFilter.jsx';
   import { getAllCountries, getCountriesByRegion, getCountryByName, getCountriesByLanguage } from '../services/api';

   export default function Home({ favorites, toggleFavorite }) {
     const [countries, setCountries] = useState([]);
     const [searchTerm, setSearchTerm] = useState('');
     const [region, setRegion] = useState('');
     const [language, setLanguage] = useState('');
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState('');

     useEffect(() => {
       const fetchCountries = async () => {
         setLoading(true);
         setError('');
         try {
           let data;
           if (searchTerm) {
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
     }, [searchTerm, region, language]);

     return (
       <div className="container mx-auto p-6 bg-gray-50 dark:bg-gray-900 min-h-screen animate-fadeIn">
         <SearchFilter
           searchTerm={searchTerm}
           setSearchTerm={setSearchTerm}
           region={region}
           setRegion={setRegion}
           language={language}
           setLanguage={setLanguage}
         />
         {loading ? (
           <div className="flex justify-center items-center mt-10">
             <div className="w-10 h-10 border-4 border-[#20B2AA] dark:border-[#1A8E88] border-t-transparent rounded-full animate-spin"></div>
             <p className="ml-4 text-[#20B2AA] dark:text-[#1A8E88] text-lg font-medium">Loading...</p>
           </div>
         ) : error ? (
           <p className="text-center text-[#20B2AA] dark:text-[#1A8E88] text-lg font-medium mt-10 animate-fadeIn">{error}</p>
         ) : countries.length ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
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
           <p className="text-center text-[#20B2AA] dark:text-[#1A8E88] text-lg font-medium mt-10 animate-fadeIn">No countries found.</p>
         )}
       </div>
     );
   }