import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Profile component for displaying user information and favorite countries
export default function Profile({ isDarkMode, favorites, toggleFavorite }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isModeAnimating, setIsModeAnimating] = useState(false);

  // Load user data from localStorage
  useEffect(() => {
    try {
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error parsing currentUser:', error);
      localStorage.removeItem('currentUser');
      navigate('/login');
    }
  }, [navigate]);

  // Trigger dark mode animation
  useEffect(() => {
    setIsModeAnimating(true);
    const timer = setTimeout(() => setIsModeAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [isDarkMode]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  // Handle ripple effect for buttons
  const handleRippleEffect = (e) => {
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.background = '#FFFFFF';
    ripple.style.opacity = '0.3';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    e.currentTarget.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  // Loading state
  if (!user) {
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
            width: '3rem',
            height: '3rem',
            border: `4px solid ${isDarkMode ? '#450F8A' : '#6015C3'}`,
            borderTop: '4px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        ></div>
        <p
          style={{
            marginLeft: '1rem',
            color: isDarkMode ? '#FFFFFF' : '#6015C3',
            fontSize: '1.25rem',
            fontWeight: '600',
          }}
        >
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '2rem 1rem',
        background: `radial-gradient(circle at top left, ${
          isDarkMode ? '#2A2640' : '#E6E0FA'
        }, ${isDarkMode ? '#1F1B2E' : '#F9F5FF'})`,
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
          @keyframes slideInRight {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes zoomIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @keyframes darkModeTransition {
            0% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.02); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes neonGlow {
            from { box-shadow: 0 0 10px rgba(69, 15, 138, 0.4), 0 0 20px rgba(69, 15, 138, 0.2); }
            to { box-shadow: 0 0 20px rgba(69, 15, 138, 0.6), 0 0 40px rgba(69, 15, 138, 0.4); }
          }
          @keyframes ripple {
            to { transform: scale(4); opacity: 0; }
          }
          @media (max-width: 768px) {
            .profile-container { flex-direction: column; align-items: center; }
            .profile-details-grid { grid-template-columns: 1fr; }
          }
          @media (max-width: 480px) {
            .profile-pic-container { width: 120px; height: 120px; }
            .profile-pic-container img, .profile-pic-container svg { width: 120px; height: 120px; }
          }
          :focus { outline: 2px solid ${
            isDarkMode ? '#9577E6' : '#450F8A'
          }; outline-offset: 2px; }
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
          background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle fill="${encodeURIComponent(
            isDarkMode ? '#450F8A' : '#6015C3'
          )}" fill-opacity="0.05" cx="50" cy="50" r="2"/></svg>')`,
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
          background: `linear-gradient(45deg, ${
            isDarkMode ? '#450F8A' : '#6015C3'
          }, ${isDarkMode ? '#6A4ABF' : '#9577E6'})`,
          color: '#FFFFFF',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          fontWeight: '600',
          textDecoration: 'none',
          transition: 'all 0.3s ease-in-out',
          transform: isModeAnimating ? 'scale(1.05)' : 'scale(1)',
          boxShadow: `0 6px 12px ${isDarkMode ? '#450F8A66' : '#6015C366'}`,
          marginBottom: '2rem',
          animation: isModeAnimating
            ? 'none'
            : 'slideInLeft 0.5s ease-in-out',
          position: 'relative',
          overflow: 'hidden',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = `0 8px 16px ${
            isDarkMode ? '#450F8A99' : '#6015C399'
          }`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = isModeAnimating
            ? 'scale(1.05)'
            : 'scale(1)';
          e.currentTarget.style.boxShadow = `0 6px 12px ${
            isDarkMode ? '#450F8A66' : '#6015C366'
          }`;
        }}
        onClick={handleRippleEffect}
        aria-label="Back to Home"
      >
        <svg
          style={{
            width: '1.25rem',
            height: '1.25rem',
            fill: 'none',
            stroke: '#FFFFFF',
            strokeWidth: '2',
          }}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </Link>
      {/* Profile card */}
      <div
        style={{
          background: isDarkMode
            ? 'rgba(42, 38, 64, 0.95)'
            : 'rgba(255, 255, 255, 0.98)',
          boxShadow: `0 8px 24px ${
            isDarkMode ? '#450F8A33' : '#6015C333'
          }, inset 0 0 10px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
          border: `2px solid transparent`,
          borderImage: `linear-gradient(45deg, ${
            isDarkMode ? '#450F8A' : '#6015C3'
          }, ${isDarkMode ? '#6A4ABF' : '#9577E6'}) 1`,
          borderRadius: '1rem',
          padding: '2.5rem',
          backdropFilter: 'blur(12px)',
          animation: isModeAnimating
            ? 'darkModeTransition 0.5s ease'
            : 'fadeInUp 0.6s ease-in-out',
          position: 'relative',
          overflow: 'hidden',
          transition: 'transform 0.3s ease-in-out',
          zIndex: 1,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
      >
        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(45deg, ${
              isDarkMode ? '#450F8A33' : '#6015C333'
            }, transparent)`,
            opacity: isModeAnimating ? 0.4 : 0.2,
            zIndex: 0,
            transition: 'opacity 0.5s ease',
          }}
        ></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', zIndex: 1 }}>
          {/* Profile heading */}
          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: isDarkMode ? '#FFFFFF' : '#2D1B4E',
              textAlign: 'center',
              textShadow: `0 2px 6px ${isDarkMode ? '#450F8A66' : '#6015C366'}`,
              animation: isModeAnimating ? 'none' : 'fadeIn 0.7s ease-in-out',
              transition: 'color 0.3s ease, transform 0.3s ease',
              transform: isModeAnimating ? 'translateY(-3px)' : 'translateY(0)',
            }}
          >
            User Profile
          </h2>
          <div
            style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start' }}
          >
            {/* Profile picture and sign out */}
            <div
              style={{
                flex: '1 1 200px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
                animation: isModeAnimating
                  ? 'darkModeTransition 0.5s ease 0.1s'
                  : 'zoomIn 0.7s ease-in-out 0.1s',
              }}
            >
              {user.profilePic ? (
                <div
                  style={{
                    position: 'relative',
                    width: '160px',
                    height: '160px',
                    borderRadius: '50%',
                    boxShadow: `0 0 20px ${
                      isDarkMode ? '#450F8A66' : '#6015C366'
                    }, 0 0 40px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
                    animation: 'neonGlow 2s ease-in-out infinite alternate',
                    transition: 'transform 0.3s ease-in-out',
                  }}
                >
                  <img
                    src={user.profilePic}
                    alt="Profile Picture"
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: `3px solid ${isDarkMode ? '#6A4ABF' : '#9577E6'}`,
                      transform: isModeAnimating ? 'scale(1.05)' : 'scale(1)',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = 'scale(1.05) rotate(3deg)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = isModeAnimating
                        ? 'scale(1.05)'
                        : 'scale(1)')
                    }
                  />
                </div>
              ) : (
                <div
                  style={{
                    position: 'relative',
                    width: '160px',
                    height: '160px',
                    borderRadius: '50%',
                    boxShadow: `0 0 20px ${
                      isDarkMode ? '#450F8A66' : '#6015C366'
                    }, 0 0 40px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
                    animation: 'neonGlow 2s ease-in-out infinite alternate',
                    transition: 'transform 0.3s ease-in-out',
                  }}
                >
                  <svg
                    style={{
                      width: '100%',
                      height: '100%',
                      fill: 'none',
                      stroke: isDarkMode ? '#FFFFFF' : '#6015C3',
                      strokeWidth: '2',
                      transform: isModeAnimating ? 'scale(1.05)' : 'scale(1)',
                      transition: 'transform 0.3s ease-in-out, stroke 0.3s ease',
                    }}
                    viewBox="0 0 24 24"
                  >
                    <defs>
                      <linearGradient
                        id="profileGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          style={{
                            stopColor: isDarkMode ? '#450F8A' : '#6015C3',
                            stopOpacity: 1,
                          }}
                        />
                        <stop
                          offset="100%"
                          style={{
                            stopColor: isDarkMode ? '#6A4ABF' : '#9577E6',
                            stopOpacity: 1,
                          }}
                        />
                      </linearGradient>
                    </defs>
                    <path
                      stroke="url(#profileGradient)"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
                    />
                  </svg>
                </div>
              )}
              <button
                onClick={(e) => {
                  handleRippleEffect(e);
                  handleLogout();
                }}
                style={{
                  background: `linear-gradient(45deg, ${
                    isDarkMode ? '#450F8A' : '#6015C3'
                  }, ${isDarkMode ? '#6A4ABF' : '#9577E6'})`,
                  color: '#FFFFFF',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                  transform: isModeAnimating ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
                  animation: isModeAnimating
                    ? 'none'
                    : 'fadeIn 0.7s ease-in-out 0.2s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = `0 6px 16px ${
                    isDarkMode ? '#450F8A66' : '#6015C366'
                  }`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = isModeAnimating
                    ? 'scale(1.05)'
                    : 'scale(1)';
                  e.currentTarget.style.boxShadow = `0 4px 12px ${
                    isDarkMode ? '#450F8A33' : '#6015C333'
                  }`;
                }}
                aria-label="Sign Out"
              >
                Sign Out
              </button>
            </div>
            {/* User details and favorites */}
            <div
              style={{
                flex: '2 1 400px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                animation: isModeAnimating
                  ? 'darkModeTransition 0.5s ease 0.3s'
                  : 'slideInRight 0.7s ease-in-out 0.3s',
              }}
            >
              {[
                { label: 'Name', value: user.fullName, icon: '👤' },
                { label: 'Email', value: user.email, icon: '📧' },
                { label: 'Phone', value: user.phone || 'N/A', icon: '📞' },
                {
                  label: 'Joined',
                  value: new Date(user.registrationDate).toLocaleDateString(),
                  icon: '📅',
                },
              ].map((item, index) => (
                <div
                  key={item.label}
                  style={{
                    background: isDarkMode ? '#3B3555' : '#F9F5FF',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    boxShadow: `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    animation: isModeAnimating
                      ? `darkModeTransition 0.5s ease ${0.4 + index * 0.1}s`
                      : `fadeIn 0.7s ease-in-out ${0.4 + index * 0.1}s`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = `0 6px 16px ${
                      isDarkMode ? '#450F8A66' : '#6015C366'
                    }`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = `0 4px 12px ${
                      isDarkMode ? '#450F8A33' : '#6015C333'
                    }`;
                  }}
                >
                  <p
                    style={{
                      fontSize: '1.2rem',
                      color: isDarkMode ? '#FFFFFF' : '#2D1B4E',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'color 0.3s ease, transform 0.3s ease',
                      transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '1.5rem',
                        transform: isModeAnimating ? 'scale(1.1)' : 'scale(1)',
                        transition: 'transform 0.3s ease',
                      }}
                    >
                      {item.icon}
                    </span>
                    <strong>{item.label}:</strong> {item.value}
                  </p>
                </div>
              ))}
              <div>
                <p
                  style={{
                    fontSize: '1.2rem',
                    color: isDarkMode ? '#FFFFFF' : '#2D1B4E',
                    fontWeight: '500',
                    marginBottom: '0.5rem',
                    transition: 'color 0.3s ease, transform 0.3s ease',
                    transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)',
                  }}
                >
                  <strong>Favorite Countries:</strong>
                </p>
                {favorites.length > 0 ? (
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                      gap: '1rem',
                    }}
                  >
                    {favorites.map((country, index) => (
                      <li
                        key={index}
                        style={{
                          background: isDarkMode ? '#3B3555' : '#F9F5FF',
                          padding: '1rem',
                          borderRadius: '0.75rem',
                          boxShadow: `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
                          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                          animation: isModeAnimating
                            ? `darkModeTransition 0.5s ease ${0.6 + index * 0.1}s`
                            : `fadeIn 0.7s ease-in-out ${0.6 + index * 0.1}s`,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.05)';
                          e.currentTarget.style.boxShadow = `0 6px 16px ${
                            isDarkMode ? '#450F8A66' : '#6015C366'
                          }`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.boxShadow = `0 4px 12px ${
                            isDarkMode ? '#450F8A33' : '#6015C333'
                          }`;
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            flexWrap: 'wrap',
                          }}
                        >
                          <Link
                            to={`/country/${encodeURIComponent(country)}`}
                            style={{
                              color: isDarkMode ? '#FFFFFF' : '#6015C3',
                              textDecoration: 'none',
                              fontWeight: '500',
                              transition: 'color 0.3s ease-in-out, transform 0.3s ease',
                              transform: isModeAnimating
                                ? 'translateY(-2px)'
                                : 'translateY(0)',
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.color = isDarkMode
                                ? '#9577E6'
                                : '#450F8A')
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.color = isDarkMode
                                ? '#FFFFFF'
                                : '#6015C3')
                            }
                            aria-label={`View details for ${country}`}
                          >
                            {country}
                          </Link>
                          <button
                            onClick={(e) => {
                              handleRippleEffect(e);
                              toggleFavorite(country);
                            }}
                            style={{
                              background: 'none',
                              border: `1px solid ${
                                isDarkMode ? '#FFFFFF' : '#6015C3'
                              }`,
                              borderRadius: '50%',
                              width: '28px',
                              height: '28px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: isDarkMode ? '#FFFFFF' : '#6015C3',
                              cursor: 'pointer',
                              transition:
                                'transform 0.3s ease-in-out, color 0.3s ease, background 0.3s ease',
                              transform: isModeAnimating ? 'scale(1.2)' : 'scale(1)',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'scale(1.2)';
                              e.currentTarget.style.background = '#FF4D4D';
                              e.currentTarget.style.color = '#FFFFFF';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = isModeAnimating
                                ? 'scale(1.2)'
                                : 'scale(1)';
                              e.currentTarget.style.background = 'none';
                              e.currentTarget.style.color = isDarkMode
                                ? '#FFFFFF'
                                : '#6015C3';
                            }}
                            aria-label={`Remove ${country} from favorites`}
                          >
                            🗑️
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p
                    style={{
                      fontSize: '1.1rem',
                      color: isDarkMode ? '#FFFFFF' : '#2D1B4E',
                      fontStyle: 'italic',
                      padding: '1rem',
                      background: isDarkMode ? '#3B3555' : '#F9F5FF',
                      borderRadius: '0.75rem',
                      textAlign: 'center',
                      transition: 'color 0.3s ease, transform 0.3s ease',
                      transform: isModeAnimating ? 'translateY(-2px)' : 'translateY(0)',
                    }}
                  >
                    No favorite countries yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}