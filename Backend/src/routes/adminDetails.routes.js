import express from "express";

import {addStudentDetails, studentDetailsForAdmin} from '../controller/adminDetails.controller.js'
import { protectAdmin } from "../middleware/protectAdmin.js";


const router=express.Router();

router.get('/studentDetails',protectAdmin,studentDetailsForAdmin)
router.put('/addStudentDetails',protectAdmin,addStudentDetails)

export default router