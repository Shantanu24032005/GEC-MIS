import express from 'express';
import { getStudentDetails,getProfile,resetPassword } from '../controller/details.controller.js';
import { protectAll } from '../middleware/auth.middleware.js'; // Using the general middleware
import { getAllNotices } from '../controller/notice.controller.js';

const router = express.Router();

// Route specifically for student details, protected by the general middleware
router.get('/student', protectAll, getStudentDetails);
router.get('/profile',protectAll,getProfile)
router.put('/resetpassword',protectAll,resetPassword)
router.get('/home',protectAll,getAllNotices)


export default router;