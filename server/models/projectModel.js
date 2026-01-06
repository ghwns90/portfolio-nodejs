const db = require('../config/db');

const projectModel = {
  getAll: async () => {
    // featured_type 순서대로 (main -> second -> none) 가져오고, 나머지는 최신순
    const query = `
      SELECT * FROM projects
      ORDER BY 
        CASE
          WHEN featured_type = 'main' THEN 1
          WHEN featured_type = 'second' THEN 2
          ELSE 3
        END, id DESC  
    `;

    const result = await db.query(query);
    return result.rows;
  },
  // 메인, 서브 설정
  updateFeatured: async (id, type) => {
    // main 설정시, 기존 main을 none으로 초기화
    if(type === 'main' || type === 'second'){
      await db.query('UPDATE projects SET featured_type = $1 WHERE featured_type = $2', ['none', type]);
    }

    const query = 'UPDATE projects SET featured_type = $1 WHERE id = $2 RETURNING *';
    const result = await db.query(query, [type, id]);
    return result.rows[0];
  },

  create: async (data) => {
    const query = `
      INSERT INTO projects (title, description, image_url, tech_stack, github_url, demo_url) 
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `;
    const values = [data.title, data.description, data.image_url, data.tech_stack, data.github_url, data.demo_url];
    const result = await db.query(query, values);
    return result.rows[0];
  },
  delete: async (id) => {
    await db.query('DELETE FROM projects WHERE id = $1', [id]);
  }
};

module.exports = projectModel;