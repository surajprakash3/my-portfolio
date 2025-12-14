const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recommenderName: { type: String, required: true },
  recommenderTitle: { type: String }, // e.g., Manager, Colleague
  recommenderCompany: { type: String },
  relationship: { type: String }, // e.g., Manager, Colleague, Report, Mentor
  recommendation: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 }, // Optional rating
  date: { type: Date, default: Date.now },
  linkedinUrl: { type: String }, // Link to recommender's profile
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Recommendation', recommendationSchema);
