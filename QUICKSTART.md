# Quick Start Guide

## Getting Started in 5 Minutes

### 1. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file and add:
# MONGODB_URI=mongodb://localhost:27017/portfolio
# JWT_SECRET=your-secret-key
# PORT=5000

# Start development server
npm run dev
```

### 2. Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start React app
npm start
```

The app will open at `http://localhost:3000`

## First Steps

### 1. Create Account
- Go to `/register`
- Fill in your details
- You'll be automatically logged in

### 2. Update Your Profile
- Click "Admin Portal" in navbar
- Go to "Profile" tab
- Fill in your information:
  - Title (e.g., "Computer Science Student")
  - Bio
  - Location
  - GitHub, LinkedIn, Twitter links

### 3. Add Your First Project
- In Admin Portal, go to "Projects" tab
- Click "Add Project"
- Fill in:
  - Project title
  - Description
  - Technologies (comma-separated)
  - GitHub/Live links
  - (Optional) Add image URL

### 4. Add Skills
- Go to "Skills" tab
- Click "Add Skill"
- Fill in skill name, category, and proficiency level (1-5)
- Add multiple skills to showcase your expertise

### 5. Add Experience
- Go to "Experience" tab
- Click "Add Experience"
- Add your internships, projects, or work experience
- Mark as "Currently working" if applicable

### 6. View Your Portfolio
- Click "Home" in navbar
- Your portfolio will display:
  - Hero section with your info
  - Featured projects
  - Skills by category
  - Experience timeline

## Features Available

✅ **Public Portfolio**
- Beautiful home page
- Projects showcase
- Skills visualization
- Experience timeline

✅ **Admin Portal**
- Update profile
- Manage projects (create, edit, delete)
- Manage skills (organize by category)
- Manage experience

✅ **Authentication**
- Secure login/register
- JWT-based auth
- Protected admin area

## Default Demo User

To see demo data without setting everything up:
- The home page uses a demo user ID
- You can still create your own account to access the admin portal

## Tips for Best Results

1. **Profile Picture**: Add an image URL to your hero section
2. **Project Images**: Use high-quality screenshot URLs
3. **Technologies**: Use consistent naming (React, Node.js, MongoDB, etc.)
4. **Proficiency Levels**: 
   - 1-2: Beginner
   - 3: Intermediate
   - 4: Advanced
   - 5: Expert

## Customization

### Change Portfolio Title
Edit `Navbar.js` - change "Portfolio" text

### Change Colors
Edit `App.css` - modify CSS variables

### Change Hero Section
Edit `Home.js` - modify the hero component

## API Base URL

Default: `http://localhost:5000/api`

If deploying backend elsewhere, update in `AuthContext.js`:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://your-api-url/api';
```

## Troubleshooting

**Port 3000 already in use?**
```bash
# Kill process on port 3000 or use different port
npm start -- --port 3001
```

**Port 5000 already in use?**
Change PORT in `.env` to another number and restart

**Cannot connect to MongoDB?**
- Make sure MongoDB is running
- Check connection string
- Use MongoDB Atlas cloud instance

## Next Steps

After setting up:
1. Customize the design with your colors
2. Add more content to your portfolio
3. Deploy to production (Vercel/Netlify for frontend, Heroku/Railway for backend)
4. Share your portfolio URL

---

**You're all set! Start building your portfolio! 🚀**
