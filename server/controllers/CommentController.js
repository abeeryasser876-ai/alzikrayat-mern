const Comment = require('../models/Comment');

// @desc    Add a comment to a photo
// @route   POST /api/photos/:id/comments
const addComment = async (req, res) => {
  try {
    const newComment = new Comment({
      photoid: req.params.id,
      userId: req.body.userId,
      comment: req.body.comment
    });

    const savedComment = await newComment.save();
    
    // Populate user info before sending back to frontend
    const populatedComment = await Comment.findById(savedComment._id).populate('userId', 'firstName lastName');
    
    res.status(201).json(populatedComment);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Get all comments for a photo
// @route   GET /api/photos/:id/comments
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ photoid: req.params.id }).populate('userId', 'firstName lastName');
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { addComment, getComments };