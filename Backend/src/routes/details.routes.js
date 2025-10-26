import express from 'express';
import { getStudentDetails,getProfile,resetPassword, getResultDetails, getFeeDetails } from '../controller/details.controller.js';
import { protectAll } from '../middleware/auth.middleware.js'; // Using the general middleware
import { getAllNotices } from '../controller/notice.controller.js';

const router = express.Router();

// Route specifically for student details, protected by the general middleware
router.get('/student/:studentId', protectAll, getStudentDetails);
router.get('/profile/:studentId', protectAll, getProfile)
router.put('/resetpassword',resetPassword)
router.get('/home',getAllNotices)
router.get('/getResult/:studentId',protectAll,getResultDetails)
router.get('/getFeeDetails/:studentId',protectAll,getFeeDetails)


export default router;