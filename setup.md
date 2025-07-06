# Resume Builder Setup Guide

This guide will help you set up and run the Resume Builder application locally.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Java 17 or higher**
- **Node.js 18 or higher**
- **MySQL 8.0 or higher**
- **Maven 3.6 or higher**
- **Git**

## 🗄️ Database Setup

### 1. Install MySQL

Download and install MySQL from [https://dev.mysql.com/downloads/](https://dev.mysql.com/downloads/)

### 2. Create Database

Open MySQL command line or MySQL Workbench and run:

```sql
CREATE DATABASE resume_builder;
CREATE USER 'resumeuser'@'localhost' IDENTIFIED BY 'resumepass';
GRANT ALL PRIVILEGES ON resume_builder.* TO 'resumeuser'@'localhost';
FLUSH PRIVILEGES;
```

## 🚀 Backend Setup

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Configure Database

Update `src/main/resources/application.properties` if needed:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/resume_builder
spring.datasource.username=resumeuser
spring.datasource.password=resumepass
```

### 3. Install Dependencies and Run

```bash
# Install dependencies
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 4. Verify Backend

Open your browser and go to `http://localhost:8080/actuator/health` - you should see a health check response.

## 🎨 Frontend Setup

### 1. Navigate to Frontend Directory

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment File

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:8080
```

### 4. Start Development Server

```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## 🧪 Testing the Application

### 1. Open the Application

Navigate to `http://localhost:5173` in your browser.

### 2. Create an Account

1. Click "Get Started" or "Register"
2. Fill in your details
3. Click "Create account"

### 3. Create a Resume

1. After logging in, click "Create New Resume"
2. Fill in the multi-step form
3. Save your resume

### 4. Test PDF Generation

1. Go to your dashboard
2. Click the "PDF" button on any resume
3. The PDF should download automatically

## 🐳 Docker Setup (Alternative)

If you prefer using Docker:

### 1. Using Docker Compose

```bash
# From the root directory
docker-compose up -d
```

This will start:
- MySQL database on port 3306
- Backend API on port 8080
- Frontend app on port 3000

### 2. Individual Docker Containers

**Backend:**
```bash
cd backend
docker build -t resume-builder-backend .
docker run -p 8080:8080 resume-builder-backend
```

**Frontend:**
```bash
cd frontend
docker build -t resume-builder-frontend .
docker run -p 3000:3000 resume-builder-frontend
```

## 🔧 Troubleshooting

### Common Issues

**1. Database Connection Error**
- Ensure MySQL is running
- Check database credentials in `application.properties`
- Verify the database and user exist

**2. Port Already in Use**
- Backend (8080): Change port in `application.properties`
- Frontend (5173): Change port in `vite.config.js`

**3. CORS Errors**
- Ensure backend CORS configuration includes frontend URL
- Check `app.cors.allowed-origins` in `application.properties`

**4. JWT Token Issues**
- Clear browser localStorage
- Check JWT secret configuration

**5. PDF Generation Fails**
- Ensure iText dependency is properly loaded
- Check server logs for detailed error messages

### Logs

**Backend Logs:**
```bash
# If running with Maven
mvn spring-boot:run

# Check application logs in the console
```

**Frontend Logs:**
```bash
# Development server logs
npm run dev

# Check browser console for client-side errors
```

## 📊 Sample Data

The application includes sample users and resumes for testing:

**Sample User:**
- Username: `john_doe`
- Password: `password` (hashed in database)

You can also create your own account through the registration form.

## 🔒 Security Notes

For production deployment:

1. **Change JWT Secret**: Update `app.jwt.secret` in `application.properties`
2. **Use Environment Variables**: Don't hardcode sensitive data
3. **HTTPS**: Use HTTPS in production
4. **Database Security**: Use strong passwords and proper user permissions
5. **CORS**: Restrict CORS origins to your domain only

## 📈 Performance Tips

1. **Database Indexing**: Indexes are already configured for common queries
2. **Caching**: Consider adding Redis for session caching in production
3. **CDN**: Use a CDN for static assets in production
4. **Compression**: Gzip is enabled in the nginx configuration

## 🤝 Getting Help

If you encounter issues:

1. Check the logs for error messages
2. Verify all prerequisites are installed
3. Ensure all services are running
4. Check the troubleshooting section above

## 🎉 Success!

If everything is working correctly, you should be able to:

✅ Register and login  
✅ Create and edit resumes  
✅ Download PDFs  
✅ Search and manage resumes  
✅ Navigate between all pages  

Congratulations! Your Resume Builder application is now running successfully.
