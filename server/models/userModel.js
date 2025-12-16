const db = require('../config/db');

// 스프링의 UserRepository 인터페이스 구현과 같다
const userModel = {
    findByUsername: async (username) => {
        const query = 'SELECT * FROM users WHERE username = $1';
        const result = await db.query(query, [username]);
        return result.rows[0];
    },
};

module.exports = userModel;