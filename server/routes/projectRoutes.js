const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
// 토큰 확인
const verifyToken = require('../middlewares/authMiddleware');

router.get('/', projectController.getProjects);

// 작성(POST)은 관리자만 (문지기 배치)
// verifyToken을 중간에 끼워넣으면, 얘를 통과해야만 createProject가 실행됨
router.post('/', verifyToken, projectController.createProject);

// 삭제(DELETE)도 관리자만
router.delete('/:id', verifyToken, projectController.deleteProject);

module.exports = router;