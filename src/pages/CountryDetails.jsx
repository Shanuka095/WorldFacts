import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCountryByName } from '../services/api';

export default function CountryDetails({ isDarkMode, favorites, toggleFavorite }) {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModeAnimating, setIsModeAnimating] = useState(false);

  useEffect(() => {
    const loadCountry = async () => {
      try {
        setLoading(true);
        const data = await getCountryByName(decodeURIComponent(name));
        setCountry(data[0]);
        setLoading(false);
      } catch (err) {
        setError('Failed to load country details');
        setLoading(false);
      }
    };
    loadCountry();
  }, [name]);

  useEffect(() => {
    setIsModeAnimating(true);
    const timer = setTimeout(() => setIsModeAnimating(false), 500); // Match animation duration
    return () => clearTimeout(timer);
  }, [isDarkMode]);

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
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '2rem 1rem', background: isDarkMode ? '#1F1B2E' : '#F9F5FF', minHeight: '100vh', fontFamily: "'Poppins', sans-serif" }}>
        <p style={{ color: isDarkMode ? '#FFFFFF' : '#2D1B4E', textAlign: 'center', fontSize: '1.5rem' }}>{error || 'Country not found'}</p>
        <Link to="/" style={{ display: 'inline-block', marginTop: '1rem', color: isDarkMode ? '#FFFFFF' : '#6015C3', textDecoration: 'none', fontWeight: '600' }}>Back to Home</Link>
      </div>
    );
  }

  const isFavorite = favorites.includes(country.name.common);
  const wikipediaUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(country.name.common).replace(/%20/g, '_')}`;

  return (
    <div style={{ 
      maxWidth: '1440px', 
      margin: '0 auto', 
      padding: '2rem 1rem', 
      background: `linear-gradient(135deg, ${isDarkMode ? '#1F1B2E' : '#F9F5FF'}, ${isDarkMode ? '#2A2640' : '#E6E0FA'})`, 
      minHeight: '100vh', 
      fontFamily: "'Poppins', sans-serif",
      animation: isModeAnimating ? 'darkModeTransition 0.5s ease' : 'none',
      transition: 'background 0.3s ease'
    }}>
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
          transform: isModeAnimating ? 'scale(1.05)' : 'scale(1)',
          boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
          marginBottom: '2rem',
          animation: isModeAnimating ? 'none' : 'slideInLeft 0.5s ease-in-out'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.target.style.transform = isModeAnimating ? 'scale(1.05)' : 'scale(1)'}
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
        animation: isModeAnimating ? 'darkModeTransition 0.5s ease' : 'fadeInUp 0.6s ease-in-out',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: '0', 
          width: '100%', 
          height: '100%', 
          background: `linear-gradient(45deg, ${isDarkMode ? '#450F8A33' : '#6015C333'}, transparent)`, 
          opacity: isModeAnimating ? 0.4 : 0.2, 
          zIndex: 0, 
          transition: 'opacity 0.5s ease' 
        }}></div>
        <div style={{ zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '800', 
              color: isDarkMode ? '#FFFFFF' : '#2D1B4E', 
              textShadow: '0 2px 6px rgba(0,0,0,0.3)', 
              transition: 'color 0.3s ease, transform 0.3s ease',
              transform: isModeAnimating ? 'translateY(-3px)' : 'translateY(0)'
            }}>{country.name.common}</h2>
            <button
              onClick={() => toggleFavorite(country.name.common)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: isFavorite ? '#FF4D4D' : isDarkMode ? '#6A4ABF' : '#9577E6',
                color: '#FFFFFF',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease-in-out',
                transform: isModeAnimating ? 'scale(1.05)' : 'scale(1)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = isModeAnimating ? 'scale(1.05)' : 'scale(1)'}
            >
              <svg style={{ width: '1.25rem', height: '1.25rem', fill: isFavorite ? '#FFFFFF' : 'none', stroke: isFavorite ? 'none' : '#FFFFFF', strokeWidth: '2' }} viewBox="0 0 24 24">
                {isFavorite ? (
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                ) : (
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeLinecap="round" strokeLinejoin="round"/>
                )}
              </svg>
              {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ 
              background: isDarkMode ? '#3B3555' : '#F9F5FF', 
              padding: '1.5rem', 
              borderRadius: '0.75rem', 
              boxShadow: `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
              animation: isModeAnimating ? 'darkModeTransition 0.5s ease 0.1s' : 'fadeInUp 0.7s ease-in-out 0.1s'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem', transform: isModeAnimating ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.3s ease' }}>🏳️</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: isDarkMode ? '#FFFFFF' : '#2D1B4E', transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)', transition: 'color 0.3s ease, transform 0.3s ease' }}>Flag</h3>
              </div>
              <img src={country.flags.png} alt={`${country.name.common} Flag`} style={{ width: '100%', height: 'auto', borderRadius: '0.5rem', boxShadow: `0 4px 8px ${isDarkMode ? '#450F8A33' : '#6015C333'}`, transform: isModeAnimating ? 'scale(1.02)' : 'scale(1)', transition: 'transform 0.3s ease' }} />
            </div>
            <div style={{ 
              background: isDarkMode ? '#3B3555' : '#F9F5FF', 
              padding: '1.5rem', 
              borderRadius: '0.75rem', 
              boxShadow: `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
              animation: isModeAnimating ? 'darkModeTransition 0.5s ease 0.2s' : 'fadeInUp 0.7s ease-in-out 0.2s'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem', transform: isModeAnimating ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.3s ease' }}>🏛️</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: isDarkMode ? '#FFFFFF' : '#2D1B4E', transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)', transition: 'color 0.3s ease, transform 0.3s ease' }}>Capital</h3>
              </div>
              <p style={{ fontSize: '1rem', color: isDarkMode ? '#FFFFFF' : '#2D1B4E', marginTop: '0.5rem', transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)', transition: 'color 0.3s ease, transform 0.3s ease' }}>{country.capital?.[0] || 'N/A'}</p>
            </div>
            <div style={{ 
              background: isDarkMode ? '#3B3555' : '#F9F5FF', 
              padding: '1.5rem', 
              borderRadius: '0.75rem', 
              boxShadow: `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
              animation: isModeAnimating ? 'darkModeTransition 0.5s ease 0.3s' : 'fadeInUp 0.7s ease-in-out 0.3s'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem', transform: isModeAnimating ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.3s ease' }}>👥</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: isDarkMode ? '#FFFFFF' : '#2D1B4E', transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)', transition: 'color 0.3s ease, transform 0.3s ease' }}>Population</h3>
              </div>
              <p style={{ fontSize: '1rem', color: isDarkMode ? '#FFFFFF' : '#2D1B4E', marginTop: '0.5rem', transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)', transition: 'color 0.3s ease, transform 0.3s ease' }}>{country.population.toLocaleString() || 'N/A'}</p>
            </div>
            <div style={{ 
              background: isDarkMode ? '#3B3555' : '#F9F5FF', 
              padding: '1.5rem', 
              borderRadius: '0.75rem', 
              boxShadow: `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
              animation: isModeAnimating ? 'darkModeTransition 0.5s ease 0.4s' : 'fadeInUp 0.7s ease-in-out 0.4s'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem', transform: isModeAnimating ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.3s ease' }}>🌍</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: isDarkMode ? '#FFFFFF' : '#2D1B4E', transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)', transition: 'color 0.3s ease, transform 0.3s ease' }}>Area</h3>
              </div>
              <p style={{ fontSize: '1rem', color: isDarkMode ? '#FFFFFF' : '#2D1B4E', marginTop: '0.5rem', transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)', transition: 'color 0.3s ease, transform 0.3s ease' }}>{country.area ? `${country.area.toLocaleString()} km²` : 'N/A'}</p>
            </div>
            <div style={{ 
              background: isDarkMode ? '#3B3555' : '#F9F5FF', 
              padding: '1.5rem', 
              borderRadius: '0.75rem', 
              boxShadow: `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
              animation: isModeAnimating ? 'darkModeTransition 0.5s ease 0.5s' : 'fadeInUp 0.7s ease-in-out 0.5s'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem', transform: isModeAnimating ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.3s ease' }}>💵</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: isDarkMode ? '#FFFFFF' : '#2D1B4E', transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)', transition: 'color 0.3s ease, transform 0.3s ease' }}>Currency</h3>
              </div>
              <p style={{ fontSize: '1rem', color: isDarkMode ? '#FFFFFF' : '#2D1B4E', marginTop: '0.5rem', transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)', transition: 'color 0.3s ease, transform 0.3s ease' }}>
                {country.currencies ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ') : 'N/A'}
              </p>
            </div>
            <div style={{ 
              background: isDarkMode ? '#3B3555' : '#F9F5FF', 
              padding: '1.5rem', 
              borderRadius: '0.75rem', 
              boxShadow: `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
              animation: isModeAnimating ? 'darkModeTransition 0.5s ease 0.6s' : 'fadeInUp 0.7s ease-in-out 0.6s'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem', transform: isModeAnimating ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.3s ease' }}>🗣️</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: isDarkMode ? '#FFFFFF' : '#2D1B4E', transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)', transition: 'color 0.3s ease, transform 0.3s ease' }}>Languages</h3>
              </div>
              <p style={{ fontSize: '1rem', color: isDarkMode ? '#FFFFFF' : '#2D1B4E', marginTop: '0.5rem', transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)', transition: 'color 0.3s ease, transform 0.3s ease' }}>
                {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}
              </p>
            </div>
            <div style={{ 
              background: isDarkMode ? '#3B3555' : '#F9F5FF', 
              padding: '1.5rem', 
              borderRadius: '0.75rem', 
              boxShadow: `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
              animation: isModeAnimating ? 'darkModeTransition 0.5s ease 0.7s' : 'fadeInUp 0.7s ease-in-out 0.7s'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem', transform: isModeAnimating ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.3s ease' }}>🌐</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: isDarkMode ? '#FFFFFF' : '#2D1B4E', transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)', transition: 'color 0.3s ease, transform 0.3s ease' }}>Region</h3>
              </div>
              <p style={{ fontSize: '1rem', color: isDarkMode ? '#FFFFFF' : '#2D1B4E', marginTop: '0.5rem', transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)', transition: 'color 0.3s ease, transform 0.3s ease' }}>{country.region || 'N/A'}</p>
            </div>
            <div style={{ 
              background: isDarkMode ? '#3B3555' : '#F9F5FF', 
              padding: '1.5rem', 
              borderRadius: '0.75rem', 
              boxShadow: `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
              animation: isModeAnimating ? 'darkModeTransition 0.5s ease 0.8s' : 'fadeInUp 0.7s ease-in-out 0.8s'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem', transform: isModeAnimating ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.3s ease' }}>🗺️</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: isDarkMode ? '#FFFFFF' : '#2D1B4E', transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)', transition: 'color 0.3s ease, transform 0.3s ease' }}>Subregion</h3>
              </div>
              <p style={{ fontSize: '1rem', color: isDarkMode ? '#FFFFFF' : '#2D1B4E', marginTop: '0.5rem', transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)', transition: 'color 0.3s ease, transform 0.3s ease' }}>{country.subregion || 'N/A'}</p>
            </div>
          </div>
          <a
            href={wikipediaUrl}
            target="_blank"
            rel="noopener noreferrer"
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
              transform: isModeAnimating ? 'scale(1.05)' : 'scale(1)',
              boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
              animation: isModeAnimating ? 'none' : 'fadeInUp 0.7s ease-in-out 0.9s'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = isModeAnimating ? 'scale(1.05)' : 'scale(1)'}
          >
            <svg style={{ width: '1.25rem', height: '1.25rem', fill: '#FFFFFF' }} viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95.49-7.43-2.14-7.93-6.09C2.58 9.89 5.21 6.41 9.16 5.91c3.95-.49 7.43 2.14 7.93 6.09.49 3.95-2.14 7.43-6.09 7.93z"/>
            </svg>
            Learn More on Wikipedia
          </a>
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
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @keyframes darkModeTransition {
            0% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.02); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          @media (max-width: 768px) {
            .country-details-grid {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
    </div>
  );
}