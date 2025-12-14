const express = require('express');
const checkAuth = require('../middleware/checkAuth');
const Other = require('../models/Other');

const router = express.Router();

// Get all other items for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const items = await Other.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching additional items', error: error.message });
  }
});

// Create other item
router.post('/', checkAuth, async (req, res) => {
  try {
    const userId = req.body.userId || req.userId;
    const item = new Other({ userId, ...req.body });
    await item.save();
    res.status(201).json({ message: 'Item created successfully', item });
  } catch (error) {
    res.status(500).json({ message: 'Error creating item', error: error.message });
  }
});

// Update other item
router.put('/:id', checkAuth, async (req, res) => {
  try {
    const item = await Other.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    if (!req.isAdmin && item.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const updated = await Other.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Item updated successfully', item: updated });
  } catch (error) {
    res.status(500).json({ message: 'Error updating item', error: error.message });
  }
});

// Delete other item
router.delete('/:id', checkAuth, async (req, res) => {
  try {
    const item = await Other.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    if (!req.isAdmin && item.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Other.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error: error.message });
  }
});

module.exports = router;
