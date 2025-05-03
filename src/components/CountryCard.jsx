import { Link } from 'react-router-dom';

   export default function CountryCard({ country, toggleFavorite, isFavorite }) {
     return (
       <Link to={`/country/${country.name.common}`} className="block bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 border border-[#20B2AA]/20 dark:border-[#1A8E88]/20 hover:shadow-[0_8px_16px_rgba(32,178,170,0.3)] transition-all duration-300 transform hover:scale-105 animate-slideUp">
         <img src={country.flags.png} alt={country.name.common} className="w-full h-40 object-cover rounded-lg mb-4 shadow-sm" />
         <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{country.name.common}</h3>
         <p className="text-gray-600 dark:text-gray-400 text-sm"><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
         <p className="text-gray-600 dark:text-gray-400 text-sm"><strong>Population:</strong> {country.population.toLocaleString()}</p>
         <p className="text-gray-600 dark:text-gray-400 text-sm"><strong>Region:</strong> {country.region}</p>
         <button
           onClick={(e) => {
             e.preventDefault();
             toggleFavorite(country.name.common);
           }}
           className="mt-4 text-[#20B2AA] dark:text-[#1A8E88] hover:text-[#1A8E88] dark:hover:text-[#20B2AA] transition-all duration-300"
         >
           {isFavorite ? (
             <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
               <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
             </svg>
           ) : (
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
             </svg>
           )}
         </button>
       </Link>
     );
   }