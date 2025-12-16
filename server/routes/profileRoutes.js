const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const verifyToken = require('../middlewares/authMiddleware');

router.get('/', profileController.getProfile);
router.put('/', verifyToken, profileController.updateProfile);

module.exports = router;