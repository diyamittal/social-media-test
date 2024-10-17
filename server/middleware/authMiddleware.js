const jwt = require('jsonwebtoken');
const config = require('../config');

// Verify Token Middleware
exports.verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).json({ message: 'Failed to authenticate token' });

    req.adminId = decoded.id;
    next();
  });
};
