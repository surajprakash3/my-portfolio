const express = require('express');
const checkAuth = require('../middleware/checkAuth');
const Skill = require('../models/Skill');

const router = express.Router();

// Get all skills for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const skills = await Skill.find({ userId: req.params.userId });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching skills', error: error.message });
  }
});

// Create skill
router.post('/', checkAuth, async (req, res) => {
  try {
    const userId = req.body.userId || req.userId;
    const skill = new Skill({
      userId,
      ...req.body,
    });
    await skill.save();
    res.status(201).json({
      message: 'Skill created successfully',
      skill,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating skill', error: error.message });
  }
});

// Update skill
router.put('/:id', checkAuth, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    if (!req.isAdmin && skill.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({
      message: 'Skill updated successfully',
      skill: updatedSkill,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating skill', error: error.message });
  }
});

// Delete skill
router.delete('/:id', checkAuth, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    if (!req.isAdmin && skill.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting skill', error: error.message });
  }
});

module.exports = router;
