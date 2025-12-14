const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  serviceType: { type: String }, // e.g., consulting, freelance, etc.
  url: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Service', ServiceSchema);
