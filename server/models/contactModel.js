const db = require('../config/db');

const contactModel = {
    //메시지 저장
    create: async (data) => {

        const query = `
            INSERT INTO messages (name, email, subject, message)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const values = [data.name, data.email, data.subject, data.message];
        const result = await db.query(query, values);
        return result.rows[0];
    },
    getAll: async () => {

        const query = `SELECT * FROM messages ORDER BY id DESC`;
        const result = await db.query(query);
        return result.rows;
    },
    // 답장 완료 상태로 변경
    markAsReplied: async (id) => {

        const query = `
            UPDATE messages
            SET is_replied = true
            WHERE id = $1
        `;
        await db.query(query, [id]);
    },
    delete: async () => {
        await db.query('DELETE FROM messages WHERE id=$1', [id]);
    }
};

module.exports = contactModel;