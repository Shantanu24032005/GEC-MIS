import Student from '../models/student.model.js';
import Academic from '../models/academic.model.js';
import Fee from '../models/fee.model.js';
import Department from '../models/department.model.js';

// Existing function (kept for reference)
export const getStudentDetails = async (req, res) => {
  try {
    const studentId = req.student?._id;

    if (!studentId) {
        return res.status(403).json({ message: 'Forbidden: User is not a student or ID not found' });
    }

    const student = await Student.findById(studentId).select('-password');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    let departmentDetails = null;
    if (student.department_name) {
        departmentDetails = await Department.findOne({ name: student.department_name }).select('head_of_department');
    }

    const academics = await Academic.find({ student_id: studentId }).sort({ semester: 1 });
    const fees = await Fee.find({ student_id: studentId }).sort({ payment_date: -1 });

    res.json({
      details: {
          ...student.toObject(),
          head_of_department: departmentDetails?.head_of_department || null
      },
      academics,
      fees,
    });

  } catch (error) {
    console.error("Get Student Details Error:", error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// **NEW FUNCTION**
export const getProfile = async (req, res) => {
  try {
    // Get the student ID from the middleware
    const studentId = req.student?._id;

    // Ensure the user is a student
    if (!studentId) {
      return res.status(403).json({ message: 'Forbidden: User is not a student or ID not found' });
    }

    // Fetch only the specified fields for the profile
    const profile = await Student.findById(studentId).select(
      'email department_name current_year current_semester roll_number enrollment_number image first_name last_name'
    );

    if (!profile) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    // Return the profile data
    res.status(200).json(profile);

  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
export const resetPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const userId = req.user?._id; // From protectAll middleware
    const isStudent = !!req.student?._id; // Check if the logged-in user is a student

    // 1. Validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: 'Please provide old password, new password, and confirmation' });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'New passwords do not match' });
    }

    // 2. Find the user (could be Student or Admin)
    let user;
    if (isStudent) {
      user = await Student.findById(userId);
      if (newPassword.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
      }
    } else {
      user = await Admin.findById(userId);
      if (newPassword.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
      }
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 3. Check if old password is correct
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid old password' });
    }

    // 4. Set new password and save
    user.password = newPassword;
    await user.save(); // pre-save hook in the model will automatically hash the new password

    res.status(200).json({ message: 'Password changed successfully' });

  } catch (error) {
    console.error("Change Password Error:", error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
export const getFeeDetails=()=>{

}
export const getResultDetails=()=>{
  
}