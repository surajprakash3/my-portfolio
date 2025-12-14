const express = require('express');
const checkAuth = require('../middleware/checkAuth');
const Recommendation = require('../models/Recommendation');

const router = express.Router();

// Get all recommendations for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const recommendations = await Recommendation.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recommendations', error: error.message });
  }
});

// Create recommendation
router.post('/', checkAuth, async (req, res) => {
  try {
    const userId = req.body.userId || req.userId;
    const recommendation = new Recommendation({ userId, ...req.body });
    await recommendation.save();
    res.status(201).json({ message: 'Recommendation created successfully', recommendation });
  } catch (error) {
    res.status(500).json({ message: 'Error creating recommendation', error: error.message });
  }
});

// Update recommendation
router.put('/:id', checkAuth, async (req, res) => {
  try {
    const recommendation = await Recommendation.findById(req.params.id);
    if (!recommendation) return res.status(404).json({ message: 'Recommendation not found' });

    if (!req.isAdmin && recommendation.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const updated = await Recommendation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Recommendation updated successfully', recommendation: updated });
  } catch (error) {
    res.status(500).json({ message: 'Error updating recommendation', error: error.message });
  }
});

// Delete recommendation
router.delete('/:id', checkAuth, async (req, res) => {
  try {
    const recommendation = await Recommendation.findById(req.params.id);
    if (!recommendation) return res.status(404).json({ message: 'Recommendation not found' });

    if (!req.isAdmin && recommendation.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Recommendation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Recommendation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting recommendation', error: error.message });
  }
});

module.exports = router;
