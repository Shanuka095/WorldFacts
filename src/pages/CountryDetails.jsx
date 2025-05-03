import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getCountryByName } from '../services/api';

export default function CountryDetails({ isDarkMode, favorites, toggleFavorite }) {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountry = async () => {
      setLoading(true);
      try {
        const decodedName = decodeURIComponent(name);
        const data = await getCountryByName(decodedName);
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3rem', minHeight: '100vh', background: `linear-gradient(135deg, ${isDarkMode ? '#1F1B2E' : '#F9F5FF'}, ${isDarkMode ? '#2A2640' : '#E6E0FA'})` }}>
      <div style={{ width: '3rem', height: '3rem', border: `4px solid ${isDarkMode ? '#4B0E9A' : '#6D16DF'}`, borderTop: '4px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
      <p style={{ marginLeft: '1rem', color: isDarkMode ? '#A678F2' : '#6D16DF', fontSize: '1.25rem', fontWeight: '600' }}>Loading...</p>
    </div>
  );

  if (!country) return (
    <div style={{ textAlign: 'center', color: isDarkMode ? '#A678F2' : '#6D16DF', fontSize: '1.25rem', fontWeight: '600', marginTop: '3rem', minHeight: '100vh', background: `linear-gradient(135deg, ${isDarkMode ? '#1F1B2E' : '#F9F5FF'}, ${isDarkMode ? '#2A2640' : '#E6E0FA'})`, animation: 'fadeIn 0.5s ease' }}>
      Country not found.
    </div>
  );

  const position = country.latlng ? [country.latlng[0], country.latlng[1]] : [0, 0];
  const isFavorite = favorites.includes(country.name.common);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem', background: `linear-gradient(135deg, ${isDarkMode ? '#1F1B2E' : '#F9F5FF'}, ${isDarkMode ? '#2A2640' : '#E6E0FA'})`, minHeight: '100vh', animation: 'fadeIn 0.5s ease' }}>
      <Link
        to="/"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: isDarkMode ? '#4B0E9A' : '#6D16DF', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: '600', textDecoration: 'none', transition: 'all 0.3s ease', transform: 'scale(1)', boxShadow: '0 6px 12px rgba(0,0,0,0.3)', marginBottom: '2rem' }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        <svg style={{ width: '1.25rem', height: '1.25rem', fill: 'none', stroke: '#fff', strokeWidth: '2' }} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
        Back
      </Link>
      <div style={{ background: isDarkMode ? '#2A2640' : '#fff', boxShadow: '0 6px 18px rgba(0,0,0,0.2)', borderRadius: '1rem', padding: '2.5rem', animation: 'slideInUp 0.5s ease', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: `linear-gradient(45deg, ${isDarkMode ? '#4B0E9A33' : '#6D16DF33'}, transparent)`, opacity: 0.2, zIndex: 0 }}></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '2rem', zIndex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 300px', maxWidth: '400px' }}>
              <img src={country.flags.png} alt={country.name.common} style={{ width: '100%', height: 'auto', maxHeight: '200px', objectFit: 'cover', borderRadius: '0.5rem', boxShadow: `0 6px 12px ${isDarkMode ? '#4B0E9A33' : '#6D16DF33'}`, animation: 'zoomIn 0.5s ease', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'} />
              {country.coatOfArms?.png && (
                <img src={country.coatOfArms.png} alt={`${country.name.common} Coat of Arms`} style={{ width: '100%', height: 'auto', maxHeight: '150px', objectFit: 'contain', marginTop: '1rem', borderRadius: '0.5rem', boxShadow: `0 6px 12px ${isDarkMode ? '#4B0E9A33' : '#6D16DF33'}`, animation: 'zoomIn 0.5s ease', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'} />
              )}
            </div>
            <div style={{ flex: '2 1 400px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', background: isDarkMode ? '#4B0E9A33' : '#F9F5FF', padding: '1rem', borderRadius: '0.5rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <h2 style={{ fontSize: '2.25rem', fontWeight: '700', color: isDarkMode ? '#E0DFFF' : '#2D1B4E', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>{country.name.common}</h2>
                <button
                  onClick={() => toggleFavorite(country.name.common)}
                  style={{ color: isFavorite ? (isDarkMode ? '#A678F2' : '#6D16DF') : (isDarkMode ? '#7B46D3' : '#A678F2'), transition: 'all 0.3s ease', transform: 'scale(1)' }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  <svg style={{ width: '2rem', height: '2rem', fill: isFavorite ? 'currentColor' : 'none', stroke: isFavorite ? 'none' : 'currentColor', strokeWidth: '2' }} viewBox="0 0 24 24">
                    {isFavorite ? (
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    ) : (
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeLinecap="round" strokeLinejoin="round"/>
                    )}
                  </svg>
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <p style={{ fontSize: '1rem', color: isDarkMode ? '#A678F2' : '#6D16DF', marginBottom: '0.5rem', background: isDarkMode ? '#4B0E9A33' : '#F9F5FF', padding: '0.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}><strong>Official Name:</strong> {country.name.official}</p>
                <p style={{ fontSize: '1rem', color: isDarkMode ? '#A678F2' : '#6D16DF', marginBottom: '0.5rem', background: isDarkMode ? '#4B0E9A33' : '#F9F5FF', padding: '0.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}><strong>Capital:</strong> {country.capital?.join(', ') || 'N/A'}</p>
                <p style={{ fontSize: '1rem', color: isDarkMode ? '#A678F2' : '#6D16DF', marginBottom: '0.5rem', background: isDarkMode ? '#4B0E9A33' : '#F9F5FF', padding: '0.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}><strong>Population:</strong> {country.population.toLocaleString()}</p>
                <p style={{ fontSize: '1rem', color: isDarkMode ? '#A678F2' : '#6D16DF', marginBottom: '0.5rem', background: isDarkMode ? '#4B0E9A33' : '#F9F5FF', padding: '0.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}><strong>Area:</strong> {country.area ? `${country.area.toLocaleString()} km²` : 'N/A'}</p>
                <p style={{ fontSize: '1rem', color: isDarkMode ? '#A678F2' : '#6D16DF', marginBottom: '0.5rem', background: isDarkMode ? '#4B0E9A33' : '#F9F5FF', padding: '0.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}><strong>Region:</strong> {country.region}</p>
                <p style={{ fontSize: '1rem', color: isDarkMode ? '#A678F2' : '#6D16DF', marginBottom: '0.5rem', background: isDarkMode ? '#4B0E9A33' : '#F9F5FF', padding: '0.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}><strong>Subregion:</strong> {country.subregion || 'N/A'}</p>
                <p style={{ fontSize: '1rem', color: isDarkMode ? '#A678F2' : '#6D16DF', marginBottom: '0.5rem', background: isDarkMode ? '#4B0E9A33' : '#F9F5FF', padding: '0.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}><strong>Languages:</strong> {Object.values(country.languages || {}).join(', ') || 'N/A'}</p>
                <p style={{ fontSize: '1rem', color: isDarkMode ? '#A678F2' : '#6D16DF', marginBottom: '0.5rem', background: isDarkMode ? '#4B0E9A33' : '#F9F5FF', padding: '0.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}><strong>Currencies:</strong> {Object.values(country.currencies || {}).map(c => `${c.name} (${c.symbol})`).join(', ') || 'N/A'}</p>
                <p style={{ fontSize: '1rem', color: isDarkMode ? '#A678F2' : '#6D16DF', marginBottom: '0.5rem', background: isDarkMode ? '#4B0E9A33' : '#F9F5FF', padding: '0.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}><strong>Timezones:</strong> {country.timezones?.join(', ') || 'N/A'}</p>
                <p style={{ fontSize: '1rem', color: isDarkMode ? '#A678F2' : '#6D16DF', background: isDarkMode ? '#4B0E9A33' : '#F9F5FF', padding: '0.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}><strong>Borders:</strong> {country.borders?.join(', ') || 'None'}</p>
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: '400px', borderRadius: '0.75rem', overflow: 'hidden', boxShadow: `0 6px 12px ${isDarkMode ? '#4B0E9A33' : '#6D16DF33'}`, animation: 'zoomIn 0.5s ease', background: isDarkMode ? '#2A2640' : '#F9F5FF' }}>
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
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes zoomIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}