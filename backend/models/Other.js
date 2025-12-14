const mongoose = require('mongoose');

const otherSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { 
    type: String, 
    enum: ['volunteer','publication','patent','honor','test_score','language','organization'], 
    required: true 
  },
  title: { type: String, required: true },
  subtitle: { type: String }, // e.g., organization, publisher, proficiency
  date: { type: Date },
  endDate: { type: Date },
  url: { type: String },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Other', otherSchema);
