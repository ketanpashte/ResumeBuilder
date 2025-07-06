# Resume Generator Web Application

A full-stack web application for creating, managing, and generating professional resumes with PDF export functionality.

## 🚀 Tech Stack

### Frontend
- **React.js** with Vite
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Router** for navigation
- **React Hook Form** for form management

### Backend
- **Spring Boot** (Java)
- **Spring Security** with JWT authentication
- **Spring Data JPA** for database operations
- **iText** for PDF generation
- **BCrypt** for password hashing

### Database
- **MySQL** for data persistence

## 📁 Project Structure

```
resume-builder/
├── backend/                 # Spring Boot application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/resumebuilder/
│   │   │   │       ├── config/          # Security & CORS config
│   │   │   │       ├── controller/      # REST controllers
│   │   │   │       ├── dto/             # Data Transfer Objects
│   │   │   │       ├── entity/          # JPA entities
│   │   │   │       ├── repository/      # Data repositories
│   │   │   │       ├── service/         # Business logic
│   │   │   │       ├── util/            # Utility classes
│   │   │   │       └── ResumeBuilderApplication.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── schema.sql
│   │   └── test/
│   ├── pom.xml
│   └── README.md
├── frontend/                # React application
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React context
│   │   ├── services/        # API services
│   │   ├── utils/           # Utility functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── README.md
├── docker-compose.yml       # Docker setup
└── README.md               # This file
```

## 🔧 Features

### User Management
- User registration and login
- JWT-based authentication
- Secure password hashing

### Resume Builder
- **Personal Information**: Name, email, phone, address, profile summary
- **Education**: Multiple education entries with degree, institution, year, grade
- **Work Experience**: Multiple work experience entries with job title, company, duration, description
- **Skills**: List of technical and soft skills
- **Projects**: Optional project entries with title, description, technologies used

### Resume Management
- Create new resumes
- View all saved resumes
- Edit existing resumes
- Delete resumes
- Search and filter resumes

### PDF Generation
- Professional resume templates
- Clean, ATS-friendly layouts
- Download as PDF
- Print-ready formatting

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Node.js 18 or higher
- MySQL 8.0 or higher
- Maven 3.6 or higher

### Backend Setup
1. Navigate to the backend directory
2. Configure MySQL database in `application.properties`
3. Run the Spring Boot application
4. API will be available at `http://localhost:8080`

### Frontend Setup
1. Navigate to the frontend directory
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Application will be available at `http://localhost:5173`

### Database Setup
1. Create MySQL database: `resume_builder`
2. Tables will be auto-created by JPA
3. Or run the provided SQL schema

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Resume Endpoints
- `GET /api/resumes` - Get all user resumes
- `POST /api/resumes` - Create new resume
- `GET /api/resumes/{id}` - Get specific resume
- `PUT /api/resumes/{id}` - Update resume
- `DELETE /api/resumes/{id}` - Delete resume
- `GET /api/resumes/{id}/pdf` - Download resume as PDF

## 🔒 Security Features
- JWT token-based authentication
- Password encryption with BCrypt
- CORS configuration for frontend integration
- Protected API endpoints
- Input validation and sanitization

## 🎨 UI Features
- Responsive design for all devices
- Modern, clean interface
- Real-time form validation
- Loading states and error handling
- Intuitive navigation

## 📝 License
This project is licensed under the MIT License.

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
