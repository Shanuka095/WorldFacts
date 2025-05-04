import { useState, useEffect, useCallback, useRef } from 'react';
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
  const observerRef = useRef(null);

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

  const debouncedFetch = useCallback(debounce(fetchCountries, 500), [fetchCountries]);

  useEffect(() => {
    debouncedFetch();
  }, [debouncedFetch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );
    observerRef.current = observer;
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{
      maxWidth: '1440px',
      margin: '0 auto',
      padding: '1rem env(safe-area-inset-right) 1rem env(safe-area-inset-left)',
      background: `linear-gradient(135deg, ${isDarkMode ? '#1F1B2E' : '#F9F5FF'}, ${isDarkMode ? '#2A2640' : '#E6E0FA'})`,
      minHeight: '100vh',
      fontFamily: "'Poppins', sans-serif",
      position: 'relative',
      overflow: 'hidden',
      backgroundSize: '200% 200%',
      animation: 'gradientShift 15s ease infinite',
    }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes slideInDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          .country-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
          }
          .loading-container {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 2rem;
            z-index: 1;
            position: relative;
          }
          .spinner {
            width: 1.5rem;
            height: 1.5rem;
            border: 3px solid ${isDarkMode ? '#450F8A' : '#6015C3'};
            border-top: 3px solid transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          .loading-text {
            margin-left: 0.75rem;
            color: ${isDarkMode ? '#9577E6' : '#6015C3'};
            font-size: 1rem;
            font-weight: 600;
          }
          .error-container {
            text-align: center;
            margin-top: 2rem;
            z-index: 1;
            position: relative;
          }
          .error-text {
            color: ${isDarkMode ? '#9577E6' : '#6015C3'};
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 1rem;
          }
          .retry-button {
            background: linear-gradient(45deg, ${isDarkMode ? '#450F8A' : '#6015C3'}, ${isDarkMode ? '#6A4ABF' : '#9577E6'});
            color: #FFFFFF;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            border: none;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            box-shadow: 0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'};
          }
          .retry-button:active {
            transform: scale(0.95);
          }
          @media (max-width: 768px) {
            .countries-grid {
              grid-template-columns: 1fr;
              gap: 0.75rem;
            }
            h1 {
              font-size: 1.5rem;
            }
            .container {
              padding: 0.5rem env(safe-area-inset-right) 0.5rem env(safe-area-inset-left);
            }
            .loading-container, .error-container {
              margin-top: 1.5rem;
            }
            .spinner {
              width: 1.25rem;
              height: 1.25rem;
              border-width: 2px;
            }
            .loading-text, .error-text {
              font-size: 0.875rem;
            }
            .retry-button {
              padding: 0.5rem 1rem;
              font-size: 0.875rem;
            }
          }
          @media (prefers-reduced-motion: reduce) {
            * {
              animation: none !important;
              transition: none !important;
            }
          }
        `}
      </style>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Ccircle fill='${encodeURIComponent(isDarkMode ? '#9577E6' : '#6015C3')}' fill-opacity='0.05' cx='40' cy='40' r='2'/%3E%3C/svg%3E")`,
        opacity: 0.2,
        zIndex: 0,
        pointerEvents: 'none',
        transform: 'translateZ(0)',
      }}></div>
      <h1 style={{
        fontSize: '2rem',
        fontWeight: '700',
        color: isDarkMode ? '#9577E6' : '#6015C3',
        marginBottom: '1.5rem',
        textAlign: 'center',
        animation: 'slideInDown 0.5s ease',
        textShadow: '0 2px 4px rgba(0,0,0,0.2)',
        zIndex: 1,
        position: 'relative',
      }}>
        Explore WorldFacts
      </h1>
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
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Loading...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p className="error-text">{error}</p>
          <button
            className="retry-button"
            onClick={fetchCountries}
            onTouchStart={(e) => {
              e.currentTarget.style.transform = 'scale(0.95)';
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            aria-label="Retry loading countries"
          >
            Retry
          </button>
        </div>
      ) : countries.length ? (
        <div className="countries-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem',
          marginTop: '1.5rem',
          zIndex: 1,
          position: 'relative',
        }}>
          {countries.map((country) => (
            <div key={country.name.common} className="country-card" ref={(el) => {
              if (el && observerRef.current) observerRef.current.observe(el);
            }}>
              <CountryCard
                country={country}
                toggleFavorite={toggleFavorite}
                isFavorite={favorites.includes(country.name.common)}
                isDarkMode={isDarkMode}
              />
            </div>
          ))}
        </div>
      ) : (
        <p style={{
          textAlign: 'center',
          color: isDarkMode ? '#9577E6' : '#6015C3',
          fontSize: '1rem',
          fontWeight: '600',
          marginTop: '2rem',
          zIndex: 1,
          position: 'relative',
        }}>
          {showFavorites ? 'No favorite countries yet.' : 'No countries found.'}
        </p>
      )}
    </div>
  );
}