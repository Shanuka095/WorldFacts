import { Link } from 'react-router-dom';

export default function CountryCard({ country, toggleFavorite, isFavorite, isDarkMode }) {
  const encodedCountryName = encodeURIComponent(country.name.common);

  return (
    <div style={{ background: isDarkMode ? '#2A2640' : '#fff', boxShadow: `0 6px 12px ${isDarkMode ? '#4B0E9A33' : '#6D16DF33'}`, borderRadius: '0.75rem', padding: '1.5rem', border: `1px solid ${isDarkMode ? '#4B0E9A' : '#6D16DF'}`, transition: 'all 0.3s ease', transform: 'scale(1)', animation: 'fadeInUp 0.5s ease', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: `linear-gradient(45deg, ${isDarkMode ? '#4B0E9A33' : '#6D16DF33'}, transparent)`, opacity: 0.2, zIndex: 0 }}></div>
      <Link to={`/country/${encodedCountryName}`} style={{ textDecoration: 'none', zIndex: 1 }}>
        <img src={country.flags.png} alt={country.name.common} style={{ width: '100%', height: '10rem', objectFit: 'cover', borderRadius: '0.5rem', marginBottom: '1rem', boxShadow: `0 4px 8px ${isDarkMode ? '#4B0E9A33' : '#6D16DF33'}`, transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'} />
        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: isDarkMode ? '#E0DFFF' : '#2D1B4E', marginBottom: '0.75rem', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>{country.name.common}</h3>
        <p style={{ fontSize: '0.875rem', color: isDarkMode ? '#A678F2' : '#6D16DF', marginBottom: '0.25rem' }}><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
        <p style={{ fontSize: '0.875rem', color: isDarkMode ? '#A678F2' : '#6D16DF', marginBottom: '0.25rem' }}><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p style={{ fontSize: '0.875rem', color: isDarkMode ? '#A678F2' : '#6D16DF' }}><strong>Region:</strong> {country.region}</p>
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(country.name.common);
        }}
        style={{ marginTop: '1rem', color: isFavorite ? (isDarkMode ? '#A678F2' : '#6D16DF') : (isDarkMode ? '#7B46D3' : '#A678F2'), transition: 'all 0.3s ease', transform: 'scale(1)', zIndex: 1 }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        <svg style={{ width: '1.5rem', height: '1.5rem', fill: isFavorite ? 'currentColor' : 'none', stroke: isFavorite ? 'none' : 'currentColor', strokeWidth: '2' }} viewBox="0 0 24 24">
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
        `}
      </style>
    </div>
  );
}