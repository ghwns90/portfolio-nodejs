
const authService = require('../services/authService');

const authController = {
    login: async (req, res) => {
        try {
            const {username, password} = req.body;

            const tokens = await authService.login(username, password);

            // 성공 응답
            res.json(tokens);

        }catch(err){

            console.error(err);

            if(err.message === 'USER_NOT_FOUND' || err.message === 'INVALIDE_PASSWORD'){
                return res.status(401).json({ message : '아이디 또는 비밀번호가 틀렸습니다'});
            }

            return res.status(500).json({message: '서버 에러 발생'});
        }
    },
    refresh: async (req, res) => {
        try {
            const {refreshToken} = req.body;
            if(!refreshToken) return res.status(401).json({message: '토큰이 없습니다'});

            const result = await authService.refresh(refreshToken);
            res.json(result);
        } catch (error) {
            //리프레시 토큰이 이상하면 403 -> 프론트에서 로그아웃 처리
            res.status(403).json({message: '유효하지 않은 토큰입니다.'});
        }
    },
    logout: async (req, res) => {
        try{
            // 미들웨어(verifyToken) 에서 통과했다면 req.user.id가 있음
            await authService.logout(req.user.id);
            res.json({message: '로그아웃 성공'});
        }catch(err){
            console.error(err);
            res.status(500).json({message: '에러 발생'});
        }
    }

};

module.exports = authController;