const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Get or create default portfolio user
router.get('/user', async (req, res) => {
  try {
    // Try to find the default portfolio user
    let user = await User.findOne({ email: 'portfolio@admin.local' });
    
    if (!user) {
      // Create default user if it doesn't exist
      user = new User({
        firstName: 'Portfolio',
        lastName: 'Owner',
        email: 'portfolio@admin.local',
        password: 'portfolio-admin', // Will be hashed automatically
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
