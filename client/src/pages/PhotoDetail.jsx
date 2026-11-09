import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CommentForm from '../components/CommentForm';
import { AuthContext } from '../context/AuthContext';

const PhotoDetail = () => {
  const { id } = useParams(); 
  const { user } = useContext(AuthContext);  
  const navigate = useNavigate();  
  
  const [photo, setPhoto] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const photoRes = await axios.get(`http://localhost:5000/api/photos/${id}`);
        setPhoto(photoRes.data);
        
        const commentsRes = await axios.get(`http://localhost:5000/api/photos/${id}/comments`);
        setComments(commentsRes.data);
      } catch (err) {
        console.error("Error fetching details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this photo?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/photos/${id}`, {
        data: { userId: user.userId } 
      });
      navigate('/gallery')
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete photo');
    }
  };

  if (loading) return <h2 style={{ textAlign: 'center' }}>Loading...</h2>;
  if (!photo) return <h2 style={{ textAlign: 'center' }}>Photo not found</h2>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/gallery" style={{ color: '#007BFF' }}>&larr; Back to Gallery</Link>
      
      <div style={{ marginTop: '20px', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
        <img 
          src={`http://localhost:5000/uploads/${photo.fileName}`} 
          alt={photo.title} 
          style={{ width: '100%', maxHeight: '500px', objectFit: 'contain', backgroundColor: '#000' }} 
        />
        
        <div style={{ padding: '20px' }}>
          <h2>{photo.title}</h2>
          <p>{photo.description}</p>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>
            Uploaded by: {photo.userId?.firstName} {photo.userId?.lastName} on {new Date(photo.dateTime).toLocaleDateString()}
          </p>
          
          {/* زر الحذف - يظهر فقط إذا كان المستخدم هو صاحب الصورة */}
          {user && photo.userId?._id === user.userId && (
            <button 
              onClick={handleDelete} 
              style={{ padding: '8px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}
            >
              Delete Photo
            </button>
          )}
        </div>
      </div>

      {/* Comments Section */}
      <div style={{ marginTop: '30px' }}>
        <h3>Comments ({comments.length})</h3>
        
        {comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {comments.map((c) => (
              <div key={c._id} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                <strong>{c.userId?.firstName} {c.userId?.lastName}</strong>
                <span style={{ color: '#888', fontSize: '0.8rem', marginLeft: '10px' }}>
                  {new Date(c.dateTime).toLocaleString()}
                </span>
                <p style={{ margin: '5px 0' }}>{c.comment}</p>
              </div>
            ))}
          </div>
        )}

        <CommentForm 
          photoId={id} 
          onCommentAdded={(newComment) => setComments([...comments, newComment])} 
        />
      </div>
    </div>
  );
};

export default PhotoDetail;