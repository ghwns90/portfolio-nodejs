const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const verifyToken = require('../middlewares/authMiddleware');

router.get('/', commentController.getComments);
router.post('/', commentController.createComment);
router.post('/:id/replies', verifyToken, commentController.createReply);
router.delete('/:id', commentController.deleteComment);
module.exports = router;