
const express = require('express');
const videoController = require('../controllers/videoController');

const router = express.Router();

router.get('/videos/:courseId', videoController.getVideosByCourseId);

router.get('/videos/details/:videoId', videoController.getVideoById);

module.exports = router;
