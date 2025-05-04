import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function CountryCard({ country, toggleFavorite, isFavorite, isDarkMode }) {
  const encodedCountryName = encodeURIComponent(country.name.common);
  const [isModeAnimating, setIsModeAnimating] = useState(false);
  const [touchPosition, setTouchPosition] = useState(null);

  useEffect(() => {
    setIsModeAnimating(true);
    const timer = setTimeout(() => setIsModeAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [isDarkMode]);

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setTouchPosition({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (e) => {
    setTouchPosition(null);
  };

  return (
    <div style={{
      background: isDarkMode ? 'rgba(42, 38, 64, 0.95)' : 'rgba(255, 255, 255, 0.98)',
      boxShadow: `0 8px 24px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
      borderRadius: '1rem',
      padding: '1rem',
      border: `2px solid transparent`,
      borderImage: `linear-gradient(45deg, ${isDarkMode ? '#450F8A' : '#6015C3'}, ${isDarkMode ? '#6A4ABF' : '#9577E6'}) 1`,
      transition: 'all 0.3s ease, transform 0.2s ease',
      animation: isModeAnimating ? 'cardPop 0.5s ease' : 'fadeInUp 0.5s ease',
      position: 'relative',
      overflow: 'hidden',
      zIndex: 1,
      backdropFilter: 'blur(8px)',
      willChange: 'transform, box-shadow',
    }}
    onTouchStart={handleTouchStart}
    onTouchEnd={handleTouchEnd}
    onTouchMove={(e) => {
      if (touchPosition) {
        const touch = e.touches[0];
        const deltaX = touch.clientX - touchPosition.x;
        const deltaY = touchPosition.y - touch.clientY;
        e.currentTarget.style.transform = `rotateX(${deltaY * 0.05}deg) rotateY(${deltaX * 0.05}deg)`;
      }
    }}
    onTouchCancel={() => {
      setTouchPosition(null);
      e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg)';
    }}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes cardPop {
            0% { transform: scale(0.95); opacity: 0.8; }
            50% { transform: scale(1.02); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes ripple {
            0% { transform: scale(0); opacity: 0.5; }
            100% { transform: scale(4); opacity: 0; }
          }
          .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: ${isDarkMode ? '#9577E633' : '#6015C333'};
            pointer-events: none;
            z-index: 0;
            transform: translate(-50%, -50%);
          }
          @media (max-width: 768px) {
            div[style*="padding: '1rem'"] {
              padding: 0.75rem;
            }
            img[style*="height"] {
              height: 120px;
            }
            h3 {
              font-size: 1.125rem;
            }
            p {
              font-size: 0.875rem;
            }
            button {
              padding: 0.5rem;
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
      <div
        className="ripple-effect"
        style={{
          display: touchPosition ? 'block' : 'none',
          width: '100px',
          height: '100px',
          top: touchPosition?.y,
          left: touchPosition?.x,
          animation: touchPosition ? 'ripple 0.6s ease-out' : 'none',
        }}
      ></div>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `linear-gradient(45deg, ${isDarkMode ? '#450F8A33' : '#6015C333'}, transparent)`,
        opacity: isModeAnimating ? 0.4 : 0.2,
        zIndex: 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none',
      }}></div>
      <Link
        to={`/country/${encodedCountryName}`}
        style={{
          textDecoration: 'none',
          zIndex: 10,
          display: 'block',
          position: 'relative',
        }}
      >
        <img
          src={country.flags.png}
          alt={`${country.name.common} Flag`}
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
            borderRadius: '0.75rem',
            marginBottom: '0.75rem',
            boxShadow: `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
            transition: 'transform 0.3s ease',
          }}
          onTouchStart={(e) => e.target.style.transform = 'scale(1.03)'}
          onTouchEnd={(e) => e.target.style.transform = 'scale(1)'}
        />
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '700',
          color: isDarkMode ? '#FFFFFF' : '#2D1B4E',
          marginBottom: '0.5rem',
          textShadow: '0 1px 2px rgba(0,0,0,0.2)',
          transition: 'color 0.3s ease, transform 0.3s ease',
          transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)',
        }}>
          {country.name.common}
        </h3>
        <p style={{
          fontSize: '0.875rem',
          color: isDarkMode ? '#A8A4CE' : '#6015C3',
          marginBottom: '0.25rem',
          transition: 'color 0.3s ease',
        }}>
          <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}
        </p>
        <p style={{
          fontSize: '0.875rem',
          color: isDarkMode ? '#A8A4CE' : '#6015C3',
          marginBottom: '0.25rem',
          transition: 'color 0.3s ease',
        }}>
          <strong>Population:</strong> {country.population.toLocaleString()}
        </p>
        <p style={{
          fontSize: '0.875rem',
          color: isDarkMode ? '#A8A4CE' : '#6015C3',
          transition: 'color 0.3s ease',
        }}>
          <strong>Region:</strong> {country.region}
        </p>
      </Link>
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(country.name.common);
        }}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: isFavorite
            ? 'linear-gradient(45deg, #FF4D4D, #FF7878)'
            : 'transparent',
          border: `2px solid ${isDarkMode ? '#9577E6' : '#6015C3'}`,
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          zIndex: 10,
        }}
        onTouchStart={(e) => {
          e.currentTarget.style.transform = 'scale(0.9)';
        }}
        onTouchEnd={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
        aria-label={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      >
        <svg
          style={{
            width: '20px',
            height: '20px',
            fill: isFavorite ? '#FFFFFF' : 'none',
            stroke: isFavorite ? 'none' : isDarkMode ? '#9577E6' : '#6015C3',
            strokeWidth: '2',
            transition: 'all 0.3s ease',
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
      </button>
    </div>
  );
}