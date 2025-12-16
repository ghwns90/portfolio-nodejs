const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET;

const authService = {
    login: async (username, password) => {

        const user = await userModel.findByUsername(username);

        if(!user){
            throw new Error('USER_NOT_FOUND');// 에러를 던짐 controller가 잡을것
        }

        // 비밀번호 일치 여부 확인
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            throw new Error('INVALID_PASSWORD');
        }

        // 통과 후 토큰 발급
        const token = jwt.sign(
            {id: user.id, username: user.username},
            JWT_SECRET,
            {expiresIn: '1h'}
        );

        return token;
    }
}

module.exports = authService;