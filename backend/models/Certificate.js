const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  issueDate: { type: Date },
  expiryDate: { type: Date },
  credentialId: { type: String },
  credentialUrl: { type: String },
  fileUrl: { type: String },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Certificate', certificateSchema);
