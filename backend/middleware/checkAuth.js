const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  const adminToken = req.header('X-Admin-Token');

  // Check for admin token first
  if (adminToken && adminToken.startsWith('admin-authenticated-')) {
    req.isAdmin = true;
    // Extract userId from request body or params for admin requests
    req.userId = req.body.userId || req.params.userId;
    return next();
  }

  // Check for JWT token
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      req.userId = decoded.userId;
      req.isAdmin = false;
      return next();
    } catch {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }

  return res.status(401).json({ message: 'No authentication provided' });
};

module.exports = checkAuth;
