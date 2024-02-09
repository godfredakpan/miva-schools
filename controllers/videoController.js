
const Video = require('../models/Video');

exports.getVideosByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;
    const videos = await Video.find({ courseId });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getVideoById = async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await Video.find({ _id: videoId });
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

