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
  if (loading) return <p className="text-center">Loading...</p>;
  if (!country) return <p className="text-center">Country not found.</p>;
  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="text-blue-500 mb-4 inline-block">← Back</Link>
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row gap-6">
        <img src={country.flags.png} alt={country.name.common} className="w-full md:w-1/2 h-64 object-cover rounded" />
        <div>
          <h2 className="text-2xl font-bold mb-4">{country.name.common}</h2>
          <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
          <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Languages:</strong> {Object.values(country.languages || {}).join(', ')}</p>
        </div>
      </div>
    </div>
  );
}