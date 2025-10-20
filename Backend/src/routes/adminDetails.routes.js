import express from "express";

import {addStudentDetails, studentDetailsForAdmin, updateStudentDetails} from '../controller/adminDetails.controller.js'
import { protectAdmin } from "../middleware/protectAdmin.js";


const router=express.Router();

router.get('/studentDetails',protectAdmin,studentDetailsForAdmin)
router.post ('/addStudentDetails',protectAdmin,addStudentDetails)
router.patch('/updateStudentDetails', protectAdmin, updateStudentDetails);

export default router