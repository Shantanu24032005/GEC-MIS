import express from express;

import {studentDetailsForAdmin} from '../controller/adminDetails.controller.js'


const router=express.router();

router.get('/studentDetails',studentDetailsForAdmin)

export default router