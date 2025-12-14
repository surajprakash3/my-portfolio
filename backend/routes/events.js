const express = require('express');
const checkAuth = require('../middleware/checkAuth');
const Event = require('../models/Event');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Configure multer for event image uploads
const uploadsDir = path.join(process.cwd(), 'uploads', 'events');
fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowed.includes(file.mimetype)) return cb(null, true);
    cb(new Error('Only image files are allowed'));
  },
});

// GET all events for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const events = await Event.find({ userId: req.params.userId }).sort({ eventDate: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Helper to parse JSON fields from multipart/form-data
const parseJsonField = (body, field) => {
  if (body[field] === undefined) return undefined;
  try {
    return typeof body[field] === 'string' ? JSON.parse(body[field]) : body[field];
  } catch {
    return body[field];
  }
};

// POST create a new event
router.post('/', checkAuth, upload.single('eventImage'), async (req, res) => {
  try {
    const data = {
      userId: req.body.userId,
      eventName: req.body.eventName,
      eventType: req.body.eventType,
      shortDescription: req.body.shortDescription,
      domain: req.body.domain,
      eventDate: req.body.eventDate,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      duration: req.body.duration,
      timeZone: req.body.timeZone,
      mode: req.body.mode,
      venue: req.body.venue,
      platform: req.body.platform,
      eligibility: req.body.eligibility,
      prerequisites: req.body.prerequisites,
      registrationFee: req.body.registrationFee,
      lastRegistrationDate: req.body.lastRegistrationDate,
      registerUrl: req.body.registerUrl,
      contactEmail: req.body.contactEmail,
      contactPhone: req.body.contactPhone,
      speakers: parseJsonField(req.body, 'speakers') || [],
      agenda: parseJsonField(req.body, 'agenda') || [],
      benefits: parseJsonField(req.body, 'benefits') || [],
      faqs: parseJsonField(req.body, 'faqs') || [],
      learningOutcomes: parseJsonField(req.body, 'learningOutcomes') || [],
    };

    if (req.file) {
      data.eventImage = req.file.filename;
      data.eventImageUrl = `/uploads/events/${req.file.filename}`;
    }

    const event = new Event(data);
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update an event
router.put('/:id', checkAuth, upload.single('eventImage'), async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const updatable = ['eventName','eventType','shortDescription','domain','eventDate','startTime','endTime','duration','timeZone','mode','venue','platform','eligibility','prerequisites','registrationFee','lastRegistrationDate','registerUrl','contactEmail','contactPhone'];
    updatable.forEach((f) => {
      if (req.body[f] !== undefined) event[f] = req.body[f];
    });

    const jsonFields = ['speakers','agenda','benefits','faqs','learningOutcomes'];
    jsonFields.forEach((f) => {
      const parsed = parseJsonField(req.body, f);
      if (parsed !== undefined) event[f] = parsed;
    });

    if (req.file) {
      if (event.eventImage) {
        const oldPath = path.join(uploadsDir, event.eventImage);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      event.eventImage = req.file.filename;
      event.eventImageUrl = `/uploads/events/${req.file.filename}`;
    }

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE an event
router.delete('/:id', checkAuth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (event.eventImage) {
      const imgPath = path.join(uploadsDir, event.eventImage);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
