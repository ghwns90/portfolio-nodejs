const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/auth/login 요청이 오면 -> authController.login 실행
router.post('/login', authController.login);

module.exports = router;