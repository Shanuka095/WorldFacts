import { Link } from 'react-router-dom';
   export default function CountryCard({ country }) {
     return (
       <div className="bg-white shadow-2xl rounded-2xl p-6 border border-[#740938]/20 hover:shadow-[0_10px_20px_rgba(116,9,56,0.3)] transition-all duration-500 transform hover:scale-105 hover:rotate-1 animate-slideUpBounce">
         <img src={country.flags.png} alt={country.name.common} className="w-full h-44 object-cover rounded-xl mb-4 shadow-md" />
         <h3 className="text-2xl font-extrabold text-gray-900 mb-3 tracking-tight">{country.name.common}</h3>
         <p className="text-gray-700 text-base"><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
         <p className="text-gray-700 text-base"><strong>Population:</strong> {country.population.toLocaleString()}</p>
         <p className="text-gray-700 text-base"><strong>Region:</strong> {country.region}</p>
         <Link to={`/country/${country.name.common}`} className="text-[#740938] font-bold mt-4 inline-block hover:text-[#4e0625] transition-all duration-300 hover:scale-110 hover:rotate-2 transform">View Details</Link>
       </div>
     );
   }