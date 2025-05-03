import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      setError('');
      try {
        let data;
        if (showFavorites) {
          if (favorites.length === 0) {
            setCountries([]);
            setLoading(false);
            return;
          }
          data = await Promise.all(favorites.map(name => getCountryByName(name).catch(() => null)));
          data = data.flat().filter(Boolean);
        } else if (searchTerm) {
          data = await getCountryByName(searchTerm).catch(() => []);
          data = Array.isArray(data) ? data : [data].filter(Boolean);
        } else if (language) {
          data = await getCountriesByLanguage(language);
        } else if (region) {
          data = await getCountriesByRegion(region);
        } else {
          data = await getAllCountries();
        }
        setCountries(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching countries:', error);
        setError('Failed to load countries. Please try again.');
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, [searchTerm, region, language, showFavorites, favorites]);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem', background: `linear-gradient(135deg, ${isDarkMode ? '#1F1B2E' : '#F9F5FF'}, ${isDarkMode ? '#2A2640' : '#E6E0FA'})`, minHeight: '100vh', animation: 'fadeIn 0.5s ease' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: isDarkMode ? '#A678F2' : '#6D16DF', marginBottom: '1.5rem', textAlign: 'center', animation: 'slideInDown 0.5s ease', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>Explore WorldFacts</h1>
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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3rem' }}>
          <div style={{ width: '3rem', height: '3rem', border: `4px solid ${isDarkMode ? '#4B0E9A' : '#6D16DF'}`, borderTop: '4px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <p style={{ marginLeft: '1rem', color: isDarkMode ? '#A678F2' : '#6D16DF', fontSize: '1.25rem', fontWeight: '600' }}>Loading...</p>
        </div>
      ) : error ? (
        <p style={{ textAlign: 'center', color: isDarkMode ? '#A678F2' : '#6D16DF', fontSize: '1.25rem', fontWeight: '600', marginTop: '3rem', animation: 'fadeIn 0.5s ease' }}>{error}</p>
      ) : countries.length ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
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
        <p style={{ textAlign: 'center', color: isDarkMode ? '#A678F2' : '#6D16DF', fontSize: '1.25rem', fontWeight: '600', marginTop: '3rem', animation: 'fadeIn 0.5s ease' }}>{showFavorites ? 'No favorite countries.' : 'No countries found.'}</p>
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
        `}
      </style>
    </div>
  );
}