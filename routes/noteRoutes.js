
const express = require('express');
const noteController = require('../controllers/noteController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/notes/:userId', authMiddleware, noteController.getNotesByUserId);
router.get('/notes/video/:videoId/:userId', authMiddleware, noteController.getNotesByVideoId);
router.get('/notes/course/:courseId', authMiddleware, noteController.getNotesByCourseId);
router.post('/notes/addNote', authMiddleware, noteController.createNote);

module.exports = router;
