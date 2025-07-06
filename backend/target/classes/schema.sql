-- Resume Builder Database Schema

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Resumes table
CREATE TABLE IF NOT EXISTS resumes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(100) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    profile_summary TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Education table
CREATE TABLE IF NOT EXISTS education (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    resume_id BIGINT NOT NULL,
    degree VARCHAR(100) NOT NULL,
    institution VARCHAR(150) NOT NULL,
    start_year INT NOT NULL,
    end_year INT,
    grade VARCHAR(20),
    description TEXT,
    display_order INT DEFAULT 0,
    FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE
);

-- Work Experience table
CREATE TABLE IF NOT EXISTS work_experience (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    resume_id BIGINT NOT NULL,
    job_title VARCHAR(100) NOT NULL,
    company VARCHAR(150) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    description TEXT,
    display_order INT DEFAULT 0,
    FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    resume_id BIGINT NOT NULL,
    skill_name VARCHAR(100) NOT NULL,
    skill_category VARCHAR(50), -- Technical, Soft Skills, Languages, etc.
    proficiency_level VARCHAR(20), -- Beginner, Intermediate, Advanced, Expert
    display_order INT DEFAULT 0,
    FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    resume_id BIGINT NOT NULL,
    project_title VARCHAR(150) NOT NULL,
    description TEXT,
    technologies_used TEXT,
    start_date DATE,
    end_date DATE,
    project_url VARCHAR(255),
    github_url VARCHAR(255),
    display_order INT DEFAULT 0,
    FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE
);

-- Indexes for better performance
CREATE INDEX idx_resumes_user_id ON resumes(user_id);
CREATE INDEX idx_education_resume_id ON education(resume_id);
CREATE INDEX idx_work_experience_resume_id ON work_experience(resume_id);
CREATE INDEX idx_skills_resume_id ON skills(resume_id);
CREATE INDEX idx_projects_resume_id ON projects(resume_id);

-- Insert sample data for testing
INSERT INTO users (username, email, password, first_name, last_name) VALUES 
('john_doe', 'john.doe@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'John', 'Doe'),
('jane_smith', 'jane.smith@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Jane', 'Smith');

INSERT INTO resumes (user_id, title, full_name, email, phone, address, profile_summary) VALUES 
(1, 'Software Developer Resume', 'John Doe', 'john.doe@email.com', '+1-555-0123', '123 Main St, City, State 12345', 'Experienced software developer with 5+ years in full-stack development.'),
(2, 'Data Scientist Resume', 'Jane Smith', 'jane.smith@email.com', '+1-555-0124', '456 Oak Ave, City, State 12346', 'Data scientist specializing in machine learning and analytics.');

INSERT INTO education (resume_id, degree, institution, start_year, end_year, grade, display_order) VALUES 
(1, 'Bachelor of Computer Science', 'University of Technology', 2018, 2022, '3.8 GPA', 1),
(2, 'Master of Data Science', 'State University', 2020, 2022, '3.9 GPA', 1);

INSERT INTO work_experience (resume_id, job_title, company, start_date, end_date, is_current, description, display_order) VALUES 
(1, 'Senior Software Developer', 'Tech Corp', '2022-01-15', NULL, TRUE, 'Lead development of web applications using React and Spring Boot.', 1),
(1, 'Junior Developer', 'StartUp Inc', '2020-06-01', '2021-12-31', FALSE, 'Developed REST APIs and frontend components.', 2),
(2, 'Data Scientist', 'Analytics Co', '2022-03-01', NULL, TRUE, 'Built machine learning models for predictive analytics.', 1);

INSERT INTO skills (resume_id, skill_name, skill_category, proficiency_level, display_order) VALUES 
(1, 'Java', 'Technical', 'Expert', 1),
(1, 'React', 'Technical', 'Advanced', 2),
(1, 'Spring Boot', 'Technical', 'Advanced', 3),
(1, 'MySQL', 'Technical', 'Intermediate', 4),
(2, 'Python', 'Technical', 'Expert', 1),
(2, 'Machine Learning', 'Technical', 'Advanced', 2),
(2, 'SQL', 'Technical', 'Advanced', 3);

INSERT INTO projects (resume_id, project_title, description, technologies_used, start_date, end_date, display_order) VALUES 
(1, 'E-commerce Platform', 'Full-stack e-commerce application with payment integration', 'React, Spring Boot, MySQL, Stripe API', '2023-01-01', '2023-06-30', 1),
(2, 'Customer Churn Prediction', 'ML model to predict customer churn with 85% accuracy', 'Python, Scikit-learn, Pandas, PostgreSQL', '2023-02-01', '2023-05-31', 1);
