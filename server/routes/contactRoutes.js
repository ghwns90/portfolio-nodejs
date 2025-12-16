const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const verifyToken = require('../middlewares/authMiddleware');

router.post('/', contactController.createMessage);

router.get('/', verifyToken, contactController.getMessages);
router.post('/:id/reply', verifyToken, contactController.replyMessage);
router.delete('/:id', verifyToken, contactController.deleteMessage);

module.exports = router;