# Resume Builder Backend

Spring Boot REST API for the Resume Builder application.

## 🚀 Features

- **User Authentication**: JWT-based authentication with registration and login
- **Resume Management**: Full CRUD operations for resumes
- **PDF Generation**: Professional PDF export using iText library
- **Database Integration**: MySQL with JPA/Hibernate
- **Security**: BCrypt password hashing and JWT token validation
- **CORS Support**: Configured for frontend integration

## 🛠️ Tech Stack

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Security**
- **Spring Data JPA**
- **MySQL 8.0**
- **iText 7** (PDF generation)
- **JWT** (Authentication)
- **Maven** (Build tool)

## 📋 Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- MySQL 8.0 or higher

## 🚀 Getting Started

### 1. Database Setup

Create a MySQL database:

```sql
CREATE DATABASE resume_builder;
CREATE USER 'resumeuser'@'localhost' IDENTIFIED BY 'resumepass';
GRANT ALL PRIVILEGES ON resume_builder.* TO 'resumeuser'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Configuration

Update `src/main/resources/application.properties` with your database credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/resume_builder
spring.datasource.username=resumeuser
spring.datasource.password=resumepass
```

### 3. Run the Application

```bash
# Install dependencies and run
mvn clean install
mvn spring-boot:run
```

The API will be available at `http://localhost:8080`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info

### Resumes
- `GET /api/resumes` - Get all user resumes
- `GET /api/resumes/{id}` - Get specific resume
- `POST /api/resumes` - Create new resume
- `PUT /api/resumes/{id}` - Update resume
- `DELETE /api/resumes/{id}` - Delete resume
- `GET /api/resumes/{id}/pdf` - Download resume as PDF
- `GET /api/resumes/stats` - Get user resume statistics

## 🔧 Configuration

### JWT Settings
```properties
app.jwt.secret=mySecretKey123456789012345678901234567890
app.jwt.expiration=86400000
```

### CORS Settings
```properties
app.cors.allowed-origins=http://localhost:3000,http://localhost:5173
```

## 🧪 Testing

Run tests with:
```bash
mvn test
```

## 📦 Building for Production

```bash
mvn clean package
java -jar target/resume-builder-backend-0.0.1-SNAPSHOT.jar
```

## 🐳 Docker Support

Build and run with Docker:

```bash
# Build image
docker build -t resume-builder-backend .

# Run container
docker run -p 8080:8080 resume-builder-backend
```

## 📝 Sample Data

The application includes sample data for testing. Check `src/main/resources/schema.sql` for initial data setup.

## 🔒 Security Features

- Password hashing with BCrypt
- JWT token-based authentication
- CORS configuration
- Input validation
- SQL injection prevention through JPA

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
