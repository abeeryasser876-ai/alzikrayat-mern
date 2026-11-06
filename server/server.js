const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // لقراءة البيانات بصيغة JSON
app.use('/uploads', express.static('uploads')); // لجعل الصور متاحة للعرض

// الاتصال بقاعدة البيانات
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// مسار تجريبي للتأكد أن السيرفر يعمل
app.get('/', (req, res) => {
  res.send('Alzikrayat API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
