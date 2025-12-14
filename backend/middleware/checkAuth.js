const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  const adminToken = req.header('X-Admin-Token');

  // Check for admin token first
  if (adminToken) {
    // Admin can access with any admin token
    if (adminToken.startsWith('admin-authenticated-') || adminToken === 'admin') {
      req.isAdmin = true;
      // Extract userId from request body or params for admin requests
      req.userId = req.body.userId || req.params.userId || 'admin';
      return next();
    }
  }

  // Check for JWT token
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      req.userId = decoded.userId;
      req.isAdmin = false;
      return next();
    } catch (err) {
      console.log('Token verification failed:', err.message);
      return res.status(401).json({ message: 'Invalid token' });
    }
  }

  return res.status(401).json({ message: 'No authentication provided' });
};

module.exports = checkAuth;
