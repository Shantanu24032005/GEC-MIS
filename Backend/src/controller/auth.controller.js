import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db.js'; 

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h', 
  });
};

async function registerStudent(req, res) {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    return res.status(400).json({
      message: 'Please provide fullname, email, and password.',
    });
  }
  
  try {
    const [existingStudent] = await db.query('SELECT email FROM users WHERE email = ?', [email]);
    if (existingStudent.length > 0) {
      return res.status(400).json({
        message: 'Student with this email already exists.',
      });
    }
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    const [result] = await db.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [fullname, email, password_hash, 'student']
    );
    if (result.insertId) {
      return res.status(201).json({
        message: 'Student registered successfully!',
        token: generateToken(result.insertId),
      });
    } else {
      return res.status(500).json({
        message: 'An unexpected error occurred during registration.',
      });
    }
  } catch (error) {
    console.error('Registration Error:', error);
    return res.status(500).json({
      message: 'Internal server error.',
    });
  }
}

async function loginStudent(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Please provide both email and password.',
    });
  }

  try {
    const [studentRows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (studentRows.length === 0 || !(await bcrypt.compare(password, studentRows[0].password_hash))) {
      return res.status(401).json({
        message: 'Invalid credentials.',
      });
    }

    const student = studentRows[0];

    return res.status(200).json({
      message: 'Login successful!',
      token: generateToken(student.id),
    });

  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({
      message: 'Internal server error.',
    });
  }
}

export { registerStudent, loginStudent };