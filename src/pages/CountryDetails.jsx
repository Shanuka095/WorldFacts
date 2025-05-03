import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
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
    <div className="flex justify-center items-center mt-10">
      <div className="w-10 h-10 border-4 border-[#20B2AA] dark:border-[#1A8E88] border-t-transparent rounded-full animate-spin"></div>
      <p className="ml-4 text-[#20B2AA] dark:text-[#1A8E88] text-lg font-medium">Loading...</p>
    </div>
  );

  if (!country) return <p className="text-center text-[#20B2AA] dark:text-[#1A8E88] text-lg font-medium mt-10 animate-fadeIn">Country not found.</p>;

  const position = country.latlng ? [country.latlng[0], country.latlng[1]] : [0, 0];

  return (
    <div className="container mx-auto p-6 bg-gray-50 dark:bg-gray-900 min-h-screen animate-fadeIn">
      <Link to="/" className="text-[#20 irons-50 dark:text-[#1A8E88] font-medium text-lg mb-6 inline-block hover:text-[#1A8E88] dark:hover:text-[#20B2AA] transition-all duration-300">← Back</Link>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 animate-slideInUp">
        <div className="flex flex-col md:flex-row gap-6">
          <img src={country.flags.png} alt={country.name.common} className="w-full md:w-1/3 h-60 object-cover rounded-lg shadow-sm" />
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">{country.name.common}</h2>
            <p className="text-gray-600 dark:text-gray-400 text-base mb-2"><strong>Official Name:</strong> {country.name.official}</p>
            <p className="text-gray-600 dark:text-gray-400 text-base mb-2"><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
            <p className="text-gray-600 dark:text-gray-400 text-base mb-2"><strong>Population:</strong> {country.population.toLocaleString()}</p>
            <p className="text-gray-600 dark:text-gray-400 text-base mb-2"><strong>Area:</strong> {country.area ? `${country.area.toLocaleString()} km²` : 'N/A'}</p>
            <p className="text-gray-600 dark:text-gray-400 text-base mb-2"><strong>Region:</strong> {country.region}</p>
            <p className="text-gray-600 dark:text-gray-400 text-base mb-2"><strong>Subregion:</strong> {country.subregion || 'N/A'}</p>
            <p className="text-gray-600 dark:text-gray-400 text-base"><strong>Languages:</strong> {Object.values(country.languages || {}).join(', ')}</p>
          </div>
        </div>
        <div className="h-80 rounded-lg overflow-hidden shadow-sm mt-6">
          <MapContainer center={position} zoom={4} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>{country.name.common}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}