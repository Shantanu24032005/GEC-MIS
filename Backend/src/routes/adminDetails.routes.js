import express from "express";

import {addStudentDetails, studentDetailsForAdmin, updateStudentDetails} from '../controller/adminDetails.controller.js'
import { protectAdmin } from "../middleware/protectAdmin.js";
import { createNotice, deleteNotice, getAllNotices, updateNotice} from "../controller/notice.controller.js";


const router=express.Router();

router.get('/studentDetails',protectAdmin,studentDetailsForAdmin)
router.post ('/addStudentDetails',protectAdmin,addStudentDetails)
router.patch('/updateStudentDetails', protectAdmin, updateStudentDetails);

router.post('/createNotice',protectAdmin,createNotice)
router.get('/viewNotice',protectAdmin,getAllNotices)
router.put('/updateNotice',protectAdmin,updateNotice)
router.delete('/deleteNotice',protectAdmin,deleteNotice)

export default router