import { useState, useEffect } from 'react';
   import CountryCard from '../components/CountryCard';
   import SearchFilter from '../components/SearchFilter';
   import { getAllCountries, getCountriesByRegion, getCountryByName } from '../services/api';
   export default function Home() {
     const [countries, setCountries] = useState([]);
     const [searchTerm, setSearchTerm] = useState('');
     const [region, setRegion] = useState('');
     const [loading, setLoading] = useState(true);
     useEffect(() => {
       const fetchCountries = async () => {
         setLoading(true);
         try {
           let data;
           if (searchTerm) data = await getCountryByName(searchTerm);
           else if (region) data = await getCountriesByRegion(region);
           else data = await getAllCountries();
           setCountries(Array.isArray(data) ? data : [data]);
         } catch (error) {
           console.error('Error:', error);
           setCountries([]);
         }
         setLoading(false);
       };
       fetchCountries();
     }, [searchTerm, region]);
     return (
       <div className="container mx-auto p-8 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen animate-fadeInUp">
         <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} region={region} setRegion={setRegion} />
         {loading ? (
           <p className="text-center text-[#740938] text-xl font-bold animate-bounce">Loading...</p>
         ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
             {countries.length ? countries.map((country) => (
               <CountryCard key={country.name.common} country={country} />
             )) : <p className="text-center text-[#740938] text-xl font-bold animate-fadeIn">No countries found.</p>}
           </div>
         )}
       </div>
     );
   }