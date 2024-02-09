
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  courseId: { type: String },
  title: { type: String, required: true },
  url: { type: String },
  description: { type: String },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
