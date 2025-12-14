const express = require('express');
const router = express.Router();
const CareerBreak = require('../models/CareerBreak');
const checkAuth = require('../middleware/checkAuth');

// Get all career breaks for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const breaks = await CareerBreak.find({ userId: req.params.userId }).sort({ startDate: -1 });
    res.json(breaks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new career break
router.post('/', checkAuth, async (req, res) => {
  try {
    const { userId, title, reason, startDate, endDate, description } = req.body;
    const careerBreak = new CareerBreak({
      userId,
      title,
      reason,
      startDate,
      endDate,
      description,
    });
    await careerBreak.save();
    res.status(201).json(careerBreak);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update career break
router.put('/:id', checkAuth, async (req, res) => {
  try {
    const { title, reason, startDate, endDate, description } = req.body;
    const careerBreak = await CareerBreak.findByIdAndUpdate(
      req.params.id,
      { title, reason, startDate, endDate, description },
      { new: true }
    );
    res.json(careerBreak);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete career break
router.delete('/:id', checkAuth, async (req, res) => {
  try {
    await CareerBreak.findByIdAndDelete(req.params.id);
    res.json({ message: 'Career break deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
