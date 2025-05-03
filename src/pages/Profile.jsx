import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Profile({ isDarkMode, favorites, toggleFavorite }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

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

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  if (!user) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: isDarkMode ? '#1F1B2E' : '#F9F5FF' }}>
        <div style={{ width: '3rem', height: '3rem', border: `4px solid ${isDarkMode ? '#450F8A' : '#6015C3'}`, borderTop: '4px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <p style={{ marginLeft: '1rem', color: isDarkMode ? '#FFFFFF' : '#6015C3', fontSize: '1.25rem', fontWeight: '600' }}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '2rem 1rem', background: `linear-gradient(135deg, ${isDarkMode ? '#1F1B2E' : '#F9F5FF'}, ${isDarkMode ? '#2A2640' : '#E6E0FA'})`, minHeight: '100vh', fontFamily: "'Poppins', sans-serif" }}>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');`}
      </style>
      <Link
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: isDarkMode ? '#450F8A' : '#6015C3',
          color: '#FFFFFF',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          fontWeight: '600',
          textDecoration: 'none',
          transition: 'all 0.3s ease-in-out',
          transform: 'scale(1)',
          boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
          marginBottom: '2rem',
          animation: 'slideInLeft 0.5s ease-in-out'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        <svg style={{ width: '1.25rem', height: '1.25rem', fill: 'none', stroke: '#FFFFFF', strokeWidth: '2' }} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
        Back
      </Link>
      <div style={{
        background: isDarkMode ? 'rgba(42, 38, 64, 0.95)' : 'rgba(255, 255, 255, 0.98)',
        boxShadow: `0 8px 24px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
        border: `1px solid ${isDarkMode ? '#6A4ABF33' : '#9577E633'}`,
        borderRadius: '1rem',
        padding: '2.5rem',
        backdropFilter: 'blur(12px)',
        animation: 'fadeInUp 0.6s ease-in-out',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: `linear-gradient(45deg, ${isDarkMode ? '#450F8A33' : '#6015C333'}, transparent)`, opacity: '0.2', zIndex: 0 }}></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', zIndex: 1 }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: isDarkMode ? '#FFFFFF' : '#2D1B4E', textAlign: 'center', textShadow: '0 2px 6px rgba(0,0,0,0.3)', animation: 'fadeIn 0.7s ease-in-out' }}>User Profile</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start' }}>
            <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', animation: 'zoomIn 0.7s ease-in-out 0.1s' }}>
              {user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt="Profile Picture"
                  style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', boxShadow: `0 8px 16px ${isDarkMode ? '#450F8A33' : '#6015C333'}`, transition: 'transform 0.3s ease-in-out' }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
              ) : (
                <svg style={{ width: '150px', height: '150px', fill: isDarkMode ? '#FFFFFF' : '#6015C3' }} viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
              )}
              <button
                onClick={handleLogout}
                style={{
                  background: isDarkMode ? '#450F8A' : '#6015C3',
                  color: '#FFFFFF',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                  transform: 'scale(1)',
                  boxShadow: `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`,
                  animation: 'fadeIn 0.7s ease-in-out 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = `0 6px 16px ${isDarkMode ? '#450F8A66' : '#6015C366'}`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = `0 4px 12px ${isDarkMode ? '#450F8A33' : '#6015C333'}`;
                }}
              >
                Sign Out
              </button>
            </div>
            <div style={{ flex: '2 1 400px', display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'slideInRight 0.7s ease-in-out 0.3s' }}>
              <p style={{ fontSize: '1.2rem', color: isDarkMode ? '#FFFFFF' : '#2D1B4E', fontWeight: '500' }}><strong>Name:</strong> {user.fullName}</p>
              <p style={{ fontSize: '1.2rem', color: isDarkMode ? '#FFFFFF' : '#2D1B4E', fontWeight: '500' }}><strong>Email:</strong> {user.email}</p>
              <p style={{ fontSize: '1.2rem', color: isDarkMode ? '#FFFFFF' : '#2D1B4E', fontWeight: '500' }}><strong>Phone:</strong> {user.phone || 'N/A'}</p>
              <p style={{ fontSize: '1.2rem', color: isDarkMode ? '#FFFFFF' : '#2D1B4E', fontWeight: '500' }}><strong>Joined:</strong> {new Date(user.registrationDate).toLocaleDateString()}</p>
              <div>
                <p style={{ fontSize: '1.2rem', color: isDarkMode ? '#FFFFFF' : '#2D1B4E', fontWeight: '500', marginBottom: '0.5rem' }}><strong>Favorite Countries:</strong></p>
                {favorites.length > 0 ? (
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                    {favorites.map((country, index) => (
                      <li key={index} style={{ animation: `fadeIn 0.7s ease-in-out ${0.4 + index * 0.1}s` }}>
                        <Link
                          to={`/country/${encodeURIComponent(country)}`}
                          style={{ color: isDarkMode ? '#FFFFFF' : '#6015C3', textDecoration: 'none', fontWeight: '500', transition: 'color 0.3s ease-in-out' }}
                          onMouseEnter={(e) => e.target.style.color = isDarkMode ? '#9577E6' : '#450F8A'}
                          onMouseLeave={(e) => e.target.style.color = isDarkMode ? '#FFFFFF' : '#6015C3'}
                        >
                          {country}
                        </Link>
                        <button
                          onClick={() => toggleFavorite(country)}
                          style={{ marginLeft: '0.5rem', background: 'none', border: 'none', color: isDarkMode ? '#FFFFFF' : '#6015C3', cursor: 'pointer', transition: 'transform 0.3s ease-in-out', transform: 'scale(1)' }}
                          onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                        >
                          🗑️
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ fontSize: '1.1rem', color: isDarkMode ? '#FFFFFF' : '#2D1B4E', fontStyle: 'italic' }}>No favorite countries yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
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
          @media (max-width: 768px) {
            .profile-container {
              flex-direction: column;
              align-items: center;
            }
          }
        `}
      </style>
    </div>
  );
}