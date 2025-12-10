# Portfolio Website - Computer Science Student

A full-featured portfolio website for computer science students with an admin portal to manage projects, skills, and experience.

## 📁 Project Structure

```
portfolio/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   ├── Skill.js
│   │   └── Experience.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   ├── skills.js
│   │   ├── experience.js
│   │   └── profile.js
│   ├── middleware/
│   │   └── auth.js
│   ├── index.js
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── Footer.js
    │   │   ├── ProjectCard.js
    │   │   ├── ProjectForm.js
    │   │   ├── SkillCard.js
    │   │   ├── SkillForm.js
    │   │   ├── ExperienceCard.js
    │   │   ├── ExperienceForm.js
    │   │   └── LoadingSpinner.js
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── Projects.js
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── AdminPortal.js
    │   │   └── ProtectedRoute.js
    │   ├── context/
    │   │   ├── AuthContext.js
    │   │   └── PortfolioContext.js
    │   ├── hooks/
    │   │   ├── useAuth.js
    │   │   └── usePortfolio.js
    │   ├── styles/
    │   │   ├── App.css
    │   │   ├── Navbar.css
    │   │   ├── ProjectCard.css
    │   │   ├── SkillCard.css
    │   │   ├── ExperienceCard.css
    │   │   ├── ProjectForm.css
    │   │   ├── SkillForm.css
    │   │   ├── ExperienceForm.css
    │   │   ├── LoadingSpinner.css
    │   │   ├── Footer.css
    │   │   ├── Home.css
    │   │   ├── Projects.css
    │   │   ├── Auth.css
    │   │   ├── AdminPortal.css
    │   │   └── ProtectedRoute.css
    │   ├── utils/
    │   │   └── helpers.js
    │   ├── App.js
    │   ├── index.js
    │   └── package.json
    └── public/
```

## 🚀 Features

### Frontend
- **Home Page**: Hero section with profile overview, featured projects, skills by category, and experience timeline
- **Projects Page**: Showcase all projects with technologies used, GitHub links, and live demos
- **Authentication**: Register and login pages for account creation and management
- **Admin Portal**: Comprehensive dashboard to manage portfolio content
  - Profile management (bio, title, social links, contact info)
  - Project management (create, edit, delete projects)
  - Skills management (organize by category, proficiency levels)
  - Experience management (add work experience with current status)

### Backend
- **User Authentication**: JWT-based authentication with email and password
- **RESTful APIs**: Complete API for all portfolio operations
- **Database**: MongoDB integration for data persistence
- **Security**: Password hashing with bcryptjs, JWT token validation

## 🛠️ Tech Stack

### Frontend
- React 19
- React Router v6
- Axios for API calls
- CSS3 for styling

### Backend
- Node.js & Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from `.env.example`:
```bash
copy .env.example .env
```

4. Update `.env` with your MongoDB connection string and JWT secret:
```
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-secret-key-here
PORT=5000
```

5. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## 🔑 Key Components

### Authentication Context (`AuthContext.js`)
- Manages user login/registration
- Stores authentication token in localStorage
- Provides auth state to entire app

### Portfolio Context (`PortfolioContext.js`)
- Manages all portfolio data (projects, skills, experience)
- Handles API calls for CRUD operations
- Centralizes state management

### Custom Hooks
- `useAuth()`: Access authentication state
- `usePortfolio()`: Access portfolio data and operations

### Utility Functions (`helpers.js`)
- Date formatting
- Email validation
- Proficiency level labels
- Text truncation

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Profile
- `GET /api/profile/:userId` - Get user profile
- `PUT /api/profile/:userId` - Update user profile

### Projects
- `GET /api/projects/user/:userId` - Get user's projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (authenticated)
- `PUT /api/projects/:id` - Update project (authenticated)
- `DELETE /api/projects/:id` - Delete project (authenticated)

### Skills
- `GET /api/skills/user/:userId` - Get user's skills
- `POST /api/skills` - Add skill (authenticated)
- `PUT /api/skills/:id` - Update skill (authenticated)
- `DELETE /api/skills/:id` - Delete skill (authenticated)

### Experience
- `GET /api/experience/user/:userId` - Get user's experience
- `POST /api/experience` - Add experience (authenticated)
- `PUT /api/experience/:id` - Update experience (authenticated)
- `DELETE /api/experience/:id` - Delete experience (authenticated)

## 📝 Usage

1. **Register**: Create an account at `/register`
2. **Login**: Sign in with your credentials at `/login`
3. **Admin Portal**: Access `/admin` to manage your portfolio
4. **Profile Setup**: Update your profile information (title, bio, social links)
5. **Add Content**: 
   - Add projects with technologies and links
   - Add skills organized by category
   - Add work experience
6. **View Portfolio**: Share your portfolio homepage with others

## 🎨 Customization

### Colors
Edit `:root` CSS variables in `App.css`:
```css
:root {
  --primary-color: #0066cc;
  --secondary-color: #00a86b;
  --accent-color: #ff6b35;
  --error-color: #dc2626;
  --success-color: #16a34a;
}
```

### Typography
Modify font-family in `App.css` or individual component styles

### Layout
Adjust grid columns and spacing in component CSS files

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
```

### Backend (Heroku/Railway/Render)
1. Set environment variables in your hosting platform
2. Push to Git repository
3. Deploy from Git

## 📱 Responsive Design
The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🤝 Contributing
Feel free to fork and submit pull requests for any improvements!

## 📄 License
This project is open source and available under the MIT License.

## 👨‍💻 Author
Created as a portfolio website template for Computer Science students.

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access if using MongoDB Atlas

### API Connection Error
- Confirm backend is running on port 5000
- Check CORS configuration in backend
- Verify API_URL in frontend `.env.local` if needed

### Authentication Issues
- Clear browser localStorage
- Verify JWT_SECRET in backend `.env`
- Check token expiration in AuthContext

---

**Happy coding! 🎓**
