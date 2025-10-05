import express from 'express';
import { getNotifications } from '../controller/details.controller.js';
import { studentMiddleware } from '../middleware/student.middleware.js';


const router = express.Router();

router.get('student/home',studentMiddleware,getNotifications)

export default router