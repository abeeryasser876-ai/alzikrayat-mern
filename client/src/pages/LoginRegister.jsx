import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', password: '', location: '', description: '', occupation: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const url = isLogin 
        ? 'http://localhost:5000/api/auth/login' 
        : 'http://localhost:5000/api/auth/register';
      
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await axios.post(url, payload);
      
      setSuccess(response.data.message);
      
      if (isLogin) {
        // Save user data to context
        login(response.data); 
        // Redirect to gallery page
        navigate('/gallery'); 
      } else {
        // Switch to login tab after successful registration
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>{isLogin ? 'Login' : 'Register'}</h2>
      
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {!isLogin && (
          <>
            <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required style={{ padding: '8px' }} />
            <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required style={{ padding: '8px' }} />
            <input type="text" name="location" placeholder="Location (Optional)" onChange={handleChange} style={{ padding: '8px' }} />
            <input type="text" name="occupation" placeholder="Occupation (Optional)" onChange={handleChange} style={{ padding: '8px' }} />
            <textarea name="description" placeholder="Bio (Optional)" onChange={handleChange} style={{ padding: '8px' }}></textarea>
          </>
        )}
        
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required style={{ padding: '8px' }} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={{ padding: '8px' }} />
        
        <button type="submit" style={{ padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '15px', cursor: 'pointer', color: '#007BFF' }} onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
      </p>
    </div>
  );
};

export default LoginRegister;