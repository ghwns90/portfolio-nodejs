const db = require('../config/db');

const profileModel = {
    // 프로필 가져오기
    get: async () => {
        const query = 'SELECT * FROM profile WHERE id = 1';
        const result = await db.query(query);
        return result.rows[0];
    },
    // 프로필 업데이트
    update: async (data) => {
        const query = `
            UPDATE profile
            SET name=$1, title=$2, description=$3, profile_image_url=$4, github_url=$5
            WHERE id=1
            RETURNING *
        `;
        const values = [data.name, data.title, data.description, data.profile_image_url, data.github_url];
        const result = await db.query(query, values);

        return result.rows[0];
    },
}

module.exports = profileModel;