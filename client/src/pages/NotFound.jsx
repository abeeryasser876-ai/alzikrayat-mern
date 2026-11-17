import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px', padding: '20px' }}>
      <h1 style={{ fontSize: '5rem', color: '#dc3545' }}>404</h1>
      <h2>Page Not Found</h2>
      <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '30px' }}>
        Oops! The page you are looking for does not exist.
      </p>
      <Link to="/">
        <button style={{ 
          padding: '10px 20px', 
          fontSize: '1.2rem', 
          backgroundColor: '#007BFF', 
          color: 'white', 
          border: 'none', 
          borderRadius: '8px', 
          cursor: 'pointer' 
        }}>
          Go Back Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;