const Photo = require('../models/Photo');
const fs = require('fs');
const path = require('path');

// @desc    Upload a new photo
const uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const newPhoto = new Photo({
      userId: req.body.userId,
      fileName: req.file.filename,
      title: req.body.title,
      description: req.body.description
    });

    const savedPhoto = await newPhoto.save();
    res.status(201).json(savedPhoto);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Get all photos
const getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.find().populate('userId', 'firstName lastName');
    res.status(200).json(photos.reverse());
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Get single photo
const getPhotoById = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id).populate('userId', 'firstName lastName');
    if (!photo) return res.status(404).json({ message: 'Photo not found' });
    res.status(200).json(photo);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Delete a photo
const deletePhoto = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) return res.status(404).json({ message: 'Photo not found' });

    if (photo.userId.toString() !== req.body.userId) {
      return res.status(403).json({ message: 'You can only delete your own photos' });
    }

    const filePath = path.join(__dirname, '../uploads', photo.fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await photo.deleteOne();
    res.status(200).json({ message: 'Photo deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { uploadPhoto, getAllPhotos, getPhotoById, deletePhoto };