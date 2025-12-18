const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

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

        // accessToken 생성
        const accessToken = jwt.sign(
            {id: user.id, username: user.username},
            JWT_SECRET,
            {expiresIn: '1h'}
        );
        // refreshToken 도 같이 생성
        const refreshToken = jwt.sign(
            {id: user.id},
            JWT_REFRESH_SECRET,
            {expiresIn: '14d'}
        );
        // refreshToken 을 DB에 저장
        await userModel.updateRefreshToken(user.id, refreshToken);
        
        return { accessToken, refreshToken };
    },
    refresh: async (refreshToken) => {
        try {
            jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        } catch (error) {
            throw new Error('INVALID_TOKEN');
        }

        // DB에 저장된 토큰과 일치하는지 확인
        const user= await userModel.findByRefreshToken(refreshToken);
        if(!user) throw new Error('TOKEN_MISMATCH'); // DB에 없거나 다르면 에러

        const newAccessToken = jwt.sign(
            {id: user.id, username: user.username},
            JWT_SECRET,
            {expiresIn: '1h'},
        )

        return { accessToken: newAccessToken};
    },
    logout: async (userId) => {
        await userModel.clearRefreshToken(userId);
    },
}

module.exports = authService;