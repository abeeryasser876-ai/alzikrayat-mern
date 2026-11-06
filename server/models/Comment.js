const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  photoid: { type: mongoose.Schema.Types.ObjectId, ref: 'Photo', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comment: { type: String, required: true },
  dateTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);