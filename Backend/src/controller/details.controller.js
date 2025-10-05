import db from '../config/db.js'; 

async function getNotifications(req, res) {
  try {
    const [notifications] = await db.query(
      'SELECT * FROM notifications ORDER BY created_at DESC'
    );

    return res.status(200).json(notifications);

  } catch (error) {
    console.error('Error fetching notifications:', error);
    return res.status(500).json({
      message: 'Internal server error.',
    });
  }
}
async function getStudentProfile(req, res) {
  // Assuming req.user.id is set by an auth middleware
  // This 'id' is the user's ID from the 'users' table
  const userId = req.user.id; 

  if (!userId) {
    return res.status(401).json({ message: 'Not authorized, user ID not found in request.' });
  }

  try {
    const [profileData] = await db.query(
      `
      SELECT
          u.name AS fullname,
          s.student_id,
          p.name AS program_name,
          s.current_year,
          s.current_sem,
          s.roll_no,
          s.class,
          s.batch,
          s.pr_number,
          m.name AS mentor_name,
          s.alt_email
      FROM
          users u
      JOIN
          students s ON u.id = s.user_id
      LEFT JOIN
          programs p ON s.program_id = p.id
      LEFT JOIN
          mentors m ON s.mentor_id = m.id
      WHERE
          u.id = ?
      `,
      [userId]
    );

    if (profileData.length === 0) {
      return res.status(404).json({ message: 'Student profile not found.' });
    }

    const studentProfile = profileData[0];

    return res.status(200).json(studentProfile);

  } catch (error) {
    console.error('Error fetching student profile:', error);
    return res.status(500).json({
      message: 'Internal server error.',
    });
  }
}

export { getNotifications,getStudentProfile };