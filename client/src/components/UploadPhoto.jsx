import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const UploadPhoto = ({ onUploadSuccess }) => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return setError('Please select an image');
    
    setUploading(true);
    setError('');

    // Use FormData to send text fields and file together
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('userId', user.userId); // From Context

    try {
      await axios.post('http://localhost:5000/api/photos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUploading(false);
      setTitle('');
      setDescription('');
      setImage(null);
      onUploadSuccess(); // Tell parent to refresh photos
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
      setUploading(false);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
      <h3>Upload New Photo</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" placeholder="Photo Title" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ padding: '8px' }} />
        <textarea placeholder="Description (Optional)" value={description} onChange={(e) => setDescription(e.target.value)} style={{ padding: '8px' }} />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" required />
        
        <button type="submit" disabled={uploading} style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {uploading ? 'Uploading...' : 'Upload Photo'}
        </button>
      </form>
    </div>
  );
};

export default UploadPhoto;