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

  // Handle loading state
  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: isDarkMode ? '#1F1B2E' : '#F9F5FF',
        }}
      >
        <div
          style={{
            width: '2rem',
            height: '2rem',
            border: `3px solid ${isDarkMode ? '#450F8A' : '#6015C3'}`,
            borderTop: '3px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        ></div>
        <p
          style={{
            marginLeft: '0.75rem',
            color: isDarkMode ? '#FFFFFF' : '#6015C3',
            fontSize: '1rem',
            fontWeight: '600',
          }}
        >
          Loading...
        </p>
      </div>
    );
  }

  // Handle error or no country
  if (error || !country) {
    return (
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '1rem',
          background: isDarkMode ? '#1F1B2E' : '#F9F5FF',
          minHeight: '100vh',
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <p
          style={{
            color: isDarkMode ? '#FFFFFF' : '#2D1B4E',
            textAlign: 'center',
            fontSize: '1rem',
          }}
        >
          {error || 'Country not found'}
        </p>
        <Link
          to="/home"
          style={{
            display: 'inline-block',
            marginTop: '0.5rem',
            color: isDarkMode ? '#FFFFFF' : '#6015C3',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '0.875rem',
            padding: '0.5rem 1rem',
          }}
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const isFavorite = favorites.includes(country.name.common);
  const wikipediaUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(country.name.common).replace(/%20/g, '_')}`;
  const googleMapsUrl = `https://www.google.com/maps/place/${encodeURIComponent(country.name.common)}`;

  return (
    <div
      style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '1rem',
        background: `radial-gradient(circle at top left, ${isDarkMode ? '#2A2640' : '#E6E0FA'}, ${isDarkMode ? '#1F1B2E' : '#F9F5FF'})`,
        minHeight: '100vh',
        fontFamily: "'Poppins', sans-serif",
        animation: isModeAnimating ? 'darkModeTransition 0.5s ease' : 'none',
        transition: 'background 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Global styles */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
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
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
          @media (max-width: 768px) {
            .country-details-grid {
              grid-template-columns: 1fr;
            }
            h2 {
              font-size: 1.5rem;
            }
            h3 {
              font-size: 1rem;
            }
            p {
              font-size: 0.875rem;
            }
            img {
              max-width: 100%;
              height: auto;
            }
            button, a[style*="padding"] {
              padding: 0.5rem 1rem;
              font-size: 0.875rem;
            }
            div[style*="padding: '2.5rem'"] {
              padding: 1rem;
            }
          }
          :focus {
            outline: 2px solid ${isDarkMode ? '#9577E6' : '#450F8A'};
            outline-offset: 2px;
          }
        `}
      </style>
      {/* Background pattern */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle fill="${encodeURIComponent(isDarkMode ? '#450F8A' : '#6015C3')}" fill-opacity="0.05" cx="50" cy="50" r="2"/></svg>')`,
          opacity: 0.1,
          zIndex: 0,
        }}
      ></div>
      {/* Back button */}
      <Link
        to="/home"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: `linear-gradient(45deg, ${isDarkMode ? '#450F8A' : '#6015C3'}, ${isDarkMode ? '#6A4ABF' : '#9577E6'})`,
          color: '#FFFFFF',
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          fontWeight: '600',
          textDecoration: 'none',
          transition: 'all 0.3s ease-in-out',
          transform: isModeAnimating ? 'scale(1.05)' : 'scale(1)',
          boxShadow: `0 6px 12px ${isDarkMode ? '#450F8A66' : '#6015C366'}`,
          marginBottom: '1rem',
          animation: isModeAnimating ? 'none' : 'slideInLeft 0.5s ease-in-out',
          position: 'relative',
          overflow: 'hidden',
          fontSize: '0.875rem',
        }}
        onTouchStart={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = `0 8px 16px ${isDarkMode ? '#450F8A99' : '#6015C399'}`;
        }}
        onTouchEnd={(e) => {
          e.currentTarget.style.transform = isModeAnimating ? 'scale(1.05)' : 'scale(1)';
          e.currentTarget.style.boxShadow = `0 6px 12px ${isDarkMode ? '#450F8A66' : '#6015C366'}`;
        }}
        aria-label="Back to Home"
      >
        <svg
          style={{ width: '1rem', height: '1rem', fill: 'none', stroke: '#FFFFFF', strokeWidth: '2' }}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </Link>
      {/* Country details card */}
      <div
        style={{
          background: isDarkMode ? 'rgba(42, 38, 64, 0.95)' : 'rgba(255, 255, 255, 0.98)',
          boxShadow: `0 8px 24px ${isDarkMode ? '#450F8A33' : '#6015C333'}, inset 0 0 10px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
          border: `2px solid transparent`,
          borderImage: `linear-gradient(45deg, ${isDarkMode ? '#450F8A' : '#6015C3'}, ${isDarkMode ? '#6A4ABF' : '#9577E6'}) 1`,
          borderRadius: '1rem',
          padding: '2.5rem',
          backdropFilter: 'blur(12px)',
          animation: isModeAnimating ? 'darkModeTransition 0.5s ease' : 'fadeInUp 0.6s ease-in-out',
          position: 'relative',
          overflow: 'hidden',
          transition: 'transform 0.3s ease-in-out',
          zIndex: 1,
        }}
        onTouchStart={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
        onTouchEnd={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
      >
        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(45deg, ${isDarkMode ? '#450F8A33' : '#6015C333'}, transparent)`,
            opacity: isModeAnimating ? 0.4 : 0.2,
            zIndex: 0,
            transition: 'opacity 0.5s ease',
          }}
        ></div>
        <div style={{ zIndex: 1 }}>
          {/* Header with title and favorite button */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}
          >
            <h2
              style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                color: isDarkMode ? '#FFFFFF' : '#2D1B4E',
                textShadow: `0 2px 6px ${isDarkMode ? '#450F8A66' : '#6015C366'}`,
                transition: 'color 0.3s ease, transform 0.3s ease',
                transform: isModeAnimating ? 'translateY(-3px)' : 'translateY(0)',
              }}
            >
              {country.name.common}
            </h2>
            <button
              onClick={() => handleFavoriteClick(country.name.common)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: isFavorite
                  ? 'linear-gradient(45deg, #FF4D4D, #FF7878)'
                  : `linear-gradient(45deg, ${isDarkMode ? '#6A4ABF' : '#9577E6'}, ${isDarkMode ? '#450F8A' : '#6015C3'})`,
                color: '#FFFFFF',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                fontWeight: '600',
                fontSize: '0.875rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
                transform: isModeAnimating || isFavoriteAnimating ? 'scale(1.05)' : 'scale(1)',
                boxShadow: `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
                animation: isFavoriteAnimating ? 'pulse 0.3s ease' : 'none',
                position: 'relative',
                overflow: 'hidden',
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = `0 6px 16px ${isDarkMode ? '#450F8A66' : '#6015C366'}`;
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.transform = isModeAnimating || isFavoriteAnimating ? 'scale(1.05)' : 'scale(1)';
                e.currentTarget.style.boxShadow = `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`;
              }}
              aria-label={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            >
              <svg
                style={{
                  width: '1rem',
                  height: '1rem',
                  fill: isFavorite ? '#FFFFFF' : 'none',
                  stroke: isFavorite ? 'none' : '#FFFFFF',
                  strokeWidth: '2',
                  transition: 'fill 0.3s ease, stroke 0.3s ease',
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
              {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
            </button>
          </div>
          {/* Grid for flag, coat of arms, and details */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '1rem',
            }}
            className="country-details-grid"
          >
            {/* Flag */}
            <div
              style={{
                background: isDarkMode ? '#3B3555' : '#F9F5FF',
                padding: '1rem',
                borderRadius: '0.75rem',
                boxShadow: `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
                border: `2px solid transparent`,
                borderImage: `linear-gradient(45deg, ${isDarkMode ? '#450F8A' : '#6015C3'}, ${isDarkMode ? '#6A4ABF' : '#9577E6'}) 1`,
                animation: isModeAnimating ? 'darkModeTransition 0.5s ease 0.1s' : 'fadeInUp 0.7s ease-in-out 0.1s',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                e.currentTarget.style.boxShadow = `0 6px 16px ${isDarkMode ? '#450F8A66' : '#6015C366'}`;
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`;
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span
                  style={{
                    fontSize: '1.25rem',
                    transform: isModeAnimating ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  🏳️
                </span>
                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    color: isDarkMode ? '#FFFFFF' : '#2D1B4E',
                    transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)',
                    transition: 'color 0.3s ease, transform 0.3s ease',
                  }}
                >
                  Flag
                </h3>
              </div>
              <img
                src={country.flags.png}
                alt={`${country.name.common} Flag`}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '0.5rem',
                  boxShadow: `0 4px 8px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
                  transform: isModeAnimating ? 'scale(1.02)' : 'scale(1)',
                  transition: 'transform 0.3s ease',
                }}
              />
            </div>
            {/* Coat of Arms */}
            <div
              style={{
                background: isDarkMode ? '#3B3555' : '#F9F5FF',
                padding: '1rem',
                borderRadius: '0.75rem',
                boxShadow: `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
                border: `2px solid transparent`,
                borderImage: `linear-gradient(45deg, ${isDarkMode ? '#450F8A' : '#6015C3'}, ${isDarkMode ? '#6A4ABF' : '#9577E6'}) 1`,
                animation: isModeAnimating ? 'darkModeTransition 0.5s ease 0.2s' : 'fadeInUp 0.7s ease-in-out 0.2s',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                e.currentTarget.style.boxShadow = `0 6px 16px ${isDarkMode ? '#450F8A66' : '#6015C366'}`;
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`;
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span
                  style={{
                    fontSize: '1.25rem',
                    transform: isModeAnimating ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  🛡️
                </span>
                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    color: isDarkMode ? '#FFFFFF' : '#2D1B4E',
                    transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)',
                    transition: 'color 0.3s ease, transform 0.3s ease',
                  }}
                >
                  Coat of Arms
                </h3>
              </div>
              {country.coatOfArms?.png ? (
                <img
                  src={country.coatOfArms.png}
                  alt={`${country.name.common} Coat of Arms`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '0.5rem',
                    boxShadow: `0 4px 8px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
                    transform: isModeAnimating ? 'scale(1.02)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                  }}
                />
              ) : (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100px',
                    background: isDarkMode ? '#2A2640' : '#E6E0FA',
                    borderRadius: '0.5rem',
                    boxShadow: `0 4px 8px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
                  }}
                >
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
            {/* Capital */}
            <div
              style={{
                background: isDarkMode ? '#3B3555' : '#F9F5FF',
                padding: '1rem',
                borderRadius: '0.75rem',
                boxShadow: `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
                animation: isModeAnimating ? 'darkModeTransition 0.5s ease 0.3s' : 'fadeInUp 0.7s ease-in-out 0.3s',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                e.currentTarget.style.boxShadow = `0 6px 16px ${isDarkMode ? '#450F8A66' : '#6015C366'}`;
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`;
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span
                  style={{
                    fontSize: '1.25rem',
                    transform: isModeAnimating ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  🏛️
                </span>
                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    color: isDarkMode ? '#FFFFFF' : '#2D1B4E',
                    transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)',
                    transition: 'color 0.3s ease, transform 0.3s ease',
                  }}
                >
                  Capital
                </h3>
              </div>
              <p
                style={{
                  fontSize: '1rem',
                  color: isDarkMode ? '#A8A4CE' : '#6015C3',
                  margin: '0',
                  transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)',
                  transition: 'color 0.3s ease, transform 0.3s ease',
                }}
              >
                {country.capital?.[0] || 'N/A'}
              </p>
            </div>
            {/* Region */}
            <div
              style={{
                background: isDarkMode ? '#3B3555' : '#F9F5FF',
                padding: '1rem',
                borderRadius: '0.75rem',
                boxShadow: `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
                animation: isModeAnimating ? 'darkModeTransition 0.5s ease 0.4s' : 'fadeInUp 0.7s ease-in-out 0.4s',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                e.currentTarget.style.boxShadow = `0 6px 16px ${isDarkMode ? '#450F8A66' : '#6015C366'}`;
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`;
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span
                  style={{
                    fontSize: '1.25rem',
                    transform: isModeAnimating ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  🌍
                </span>
                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    color: isDarkMode ? '#FFFFFF' : '#2D1B4E',
                    transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)',
                    transition: 'color 0.3s ease, transform 0.3s ease',
                  }}
                >
                  Region
                </h3>
              </div>
              <p
                style={{
                  fontSize: '1rem',
                  color: isDarkMode ? '#A8A4CE' : '#6015C3',
                  margin: '0',
                  transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)',
                  transition: 'color 0.3s ease, transform 0.3s ease',
                }}
              >
                {country.region}
              </p>
            </div>
            {/* Subregion */}
            <div
              style={{
                background: isDarkMode ? '#3B3555' : '#F9F5FF',
                padding: '1rem',
                borderRadius: '0.75rem',
                boxShadow: `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
                animation: isModeAnimating ? 'darkModeTransition 0.5s ease 0.5s' : 'fadeInUp 0.7s ease-in-out 0.5s',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                e.currentTarget.style.boxShadow = `0 6px 16px ${isDarkMode ? '#450F8A66' : '#6015C366'}`;
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`;
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span
                  style={{
                    fontSize: '1.25rem',
                    transform: isModeAnimating ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  🗺️
                </span>
                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    color: isDarkMode ? '#FFFFFF' : '#2D1B4E',
                    transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)',
                    transition: 'color 0.3s ease, transform 0.3s ease',
                  }}
                >
                  Subregion
                </h3>
              </div>
              <p
                style={{
                  fontSize: '1rem',
                  color: isDarkMode ? '#A8A4CE' : '#6015C3',
                  margin: '0',
                  transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)',
                  transition: 'color 0.3s ease, transform 0.3s ease',
                }}
              >
                {country.subregion || 'N/A'}
              </p>
            </div>
            {/* Population */}
            <div
              style={{
                background: isDarkMode ? '#3B3555' : '#F9F5FF',
                padding: '1rem',
                borderRadius: '0.75rem',
                boxShadow: `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
                animation: isModeAnimating ? 'darkModeTransition 0.5s ease 0.6s' : 'fadeInUp 0.7s ease-in-out 0.6s',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                e.currentTarget.style.boxShadow = `0 6px 16px ${isDarkMode ? '#450F8A66' : '#6015C366'}`;
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`;
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span
                  style={{
                    fontSize: '1.25rem',
                    transform: isModeAnimating ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  👨‍👩‍👧‍👦
                </span>
                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    color: isDarkMode ? '#FFFFFF' : '#2D1B4E',
                    transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)',
                    transition: 'color 0.3s ease, transform 0.3s ease',
                  }}
                >
                  Population
                </h3>
              </div>
              <p
                style={{
                  fontSize: '1rem',
                  color: isDarkMode ? '#A8A4CE' : '#6015C3',
                  margin: '0',
                  transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)',
                  transition: 'color 0.3s ease, transform 0.3s ease',
                }}
              >
                {country.population.toLocaleString()}
              </p>
            </div>
            {/* Area */}
            <div
              style={{
                background: isDarkMode ? '#3B3555' : '#F9F5FF',
                padding: '1rem',
                borderRadius: '0.75rem',
                boxShadow: `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
                animation: isModeAnimating ? 'darkModeTransition 0.5s ease 0.7s' : 'fadeInUp 0.7s ease-in-out 0.7s',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                e.currentTarget.style.boxShadow = `0 6px 16px ${isDarkMode ? '#450F8A66' : '#6015C366'}`;
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`;
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span
                  style={{
                    fontSize: '1.25rem',
                    transform: isModeAnimating ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  📏
                </span>
                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    color: isDarkMode ? '#FFFFFF' : '#2D1B4E',
                    transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)',
                    transition: 'color 0.3s ease, transform 0.3s ease',
                  }}
                >
                  Area
                </h3>
              </div>
              <p
                style={{
                  fontSize: '1rem',
                  color: isDarkMode ? '#A8A4CE' : '#6015C3',
                  margin: '0',
                  transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)',
                  transition: 'color 0.3s ease, transform 0.3s ease',
                }}
              >
                {country.area.toLocaleString()} km²
              </p>
            </div>
            {/* Languages */}
            <div
              style={{
                background: isDarkMode ? '#3B3555' : '#F9F5FF',
                padding: '1rem',
                borderRadius: '0.75rem',
                boxShadow: `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
                animation: isModeAnimating ? 'darkModeTransition 0.5s ease 0.8s' : 'fadeInUp 0.7s ease-in-out 0.8s',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                e.currentTarget.style.boxShadow = `0 6px 16px ${isDarkMode ? '#450F8A66' : '#6015C366'}`;
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`;
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span
                  style={{
                    fontSize: '1.25rem',
                    transform: isModeAnimating ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  🗣️
                </span>
                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    color: isDarkMode ? '#FFFFFF' : '#2D1B4E',
                    transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)',
                    transition: 'color 0.3s ease, transform 0.3s ease',
                  }}
                >
                  Languages
                </h3>
              </div>
              <p
                style={{
                  fontSize: '1rem',
                  color: isDarkMode ? '#A8A4CE' : '#6015C3',
                  margin: '0',
                  transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)',
                  transition: 'color 0.3s ease, transform 0.3s ease',
                }}
              >
                {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}
              </p>
            </div>
            {/* Currencies */}
            <div
              style={{
                background: isDarkMode ? '#3B3555' : '#F9F5FF',
                padding: '1rem',
                borderRadius: '0.75rem',
                boxShadow: `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
                animation: isModeAnimating ? 'darkModeTransition 0.5s ease 0.9s' : 'fadeInUp 0.7s ease-in-out 0.9s',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                e.currentTarget.style.boxShadow = `0 6px 16px ${isDarkMode ? '#450F8A66' : '#6015C366'}`;
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`;
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span
                  style={{
                    fontSize: '1.25rem',
                    transform: isModeAnimating ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  💵
                </span>
                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    color: isDarkMode ? '#FFFFFF' : '#2D1B4E',
                    transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)',
                    transition: 'color 0.3s ease, transform 0.3s ease',
                  }}
                >
                  Currencies
                </h3>
              </div>
              <p
                style={{
                  fontSize: '1rem',
                  color: isDarkMode ? '#A8A4CE' : '#6015C3',
                  margin: '0',
                  transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)',
                  transition: 'color 0.3s ease, transform 0.3s ease',
                }}
              >
                {country.currencies
                  ? Object.values(country.currencies)
                      .map((currency) => `${currency.name} (${currency.symbol})`)
                      .join(', ')
                  : 'N/A'}
              </p>
            </div>
            {/* Timezones */}
            <div
              style={{
                background: isDarkMode ? '#3B3555' : '#F9F5FF',
                padding: '1rem',
                borderRadius: '0.75rem',
                boxShadow: `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
                animation: isModeAnimating ? 'darkModeTransition 0.5s ease 1s' : 'fadeInUp 0.7s ease-in-out 1s',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                e.currentTarget.style.boxShadow = `0 6px 16px ${isDarkMode ? '#450F8A66' : '#6015C366'}`;
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`;
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span
                  style={{
                    fontSize: '1.25rem',
                    transform: isModeAnimating ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  ⏰
                </span>
                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    color: isDarkMode ? '#FFFFFF' : '#2D1B4E',
                    transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)',
                    transition: 'color 0.3s ease, transform 0.3s ease',
                  }}
                >
                  Timezones
                </h3>
              </div>
              <p
                style={{
                  fontSize: '1rem',
                  color: isDarkMode ? '#A8A4CE' : '#6015C3',
                  margin: '0',
                  transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)',
                  transition: 'color 0.3s ease, transform 0.3s ease',
                }}
              >
                {country.timezones?.join(', ') || 'N/A'}
              </p>
            </div>
          </div>
          {/* External links */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginTop: '1rem',
              justifyContent: 'center',
            }}
          >
            <a
              href={wikipediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: `linear-gradient(45deg, ${isDarkMode ? '#450F8A' : '#6015C3'}, ${isDarkMode ? '#6A4ABF' : '#9577E6'})`,
                color: '#FFFFFF',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'all 0.3s ease-in-out',
                transform: isModeAnimating ? 'scale(1.05)' : 'scale(1)',
                boxShadow: `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
                fontSize: '0.875rem',
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = `0 6px 16px ${isDarkMode ? '#450F8A66' : '#6015C366'}`;
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.transform = isModeAnimating ? 'scale(1.05)' : 'scale(1)';
                e.currentTarget.style.boxShadow = `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`;
              }}
              aria-label="Visit Wikipedia"
            >
              <svg
                style={{ width: '1rem', height: '1rem', fill: '#FFFFFF' }}
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.22-1.79L8 14v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
              Wikipedia
            </a>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: `linear-gradient(45deg, ${isDarkMode ? '#450F8A' : '#6015C3'}, ${isDarkMode ? '#6A4ABF' : '#9577E6'})`,
                color: '#FFFFFF',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'all 0.3s ease-in-out',
                transform: isModeAnimating ? 'scale(1.05)' : 'scale(1)',
                boxShadow: `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
                fontSize: '0.875rem',
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = `0 6px 16px ${isDarkMode ? '#450F8A66' : '#6015C366'}`;
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.transform = isModeAnimating ? 'scale(1.05)' : 'scale(1)';
                e.currentTarget.style.boxShadow = `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`;
              }}
              aria-label="View on Google Maps"
            >
              <svg
                style={{ width: '1rem', height: '1rem', fill: '#FFFFFF' }}
                viewBox="0 0 24 24"
              >
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