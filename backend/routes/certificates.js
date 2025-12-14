const express = require('express');
const checkAuth = require('../middleware/checkAuth');
const Certificate = require('../models/Certificate');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = path.join(process.cwd(), 'uploads', 'certificates');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, Date.now() + '_' + safeName);
  }
});
const upload = multer({ storage });

const router = express.Router();

// Get all certificates for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const certificates = await Certificate.find({ userId: req.params.userId }).sort({ issueDate: -1 });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching certificates', error: error.message });
  }
});

// Create certificate
router.post('/', checkAuth, upload.single('file'), async (req, res) => {
  try {
    const userId = req.body.userId || req.userId;
    const fileUrl = req.file ? `/uploads/certificates/${req.file.filename}` : undefined;
    const cert = new Certificate({ userId, ...req.body, fileUrl });
    await cert.save();
    res.status(201).json({ message: 'Certificate created successfully', certificate: cert });
  } catch (error) {
    res.status(500).json({ message: 'Error creating certificate', error: error.message });
  }
});

// Update certificate
router.put('/:id', checkAuth, upload.single('file'), async (req, res) => {
  try {
    const cert = await Certificate.findById(req.params.id);
    if (!cert) return res.status(404).json({ message: 'Certificate not found' });

    if (!req.isAdmin && cert.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const updateData = { ...req.body };
    if (req.file) {
      updateData.fileUrl = `/uploads/certificates/${req.file.filename}`;
    }
    const updated = await Certificate.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ message: 'Certificate updated successfully', certificate: updated });
  } catch (error) {
    res.status(500).json({ message: 'Error updating certificate', error: error.message });
  }
});

// Delete certificate
router.delete('/:id', checkAuth, async (req, res) => {
  try {
    const cert = await Certificate.findById(req.params.id);
    if (!cert) return res.status(404).json({ message: 'Certificate not found' });

    if (!req.isAdmin && cert.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting certificate', error: error.message });
  }
});

module.exports = router;
