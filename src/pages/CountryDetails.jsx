import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCountryByName } from '../services/api';

export default function CountryDetails({ isDarkMode, favorites, toggleFavorite }) {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModeAnimating, setIsModeAnimating] = useState(false);
  const [isFavoriteAnimating, setIsFavoriteAnimating] = useState(false);

  // Load country data
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

  // Trigger dark mode animation
  useEffect(() => {
    setIsModeAnimating(true);
    const timer = setTimeout(() => setIsModeAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [isDarkMode]);

  // Handle favorite button animation
  const handleFavoriteClick = (countryName) => {
    setIsFavoriteAnimating(true);
    toggleFavorite(countryName);
    setTimeout(() => setIsFavoriteAnimating(false), 300);
  };

  // Handle retry on error
  const handleRetry = () => {
    setError(null);
    setLoading(true);
    getCountryByName(decodeURIComponent(name))
      .then((data) => {
        setCountry(data[0]);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load country details');
        setLoading(false);
      });
  };

  // Handle loading state
  if (loading) {
    return (
      <div className="loading-container">
        <style>
          {`
            .loading-container {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background: ${isDarkMode ? '#1F1B2E' : '#F9F5FF'};
              padding: 0 env(safe-area-inset-right) 0 env(safe-area-inset-left);
            }
            .spinner {
              width: 1.5rem;
              height: 1.5rem;
              border: 2px solid ${isDarkMode ? '#450F8A' : '#6015C3'};
              border-top: 2px solid transparent;
              border-radius: 50%;
              animation: spin 1s linear infinite;
            }
            .loading-text {
              margin-left: 0.75rem;
              color: ${isDarkMode ? '#FFFFFF' : '#6015C3'};
              font-size: 1rem;
              font-weight: 600;
              font-family: 'Poppins', sans-serif;
            }
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
            @media (max-width: 480px) {
              .spinner {
                width: 1.25rem;
                height: 1.25rem;
                border-width: 2px;
              }
              .loading-text {
                font-size: 0.875rem;
              }
            }
          `}
        </style>
        <div className="spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  // Handle error or no country
  if (error || !country) {
    return (
      <div className="error-container">
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
            .error-container {
              max-width: 1440px;
              margin: 0 auto;
              padding: 1rem env(safe-area-inset-right) 1rem env(safe-area-inset-left);
              background: ${isDarkMode ? '#1F1B2E' : '#F9F5FF'};
              min-height: 100vh;
              font-family: 'Poppins', sans-serif;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            }
            .error-text {
              color: ${isDarkMode ? '#FFFFFF' : '#2D1B4E'};
              text-align: center;
              font-size: 1rem;
              font-weight: 600;
              margin-bottom: 1rem;
            }
            .back-link, .retry-button {
              display: inline-flex;
              align-items: center;
              gap: 0.5rem;
              background: linear-gradient(45deg, ${isDarkMode ? '#450F8A' : '#6015C3'}, ${isDarkMode ? '#6A4ABF' : '#9577E6'});
              color: #FFFFFF;
              padding: 0.75rem 1.5rem;
              border-radius: 0.5rem;
              font-weight: 600;
              text-decoration: none;
              transition: transform 0.2s ease, box-shadow 0.2s ease;
              box-shadow: 0 4px 8px ${isDarkMode ? '#450F8A33' : '#6015C333'};
              font-size: 0.875rem;
              border: none;
              cursor: pointer;
            }
            .back-link:active, .retry-button:active {
              transform: scale(0.95);
              box-shadow: 0 2px 4px ${isDarkMode ? '#450F8A33' : '#6015C333'};
            }
            @media (max-width: 480px) {
              .error-text {
                font-size: 0.875rem;
              }
              .back-link, .retry-button {
                padding: 0.5rem 1rem;
                font-size: 0.75rem;
              }
            }
          `}
        </style>
        <p className="error-text">{error || 'Country not found'}</p>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/home" className="back-link" aria-label="Back to Home">
            <svg
              style={{ width: '1rem', height: '1rem', fill: 'none', stroke: '#FFFFFF', strokeWidth: '2' }}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          {error && (
            <button
              className="retry-button"
              onClick={handleRetry}
              aria-label="Retry loading country details"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  const isFavorite = favorites.includes(country.name.common);
  const wikipediaUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(country.name.common).replace(/%20/g, '_')}`;
  const googleMapsUrl = `https://www.google.com/maps/place/${encodeURIComponent(country.name.common)}`;

  return (
    <div className="country-details">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
          :root {
            --dark-mode-bg: ${isDarkMode ? '#1F1B2E' : '#F9F5FF'};
            --dark-mode-card-bg: ${isDarkMode ? '#3B3555' : '#F9F5FF'};
            --dark-mode-text: ${isDarkMode ? '#FFFFFF' : '#2D1B4E'};
            --dark-mode-accent: ${isDarkMode ? '#A8A4CE' : '#6015C3'};
            --dark-mode-gradient-start: ${isDarkMode ? '#450F8A' : '#6015C3'};
            --dark-mode-gradient-end: ${isDarkMode ? '#6A4ABF' : '#9577E6'};
            --dark-mode-shadow: ${isDarkMode ? '#450F8A33' : '#6015C333'};
          }
          .country-details {
            max-width: 1440px;
            margin: 0 auto;
            padding: 1rem env(safe-area-inset-right) 1rem env(safe-area-inset-left);
            background: radial-gradient(circle at top left, var(--dark-mode-gradient-end), var(--dark-mode-bg));
            min-height: 100vh;
            font-family: 'Poppins', sans-serif;
            position: relative;
            overflow: hidden;
            animation: ${isModeAnimating ? 'fadeIn 0.5s ease' : 'none'};
          }
          .background-pattern {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle fill="${encodeURIComponent(isDarkMode ? '#450F8A' : '#6015C3')}" fill-opacity="0.05" cx="50" cy="50" r="2"/></svg>');
            opacity: 0.1;
            z-index: 0;
            pointer-events: none;
          }
          .back-link, .favorite-button, .external-link {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: linear-gradient(45deg, var(--dark-mode-gradient-start), var(--dark-mode-gradient-end));
            color: #FFFFFF;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 600;
            text-decoration: none;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            box-shadow: 0 4px 8px var(--dark-mode-shadow);
            font-size: 0.875rem;
            border: none;
            cursor: pointer;
          }
          .favorite-button {
            background: ${isFavorite ? 'linear-gradient(45deg, #FF4D4D, #FF7878)' : 'linear-gradient(45deg, var(--dark-mode-gradient-start), var(--dark-mode-gradient-end))'};
            animation: ${isFavoriteAnimating ? 'pulse 0.3s ease' : 'none'};
          }
          .back-link:active, .favorite-button:active, .external-link:active {
            transform: scale(0.95);
            box-shadow: 0 2px 4px var(--dark-mode-shadow);
          }
          .country-card {
            background: var(--dark-mode-bg);
            border: 2px solid transparent;
            border-image: linear-gradient(45deg, var(--dark-mode-gradient-start), var(--dark-mode-gradient-end)) 1;
            border-radius: 1rem;
            padding: 1.5rem;
            box-shadow: 0 4px 8px var(--dark-mode-shadow);
            position: relative;
            z-index: 1;
            animation: ${isModeAnimating ? 'fadeIn 0.5s ease' : 'fadeIn 0.6s ease'};
          }
          .card-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, var(--dark-mode-shadow), transparent);
            opacity: ${isModeAnimating ? 0.3 : 0.2};
            z-index: 0;
            transition: opacity 0.3s ease;
          }
          .country-details-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            gap: 0.75rem;
            margin-bottom: 1rem;
          }
          .detail-card {
            background: var(--dark-mode-card-bg);
            padding: 0.75rem;
            border-radius: 0.5rem;
            box-shadow: 0 2px 4px var(--dark-mode-shadow);
            transition: transform 0.2s ease;
            will-change: transform;
          }
          .detail-card:active {
            transform: scale(0.98);
          }
          .detail-title {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
          }
          .detail-icon {
            font-size: 1.25rem;
          }
          h2 {
            font-size: 2rem;
            font-weight: 800;
            color: var(--dark-mode-text);
            text-shadow: 0 1px 2px var(--dark-mode-shadow);
          }
          h3 {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--dark-mode-text);
          }
          p {
            font-size: 0.875rem;
            color: var(--dark-mode-accent);
            margin: 0;
          }
          img {
            width: 100%;
            height: auto;
            max-height: 150px;
            object-fit: cover;
            border-radius: 0.5rem;
            box-shadow: 0 2px 4px var(--dark-mode-shadow);
          }
          .no-coat-of-arms {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100px;
            background: ${isDarkMode ? '#2A2640' : '#E6E0FA'};
            border-radius: 0.5rem;
            box-shadow: 0 2px 4px var(--dark-mode-shadow);
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          @media (max-width: 768px) {
            .country-details-grid {
              grid-template-columns: 1fr;
              gap: 0.5rem;
            }
            .country-card {
              padding: 1rem;
            }
            h2 {
              font-size: 1.5rem;
            }
            h3 {
              font-size: 1rem;
            }
            p {
              font-size: 0.75rem;
            }
            .back-link, .favorite-button, .external-link {
              padding: 0.5rem 1rem;
              font-size: 0.75rem;
            }
          }
          @media (max-width: 480px) {
            .country-details {
              padding: 0.5rem env(safe-area-inset-right) 0.5rem env(safe-area-inset-left);
            }
            .country-card {
              padding: 0.75rem;
            }
            h2 {
              font-size: 1.25rem;
            }
            img {
              max-height: 120px;
            }
            .no-coat-of-arms {
              height: 80px;
            }
            .no-coat-of-arms svg {
              width: 40px;
              height: 40px;
            }
          }
          @media (prefers-reduced-motion: reduce) {
            * {
              animation: none !important;
              transition: none !important;
            }
          }
          :focus {
            outline: 2px solid var(--dark-mode-gradient-end);
            outline-offset: 2px;
          }
        `}
      </style>
      <div className="background-pattern"></div>
      <Link to="/home" className="back-link" aria-label="Back to Home">
        <svg
          style={{ width: '1rem', height: '1rem', fill: 'none', stroke: '#FFFFFF', strokeWidth: '2' }}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </Link>
      <div className="country-card">
        <div className="card-overlay"></div>
        <div style={{ zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h2>{country.name.common}</h2>
            <button
              onClick={() => handleFavoriteClick(country.name.common)}
              className="favorite-button"
              aria-label={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            >
              <svg
                style={{
                  width: '1rem',
                  height: '1rem',
                  fill: isFavorite ? '#FFFFFF' : 'none',
                  stroke: isFavorite ? 'none' : '#FFFFFF',
                  strokeWidth: '2',
                }}
                viewBox="0 0 24 24"
              >
                {isFavorite ? (
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                ) : (
                  <path
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </svg>
              {isFavorite ? 'Remove' : 'Add Favorite'}
            </button>
          </div>
          <div className="country-details-grid">
            <div className="detail-card">
              <div className="detail-title">
                <span className="detail-icon">🏳️</span>
                <h3>Flag</h3>
              </div>
              <img src={country.flags.png} alt={`${country.name.common} Flag`} />
            </div>
            <div className="detail-card">
              <div className="detail-title">
                <span className="detail-icon">🛡️</span>
                <h3>Coat of Arms</h3>
              </div>
              {country.coatOfArms?.png ? (
                <img src={country.coatOfArms.png} alt={`${country.name.common} Coat of Arms`} />
              ) : (
                <div className="no-coat-of-arms">
                  <svg
                    style={{
                      width: '60px',
                      height: '60px',
                      fill: 'none',
                      stroke: isDarkMode ? '#FFFFFF' : '#6015C3',
                      strokeWidth: '2',
                    }}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="detail-card">
              <div className="detail-title">
                <span className="detail-icon">🏛️</span>
                <h3>Capital</h3>
              </div>
              <p>{country.capital?.[0] || 'N/A'}</p>
            </div>
            <div className="detail-card">
              <div className="detail-title">
                <span className="detail-icon">🌍</span>
                <h3>Region</h3>
              </div>
              <p>{country.region}</p>
            </div>
            <div className="detail-card">
              <div className="detail-title">
                <span className="detail-icon">🗺️</span>
                <h3>Subregion</h3>
              </div>
              <p>{country.subregion || 'N/A'}</p>
            </div>
            <div className="detail-card">
              <div className="detail-title">
                <span className="detail-icon">👨‍👩‍👧‍👦</span>
                <h3>Population</h3>
              </div>
              <p>{country.population.toLocaleString()}</p>
            </div>
            <div className="detail-card">
              <div className="detail-title">
                <span className="detail-icon">📏</span>
                <h3>Area</h3>
              </div>
              <p>{country.area.toLocaleString()} km²</p>
            </div>
            <div className="detail-card">
              <div className="detail-title">
                <span className="detail-icon">🗣️</span>
                <h3>Languages</h3>
              </div>
              <p>{country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
            </div>
            <div className="detail-card">
              <div className="detail-title">
                <span className="detail-icon">💵</span>
                <h3>Currencies</h3>
              </div>
              <p>
                {country.currencies
                  ? Object.values(country.currencies)
                      .map((currency) => `${currency.name} (${currency.symbol})`)
                      .join(', ')
                  : 'N/A'}
              </p>
            </div>
            <div className="detail-card">
              <div className="detail-title">
                <span className="detail-icon">⏰</span>
                <h3>Timezones</h3>
              </div>
              <p>{country.timezones?.join(', ') || 'N/A'}</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            <a href={wikipediaUrl} target="_blank" rel="noopener noreferrer" className="external-link" aria-label="Visit Wikipedia">
              <svg style={{ width: '1rem', height: '1rem', fill: '#FFFFFF' }} viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.22-1.79L8 14v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
              Wikipedia
            </a>
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="external-link" aria-label="View on Google Maps">
              <svg style={{ width: '1rem', height: '1rem', fill: '#FFFFFF' }} viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}