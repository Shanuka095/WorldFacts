import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header({ isDarkMode, toggleDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: isDarkMode ? 'rgba(31, 27, 46, 0.95)' : 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(12px)',
      boxShadow: `0 2px 8px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
      padding: '0.75rem 1rem',
      borderBottom: `1px solid ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
      fontFamily: "'Poppins', sans-serif",
    }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
          @keyframes slideIn {
            from { transform: translateY(-100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes slideMenu {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          @keyframes toggleSwitch {
            0% { transform: translateX(0); }
            50% { transform: translateX(2px); }
            100% { transform: translateX(0); }
          }
          .nav-link:hover, .nav-link.active {
            background: ${isDarkMode ? '#450F8A' : '#6015C3'};
            color: #FFFFFF !important;
            transform: scale(1.05);
          }
          .hamburger div {
            transition: all 0.3s ease;
          }
          .hamburger.open div:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
          }
          .hamburger.open div:nth-child(2) {
            opacity: 0;
          }
          .hamburger.open div:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
          }
          @media (max-width: 768px) {
            .nav-menu {
              position: fixed;
              top: 0;
              right: 0;
              width: 75%;
              height: 100%;
              background: ${isDarkMode ? '#2A2640' : '#F9F5FF'};
              transform: translateX(${isMenuOpen ? '0' : '100%'});
              transition: transform 0.3s ease;
              padding: 4rem 1rem;
              box-shadow: -2px 0 8px ${isDarkMode ? '#450F8A33' : '#6015C333'};
            }
            .nav-menu a {
              display: block;
              margin: 1rem 0;
              font-size: 1.25rem;
            }
            header {
              padding: 0.5rem 0.75rem;
            }
            .toggle-container {
              width: 40px;
              height: 20px;
            }
            .toggle-circle {
              width: 16px;
              height: 16px;
            }
            .hamburger {
              width: 24px;
              height: 18px;
            }
            .hamburger div {
              height: 2px;
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
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 env(safe-area-inset-right) 0 env(safe-area-inset-left)',
      }}>
        <Link to="/home" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          textDecoration: 'none',
          color: isDarkMode ? '#FFFFFF' : '#2D1B4E',
          fontSize: '1.5rem',
          fontWeight: '700',
          animation: 'slideIn 0.5s ease',
        }}>
          <img
            src="/worldfacts-logo.png"
            alt="WorldFacts Logo"
            style={{ width: '32px', height: '32px', borderRadius: '50%' }}
          />
          WorldFacts
        </Link>
        <nav className="nav-menu" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          flexGrow: 1,
          justifyContent: 'flex-end',
          '@media (max-width: 768px)': {
            display: isMenuOpen ? 'flex' : 'none',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }
        }}>
          <NavLink
            to="/home"
            className="nav-link"
            style={{
              color: isDarkMode ? '#A8A4CE' : '#6015C3',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              transition: 'all 0.3s ease',
            }}
            onTouchStart={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.background = isDarkMode ? '#450F8A' : '#6015C3';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Home
          </NavLink>
          <NavLink
            to="/favorites"
            className="nav-link"
            style={{
              color: isDarkMode ? '#A8A4CE' : '#6015C3',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              transition: 'all 0.3s ease',
            }}
            onTouchStart={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.background = isDarkMode ? '#450F8A' : '#6015C3';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Favorites
          </NavLink>
          <div
            className="toggle-container"
            style={{
              width: '48px',
              height: '24px',
              background: isDarkMode ? '#450F8A' : '#E6E0FA',
              borderRadius: '12px',
              padding: '2px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              transition: 'background 0.3s ease',
              boxShadow: `inset 0 2px 4px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
            }}
            onClick={toggleDarkMode}
            onTouchStart={(e) => {
              e.currentTarget.style.transform = 'scale(0.95)';
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.children[0].style.animation = 'toggleSwitch 0.2s ease';
            }}
            role="switch"
            aria-checked={isDarkMode}
            aria-label="Toggle Dark Mode"
          >
            <div
              className="toggle-circle"
              style={{
                width: '20px',
                height: '20px',
                background: isDarkMode ? '#9577E6' : '#6015C3',
                borderRadius: '50%',
                transform: isDarkMode ? 'translateX(24px)' : 'translateX(0)',
                transition: 'transform 0.3s ease, background 0.3s ease',
                boxShadow: `0 2px 4px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
              }}
            ></div>
          </div>
        </nav>
        <div
          className="hamburger"
          style={{
            display: 'none',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '30px',
            height: '22px',
            cursor: 'pointer',
            '@media (max-width: 768px)': { display: 'flex' }
          }}
          onClick={toggleMenu}
          onTouchStart={(e) => {
            e.currentTarget.style.transform = 'scale(0.95)';
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
          aria-label="Toggle Menu"
          role="button"
        >
          <div style={{
            width: '100%',
            height: '3px',
            background: isDarkMode ? '#FFFFFF' : '#6015C3',
            borderRadius: '2px',
          }}></div>
          <div style={{
            width: '100%',
            height: '3px',
            background: isDarkMode ? '#FFFFFF' : '#6015C3',
            borderRadius: '2px',
          }}></div>
          <div style={{
            width: '100%',
            height: '3px',
            background: isDarkMode ? '#FFFFFF' : '#6015C3',
            borderRadius: '2px',
          }}></div>
        </div>
      </div>
    </header>
  );
}