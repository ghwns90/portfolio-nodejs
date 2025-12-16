
const authService = require('../services/authService');

const authController = {
    login: async (req, res) => {
        try {
            const {username, password} = req.body;

            const token = await authService.login(username, password);

            // 성공 응답
            res.status(200).json({
                message: '로그인 성공',
                token: token
            });

        }catch(err){

            console.error(err);

            if(err.message === 'USER_NOT_FOUND' || err.message === 'INVALIDE_PASSWORD'){
                return res.status(401).json({ message : '아이디 또는 비밀번호가 틀렸습니다'});
            }

            return res.status(500).json({message: '서버 에러 발생'});
        }
    }
};

module.exports = authController;