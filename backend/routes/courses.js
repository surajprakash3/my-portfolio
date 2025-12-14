const express = require('express');
const checkAuth = require('../middleware/checkAuth');
const Course = require('../models/Course');

const router = express.Router();

// Get all courses for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const courses = await Course.find({ userId: req.params.userId }).sort({ completionDate: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses', error: error.message });
  }
});

// Create course
router.post('/', checkAuth, async (req, res) => {
  try {
    const userId = req.body.userId || req.userId;
    const course = new Course({ userId, ...req.body });
    await course.save();
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    res.status(500).json({ message: 'Error creating course', error: error.message });
  }
});

// Update course
router.put('/:id', checkAuth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (!req.isAdmin && course.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Course updated successfully', course: updated });
  } catch (error) {
    res.status(500).json({ message: 'Error updating course', error: error.message });
  }
});

// Delete course
router.delete('/:id', checkAuth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (!req.isAdmin && course.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course', error: error.message });
  }
});

module.exports = router;
