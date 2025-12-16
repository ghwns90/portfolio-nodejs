const db = require('../config/db');

const replyModel = {
    // 댓글 쓰기
    create: async (commentId, content, username = '관리자') => {
        const query = `
            INSERT INTO replies (comment_id, content, username)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const values = [commentId, content, username];
        const result = await db.query(query, values);
        return result.rows[0];
    },
    findByCommentsIds: async (commentIds) => {
        if(commentIds.length === 0 ) return [];

        const placeholders = commentIds.map((_, i) => `$${i + 1}`).join(',');
        const query = `SELECT * FROM replies WHERE comment_id IN (${placeholders}) ORDER BY id ASC`;

        const result = await db.query(query, commentIds);
        return result.rows;
    }
};

module.exports = replyModel;