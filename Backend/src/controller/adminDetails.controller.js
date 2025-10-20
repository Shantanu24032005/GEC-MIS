import Student from "../models/student.model.js";
export const studentDetailsForAdmin = async (req, res) => {
    try {
        const { name, "roll-no": rollNo, year, department } = req.body;

        const filterQuery = {};

        if (name) {
            // Create a case-insensitive regex to search for the name in both first and last name
            const nameRegex = new RegExp(name, 'i');
            filterQuery.$or = [
                { first_name: nameRegex },
                { last_name: nameRegex }
            ];
        }

        if (rollNo) {
            // Assumes roll_number is an exact match
            filterQuery.roll_number = rollNo;
        }

        if (year) {
            // The student model has 'current_year', so we filter by that
            const yearAsNumber = parseInt(year, 10);
            if (!isNaN(yearAsNumber)) {
                filterQuery.current_year = yearAsNumber;
            }
        }

        if (department) {
            // Create a case-insensitive regex for an exact department name match
            filterQuery.department_name = new RegExp(`^${department}$`, 'i');
        }

        // Check if any filters were actually provided
        if (Object.keys(filterQuery).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide at least one filter criterion (name, roll-no, year, department)"
            });
        }

        // Find students based on the built query, excluding their password
        const students = await Student.find(filterQuery).select('-password');

        if (!students || students.length === 0) {
            return res.status(404).json({
                success: true,
                message: "No students found matching the criteria",
                data: []
            });
        }

        return res.status(200).json({
            success: true,
            message: "Students found",
            data: students
        });

    } catch (error) {
        console.error("Error fetching student details:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching student details"
        });
    }
};
export const addStudentDetails=()=>{
    
}