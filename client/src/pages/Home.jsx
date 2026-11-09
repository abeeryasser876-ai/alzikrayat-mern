import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px', padding: '20px' }}>
      <h1 style={{ fontSize: '3rem', color: '#333' }}>Welcome to Alzikrayat</h1>
      <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '40px' }}>
        A place to share your memories, photos, and stories with the world.
      </p>
      <Link to="/gallery">
        <button style={{ 
          padding: '15px 30px', 
          fontSize: '1.2rem', 
          backgroundColor: '#007BFF', 
          color: 'white', 
          border: 'none', 
          borderRadius: '8px', 
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          Explore Gallery
        </button>
      </Link>
    </div>
  );
};

export default Home;