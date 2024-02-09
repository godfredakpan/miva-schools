
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  userId: { type: String },
  courseId: { type: String },
  videoId: {type: String },
  content: { type: String, required: true },
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
