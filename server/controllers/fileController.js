
const fileController = {
  upload: (req, res) => {
    try {      
      if(!req.file){
        return res.status(400).json({ message : '파일이 없습니다.' });
      }

      const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      
      res.json({ url : fileUrl});
    }catch(err){
      console.error(err);
      res.status(500).json({message: '이미지 업로드 실패'});
    }
  },
};

module.exports = fileController;