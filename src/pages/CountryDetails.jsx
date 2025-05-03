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
       <div className="flex justify-center items-center">
         <div className="w-12 h-12 border-4 border-[#000080] dark:border-[#0000b3] border-t-transparent rounded-full animate-spin"></div>
         <p className="ml-4 text-[#000080] dark:text-[#0000b3] text-xl font-bold">Loading...</p>
       </div>
     );

     if (!country) return <p className="text-center text-[#000080] dark:text-[#0000b3] text-xl font-bold animate-fadeIn">Country not found.</p>;

     const position = country.latlng ? [country.latlng[0], country.latlng[1]] : [0, 0];

     return (
       <div className="container mx-auto p-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen animate-fadeInUp">
         <Link to="/" className="text-[#000080] dark:text-[#0000b3] font-bold text-xl mb-8 inline-block hover:text-[#000066] dark:hover:text-[#000099] transition-all duration-500 hover:scale-110 hover:rotate-3 transform">← Back</Link>
         <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 shadow-2xl rounded-2xl p-10 flex flex-col gap-10 animate-slideInRight">
           <div className="flex flex-col md:flex-row gap-10">
             <img src={country.flags.png} alt={country.name.common} className="w-full md:w-1/3 h-64 object-cover rounded-xl shadow-lg" />
             <div>
               <h2 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">{country.name.common}</h2>
               <p className="text-gray-700 dark:text-gray-300 text-lg mb-2"><strong>Official Name:</strong> {country.name.official}</p>
               <p className="text-gray-700 dark:text-gray-300 text-lg mb-2"><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
               <p className="text-gray-700 dark:text-gray-300 text-lg mb-2"><strong>Population:</strong> {country.population.toLocaleString()}</p>
               <p className="text-gray-700 dark:text-gray-300 text-lg mb-2"><strong>Area:</strong> {country.area ? `${country.area.toLocaleString()} km²` : 'N/A'}</p>
               <p className="text-gray-700 dark:text-gray-300 text-lg mb-2"><strong>Region:</strong> {country.region}</p>
               <p className="text-gray-700 dark:text-gray-300 text-lg mb-2"><strong>Subregion:</strong> {country.subregion || 'N/A'}</p>
               <p className="text-gray-700 dark:text-gray-300 text-lg"><strong>Languages:</strong> {Object.values(country.languages || {}).join(', ')}</p>
             </div>
           </div>
           <div className="h-96 rounded-xl overflow-hidden shadow-lg">
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