import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UploadPhoto from '../components/UploadPhoto'; 

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/photos');
      setPhotos(res.data);
    } catch (err) {
      console.error("Error fetching photos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  if (loading) return <h2 style={{ textAlign: 'center' }}>Loading Gallery...</h2>;

  return (
    <div style={{ padding: '20px' }}>
      <UploadPhoto onUploadSuccess={fetchPhotos} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px' }}>
        <h2>Photo Gallery</h2>
        <button onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')} style={{ padding: '8px', cursor: 'pointer' }}>
          Switch to {viewMode === 'grid' ? 'List' : 'Grid'} View
        </button>
      </div>

      {photos.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '50px' }}>No photos uploaded yet.</p>
      ) : (
        <div style={{ 
          display: viewMode === 'grid' ? 'grid' : 'flex', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          flexDirection: viewMode === 'list' ? 'column' : 'row',
          gap: '20px', 
          marginTop: '20px' 
        }}>
          {photos.map((photo) => (
            <div key={photo._id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
              <img 
                src={`http://localhost:5000/uploads/${photo.fileName}`} 
                alt={photo.title} 
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }} 
              />
              <h3>{photo.title}</h3>
              <p>By: {photo.userId?.firstName} {photo.userId?.lastName}</p>
              <Link to={`/photos/${photo._id}`} style={{ color: '#007BFF' }}>View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;