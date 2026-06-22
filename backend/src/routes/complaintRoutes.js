const express = require('express');
const router = express.Router();
const { verifyToken, checkAdmin } = require('../middleware/auth');
const {
  submitComplaint,
  trackComplaint,
  getAllComplaints,
  updateStatus,
} = require('../controllers/complaintController');

router.post('/', verifyToken, submitComplaint);
router.get('/:complaintId', verifyToken, trackComplaint);
router.get('/', verifyToken, checkAdmin, getAllComplaints);
router.patch('/:complaintId/status', verifyToken, checkAdmin, updateStatus);

module.exports = router;
