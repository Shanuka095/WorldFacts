import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logoLight from '../assets/WorldFacts2.png';
import logoDark from '../assets/WorldFacts.png';

export default function Header({ isDarkMode, toggleDarkMode, favorites }) {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  let currentUser = {};
  try {
    const userData = localStorage.getItem('currentUser');
    if (userData) currentUser = JSON.parse(userData);
  } catch (error) {
    console.error('Error parsing currentUser:', error);
    localStorage.removeItem('currentUser');
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const handleFavoritesToggle = () => {
    setShowFavorites(!showFavorites);
    navigate('/', { state: { showFavorites: !showFavorites } });
  };

  return (
    <header style={{ background: `linear-gradient(to right, ${isDarkMode ? '#450F8A' : '#6015C3'}, ${isDarkMode ? '#6A4ABF' : '#9577E6'})`, color: '#FFFFFF', padding: '1rem 2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(8px)', fontFamily: "'Poppins', sans-serif" }}>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');`}
      </style>
      <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
        <Link
          to="/"
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', transition: 'transform 0.3s ease-in-out', transform: 'rotate(0deg)' }}
          onMouseEnter={(e) => e.target.style.transform = 'rotate(3deg) scale(1.03)'}
          onMouseLeave={(e) => e.target.style.transform = 'rotate(0deg) scale(1)'}
        >
          <img src={isDarkMode ? logoDark : logoLight} alt="WorldFacts Logo" style={{ width: '40px', height: '40px', objectFit: 'contain', animation: 'fadeIn 0.5s ease' }} />
        </Link>
        <span
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#FFFFFF',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            animation: 'textGlow 1.5s ease-in-out forwards',
            transition: 'text-shadow 0.3s ease-in-out'
          }}
          onMouseEnter={(e) => e.target.style.textShadow = '0 0 8px #FFFFFF, 0 0 12px #9577E6'}
          onMouseLeave={(e) => e.target.style.textShadow = '0 2px 4px rgba(0,0,0,0.3)'}
        >
          WorldFacts
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {currentUser.email && (
            <button
              onClick={handleFavoritesToggle}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#FFFFFF',
                color: isDarkMode ? '#450F8A' : '#6015C3',
                padding: '0.5rem 1.25rem',
                borderRadius: '0.5rem',
                fontWeight: '600',
                transition: 'all 0.3s ease-in-out',
                transform: 'scale(1)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                animation: showFavorites ? 'pulse 0.5s ease' : 'none'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.03)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              <svg style={{ width: '1.25rem', height: '1.25rem', fill: showFavorites ? 'currentColor' : 'none', stroke: showFavorites ? 'none' : 'currentColor', strokeWidth: '2' }} viewBox="0 0 24 24">
                {showFavorites ? (
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                ) : (
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeLinecap="round" strokeLinejoin="round"/>
                )}
              </svg>
              {showFavorites ? 'All Countries' : 'Favorites'}
            </button>
          )}
          <button
            onClick={toggleDarkMode}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2.5rem',
              height: '2.5rem',
              background: isDarkMode ? '#FFFFFF' : '#450F8A',
              color: isDarkMode ? '#450F8A' : '#FFFFFF',
              borderRadius: '50%',
              transition: 'all 0.3s ease-in-out',
              transform: 'scale(1)',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            {isDarkMode ? (
              <svg style={{ width: '1.25rem', height: '1.25rem', fill: 'currentColor' }} viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              <svg style={{ width: '1.25rem', height: '1.25rem', fill: 'currentColor' }} viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 11-2 0 1 1 0 012 0zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 11-2 0 1 1 0 012 0zm-1-1z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          {currentUser.email ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2.5rem',
                  height: '2.5rem',
                  background: '#FFFFFF',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease-in-out',
                  transform: 'scale(1)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                {currentUser.profilePic ? (
                  <img
                    src={currentUser.profilePic}
                    alt="Profile"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <svg style={{ width: '1.5rem', height: '1.5rem', fill: isDarkMode ? '#450F8A' : '#6015C3' }} viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                )}
              </button>
              {isProfileOpen && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  marginTop: '0.5rem',
                  width: '12rem',
                  background: isDarkMode ? '#2A2640' : '#FFFFFF',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  padding: '1rem',
                  animation: 'fadeIn 0.3s ease',
                  zIndex: 100
                }}>
                  <Link
                    to="/profile"
                    style={{ display: 'block', color: isDarkMode ? '#FFFFFF' : '#2D1B4E', padding: '0.5rem 0', textDecoration: 'none', transition: 'color 0.3s ease-in-out' }}
                    onClick={() => setIsProfileOpen(false)}
                    onMouseEnter={(e) => e.target.style.color = isDarkMode ? '#9577E6' : '#6015C3'}
                    onMouseLeave={(e) => e.target.style.color = isDarkMode ? '#FFFFFF' : '#2D1B4E'}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsProfileOpen(false);
                    }}
                    style={{ display: 'block', width: '100%', textAlign: 'left', color: isDarkMode ? '#FFFFFF' : '#2D1B4E', padding: '0.5rem 0', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.3s ease-in-out' }}
                    onMouseEnter={(e) => e.target.style.color = isDarkMode ? '#9577E6' : '#6015C3'}
                    onMouseLeave={(e) => e.target.style.color = isDarkMode ? '#FFFFFF' : '#2D1B4E'}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <Link
                to="/login"
                style={{ color: '#FFFFFF', fontWeight: '600', textDecoration: 'none', transition: 'transform 0.3s ease-in-out', transform: 'scale(1)' }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.03)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                Login
              </Link>
              <Link
                to="/register"
                style={{ color: '#FFFFFF', fontWeight: '600', textDecoration: 'none', transition: 'transform 0.3s ease-in-out', transform: 'scale(1)' }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.03)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes textGlow {
            from { letter-spacing: 0; opacity: 0.7; }
            to { letter-spacing: 2px; opacity: 1; }
          }
          @media (max-width: 768px) {
            .site-name {
              font-size: 1.2rem;
            }
          }
          @media (max-width: 480px) {
            .site-name {
              display: none;
            }
          }
        `}
      </style>
    </header>
  );
}