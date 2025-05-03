import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCountryByName } from '../services/api';

export default function Profile({ isDarkMode, favorites }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [favoriteCountries, setFavoriteCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!currentUser.email) {
      navigate('/login');
    } else {
      setUser(currentUser);
      const fetchFavorites = async () => {
        setLoading(true);
        try {
          const countries = await Promise.all(favorites.map(name => getCountryByName(name).catch(() => null)));
          setFavoriteCountries(countries.flat().filter(Boolean));
        } catch (error) {
          console.error('Error fetching favorites:', error);
          setFavoriteCountries([]);
        }
        setLoading(false);
      };
      fetchFavorites();
    }
  }, [favorites, navigate]);

  if (!user) return null;

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem', background: `linear-gradient(135deg, ${isDarkMode ? '#1F1B2E' : '#F9F5FF'}, ${isDarkMode ? '#2A2640' : '#E6E0FA'})`, minHeight: '100vh', animation: 'fadeIn 0.5s ease' }}>
      <Link
        to="/"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: isDarkMode ? '#4B0E9A' : '#6D16DF', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: '600', textDecoration: 'none', transition: 'all 0.3s ease', transform: 'scale(1)', boxShadow: '0 6px 12px rgba(0,0,0,0.3)', marginBottom: '2rem' }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        <svg style={{ width: '1.25rem', height: '1.25rem', fill: 'none', stroke: '#fff', strokeWidth: '2' }} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
        Back
      </Link>
      <div style={{ background: isDarkMode ? '#2A2640' : '#fff', boxShadow: '0 6px 18px rgba(0,0,0,0.2)', borderRadius: '1rem', padding: '2.5rem', animation: 'slideInUp 0.5s ease', overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: `linear-gradient(45deg, ${isDarkMode ? '#4B0E9A33' : '#6D16DF33'}, transparent)`, opacity: 0.2, zIndex: 0 }}></div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem', zIndex: 1 }}>
          {user.profilePic ? (
            <img src={user.profilePic} alt="Profile" style={{ width: '140px', height: '140px', borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem', boxShadow: `0 6px 12px ${isDarkMode ? '#4B0E9A66' : '#6D16DF66'}`, animation: 'zoomIn 0.5s ease', border: `3px solid ${isDarkMode ? '#4B0E9A' : '#6D16DF'}` }} />
          ) : (
            <div style={{ width: '140px', height: '140px', borderRadius: '50%', background: isDarkMode ? '#4B0E9A' : '#6D16DF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem', boxShadow: `0 6px 12px ${isDarkMode ? '#4B0E9A66' : '#6D16DF66'}`, animation: 'zoomIn 0.5s ease', border: `3px solid ${isDarkMode ? '#7B46D3' : '#A678F2'}` }}>
              {user.fullName?.split(' ').map(n => n[0]).join('')}
            </div>
          )}
          <h2 style={{ fontSize: '2.25rem', fontWeight: '700', color: isDarkMode ? '#E0DFFF' : '#2D1B4E', marginBottom: '0.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>{user.fullName}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', textAlign: 'center' }}>
            <p style={{ fontSize: '1rem', color: isDarkMode ? '#A678F2' : '#6D16DF', marginBottom: '0.5rem', background: isDarkMode ? '#4B0E9A33' : '#F9F5FF', padding: '0.5rem 1rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}><strong>Email:</strong> {user.email}</p>
            <p style={{ fontSize: '1rem', color: isDarkMode ? '#A678F2' : '#6D16DF', marginBottom: '0.5rem', background: isDarkMode ? '#4B0E9A33' : '#F9F5FF', padding: '0.5rem 1rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}><strong>Phone:</strong> {user.phone}</p>
            <p style={{ fontSize: '1rem', color: isDarkMode ? '#A678F2' : '#6D16DF', background: isDarkMode ? '#4B0E9A33' : '#F9F5FF', padding: '0.5rem 1rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}><strong>Joined:</strong> {new Date(user.registrationDate).toLocaleDateString()}</p>
          </div>
        </div>
        <h3 style={{ fontSize: '1.75rem', fontWeight: '600', color: isDarkMode ? '#A678F2' : '#6D16DF', marginBottom: '1.5rem', textAlign: 'center', textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>Favorite Countries</h3>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
            <div style={{ width: '3rem', height: '3rem', border: `4px solid ${isDarkMode ? '#4B0E9A' : '#6D16DF'}`, borderTop: '4px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <p style={{ marginLeft: '1rem', color: isDarkMode ? '#A678F2' : '#6D16DF', fontSize: '1.25rem', fontWeight: '600' }}>Loading...</p>
          </div>
        ) : favoriteCountries.length ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {favoriteCountries.map((country) => (
              <div key={country.name.common} style={{ background: isDarkMode ? '#2A2640' : '#fff', boxShadow: `0 6px 12px ${isDarkMode ? '#4B0E9A33' : '#6D16DF33'}`, borderRadius: '0.75rem', padding: '1.5rem', border: `1px solid ${isDarkMode ? '#4B0E9A' : '#6D16DF'}`, transition: 'all 0.3s ease', transform: 'scale(1)', animation: 'fadeInUp 0.5s ease', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: `linear-gradient(45deg, ${isDarkMode ? '#4B0E9A33' : '#6D16DF33'}, transparent)`, opacity: 0.2, zIndex: 0 }}></div>
                <Link to={`/country/${encodeURIComponent(country.name.common)}`} style={{ textDecoration: 'none', zIndex: 1 }}>
                  <img src={country.flags.png} alt={country.name.common} style={{ width: '100%', height: '10rem', objectFit: 'cover', borderRadius: '0.5rem', marginBottom: '1rem', boxShadow: `0 4px 8px ${isDarkMode ? '#4B0E9A33' : '#6D16DF33'}`, transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'} />
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: isDarkMode ? '#E0DFFF' : '#2D1B4E', marginBottom: '0.75rem', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>{country.name.common}</h3>
                  <p style={{ fontSize: '0.875rem', color: isDarkMode ? '#A678F2' : '#6D16DF', marginBottom: '0.25rem' }}><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
                  <p style={{ fontSize: '0.875rem', color: isDarkMode ? '#A678F2' : '#6D16DF', marginBottom: '0.25rem' }}><strong>Population:</strong> {country.population.toLocaleString()}</p>
                  <p style={{ fontSize: '0.875rem', color: isDarkMode ? '#A678F2' : '#6D16DF' }}><strong>Region:</strong> {country.region}</p>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: isDarkMode ? '#A678F2' : '#6D16DF', fontSize: '1.25rem', fontWeight: '600', marginTop: '2rem', animation: 'fadeIn 0.5s ease' }}>No favorite countries.</p>
        )}
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes zoomIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}