const express = require('express');
const checkAuth = require('../middleware/checkAuth');
const Internship = require('../models/Internship');

const router = express.Router();

// Get all internships for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const internships = await Internship.find({ userId: req.params.userId }).sort({ startDate: -1 });
    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching internships', error: error.message });
  }
});

// Create internship
router.post('/', checkAuth, async (req, res) => {
  try {
    const userId = req.body.userId || req.userId;
    const internship = new Internship({ userId, ...req.body });
    await internship.save();
    res.status(201).json({ message: 'Internship created successfully', internship });
  } catch (error) {
    res.status(500).json({ message: 'Error creating internship', error: error.message });
  }
});

// Update internship
router.put('/:id', checkAuth, async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) return res.status(404).json({ message: 'Internship not found' });

    if (!req.isAdmin && internship.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const updated = await Internship.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Internship updated successfully', internship: updated });
  } catch (error) {
    res.status(500).json({ message: 'Error updating internship', error: error.message });
  }
});

// Delete internship
router.delete('/:id', checkAuth, async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) return res.status(404).json({ message: 'Internship not found' });

    if (!req.isAdmin && internship.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Internship.findByIdAndDelete(req.params.id);
    res.json({ message: 'Internship deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting internship', error: error.message });
  }
});

module.exports = router;
