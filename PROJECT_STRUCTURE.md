portfolio/
│
├── backend/
│   ├── models/
│   │   ├── User.js                    # User schema (email, password, profile info)
│   │   ├── Project.js                 # Project schema (portfolio projects)
│   │   ├── Skill.js                   # Skill schema (technical skills)
│   │   └── Experience.js              # Experience schema (work experience)
│   │
│   ├── routes/
│   │   ├── auth.js                    # Authentication routes (register, login)
│   │   ├── projects.js                # Project CRUD routes
│   │   ├── skills.js                  # Skill CRUD routes
│   │   ├── experience.js              # Experience CRUD routes
│   │   └── profile.js                 # Profile get/update routes
│   │
│   ├── middleware/
│   │   └── auth.js                    # JWT authentication middleware
│   │
│   ├── index.js                       # Express app setup & server config
│   ├── package.json                   # Backend dependencies & scripts
│   ├── .env.example                   # Environment variables template
│   └── .gitignore                     # Git ignore rules
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js              # Navigation bar component
│   │   │   ├── Footer.js              # Footer component
│   │   │   ├── ProjectCard.js         # Individual project display
│   │   │   ├── ProjectForm.js         # Project creation/edit form
│   │   │   ├── SkillCard.js           # Individual skill display
│   │   │   ├── SkillForm.js           # Skill creation/edit form
│   │   │   ├── ExperienceCard.js      # Individual experience display
│   │   │   ├── ExperienceForm.js      # Experience creation/edit form
│   │   │   └── LoadingSpinner.js      # Loading indicator
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.js                # Landing page (hero, projects, skills, experience)
│   │   │   ├── Projects.js            # All projects showcase page
│   │   │   ├── Login.js               # User login page
│   │   │   ├── Register.js            # User registration page
│   │   │   ├── AdminPortal.js         # Admin dashboard (profile, projects, skills, experience)
│   │   │   └── ProtectedRoute.js      # Route guard for authenticated pages
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.js         # Authentication state management
│   │   │   └── PortfolioContext.js    # Portfolio data state management
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.js             # Custom hook for authentication
│   │   │   └── usePortfolio.js        # Custom hook for portfolio data
│   │   │
│   │   ├── styles/
│   │   │   ├── App.css                # Global styles & CSS variables
│   │   │   ├── Navbar.css             # Navbar component styles
│   │   │   ├── Footer.css             # Footer component styles
│   │   │   ├── ProjectCard.css        # Project card styles
│   │   │   ├── ProjectForm.css        # Project form styles
│   │   │   ├── SkillCard.css          # Skill card styles
│   │   │   ├── SkillForm.css          # Skill form styles
│   │   │   ├── ExperienceCard.css     # Experience card styles
│   │   │   ├── ExperienceForm.css     # Experience form styles
│   │   │   ├── LoadingSpinner.css     # Loading spinner styles
│   │   │   ├── Home.css               # Home page styles
│   │   │   ├── Projects.css           # Projects page styles
│   │   │   ├── Auth.css               # Auth pages (login/register) styles
│   │   │   ├── AdminPortal.css        # Admin portal styles
│   │   │   └── ProtectedRoute.css     # Protected route styles
│   │   │
│   │   ├── utils/
│   │   │   └── helpers.js             # Utility functions (date format, validation, etc)
│   │   │
│   │   ├── App.js                     # Main app component with routing
│   │   ├── App.css                    # Main app styles
│   │   ├── index.js                   # React entry point
│   │   ├── index.css                  # Global index styles
│   │   └── [other files]              # setupTests.js, reportWebVitals.js
│   │
│   ├── public/
│   │   ├── index.html                 # HTML template
│   │   ├── manifest.json              # PWA manifest
│   │   ├── robots.txt                 # SEO robots file
│   │   └── favicon.ico                # App icon
│   │
│   ├── package.json                   # Frontend dependencies & scripts
│   ├── .gitignore                     # Git ignore rules
│   └── README.md                      # Create React App README
│
├── README.md                          # Complete project documentation
├── QUICKSTART.md                      # 5-minute quick start guide
├── DOCUMENTATION.md                   # Detailed component & API documentation
└── IMPLEMENTATION_SUMMARY.md          # Project summary & features overview

═══════════════════════════════════════════════════════════════════════════════

FILE COUNT SUMMARY:
├── Backend: 11 core files
├── Frontend: 30+ files (components, pages, contexts, hooks, styles, utils)
├── Documentation: 4 comprehensive guides
└── Total: 45+ production-ready files

═══════════════════════════════════════════════════════════════════════════════

KEY FEATURES BY FILE:

AUTHENTICATION:
├── backend/routes/auth.js             → Register & Login endpoints
├── backend/middleware/auth.js          → JWT verification
├── frontend/pages/Login.js             → Login UI
├── frontend/pages/Register.js          → Registration UI
└── frontend/context/AuthContext.js    → Auth state management

PORTFOLIO MANAGEMENT (Admin Portal):
├── backend/routes/projects.js          → Project CRUD API
├── backend/routes/skills.js            → Skill CRUD API
├── backend/routes/experience.js        → Experience CRUD API
├── frontend/pages/AdminPortal.js       → Admin dashboard UI
├── frontend/components/ProjectForm.js  → Project management form
├── frontend/components/SkillForm.js    → Skill management form
└── frontend/components/ExperienceForm.js → Experience management form

PUBLIC PORTFOLIO:
├── frontend/pages/Home.js              → Portfolio home page
├── frontend/pages/Projects.js          → Projects showcase
├── frontend/components/ProjectCard.js  → Project display
├── frontend/components/SkillCard.js    → Skill display
└── frontend/components/ExperienceCard.js → Experience display

═══════════════════════════════════════════════════════════════════════════════

COMPONENT HIERARCHY:

App
├── Navbar
├── Router
│   ├── Home (public)
│   │   ├── Hero Section
│   │   ├── Projects Grid
│   │   ├── Skills Section
│   │   └── Experience Timeline
│   ├── Projects (public)
│   ├── Login (public)
│   ├── Register (public)
│   └── AdminPortal (protected)
│       ├── Profile Tab
│       ├── Projects Tab
│       ├── Skills Tab
│       └── Experience Tab
└── Footer

═══════════════════════════════════════════════════════════════════════════════

DATABASE SCHEMA:

Users Collection
└── email, password (hashed), firstName, lastName, title, bio, location, 
    phone, github, linkedin, twitter, profileImage, createdAt

Projects Collection
└── userId, title, description, image, technologies[], github, liveLink,
    startDate, endDate, featured, createdAt

Skills Collection
└── userId, name, category (Frontend/Backend/Tools/Database/Other),
    proficiency (1-5), createdAt

Experience Collection
└── userId, title, company, description, startDate, endDate,
    isCurrent, createdAt

═══════════════════════════════════════════════════════════════════════════════

API ENDPOINTS:

POST   /api/auth/register               Register new user
POST   /api/auth/login                  Login user
GET    /api/profile/:userId             Get profile
PUT    /api/profile/:userId             Update profile
GET    /api/projects/user/:userId       Get user projects
GET    /api/projects/:id                Get single project
POST   /api/projects                    Create project
PUT    /api/projects/:id                Update project
DELETE /api/projects/:id                Delete project
GET    /api/skills/user/:userId         Get user skills
POST   /api/skills                      Create skill
PUT    /api/skills/:id                  Update skill
DELETE /api/skills/:id                  Delete skill
GET    /api/experience/user/:userId     Get user experience
POST   /api/experience                  Create experience
PUT    /api/experience/:id              Update experience
DELETE /api/experience/:id              Delete experience

═══════════════════════════════════════════════════════════════════════════════

TECHNOLOGY STACK:

Frontend:
├── React 19 (UI Library)
├── React Router v6 (Routing)
├── Axios (HTTP Client)
├── Context API (State Management)
├── CSS3 (Styling - no external frameworks)
└── JavaScript ES6+

Backend:
├── Node.js (Runtime)
├── Express 5 (Web Framework)
├── MongoDB (Database)
├── Mongoose (ODM)
├── JWT (Authentication)
├── bcryptjs (Password Hashing)
├── CORS (Cross-Origin)
└── dotenv (Configuration)

═══════════════════════════════════════════════════════════════════════════════

This is a complete, production-ready CS student portfolio website!
All files are properly structured, commented, and follow best practices.
