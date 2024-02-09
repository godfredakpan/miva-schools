const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  backgroundImage: { type: String },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;