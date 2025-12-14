const mongoose = require('mongoose');

const socialMediaSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    enum: ['professional', 'nonProfessional', 'website', 'other'],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  iconName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  brandColor: {
    type: String,
    default: '#ffffff',
  },
  backgroundColor: {
    type: String,
    default: '#f3f4f6',
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('SocialMedia', socialMediaSchema);
