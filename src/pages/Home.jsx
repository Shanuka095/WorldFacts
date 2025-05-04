import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import CountryCard from '../components/CountryCard.jsx';
import SearchFilter from '../components/SearchFilter.jsx';
import { getAllCountries, getCountriesByRegion, getCountryByName, getCountriesByLanguage } from '../services/api';

export default function Home({ isDarkMode, favorites, toggleFavorite }) {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('');
  const [language, setLanguage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const showFavorites = location.state?.showFavorites || false;

  // Debounce function to limit API calls
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const fetchCountries = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      let data = [];
      if (showFavorites) {
        if (favorites.length === 0) {
          setCountries([]);
          return;
        }
        data = await Promise.all(favorites.map(name => getCountryByName(name).catch(() => null)));
        data = data.flat().filter(Boolean);
      } else if (searchTerm && searchTerm.length >= 2) {
        const result = await getCountryByName(searchTerm);
        data = Array.isArray(result) ? result : [result].filter(Boolean);
      } else if (language) {
        data = await getCountriesByLanguage(language);
      } else if (region) {
        data = await getCountriesByRegion(region);
      } else {
        data = await getAllCountries();
      }
      setCountries(data);
    } catch (error) {
      setError('Failed to load countries. Please try again.');
      setCountries([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, region, language, showFavorites, favorites]);

  // Debounced fetch to prevent excessive API calls
  const debouncedFetch = useCallback(debounce(fetchCountries, 500), [fetchCountries]);

  useEffect(() => {
    debouncedFetch();
  }, [debouncedFetch]);

  return (
    <div style={{
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '2rem',
      background: `linear-gradient(135deg, ${isDarkMode ? '#1F1B2E' : '#F9F5FF'}, ${isDarkMode ? '#2A2640' : '#E6E0FA'})`,
      minHeight: '100vh',
      animation: 'gradientShift 15s ease infinite',
      position: 'relative',
      overflow: 'hidden',
      backgroundSize: '200% 200%'
    }}>
      {/* Particle background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle fill='${encodeURIComponent(isDarkMode ? '#9577E6' : '#6015C3')}' fill-opacity='0.1' cx='20' cy='20' r='2'/%3E%3Ccircle fill='${encodeURIComponent(isDarkMode ? '#450F8A' : '#450F8A')}' fill-opacity='0.1' cx='10' cy='10' r='1'/%3E%3Ccircle fill='${encodeURIComponent(isDarkMode ? '#6A4ABF' : '#9577E6')}' fill-opacity='0.1' cx='30' cy='30' r='1.5'/%3E%3C/svg%3E")`,
        opacity: 0.3,
        animation: 'particleFloat 20s linear infinite',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>
      {/* Gradient overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `linear-gradient(45deg, ${isDarkMode ? '#450F8A33' : '#6015C333'}, transparent)`,
        opacity: 0.2,
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: '700',
        color: isDarkMode ? '#9577E6' : '#6015C3',
        marginBottom: '1.5rem',
        textAlign: 'center',
        animation: 'slideInDown 0.5s ease',
        textShadow: '0 2px 4px rgba(0,0,0,0.2)',
        position: 'relative',
        zIndex: 1
      }}>Explore WorldFacts</h1>
      <SearchFilter
        isDarkMode={isDarkMode}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        region={region}
        setRegion={setRegion}
        language={language}
        setLanguage={setLanguage}
      />
      {loading ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '3rem',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            width: '3rem',
            height: '3rem',
            border: `4px solid ${isDarkMode ? '#450F8A' : '#6015C3'}`,
            borderTop: '4px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p style={{
            marginLeft: '1rem',
            color: isDarkMode ? '#9577E6' : '#6015C3',
            fontSize: '1.25rem',
            fontWeight: '600'
          }}>Loading...</p>
        </div>
      ) : error ? (
        <p style={{
          textAlign: 'center',
          color: isDarkMode ? '#9577E6' : '#6015C3',
          fontSize: '1.25rem',
          fontWeight: '600',
          marginTop: '3rem',
          animation: 'fadeIn 0.5s ease',
          position: 'relative',
          zIndex: 1
        }}>{error}</p>
      ) : countries.length ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2rem',
          marginTop: '2rem',
          position: 'relative',
          zIndex: 1
        }}>
          {countries.map((country) => (
            <CountryCard
              key={country.name.common}
              country={country}
              toggleFavorite={toggleFavorite}
              isFavorite={favorites.includes(country.name.common)}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      ) : (
        <p style={{
          textAlign: 'center',
          color: isDarkMode ? '#9577E6' : '#6015C3',
          fontSize: '1.25rem',
          fontWeight: '600',
          marginTop: '3rem',
          animation: 'fadeIn 0.5s ease',
          position: 'relative',
          zIndex: 1
        }}>
          {showFavorites ? 'No favorite countries yet.' : 'No countries found.'}
        </p>
      )}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideInDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes particleFloat {
            0% { background-position: 0 0; }
            100% { background-position: 40px 40px; }
          }
          @media (prefers-reduced-motion: reduce) {
            * {
              animation: none !important;
              transition: none !important;
            }
          }
        `}
      </style>
    </div>
  );
}