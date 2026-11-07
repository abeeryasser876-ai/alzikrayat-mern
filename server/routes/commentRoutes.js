const express = require('express');
const router = express.Router();
const { addComment, getComments } = require('../controllers/commentController');

// Routes for /api/photos/:id/comments
router.post('/:id/comments', addComment);
router.get('/:id/comments', getComments);

module.exports = router;