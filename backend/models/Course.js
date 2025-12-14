const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  provider: { type: String, required: true }, // e.g., Coursera, Udemy, LinkedIn Learning
  startDate: { type: Date },
  completionDate: { type: Date },
  certificateUrl: { type: String },
  credentialId: { type: String },
  credentialUrl: { type: String },
  duration: { type: String }, // e.g., "4 weeks"
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Course', courseSchema);
