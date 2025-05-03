import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login({ isDarkMode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify({
        email: user.email,
        fullName: `${user.firstName} ${user.lastName}`,
        phone: user.phone,
        profilePic: user.profilePic,
        registrationDate: user.registrationDate
      }));
      navigate('/');
    } else {
      setError('Invalid email or password!');
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${isDarkMode ? '#1F1B2E' : '#F9F5FF'}, ${isDarkMode ? '#2A2640' : '#E6E0FA'})`, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              background: `radial-gradient(circle, ${isDarkMode ? '#6A4ABF' : '#9577E6'} 20%, transparent 70%)`,
              borderRadius: '50%',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 5}s infinite ease-in-out ${Math.random() * 5}s, fade ${Math.random() * 5 + 3}s infinite ease-in-out ${Math.random() * 5}s`
            }}
          ></span>
        ))}
      </div>
      <div style={{ background: isDarkMode ? '#2A2640' : '#FFFFFF', padding: '2.5rem', borderRadius: '1rem', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', maxWidth: '32rem', width: '100%', zIndex: 1, animation: 'fadeInUp 0.5s ease' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', color: isDarkMode ? '#FFFFFF' : '#6D16DF', marginBottom: '1.5rem', textAlign: 'center', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>Welcome Back</h2>
        {error && <p style={{ color: '#ef4444', textAlign: 'center', marginBottom: '1rem', animation: 'pulse 1s ease' }}>{error}</p>}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ border: `1px solid ${isDarkMode ? '#4B0E9A' : '#6D16DF'}`, background: isDarkMode ? '#3B3555' : '#FFFFFF', color: isDarkMode ? '#FFFFFF' : '#2D1B4E', padding: '0.75rem 2.5rem 0.75rem 0.75rem', borderRadius: '0.5rem', width: '100%', outline: 'none', transition: 'all 0.3s ease', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
              required
              onFocus={(e) => e.target.style.boxShadow = `0 0 0 3px ${isDarkMode ? '#4B0E9A66' : '#6D16DF66'}`}
              onBlur={(e) => e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'}
            />
            <span style={{ position: 'absolute', right: '0.75rem', top: '0.75rem', color: isDarkMode ? '#FFFFFF' : '#6D16DF' }}>📧</span>
          </div>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ border: `1px solid ${isDarkMode ? '#4B0E9A' : '#6D16DF'}`, background: isDarkMode ? '#3B3555' : '#FFFFFF', color: isDarkMode ? '#FFFFFF' : '#2D1B4E', padding: '0.75rem 2.5rem 0.75rem 0.75rem', borderRadius: '0.5rem', width: '100%', outline: 'none', transition: 'all 0.3s ease', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
              required
              onFocus={(e) => e.target.style.boxShadow = `0 0 0 3px ${isDarkMode ? '#4B0E9A66' : '#6D16DF66'}`}
              onBlur={(e) => e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: '0.75rem', top: '0.75rem', background: 'none', border: 'none', color: isDarkMode ? '#FFFFFF' : '#6D16DF', cursor: 'pointer', transition: 'transform 0.3s ease', transform: 'scale(1)' }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          <button
            type="submit"
            style={{ background: isDarkMode ? '#4B0E9A' : '#6D16DF', color: '#FFFFFF', padding: '0.75rem', borderRadius: '0.5rem', fontWeight: '600', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', transform: 'scale(1)', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            Login
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: isDarkMode ? '#FFFFFF' : '#2D1B4E' }}>
          Don't have an account?{' '}
          <Link
            to="/register"
            style={{ color: isDarkMode ? '#FFFFFF' : '#6D16DF', textDecoration: 'none', fontWeight: '600', transition: 'color 0.3s ease' }}
            onMouseEnter={(e) => e.target.style.color = isDarkMode ? '#9577E6' : '#4B0E9A'}
            onMouseLeave={(e) => e.target.style.color = isDarkMode ? '#FFFFFF' : '#6D16DF'}
          >
            Register
          </Link>
        </p>
      </div>
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          @keyframes fade {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.8; }
          }
        `}
      </style>
    </div>
  );
}