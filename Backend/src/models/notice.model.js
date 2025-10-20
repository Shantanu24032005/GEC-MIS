import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin', // Assuming your admin model is named 'Admin'
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Notice title is required.'],
    trim: true,
  },
  body: {
    type: String,
    required: [true, 'Notice body is required.'],
    trim: true,
  },
  dateOfPublish: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

const Notice = mongoose.model('Notice', noticeSchema);

export default Notice;