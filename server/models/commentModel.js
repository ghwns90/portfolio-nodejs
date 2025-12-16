const db = require('../config/db');

const commentModel = {
    // 리스트 
    getAll: async (limit, offset) => {
        const query = 'SELECT * FROM comments ORDER BY id DESC LIMIT $1 OFFSET $2';
        const result = await db.query(query, [limit, offset]);
        return result.rows;
    },
    // 전체 글 개수 세기(페이지 번호 계산용)
    countAll: async () => {
        const query = 'SELECT COUNT(*) FROM comments';
        const result = await db.query(query);
        // count 결과는 숫자로 변환(parseInt)
        return parseInt(result.rows[0].count);
    },
    // 작성
    create: async (data) => {
        const query = `
            INSERT INTO comments (username, password, content) 
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const values = [data.username, data.password, data.content];
        const result = await db.query(query, values);
        return result.rows[0];
    },
    // id로 비밀번호 가져오기
    findById: async (id) => {
        const query = `
            SELECT * FROM comments WHERE id = $1
        `;
        const values = [id];
        const result = await db.query(query, values);

        return result.rows[0];
    },
    // 삭제
    delete: async (id) => {
        const query = 'DELETE FROM comments WHERE id = $1';
        const values = [id];
        const result = await db.query(query, values);
    },

};

module.exports = commentModel;