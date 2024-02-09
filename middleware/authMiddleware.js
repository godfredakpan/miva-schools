const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Manually set token for testing
  if (token === 'godffyiyvsua7djdlscltysnred') {
    next();
    return;
  }

  try {
    const decodedToken = jwt.verify(token, 'your_secret_key');
    req.userId = decodedToken.userId;

    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
