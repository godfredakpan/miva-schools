
const Note = require('../models/Note');

exports.getNotesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const notes = await Note.find({ userId });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getNotesByVideoId = async (req, res) => {
  try {
    const { videoId, userId } = req.params;
    const notes = await Note.find({ videoId, userId });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getNotesByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;
    const notes = await Note.find({ courseId });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createNote = async (req, res) => {
  try {
    const { userId, videoId, courseId, content } = req.body;
    const newNote = await Note.create({ userId, videoId, courseId, content });
    res.json(newNote);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
