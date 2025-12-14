const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Static files for uploads
const uploadsRoot = path.join(process.cwd(), 'uploads');
fs.mkdirSync(uploadsRoot, { recursive: true });
app.use('/uploads', express.static(uploadsRoot));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('MongoDB Atlas connected');
  initializeDemoUser();
})
.catch(err => console.log('MongoDB connection error:', err));

// Initialize demo user for testing
const initializeDemoUser = async () => {
  try {
    const User = require('./models/User');
    const demoEmail = 'demo@portfolio.local';
    
    // Check if demo user already exists
    const existingUser = await User.findOne({ email: demoEmail });
    
    if (!existingUser) {
      const demoUser = new User({
        email: demoEmail,
        password: 'demo123', // Will be hashed automatically
        firstName: 'Demo',
        lastName: 'User',
        title: 'Full Stack Developer',
        bio: 'This is a demo portfolio account for testing.',
      });
      
      await demoUser.save();
      console.log('✓ Demo user created successfully');
      console.log('  Email: demo@portfolio.local');
      console.log('  Password: demo123');
    }
  } catch (error) {
    console.error('Error initializing demo user:', error.message);
  }
};

// Routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const skillRoutes = require('./routes/skills');
const experienceRoutes = require('./routes/experience');
const internshipRoutes = require('./routes/internships');
const certificateRoutes = require('./routes/certificates');
const otherRoutes = require('./routes/others');
const courseRoutes = require('./routes/courses');
const recommendationRoutes = require('./routes/recommendations');
const serviceRoutes = require('./routes/services');
const careerBreakRoutes = require('./routes/careerbreaks');
const eventRoutes = require('./routes/events');
const profileRoutes = require('./routes/profile');
const portfolioRoutes = require('./routes/portfolio');

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/others', otherRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/careerbreaks', careerBreakRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/portfolio', portfolioRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
