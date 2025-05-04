import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function CountryCard({ country, toggleFavorite, isFavorite, isDarkMode }) {
  const encodedCountryName = encodeURIComponent(country.name.common);
  const [isModeAnimating, setIsModeAnimating] = useState(false);

  useEffect(() => {
    setIsModeAnimating(true);
    const timer = setTimeout(() => setIsModeAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [isDarkMode]);

  return (
    <div style={{ 
      background: isDarkMode ? '#2A2640' : '#fff', 
      boxShadow: `0 6px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`, 
      borderRadius: '0.75rem', 
      padding: '1rem', 
      border: `1px solid ${isDarkMode ? '#450F8A' : '#6015C3'}`, 
      transition: 'all 0.3s ease, border-color 0.3s ease', 
      animation: `${isModeAnimating ? 'darkModeTransition 0.5s ease' : 'fadeInUp 0.5s ease'}`, 
      position: 'relative', 
      overflow: 'hidden',
      zIndex: 1
    }}
    onTouchStart={(e) => {
      e.currentTarget.style.borderColor = isDarkMode ? '#9577E6' : '#450F8A';
      e.currentTarget.style.boxShadow = `0 8px 16px ${isDarkMode ? '#450F8A66' : '#6015C366'}, 0 0 20px ${isDarkMode ? '#9577E633' : '#450F8A33'}`;
    }}
    onTouchEnd={(e) => {
      e.currentTarget.style.borderColor = isDarkMode ? '#450F8A' : '#6015C3';
      e.currentTarget.style.boxShadow = `0 6px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`;
    }}
    >
      {/* Ripple effect */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        background: `radial-gradient(circle at center, ${isDarkMode ? '#450F8A33' : '#6015C333'} 0%, transparent 70%)`, 
        opacity: 0, 
        transition: 'opacity 0.5s ease', 
        zIndex: 0,
        pointerEvents: 'none'
      }}
      className="ripple-effect"
      ></div>
      {/* Gradient overlay */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        background: `linear-gradient(45deg, ${isDarkMode ? '#450F8A33' : '#6015C333'}, transparent)`, 
        opacity: isModeAnimating ? 0.4 : 0.2, 
        zIndex: 0, 
        transition: 'opacity 0.5s ease',
        pointerEvents: 'none'
      }}></div>
      <Link
        to={`/country/${encodedCountryName}`}
        style={{ textDecoration: 'none', zIndex: 10, display: 'block', pointerEvents: 'auto', position: 'relative' }}
      >
        <img
          src={country.flags.png}
          alt={country.name.common}
          style={{ 
            width: '100%', 
            height: '8rem', 
            objectFit: 'cover', 
            borderRadius: '0.5rem', 
            marginBottom: '0.75rem', 
            boxShadow: `0 4px 8px ${isDarkMode ? '#450F8A33' : '#6015C333'}`, 
            transition: 'transform 0.3s ease' 
          }}
          onTouchStart={(e) => e.target.style.transform = 'scale(1.02)'}
          onTouchEnd={(e) => e.target.style.transform = 'scale(1)'}
        />
        <h3 style={{ 
          fontSize: '1.25rem', 
          fontWeight: '700', 
          color: isDarkMode ? '#FFFFFF' : '#2D1B4E', 
          marginBottom: '0.5rem', 
          textShadow: '0 1px 2px rgba(0,0,0,0.2)', 
          transition: 'color 0.3s ease, transform 0.3s ease',
          transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)'
        }}>{country.name.common}</h3>
        <p style={{ 
          fontSize: '0.75rem', 
          color: isDarkMode ? '#FFFFFF' : '#6015C3', 
          marginBottom: '0.25rem', 
          transition: 'color 0.3s ease, transform 0.3s ease',
          transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)'
        }}><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
        <p style={{ 
          fontSize: '0.75rem', 
          color: isDarkMode ? '#FFFFFF' : '#6015C3', 
          marginBottom: '0.25rem', 
          transition: 'color 0.3s ease, transform 0.3s ease',
          transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)'
        }}><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p style={{ 
          fontSize: '0.75rem', 
          color: isDarkMode ? '#FFFFFF' : '#6015C3', 
          transition: 'color 0.3s ease, transform 0.3s ease',
          transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)'
        }}><strong>Region:</strong> {country.region}</p>
      </Link>
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(country.name.common);
        }}
        style={{ 
          marginTop: '0.75rem', 
          color: isFavorite ? (isDarkMode ? '#FFFFFF' : '#6015C3') : (isDarkMode ? '#A8A4CE' : '#9577E6'), 
          transition: 'all 0.3s ease', 
          transform: isModeAnimating ? 'scale(1.1)' : 'scale(1)', 
          zIndex: 10, 
          background: 'transparent', 
          border: 'none', 
          cursor: 'pointer', 
          position: 'relative',
          padding: '0.5rem'
        }}
        onTouchStart={(e) => e.target.style.transform = isModeAnimating ? 'scale(1.2)' : 'scale(1.1)'}
        onTouchEnd={(e) => e.target.style.transform = isModeAnimating ? 'scale(1.1)' : 'scale(1)'}
      >
        <svg style={{ width: '1.25rem', height: '1.25rem', fill: isFavorite ? 'currentColor' : 'none', stroke: isFavorite ? 'none' : 'currentColor', strokeWidth: '2' }} viewBox="0 0 24 24">
          {isFavorite ? (
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          ) : (
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeLinecap="round" strokeLinejoin="round"/>
          )}
        </svg>
      </button>
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes darkModeTransition {
            0% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.02); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes ripple {
            0% { transform: scale(0); opacity: 0.5; }
            100% { transform: scale(4); opacity: 0; }
          }
          .ripple-effect {
            pointer-events: none;
          }
          div:hover .ripple-effect, div:active .ripple-effect {
            animation: ripple 0.7s ease-out;
            opacity: 0.3;
          }
          @media (max-width: 768px) {
            div[style*="padding: '1rem'"] {
              padding: 0.75rem;
            }
            img[style*="height: '8rem'"] {
              height: 6rem;
            }
            h3 {
              font-size: 1rem;
            }
            p {
              font-size: 0.7rem;
            }
            button[style*="padding: '0.5rem'"] {
              padding: 0.75rem;
            }
          }
        `}
      </style>
    </div>
  );
}