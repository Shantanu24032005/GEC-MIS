CREATE TABLE department (
  id ENUM('CE','IT','ENE','ETC','CV','MECH','VLSI') PRIMARY KEY,
  name ENUM('computer', 'Information Technology', 'Electrical and Electronics', 'Electronics and Telecommunication', 'Mechanical', 'Civil', 'VLSI') UNIQUE NOT NULL,
  hod VARCHAR(120),
  year_of_est date
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  role ENUM('student','faculty','admin') NOT NULL DEFAULT 'student',
  email VARCHAR(120) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(120) NOT NULL,
  enrollment_no VARCHAR(40),
  department_id ENUM('CE','IT','ENE','ETC','CV','MECH','VLSI'),
  phone VARCHAR(20),
  alt_email VARCHAR(120),
  pr_number VARCHAR(20),
  year_admission YEAR,
  program VARCHAR(100),
  current_semester ENUM('1','2','3','4','5','6','7','8'),
  batch CHAR(1),
  class_number TINYINT,
  mentor VARCHAR(120),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(20) UNIQUE NOT NULL,
  title VARCHAR(200) NOT NULL,
  credits TINYINT NOT NULL,
  type ENUM('mandatory', 'elective', 'open_elective') DEFAULT 'mandatory',
  department_id ENUM('CE','IT','ENE','ETC','CV','MECH','VLSI'),
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  course_id INT NOT NULL,
  grade VARCHAR(3),
  semester ENUM('1','2','3','4','5','6','7','8'),
  it_avg TINYINT,
  tw TINYINT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE TABLE exam_registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  course_id INT NOT NULL,
  semester ENUM('1','2','3','4','5','6','7','8') NOT NULL,
  status ENUM('pending','approved','rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (course_id) REFERENCES courses(id),
  UNIQUE KEY uniq_user_course_sem (user_id, course_id, semester)
);

CREATE TABLE certificates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  type ENUM('bonafide','transcript','degree_verification') NOT NULL,
  status ENUM('submitted','processing','ready','rejected') DEFAULT 'submitted',
  remarks VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tuition_fees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  semester ENUM('1','2','3','4','5','6','7','8') NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);