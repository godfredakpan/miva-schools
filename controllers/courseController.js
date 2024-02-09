
const Course = require('../models/Course');

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.find({ _id: courseId });

    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};