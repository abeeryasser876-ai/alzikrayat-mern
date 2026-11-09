import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginRegister from './pages/LoginRegister';
import Gallery from './pages/Gallery';
import PhotoDetail from './pages/PhotoDetail';
import Home from './pages/Home';
function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/photos/:id" element={<PhotoDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;