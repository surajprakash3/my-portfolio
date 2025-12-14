const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Get or create default portfolio user
router.get('/user', async (req, res) => {
  try {
    // Try to find the demo portfolio user (same one used for admin login)
    let user = await User.findOne({ email: 'demo@portfolio.local' });
    
    if (!user) {
      // Create demo user if it doesn't exist
      user = new User({
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@portfolio.local',
        password: 'demo123', // Will be hashed automatically
        title: 'Full Stack Developer',
        bio: 'This is a demo portfolio account for testing.',
      });
      await user.save();
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error getting portfolio user', error: error.message });
  }
});

// Create default portfolio user
router.post('/user', async (req, res) => {
  try {
    const { firstName = 'Portfolio', lastName = 'Owner', email = 'portfolio@admin.local' } = req.body;
    
    // Check if user already exists
    let user = await User.findOne({ email });
    
    if (!user) {
      user = new User({
        firstName,
        lastName,
        email,
        password: 'portfolio-admin', // Will be hashed automatically
      });
      await user.save();
    }
    
    res.status(201).json({
      message: 'Portfolio user ready',
      user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating portfolio user', error: error.message });
  }
});

module.exports = router;
