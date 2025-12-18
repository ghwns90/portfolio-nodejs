const db = require('../config/db');

// 스프링의 UserRepository 인터페이스 구현과 같다
const userModel = {
    findByUsername: async (username) => {
        const query = 'SELECT * FROM users WHERE username = $1';
        const result = await db.query(query, [username]);
        return result.rows[0];
    },
    // 리프레시 토큰 저장
    updateRefreshToken: async (id, token) => {
        const query = 'UPDATE users SET refresh_token = $1 WHERE id = $2';
        await db.query(query, [token, id]);
    },
    // 리프레시 토큰으로 유저 찾기(토큰 갱신 시)
    findByRefreshToken: async (token) => {
        const query = 'SELECT * FROM users WHERE refresh_token = $1';
        const result = await db.query(query, [token]);
        return result.rows[0];
    },
    // 리프레시 토큰 삭제
    clearRefreshToken: async (id) => {
        const query = 'UPDATE users SET refresh_token = NULL WHERE id = $1';
        await db.query(query, [id]);
    }
};

module.exports = userModel;