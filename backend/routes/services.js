const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const checkAuth = require('../middleware/checkAuth');

// Get all services for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const services = await Service.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new service
router.post('/', checkAuth, async (req, res) => {
  try {
    const { userId, title, description, serviceType, url } = req.body;
    const service = new Service({
      userId,
      title,
      description,
      serviceType,
      url,
    });
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update service
router.put('/:id', checkAuth, async (req, res) => {
  try {
    const { title, description, serviceType, url } = req.body;
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { title, description, serviceType, url },
      { new: true }
    );
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete service
router.delete('/:id', checkAuth, async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
