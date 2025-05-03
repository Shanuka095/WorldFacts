import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getCountryByName } from '../services/api';

export default function CountryDetails({ isDarkMode, favorites, toggleFavorite }) {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  console.log(`CountryDetails mounted with name: ${name}`);

  useEffect(() => {
    const fetchCountry = async () => {
      setLoading(true);
      setError('');
      try {
        const decodedName = decodeURIComponent(name);
        console.log(`Fetching country: ${decodedName}`);
        const data = await getCountryByName(decodedName);
        const countryData = Array.isArray(data) ? data[0] : data;
        if (!countryData) throw new Error('No country data found');
        setCountry(countryData);
        console.log('Country data fetched:', countryData);
      } catch (err) {
        console.error('Error fetching country:', err);
        setError('Failed to load country details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchCountry();
  }, [name]);

  const isFavorite = country && favorites.includes(country.name.common);

  const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    shadowSize: [41, 41]
  });

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: isDarkMode ? '#1F1B2E' : '#F9F5FF' }}>
        <div style={{ width: '3rem', height: '3rem', border: `4px solid ${isDarkMode ? '#450F8A' : '#6015C3'}`, borderTop: '4px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <p style={{ marginLeft: '1rem', color: isDarkMode ? '#FFFFFF' : '#6015C3', fontSize: '1.25rem', fontWeight: '600' }}>Loading...</p>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '2rem', textAlign: 'center', background: isDarkMode ? '#1F1B2E' : '#F9F5FF', minHeight: '100vh' }}>
        <p style={{ color: isDarkMode ? '#FFFFFF' : '#6015C3', fontSize: '1.25rem', fontWeight: '600' }}>{error || 'Country not found.'}</p>
        <Link to="/" style={{ display: 'inline-block', marginTop: '1rem', color: isDarkMode ? '#FFFFFF' : '#6015C3', textDecoration: 'none', fontWeight: '600' }}>Back to Home</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '2rem 1rem', background: `linear-gradient(135deg, ${isDarkMode ? '#1F1B2E' : '#F9F5FF'}, ${isDarkMode ? '#2A2640' : '#E6E0FA'})`, minHeight: '100vh', fontFamily: "'Poppins', sans-serif" }}>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');`}
      </style>
      <Link
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: isDarkMode ? '#450F8A' : '#6015C3',
          color: '#FFFFFF',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          fontWeight: '600',
          textDecoration: 'none',
          transition: 'all 0.3s ease-in-out',
          transform: 'scale(1)',
          boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
          marginBottom: '2rem',
          animation: 'slideInLeft 0.5s ease-in-out'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        <svg style={{ width: '1.25rem', height: '1.25rem', fill: 'none', stroke: '#FFFFFF', strokeWidth: '2' }} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
        Back
      </Link>
      <div style={{
        background: isDarkMode ? 'rgba(42, 38, 64, 0.95)' : 'rgba(255, 255, 255, 0.98)',
        boxShadow: `0 8px 24px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
        border: `1px solid ${isDarkMode ? '#6A4ABF33' : '#9577E633'}`,
        borderRadius: '1rem',
        padding: '2.5rem',
        backdropFilter: 'blur(12px)',
        animation: 'fadeInUp 0.6s ease-in-out',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: `linear-gradient(45deg, ${isDarkMode ? '#450F8A33' : '#6015C333'}, transparent)`, opacity: 0.2, zIndex: 0 }}></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', zIndex: 1 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center' }}>
            <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'row', gap: '1.5rem', alignItems: 'center', animation: 'zoomIn 0.7s ease-in-out 0.1s' }}>
              <img
                src={country.flags.png}
                alt={`${country.name.common} Flag`}
                style={{ width: '100%', maxWidth: '250px', height: 'auto', borderRadius: '0.75rem', boxShadow: `0 8px 16px ${isDarkMode ? '#450F8A33' : '#6015C333'}`, transition: 'transform 0.3s ease-in-out' }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              />
              {country.coatOfArms?.png ? (
                <img
                  src={country.coatOfArms.png}
                  alt={`${country.name.common} Coat of Arms`}
                  style={{ width: '100%', maxWidth: '150px', height: 'auto', borderRadius: '0.75rem', boxShadow: `0 8px 16px ${isDarkMode ? '#450F8A33' : '#6015C333'}`, transition: 'transform 0.3s ease-in-out', animation: 'zoomIn 0.7s ease-in-out 0.2s' }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
              ) : (
                <p style={{ color: isDarkMode ? '#FFFFFF' : '#6015C3', fontSize: '1rem', fontStyle: 'italic', fontWeight: '500' }}>No State Emblem Available</p>
              )}
            </div>
            <div style={{ flex: '2 1 400px', display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'slideInRight 0.7s ease-in-out 0.3s' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: isDarkMode ? '#FFFFFF' : '#2D1B4E', marginBottom: '1rem', textShadow: '0 2px 6px rgba(0,0,0,0.3)' }}>{country.name.common}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                <p style={{ fontSize: '1.1rem', color: isDarkMode ? '#FFFFFF' : '#6015C3', fontWeight: '500', transition: 'opacity 0.3s ease-in-out', opacity: 1 }}><strong>Official Name:</strong> {country.name.official}</p>
                <p style={{ fontSize: '1.1rem', color: isDarkMode ? '#FFFFFF' : '#6015C3', fontWeight: '500', transition: 'opacity 0.3s ease-in-out', opacity: 1 }}><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
                <p style={{ fontSize: '1.1rem', color: isDarkMode ? '#FFFFFF' : '#6015C3', fontWeight: '500', transition: 'opacity 0.3s ease-in-out', opacity: 1 }}><strong>Population:</strong> {country.population.toLocaleString()}</p>
                <p style={{ fontSize: '1.1rem', color: isDarkMode ? '#FFFFFF' : '#6015C3', fontWeight: '500', transition: 'opacity 0.3s ease-in-out', opacity: 1 }}><strong>Region:</strong> {country.region}</p>
                <p style={{ fontSize: '1.1rem', color: isDarkMode ? '#FFFFFF' : '#6015C3', fontWeight: '500', transition: 'opacity 0.3s ease-in-out', opacity: 1 }}><strong>Subregion:</strong> {country.subregion || 'N/A'}</p>
                <p style={{ fontSize: '1.1rem', color: isDarkMode ? '#FFFFFF' : '#6015C3', fontWeight: '500', transition: 'opacity 0.3s ease-in-out', opacity: 1 }}><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
                <p style={{ fontSize: '1.1rem', color: isDarkMode ? '#FFFFFF' : '#6015C3', fontWeight: '500', transition: 'opacity 0.3s ease-in-out', opacity: 1 }}><strong>Currencies:</strong> {country.currencies ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ') : 'N/A'}</p>
                <p style={{ fontSize: '1.1rem', color: isDarkMode ? '#FFFFFF' : '#6015C3', fontWeight: '500', transition: 'opacity 0.3s ease-in-out', opacity: 1 }}><strong>Timezones:</strong> {country.timezones.join(', ')}</p>
              </div>
              <button
                onClick={() => toggleFavorite(country.name.common)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: isFavorite ? (isDarkMode ? '#450F8A' : '#6015C3') : 'transparent',
                  color: isFavorite ? '#FFFFFF' : (isDarkMode ? '#FFFFFF' : '#6015C3'),
                  padding: '0.75rem 1.5rem',
                  border: `2px solid ${isDarkMode ? '#450F8A' : '#6015C3'}`,
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease-in-out',
                  transform: 'scale(1)',
                  boxShadow: `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
                  animation: isFavorite ? 'pulse 0.5s ease-in-out' : 'fadeIn 0.7s ease-in-out 0.4s',
                  alignSelf: 'flex-start'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = `0 6px 16px ${isDarkMode ? '#450F8A66' : '#6015C366'}`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`;
                }}
              >
                <svg style={{ width: '1.25rem', height: '1.25rem', fill: isFavorite ? 'currentColor' : 'none', stroke: isFavorite ? 'none' : 'currentColor', strokeWidth: '2' }} viewBox="0 0 24 24">
                  {isFavorite ? (
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  ) : (
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeLinecap="round" strokeLinejoin="round"/>
                  )}
                </svg>
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>
          </div>
          {country.latlng && (
            <div style={{
              marginTop: '2.5rem',
              height: '500px',
              borderRadius: '1rem',
              overflow: 'hidden',
              boxShadow: `0 8px 24px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
              animation: 'fadeInUp 0.7s ease-in-out 0.5s',
              transition: 'transform 0.3s ease-in-out'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.01)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              <MapContainer center={country.latlng} zoom={5} style={{ height: '100%', width: '100%' }} zoomControl={false}>
                <TileLayer
                  url={isDarkMode ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
                  attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>'
                />
                <Marker position={country.latlng} icon={customIcon}>
                  <Popup>{country.name.common}</Popup>
                </Marker>
              </MapContainer>
            </div>
          )}
        </div>
      </div>
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes slideInRight {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes zoomIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @media (max-width: 768px) {
            .image-section {
              flex-direction: column;
              align-items: center;
            }
            .details-grid {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
    </div>
  );
}