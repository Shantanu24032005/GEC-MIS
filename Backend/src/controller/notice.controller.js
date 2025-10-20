import Notice from '../models/notice.model.js';
import mongoose from 'mongoose';

// Create a new notice
const createNotice = async (req, res) => {
  try {
    const { title, body } = req.body;
    // Assuming admin ID is available in req.admin._id after authentication middleware
    const userid = req.admin?._id;

    if (!userid) {
       return res.status(401).json({ message: 'Admin authentication required.' });
    }

    if (!title || !body) {
      return res.status(400).json({ message: 'Title and body are required.' });
    }

    const newNotice = new Notice({
      userid,
      title,
      body,
    });

    const savedNotice = await newNotice.save();
    res.status(201).json(savedNotice);
  } catch (error) {
    console.error('Error creating notice:', error);
    res.status(500).json({ message: 'Failed to create notice.', error: error.message });
  }
};

// Get all notices
const getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find().populate('userid', 'name email'); // Populate admin details if needed
    res.status(200).json(notices);
  } catch (error) {
    console.error('Error fetching notices:', error);
    res.status(500).json({ message: 'Failed to fetch notices.', error: error.message });
  }
};

// Get a single notice by ID
const getNoticeById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid notice ID format.' });
    }

    const notice = await Notice.findById(id).populate('userid', 'name email'); // Populate admin details

    if (!notice) {
      return res.status(404).json({ message: 'Notice not found.' });
    }

    res.status(200).json(notice);
  } catch (error) {
    console.error('Error fetching notice by ID:', error);
    res.status(500).json({ message: 'Failed to fetch notice.', error: error.message });
  }
};

// Update a notice by ID
const updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;
     // Assuming admin ID is available in req.admin._id after authentication middleware
    const requestingAdminId = req.admin?._id;

    if (!requestingAdminId) {
        return res.status(401).json({ message: 'Admin authentication required.' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid notice ID format.' });
    }

    const noticeToUpdate = await Notice.findById(id);

    if (!noticeToUpdate) {
        return res.status(404).json({ message: 'Notice not found.' });
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (body) updateData.body = body;

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: 'No update data provided.' });
    }

    const updatedNotice = await Notice.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure updates adhere to schema validation
    }).populate('userid', 'name email'); // Populate admin details

    res.status(200).json(updatedNotice);
  } catch (error) {
    console.error('Error updating notice:', error);
    res.status(500).json({ message: 'Failed to update notice.', error: error.message });
  }
};

// Delete a notice by ID
const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    // Assuming admin ID is available in req.admin._id after authentication middleware
    const requestingAdminId = req.admin?._id;

    if (!requestingAdminId) {
        return res.status(401).json({ message: 'Admin authentication required.' });
    }


    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid notice ID format.' });
    }

    const noticeToDelete = await Notice.findById(id);

    if (!noticeToDelete) {
        return res.status(404).json({ message: 'Notice not found.' });
    }
    await Notice.findByIdAndDelete(id);

    res.status(200).json({ message: 'Notice deleted successfully.' });
  } catch (error) {
    console.error('Error deleting notice:', error);
    res.status(500).json({ message: 'Failed to delete notice.', error: error.message });
  }
};

export {
  createNotice,
  getAllNotices,
  getNoticeById,
  updateNotice,
  deleteNotice,
};