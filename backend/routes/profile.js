const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Get profile
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

// Update profile - Allow updates from the user or admin
router.put('/:userId', async (req, res) => {
  try {
    const updates = { ...req.body };

    if (updates.email) {
      updates.email = updates.email.trim().toLowerCase();
      const existing = await User.findOne({ email: updates.email, _id: { $ne: req.params.userId } });
      if (existing) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }
    const user = await User.findByIdAndUpdate(req.params.userId, updates, {
      new: true,
      runValidators: true,
      context: 'query',
    }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});

module.exports = router;
