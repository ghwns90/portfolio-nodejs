const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 저장소 설정 로직
const storage = multer.diskStorage({
  destination: function (req, file, cb){
    const uploadPath = 'uploads/';
    if(!fs.existsSync(uploadPath)){
      fs.mkdirSync(uploadPath);
    }

    cb(null, uploadPath);
  },
  filename: function(req, file, cb){
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

// 실제 사용할 upload 객체 생성
const upload = multer({storage: storage});

module.exports = upload;