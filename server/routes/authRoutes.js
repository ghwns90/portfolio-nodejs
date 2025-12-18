const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const verifyToken = require('../middlewares/authMiddleware');

// POST /api/auth/login 요청이 오면 -> authController.login 실행
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);
router.get('/verify', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Valid token', user: req.user });
});

module.exports = router;