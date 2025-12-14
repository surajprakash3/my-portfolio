const express = require('express');
const checkAuth = require('../middleware/checkAuth');
const SocialMedia = require('../models/SocialMedia');

const router = express.Router();

// Get all social media links for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const socialMediaLinks = await SocialMedia.find({ userId: req.params.userId })
      .sort({ category: 1, order: 1 });
    res.json(socialMediaLinks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching social media links', error: error.message });
  }
});

// Create social media link
router.post('/', checkAuth, async (req, res) => {
  try {
    const userId = req.body.userId || req.userId;
    const socialMedia = new SocialMedia({
      userId,
      ...req.body,
    });
    await socialMedia.save();
    res.status(201).json({
      message: 'Social media link created successfully',
      socialMedia,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating social media link', error: error.message });
  }
});

// Update social media link
router.put('/:id', checkAuth, async (req, res) => {
  try {
    const socialMedia = await SocialMedia.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!socialMedia) {
      return res.status(404).json({ message: 'Social media link not found' });
    }
    res.json({
      message: 'Social media link updated successfully',
      socialMedia,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating social media link', error: error.message });
  }
});

// Delete social media link
router.delete('/:id', checkAuth, async (req, res) => {
  try {
    const socialMedia = await SocialMedia.findByIdAndDelete(req.params.id);
    if (!socialMedia) {
      return res.status(404).json({ message: 'Social media link not found' });
    }
    res.json({ message: 'Social media link deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting social media link', error: error.message });
  }
});

module.exports = router;
