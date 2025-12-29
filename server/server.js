// express 모듈을 불러온다
const express = require('express');
const path = require('path');
const db = require('./config/db');
const upload = require('./config/multerConfig'); // 파일 업로드 설정
const cors = require('cors');
//------------ routes------------------------
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const profileRoutes = require('./routes/profileRoutes');
const commentRoutes = require('./routes/commentRoutes');
const contactRoutes = require('./routes/contactRoutes');
const fileController = require('./controllers/fileController');
// express 애플리케이션을 생성한다
const app = express();
// 서버가 사용할 포트 번호를 설정
const port = 5000;

app.use(express.json());
app.use(cors());    //cors 모든 요청 허용하기

// 정적 파일 제공 설정 (이게 있어야 브라우저에서 이미지를 볼 수 있음)
// 브라우저가 "http://localhost:3000/uploads/파일명.jpg"로 요청하면 uploads 폴더를 보여줌
app.use('/uploads', express.static(path.join('uploads')));

// /api/auth 로 시작하는 요청은 authRoutes로 보내라
app.use('/api/auth', authRoutes);
// --------------프로필-------------------------------------------------
app.use('/api/profile', profileRoutes);
// --------------프로젝트 ---------------------------------------------
app.use('/api/projects', projectRoutes);
// -------------- 방명록 ----------------------------------------------
app.use('/api/comments', commentRoutes);
// ----------------Contact 이메일----------------------------------------
app.use('/api/contact', contactRoutes);
// ----------------file 업로드 ------------------------------------------
// 주소확인 -> 미들웨어 파일을 저장 multer 설정 객체가 upload -> 파일컨트롤러의 upload 
app.post('/api/upload', upload.single('file'), fileController.upload);


app.listen(port, ()=> {
    console.log(`서버가 http://localhost:${port}에서 실행중입니다.`);
});



