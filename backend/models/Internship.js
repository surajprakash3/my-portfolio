const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  description: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  isCurrent: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Internship', internshipSchema);
