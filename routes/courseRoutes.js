
const express = require('express');
const courseController = require('../controllers/courseController');

const router = express.Router();

router.get('/courses', courseController.getCourses);

router.get('/courses/details/:courseId', courseController.getCourseById);

module.exports = router;
