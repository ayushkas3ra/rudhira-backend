const express = require('express');
const router = express.Router();
const {
  updateUserProfile,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const upload = require('../middleware/uploadMiddleware');

router.route('/profile').put(protect, upload.single('image'), updateUserProfile);

module.exports = router;
