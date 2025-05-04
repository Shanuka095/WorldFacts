import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header({ isDarkMode, toggleDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
          :root {
            --dark-mode-bg: ${isDarkMode ? 'rgba(31, 27, 46, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
            --dark-mode-text: ${isDarkMode ? '#FFFFFF' : '#2D1B4E'};
            --dark-mode-accent: ${isDarkMode ? '#A8A4CE' : '#6015C3'};
            --dark-mode-gradient-start: ${isDarkMode ? '#450F8A' : '#6015C3'};
            --dark-mode-gradient-end: ${isDarkMode ? '#6A4ABF' : '#9577E6'};
            --dark-mode-shadow: ${isDarkMode ? '#450F8A33' : '#6015C333'};
          }
          .header {
            position: sticky;
            top: 0;
            z-index: 1000;
            background: var(--dark-mode-bg);
            box-shadow: 0 2px 4px var(--dark-mode-shadow);
            padding: 0.75rem 1rem;
            border-bottom: 1px solid var(--dark-mode-shadow);
            font-family: 'Poppins', sans-serif;
          }
          .header-container {
            max-width: 1440px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 env(safe-area-inset-right) 0 env(safe-area-inset-left);
          }
          .logo-link {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            text-decoration: none;
            color: var(--dark-mode-text);
            font-size: 1.5rem;
            font-weight: 700;
            animation: fadeIn 0.5s ease;
          }
          .logo-link img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
          }
          .nav-menu {
            display: flex;
            align-items: center;
            gap: 1rem;
            flex-grow: 1;
            justify-content: flex-end;
          }
          .nav-link {
            color: var(--dark-mode-accent);
            text-decoration: none;
            padding: 0.75rem 1.25rem;
            border-radius: 0.5rem;
            font-size: 0.875rem;
            font-weight: 600;
            transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
          }
          .nav-link:hover, .nav-link.active {
            background: var(--dark-mode-gradient-start);
            color: #FFFFFF;
            transform: scale(1.05);
          }
          .nav-link:active {
            transform: scale(0.95);
          }
          .toggle-container {
            width: 48px;
            height: 24px;
            background: ${isDarkMode ? '#450F8A' : '#E6E0FA'};
            border-radius: 12px;
            padding: 2px;
            cursor: pointer;
            display: flex;
            align-items: center;
            transition: background 0.3s ease;
            box-shadow: inset 0 1px 2px var(--dark-mode-shadow);
          }
          .toggle-circle {
            width: 20px;
            height: 20px;
            background: ${isDarkMode ? '#9577E6' : '#6015C3'};
            border-radius: 50%;
            transform: ${isDarkMode ? 'translateX(24px)' : 'translateX(0)'};
            transition: transform 0.3s ease, background 0.3s ease;
            box-shadow: 0 1px 2px var(--dark-mode-shadow);
          }
          .toggle-container:active {
            transform: scale(0.95);
          }
          .hamburger {
            display: none;
            flex-direction: column;
            justify-content: space-between;
            width: 40px;
            height: 40px;
            padding: 8px;
            cursor: pointer;
            box-sizing: border-box;
          }
          .hamburger div {
            width: 100%;
            height: 3px;
            background: ${isDarkMode ? '#FFFFFF' : '#6015C3'};
            border-radius: 2px;
            transition: transform 0.3s ease, opacity 0.3s ease;
            transform-origin: center;
          }
          .hamburger.open div:nth-child(1) {
            transform: translate3d(0, 10px, 0) rotate(45deg);
          }
          .hamburger.open div:nth-child(2) {
            opacity: 0;
          }
          .hamburger.open div:nth-child(3) {
            transform: translate3d(0, -10px, 0) rotate(-45deg);
          }
          .hamburger:active {
            transform: scale(0.95);
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @media (max-width: 768px) {
            .nav-menu {
              position: fixed;
              top: 0;
              right: 0;
              width: 70%;
              height: 100%;
              background: ${isDarkMode ? '#2A2640' : '#F9F5FF'};
              transform: translateX(${isMenuOpen ? '0' : '100%'});
              transition: transform 0.3s ease;
              padding: 2rem 1rem;
              box-shadow: -2px 0 4px var(--dark-mode-shadow);
              flex-direction: column;
              align-items: flex-start;
              z-index: 1000;
            }
            .nav-link {
              display: block;
              margin: 0.75rem 0;
              font-size: 1.1rem;
              padding: 0.5rem 1rem;
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
              display: flex;
            }
            .header {
              padding: 0.5rem 0.75rem;
            }
          }
          @media (max-width: 480px) {
            .logo-link {
              font-size: 1.25rem;
            }
            .logo-link img {
              width: 28px;
              height: 28px;
            }
            .nav-link {
              font-size: 1rem;
            }
            .header {
              padding: 0.5rem env(safe-area-inset-right) 0.5rem env(safe-area-inset-left);
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
      <div className="header-container">
        <Link to="/home" className="logo-link">
          <img src="/worldfacts-logo.png" alt="WorldFacts Logo" />
          WorldFacts
        </Link>
        <nav className="nav-menu">
          <NavLink to="/home" className="nav-link" exact activeClassName="active">
            Home
          </NavLink>
          <NavLink to="/favorites" className="nav-link" activeClassName="active">
            Favorites
          </NavLink>
          <div
            className="toggle-container"
            onClick={toggleDarkMode}
            role="switch"
            aria-checked={isDarkMode}
            aria-label="Toggle Dark Mode"
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleDarkMode();
              }
            }}
          >
            <div className="toggle-circle"></div>
          </div>
        </nav>
        <div
          className={`hamburger ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          role="button"
          tabIndex="0"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleMenu();
            }
          }}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </header>
  );
}