import Fee from "../models/fee.model.js";
import Student from "../models/student.model.js";
import Academic from './../models/academic.model.js';

export const studentDetailsForAdmin = async (req, res) => {
    try {
        // Accept filters from query string for GET requests and body for POST if ever used
        const source = Object.keys(req.query || {}).length ? req.query : req.body || {};
        const { name, "roll-no": rollNo, year, department } = source;

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
export const addStudentDetails = async (req, res, next) => { 
    try {
        // --- 1. Extract Data ---
        const {
            roll_no,
            // Fee details
            amount,
            paymentDate,
            transactionId,
            feeStatus,
            payment_for,
            payment_method,
            remarks,
            // Academic details
            semester,
            cgpa,
            academic_year,
            courses // Array of course details
        } = req.body;

        if (!roll_no) {
            // Send a 400 Bad Request response directly
            return res.status(400).json({
                success: false,
                message: "Roll number (roll_no) is required"
            });
        }
        const student = await Student.findOne({ roll_number: roll_no });
        if (!student) {
             // Send a 404 Not Found response
            return res.status(404).json({
                success: false,
                message: `Student with roll number ${roll_no} not found`
            });
        }
        let feeData = null;
        if (amount !== undefined || paymentDate || transactionId || feeStatus || payment_for || academic_year) {
            if (!amount || !transactionId || !payment_for || !academic_year || !semester || !feeStatus) {
                 console.warn(`Incomplete fee details for roll_no ${roll_no}. Fee record skipped. Required: amount, transactionId, payment_for, academic_year, semester, feeStatus`);
            } else {
                feeData = {
                    student_id: student._id,
                    amount,
                    payment_date: paymentDate ? new Date(paymentDate) : new Date(),
                    transaction_id: transactionId,
                    payment_for,
                    academic_year,
                    semester,
                    status: feeStatus,
                    payment_method: payment_method || 'Online',
                    remarks
                };
            }
        }

        let academicData = null;
        if (semester !== undefined || cgpa !== undefined || courses) {
            if (!semester || !academic_year || !courses || !Array.isArray(courses) || courses.length === 0) {
                console.warn(`Incomplete academic details for roll_no ${roll_no}. Academic record skipped. Required: semester, academic_year, courses`);
            } else {
                // Validate course data
                const isValidCourses = courses.every(course => 
                    course.course_code && course.course_name
                );
                
                if (!isValidCourses) {
                    console.warn(`Invalid course data. Each course must have course_code and course_name`);
                    return res.status(400).json({
                        success: false,
                        message: "Invalid course data. Each course must have course_code and course_name"
                    });
                }

                academicData = {
                    student_id: student._id,
                    semester,
                    academic_year,
                    cgpa: cgpa || null,
                    courses,
                    registration_status: 'Registered',
                    registration_date: new Date()
                };
            }
        }
        if (!feeData && !academicData) {
             return res.status(400).json({
                success: false,
                message: "No valid or complete fee or academic details provided to add."
            });
        }
        let savedFee = null;
        let savedAcademic = null;
        let saveError = null; // Variable to hold potential error during save

        try {
            if (feeData) {
                const newFee = new Fee(feeData);
                savedFee = await newFee.save();
                if (!savedFee) {
                   throw new Error("Server error: Failed to save fee details");
                }
            }

            if (academicData) {
                const newAcademic = new Academic(academicData);
                savedAcademic = await newAcademic.save();
                if (!savedAcademic) {
                    throw new Error("Server error: Failed to save academic details");
                }
            }
        } catch (error) {
            saveError = error; 
            if (savedFee && !savedAcademic && academicData) {
                try {
                    await Fee.findByIdAndDelete(savedFee._id);
                    console.log(`Rolled back fee record ${savedFee._id} for roll_no ${roll_no} due to academic save failure.`);
                } catch (rollbackError) {
                    console.error(`Failed to rollback fee record ${savedFee._id}:`, rollbackError);
                    // Combine errors or prioritize the original save error
                     saveError = new Error(`Failed to save academic details and failed to rollback fee details: ${error.message} (Rollback Error: ${rollbackError.message})`);
                }
            }
             // Pass the error to the Express error handler
             return next(saveError);
        }
        res.status(201).json({
            success: true,
            message: "Student details added successfully",
            data: {
                 ...(savedFee && { fee: savedFee.toObject() }), // Use .toObject() for cleaner output if needed
                 ...(savedAcademic && { academic: savedAcademic.toObject() })
            }
        });

    } catch (error) {
        console.error("Error in addStudentDetails:", error); 
        next(error);

    }
};
export const updateStudentDetails = async (req, res, next) => {
    try {
        // --- 1. Extract Data ---
        // MODIFIED: roll_no, semester, and academic_year are now the primary identifiers.
        const {
            roll_no,
            semester,
            academic_year,
            // Fee fields to potentially update
            amount,
            paymentDate,
            transactionId,
            feeStatus,
            payment_for,
            payment_method,
            remarks,
            // Academic fields to potentially update
            cgpa,
            courses
        } = req.body;

        // --- 2. Validate Input ---
        // MODIFIED: Check for mandatory identifiers.
        if (!roll_no || !semester || !academic_year) {
            return res.status(400).json({
                success: false,
                message: "roll_no, semester, and academic_year are required for an update."
            });
        }

        // --- 3. Find Student ---
        const student = await Student.findOne({ roll_number: roll_no });
        if (!student) {
            return res.status(404).json({
                success: false,
                message: `Student with roll number ${roll_no} not found.`
            });
        }

        // --- 4. Prepare Update Data ---
        const feeUpdateData = {};
        if (amount !== undefined) feeUpdateData.amount = amount;
        if (paymentDate) feeUpdateData.payment_date = new Date(paymentDate);
        if (transactionId !== undefined) feeUpdateData.transaction_id = transactionId;
        if (feeStatus !== undefined) feeUpdateData.status = feeStatus;
        if (payment_for !== undefined) feeUpdateData.payment_for = payment_for;
        if (payment_method !== undefined) feeUpdateData.payment_method = payment_method;
        if (remarks !== undefined) feeUpdateData.remarks = remarks;

        const academicUpdateData = {};
        if (cgpa !== undefined) academicUpdateData.cgpa = cgpa;
        if (courses !== undefined) academicUpdateData.courses = courses;

        // Check if there are actual fields to update for the provided IDs
        if (Object.keys(feeUpdateData).length === 0 && Object.keys(academicUpdateData).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No fields provided to update."
            });
        }

        // --- 5. Find and Perform Updates ---
        let updatedFee = null;
        let updatedAcademic = null;

        const findByIdAndUpdateOptions = {
            new: true, // Return the modified document rather than the original
            runValidators: true // Ensure updates adhere to schema validation
        };

        // Define the query to find the records
        const recordQuery = {
            student_id: student._id,
            semester: semester,
            academic_year: academic_year
        };

        if (Object.keys(feeUpdateData).length > 0) {
            updatedFee = await Fee.findOneAndUpdate(recordQuery, feeUpdateData, findByIdAndUpdateOptions);
        }

        if (Object.keys(academicUpdateData).length > 0) {
            updatedAcademic = await Academic.findOneAndUpdate(recordQuery, academicUpdateData, findByIdAndUpdateOptions);
        }

        // --- 6. Handle "Not Found" during update ---
        if (!updatedFee && !updatedAcademic) {
            const feeMessage = Object.keys(feeUpdateData).length > 0 ? "Fee record not found. " : "";
            const academicMessage = Object.keys(academicUpdateData).length > 0 ? "Academic record not found. " : "";
            return res.status(404).json({
                success: false,
                message: `${feeMessage}${academicMessage}No records found for student ${roll_no}, semester ${semester}, and year ${academic_year}. Update failed.`
            });
        }

        // --- 7. Send Success Response ---
        res.status(200).json({
            success: true,
            message: "Student details updated successfully",
            data: {
                ...(updatedFee && { fee: updatedFee.toObject() }),
                ...(updatedAcademic && { academic: updatedAcademic.toObject() })
            }
        });

    } catch (error) {
        // --- Error Handling ---
        console.error("Error in updateStudentDetails:", error);
        // Handle potential validation errors from findByIdAndUpdate
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: "Validation failed during update.",
                errors: error.errors
            });
        }
        // Handle CastError (e.g., invalid ObjectId format)
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: `Invalid ID format provided for ${error.path}.`,
                error: error.message
            });
        }
        next(error); // Pass other errors to the default error handler
    }
};
/*
{
    "roll_no": "23B-CO-059",
    "academic_year": "2023-2024",
    "semester": 5,
    
    "amount": 40000,
    "paymentDate": "2023-10-26T10:00:00.000Z",
    "transactionId": "TYN123456789UNIQUE",
    "feeStatus": "Paid",
    "payment_for": "Tuition Fee",
    "payment_method": "Online",
    "remarks": "Full tuition fee paid for semester 5.",

    "cgpa": 8.5,
    "courses": [
        {
            "course_code": "CS501",
            "course_name": "Database Management Systems",
            "internal_marks": 18,
            "term_work_marks": 22,
            "end_sem_exam_marks": 45,
            "grade": "A"
        },
        {
            "course_code": "CS502",
            "course_name": "Operating Systems",
            "internal_marks": 19,
            "term_work_marks": 23,
            "end_sem_exam_marks": 50,
            "grade": "A+"
        }
    ]
}

*/