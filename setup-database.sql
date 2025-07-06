-- Create database and user for Resume Builder
CREATE DATABASE IF NOT EXISTS resume_builder;

-- Create user (you may need to run this as root)
-- CREATE USER 'resumeuser'@'localhost' IDENTIFIED BY 'resumepass';
-- GRANT ALL PRIVILEGES ON resume_builder.* TO 'resumeuser'@'localhost';
-- FLUSH PRIVILEGES;

-- Use the database
USE resume_builder;

-- Show that database is ready
SELECT 'Database resume_builder is ready!' as status;
