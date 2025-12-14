const mongoose = require('mongoose');

const CareerBreakSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true }, // e.g., Sabbatical, Parental Leave, etc.
  reason: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CareerBreak', CareerBreakSchema);
