const express = require('express');
const router = express.Router();
const { uploadPhoto, getAllPhotos, getPhotoById, deletePhoto } = require('../controllers/photoController');
const multer = require('multer');
const path = require('path');

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    // Create a unique filename: date + original name
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// @route   POST /api/photos
// @desc    Upload a photo (upload.single('image') handles the file upload)
router.post('/', upload.single('image'), uploadPhoto);

// @route   GET /api/photos
// @desc    Get all photos
router.get('/', getAllPhotos);

// @route   GET /api/photos/:id
// @desc    Get a single photo
router.get('/:id', getPhotoById);

// @route   DELETE /api/photos/:id
// @desc    Delete a photo
router.delete('/:id', deletePhoto);

module.exports = router;