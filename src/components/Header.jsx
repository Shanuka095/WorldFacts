import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/WorldFacts.png'; // Updated to use WorldFacts.png in assets folder

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

  const initials = currentUser.fullName
    ? currentUser.fullName
        .split(' ')
        .map(name => name[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'NA';

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const handleFavoritesToggle = () => {
    setShowFavorites(!showFavorites);
    navigate('/', { state: { showFavorites: !showFavorites } });
  };

  return (
    <header style={{ background: `linear-gradient(to right, ${isDarkMode ? '#4B0E9A' : '#6D16DF'}, ${isDarkMode ? '#7B46D3' : '#A678F2'})`, color: '#fff', padding: '1rem 2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(10px)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', transition: 'transform 0.3s ease', transform: 'scale(1)' }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
          <img src={logo} alt="WorldFacts Logo" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {currentUser.email && (
            <button
              onClick={handleFavoritesToggle}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#fff', color: isDarkMode ? '#4B0E9A' : '#6D16DF', padding: '0.5rem 1.25rem', borderRadius: '0.5rem', fontWeight: '600', transition: 'all 0.3s ease', transform: 'scale(1)', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', animation: showFavorites ? 'pulse 0.5s ease' : 'none' }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
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
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '2.5rem', height: '2.5rem', background: isDarkMode ? '#fff' : '#4B0E9A', color: isDarkMode ? '#4B0E9A' : '#fff', borderRadius: '50%', transition: 'all 0.3s ease', transform: 'scale(1)', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
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
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '2.5rem', height: '2.5rem', background: '#fff', color: isDarkMode ? '#4B0E9A' : '#6D16DF', borderRadius: '50%', fontWeight: '600', transition: 'all 0.3s ease', transform: 'scale(1)', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                {initials}
              </button>
              {isProfileOpen && (
                <div style={{ position: 'absolute', right: 0, marginTop: '0.5rem', width: '12rem', background: isDarkMode ? '#2A2640' : '#fff', borderRadius: '0.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', padding: '1rem', animation: 'fadeIn 0.3s ease', zIndex: 100 }}>
                  <Link
                    to="/profile"
                    style={{ display: 'block', color: isDarkMode ? '#E0DFFF' : '#2D1B4E', padding: '0.5rem 0', textDecoration: 'none', transition: 'color 0.3s ease' }}
                    onClick={() => setIsProfileOpen(false)}
                    onMouseEnter={(e) => e.target.style.color = '#6D16DF'}
                    onMouseLeave={(e) => e.target.style.color = isDarkMode ? '#E0DFFF' : '#2D1B4E'}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsProfileOpen(false);
                    }}
                    style={{ display: 'block', width: '100%', textAlign: 'left', color: isDarkMode ? '#E0DFFF' : '#2D1B4E', padding: '0.5rem 0', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.3s ease' }}
                    onMouseEnter={(e) => e.target.style.color = '#6D16DF'}
                    onMouseLeave={(e) => e.target.style.color = isDarkMode ? '#E0DFFF' : '#2D1B4E'}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <Link to="/login" style={{ color: '#fff', fontWeight: '600', textDecoration: 'none', transition: 'transform 0.3s ease', transform: 'scale(1)' }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>Login</Link>
              <Link to="/register" style={{ color: '#fff', fontWeight: '600', textDecoration: 'none', transition: 'transform 0.3s ease', transform: 'scale(1)' }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>Register</Link>
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
        `}
      </style>
    </header>
  );
}