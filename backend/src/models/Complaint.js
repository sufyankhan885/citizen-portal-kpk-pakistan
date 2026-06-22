const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  complaintId: {
    type: String,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    enum: ['Police', 'Health', 'Education', 'Electricity', 'Water', 'Other'],
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'InProcess', 'Resolved'],
    default: 'Pending',
  },
  citizenId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

complaintSchema.pre('save', async function (next) {
  if (this.complaintId) return next();
  const count = await mongoose.model('Complaint').countDocuments();
  this.complaintId = `CMP-${String(count + 1).padStart(3, '0')}`;
  next();
});

module.exports = mongoose.model('Complaint', complaintSchema);
