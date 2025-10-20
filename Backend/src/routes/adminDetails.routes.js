import express from "express";

import {studentDetailsForAdmin} from '../controller/adminDetails.controller.js'
import { protectAdmin } from "../middleware/protectAdmin.js";


const router=express.Router();

router.get('/studentDetails',protectAdmin,studentDetailsForAdmin)

export default router