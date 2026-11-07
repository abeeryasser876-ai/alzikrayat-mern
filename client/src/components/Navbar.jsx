import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clears user from state and localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#333', color: 'white' }}>
      <div>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>
          Alzikrayat
        </Link>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link to="/gallery" style={{ color: 'white', textDecoration: 'none' }}>Gallery</Link>
        
        {user ? (
          <>
            <span>Hi, {user.firstName}</span>
            <button 
              onClick={handleLogout} 
              style={{ cursor: 'pointer', padding: '5px 10px', borderRadius: '4px', border: 'none', background: '#f44336', color: 'white' }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
            Please Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;