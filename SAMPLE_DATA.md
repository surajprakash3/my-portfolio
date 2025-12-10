# 📋 Example Portfolio Data

## Sample User Profile

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "john.doe@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "title": "Full Stack Developer & CS Student",
  "bio": "Passionate about building scalable web applications. Currently pursuing Computer Science degree with focus on web development.",
  "location": "San Francisco, CA",
  "phone": "+1-234-567-8900",
  "github": "https://github.com/johndoe",
  "linkedin": "https://linkedin.com/in/johndoe",
  "twitter": "https://twitter.com/johndoe",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

## Sample Projects

```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "title": "E-Commerce Platform",
    "description": "Full-stack e-commerce platform with payment integration",
    "longDescription": "Built a complete e-commerce platform using MERN stack with features like user authentication, product catalog, shopping cart, and Stripe payment integration.",
    "image": "https://example.com/ecommerce.jpg",
    "technologies": ["React", "Node.js", "MongoDB", "Stripe"],
    "github": "https://github.com/johndoe/ecommerce",
    "liveLink": "https://ecommerce-demo.vercel.app",
    "startDate": "2023-06-01T00:00:00Z",
    "endDate": "2023-12-15T00:00:00Z",
    "featured": true,
    "createdAt": "2024-01-15T10:35:00Z"
  },
  {
    "_id": "507f1f77bcf86cd799439013",
    "userId": "507f1f77bcf86cd799439011",
    "title": "Task Management App",
    "description": "Collaborative task management application",
    "image": "https://example.com/taskapp.jpg",
    "technologies": ["React", "Firebase", "Tailwind CSS"],
    "github": "https://github.com/johndoe/taskapp",
    "liveLink": "https://taskapp-demo.vercel.app",
    "startDate": "2023-03-01T00:00:00Z",
    "endDate": "2023-05-30T00:00:00Z",
    "featured": true,
    "createdAt": "2024-01-15T10:40:00Z"
  },
  {
    "_id": "507f1f77bcf86cd799439014",
    "userId": "507f1f77bcf86cd799439011",
    "title": "Weather Dashboard",
    "description": "Real-time weather dashboard with geolocation",
    "technologies": ["React", "OpenWeather API", "Axios"],
    "github": "https://github.com/johndoe/weather",
    "liveLink": "https://weather-dashboard.vercel.app",
    "featured": false,
    "createdAt": "2024-01-15T10:45:00Z"
  }
]
```

## Sample Skills

```json
[
  {
    "_id": "507f1f77bcf86cd799439020",
    "userId": "507f1f77bcf86cd799439011",
    "name": "React",
    "category": "Frontend",
    "proficiency": 5,
    "createdAt": "2024-01-15T11:00:00Z"
  },
  {
    "_id": "507f1f77bcf86cd799439021",
    "userId": "507f1f77bcf86cd799439011",
    "name": "JavaScript",
    "category": "Frontend",
    "proficiency": 5,
    "createdAt": "2024-01-15T11:05:00Z"
  },
  {
    "_id": "507f1f77bcf86cd799439022",
    "userId": "507f1f77bcf86cd799439011",
    "name": "Node.js",
    "category": "Backend",
    "proficiency": 4,
    "createdAt": "2024-01-15T11:10:00Z"
  },
  {
    "_id": "507f1f77bcf86cd799439023",
    "userId": "507f1f77bcf86cd799439011",
    "name": "MongoDB",
    "category": "Database",
    "proficiency": 4,
    "createdAt": "2024-01-15T11:15:00Z"
  },
  {
    "_id": "507f1f77bcf86cd799439024",
    "userId": "507f1f77bcf86cd799439011",
    "name": "Git",
    "category": "Tools",
    "proficiency": 5,
    "createdAt": "2024-01-15T11:20:00Z"
  },
  {
    "_id": "507f1f77bcf86cd799439025",
    "userId": "507f1f77bcf86cd799439011",
    "name": "Docker",
    "category": "Tools",
    "proficiency": 3,
    "createdAt": "2024-01-15T11:25:00Z"
  }
]
```

## Sample Experience

```json
[
  {
    "_id": "507f1f77bcf86cd799439030",
    "userId": "507f1f77bcf86cd799439011",
    "title": "Software Developer Intern",
    "company": "Tech Startup Inc",
    "description": "Built and maintained React components for internal dashboard. Implemented REST APIs using Node.js and Express.",
    "startDate": "2023-06-01T00:00:00Z",
    "endDate": "2023-08-31T00:00:00Z",
    "isCurrent": false,
    "createdAt": "2024-01-15T11:30:00Z"
  },
  {
    "_id": "507f1f77bcf86cd799439031",
    "userId": "507f1f77bcf86cd799439011",
    "title": "Full Stack Developer",
    "company": "Tech Startup Inc",
    "description": "Promoted to full-time developer. Currently leading frontend team for company's mobile app.",
    "startDate": "2023-09-01T00:00:00Z",
    "isCurrent": true,
    "createdAt": "2024-01-15T11:35:00Z"
  }
]
```

---

## API Request/Response Examples

### Register User

**Request:**
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "SecurePassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### Login User

**Request:**
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "SecurePassword123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### Get Profile

**Request:**
```bash
GET /api/profile/507f1f77bcf86cd799439011
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "john.doe@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "title": "Full Stack Developer & CS Student",
  "bio": "Passionate about building scalable web applications...",
  "location": "San Francisco, CA",
  "phone": "+1-234-567-8900",
  "github": "https://github.com/johndoe",
  "linkedin": "https://linkedin.com/in/johndoe",
  "twitter": "https://twitter.com/johndoe",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

### Update Profile

**Request:**
```bash
PUT /api/profile/507f1f77bcf86cd799439011
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "title": "Senior Full Stack Developer",
  "bio": "Updated bio text",
  "location": "New York, NY"
}
```

**Response:**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "title": "Senior Full Stack Developer",
    "bio": "Updated bio text",
    "location": "New York, NY",
    ...
  }
}
```

### Create Project

**Request:**
```bash
POST /api/projects
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "title": "AI Chat Application",
  "description": "Chat app with AI integration",
  "technologies": ["React", "OpenAI API", "Node.js"],
  "github": "https://github.com/johndoe/ai-chat",
  "liveLink": "https://ai-chat-demo.vercel.app",
  "featured": true
}
```

**Response:**
```json
{
  "message": "Project created successfully",
  "project": {
    "_id": "507f1f77bcf86cd799439050",
    "userId": "507f1f77bcf86cd799439011",
    "title": "AI Chat Application",
    "description": "Chat app with AI integration",
    "technologies": ["React", "OpenAI API", "Node.js"],
    "github": "https://github.com/johndoe/ai-chat",
    "liveLink": "https://ai-chat-demo.vercel.app",
    "featured": true,
    "createdAt": "2024-01-15T12:00:00Z"
  }
}
```

### Add Skill

**Request:**
```bash
POST /api/skills
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "name": "TypeScript",
  "category": "Frontend",
  "proficiency": 4
}
```

**Response:**
```json
{
  "message": "Skill added successfully",
  "skill": {
    "_id": "507f1f77bcf86cd799439060",
    "userId": "507f1f77bcf86cd799439011",
    "name": "TypeScript",
    "category": "Frontend",
    "proficiency": 4,
    "createdAt": "2024-01-15T12:05:00Z"
  }
}
```

### Add Experience

**Request:**
```bash
POST /api/experience
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "title": "Junior Developer",
  "company": "Google",
  "description": "Working on cloud infrastructure projects",
  "startDate": "2024-01-01",
  "isCurrent": true
}
```

**Response:**
```json
{
  "message": "Experience added successfully",
  "experience": {
    "_id": "507f1f77bcf86cd799439070",
    "userId": "507f1f77bcf86cd799439011",
    "title": "Junior Developer",
    "company": "Google",
    "description": "Working on cloud infrastructure projects",
    "startDate": "2024-01-01T00:00:00Z",
    "isCurrent": true,
    "createdAt": "2024-01-15T12:10:00Z"
  }
}
```

---

## Frontend Form Examples

### Login Form
```
Email: john.doe@example.com
Password: SecurePassword123
[Sign In Button]
```

### Project Form
```
Project Title: E-Commerce Platform
Short Description: Full-stack e-commerce platform
Long Description: Built a complete e-commerce platform...
Image URL: https://example.com/ecommerce.jpg
Technologies: React, Node.js, MongoDB, Stripe
GitHub URL: https://github.com/johndoe/ecommerce
Live Demo URL: https://ecommerce-demo.vercel.app
Start Date: 06/01/2023
End Date: 12/15/2023
[✓] Featured Project
[Update Project] [Cancel]
```

### Skill Form
```
Skill Name: React
Category: [Frontend ▼]
Proficiency: 5 [═════] Expert
[Add Skill] [Cancel]
```

### Experience Form
```
Job Title: Senior Developer
Company: Tech Company Inc
Description: Leading development team...
Start Date: 09/01/2023
End Date: (disabled - currently working)
[✓] Currently working here
[Add Experience] [Cancel]
```

---

## Notes for Development

- All dates are ISO 8601 format in database
- Proficiency levels: 1=Beginner, 2=Intermediate, 3=Advanced, 4=Expert, 5=Master
- Skill categories: Frontend, Backend, Tools, Database, Other
- JWT tokens expire in 7 days
- Passwords are hashed with bcryptjs (10 salt rounds)
- All email addresses must be unique

---

**Sample data ready to use in your portfolio!**
