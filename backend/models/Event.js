const mongoose = require('mongoose');

const speakerSchema = new mongoose.Schema({
  name: String,
  designation: String,
  organization: String,
  linkedinUrl: String,
  githubUrl: String,
  photoUrl: String,
});

const agendaItemSchema = new mongoose.Schema({
  session: String,
  startTime: String,
  endTime: String,
  topic: String,
  speaker: String,
});

const benefitSchema = new mongoose.Schema({
  benefit: String,
});

const faqSchema = new mongoose.Schema({
  question: String,
  answer: String,
});

const eventSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    enum: [
      'Hackathon',
      'Coding Competition',
      'Web Development Challenge',
      'App Development Contest',
      'AI / ML Workshop',
      'Cloud Computing Workshop',
      'Cybersecurity Bootcamp',
      'DevOps Hands-on Lab',
      'Blockchain Session',
      'Tech Seminar',
      'Guest Lecture',
      'Tech Talk',
      'Webinar',
      'Panel Discussion',
      'Fireside Chat',
      'Workshop',
      'Bootcamp',
      'Lab Session',
      'Code-along Session',
      'Project Build Session',
      'Startup Pitch',
      'Ideathon',
      'Product Launch',
      'Innovation Challenge',
      'Entrepreneurship Meet',
      'Developer Meetup',
      'Tech Community Meetup',
      'Networking Session',
      'Open Source Contribution Drive',
      'Capture The Flag (CTF)',
      'Quiz Competition',
      'Debugging Contest',
      'Speed Coding',
      'Tech Fest',
      'Orientation Program',
      'Symposium',
      'Research Paper Presentation',
      'Poster Presentation',
      'Virtual Hackathon',
      'Online Webinar',
      'Live Coding Session',
      'Virtual Conference',
      'Tech Conference',
      'Developer Conference',
      'Product Demo',
      'Training Program',
      'Certification Workshop',
    ],
    required: true,
  },
  shortDescription: String,
  domain: String,
  eventDate: {
    type: Date,
    required: true,
  },
  startTime: String,
  endTime: String,
  duration: String,
  timeZone: String,
  mode: {
    type: String,
    enum: ['Online', 'Offline', 'Hybrid'],
    default: 'Offline',
  },
  venue: String,
  platform: String,
  speakers: [speakerSchema],
  eligibility: String,
  prerequisites: String,
  agenda: [agendaItemSchema],
  registrationFee: String,
  lastRegistrationDate: Date,
  registerUrl: String,
  benefits: [benefitSchema],
  contactEmail: String,
  contactPhone: String,
  faqs: [faqSchema],
  eventImage: String,
  eventImageUrl: String,
  learningOutcomes: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Event', eventSchema);
