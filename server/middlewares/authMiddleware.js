const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {

    // 요청 헤더에서 토큰을 꺼낸다 ("Authorization: Bearer <토큰값>" 형태)
    const authHeader = req.headers['authorization'];

    // 토큰이 아예 없으면? 401 (로그인 필요)
        if(!authHeader){
            return res.status(401).json({message: '로그인을 해주세요'});
        }
        // 토큰값만 가져오기
        const token = authHeader.split(' ')[1];
        // 토큰이 진짜 인지 검사 (비밀키 사용)
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if(err){
                return res.status(403).json({message: '유효하지 않은 토큰입니다.'});
            }
            // 성공, 토큰에 들어있던 정보를 req에 붙여준다.
            // 이렇게 하면 다음 Controller에서 누가 로그인했는지 알 수 있다.
            req.user = user;

            // 통과
            next();
        });
};

module.exports = verifyToken;