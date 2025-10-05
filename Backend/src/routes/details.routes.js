import express from 'express';
import { getNotifications, getStudentProfile } from '../controller/details.controller.js';
import { studentMiddleware } from '../middleware/student.middleware.js';


const router = express.Router();

router.get('student/home',studentMiddleware,getNotifications)

router.get('student/profile',studentMiddleware,getStudentProfile)

export default router