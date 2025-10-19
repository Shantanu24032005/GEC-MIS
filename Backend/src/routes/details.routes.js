import express from 'express';
import { getStudentDetails,getProfile } from '../controller/details.controller.js';
import { protectAll } from '../middleware/auth.middleware.js'; // Using the general middleware

const router = express.Router();

// Route specifically for student details, protected by the general middleware
router.get('/student', protectAll, getStudentDetails);
router.get('/profile',protectAll,getProfile)

export default router;