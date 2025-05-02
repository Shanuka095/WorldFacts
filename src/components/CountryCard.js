import { Link } from 'react-router-dom';
export default function CountryCard({ country }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg">
      <img src={country.flags.png} alt={country.name.common} className="w-full h-32 object-cover rounded" />
      <h3 className="text-lg font-semibold mt-2">{country.name.common}</h3>
      <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <Link to={`/country/${country.name.common}`} className="text-blue-500 mt-2 inline-block">View Details</Link>
    </div>
  );
}