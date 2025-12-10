const express = require('express');
const checkAuth = require('../middleware/checkAuth');
const Experience = require('../models/Experience');

const router = express.Router();

// Get all experiences for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const experiences = await Experience.find({ userId: req.params.userId }).sort({
      startDate: -1,
    });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching experiences', error: error.message });
  }
});

// Create experience
router.post('/', checkAuth, async (req, res) => {
  try {
    const userId = req.body.userId || req.userId;
    const experience = new Experience({
      userId,
      ...req.body,
    });
    await experience.save();
    res.status(201).json({
      message: 'Experience created successfully',
      experience,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating experience', error: error.message });
  }
});

// Update experience
router.put('/:id', checkAuth, async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    if (!req.isAdmin && experience.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const updatedExperience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({
      message: 'Experience updated successfully',
      experience: updatedExperience,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating experience', error: error.message });
  }
});

// Delete experience
router.delete('/:id', checkAuth, async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    if (!req.isAdmin && experience.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting experience', error: error.message });
  }
});

module.exports = router;
