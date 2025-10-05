
// Import both handlers from the controller
import { registerStudent, loginStudent } from '../controller/auth.controller.js';

const router = express.Router();

// Registration route
router.post('/student/register', registerStudent);

// Add the new login route
router.post('/student/login', loginStudent);

export default router;