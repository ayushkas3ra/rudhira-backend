const express = require('express');
const router = express.Router();
const {
  getRequests,
  createRequest,
  updateRequestStatus,
  getMyRequests,
  ignoreRequest,
} = require('../controllers/requestController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getRequests).post(protect, createRequest);
router.get('/my', protect, getMyRequests);
router.put('/:id/status', protect, updateRequestStatus);
router.put('/:id/ignore', protect, ignoreRequest);

module.exports = router;
