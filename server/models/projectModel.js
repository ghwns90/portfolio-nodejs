const db = require('../config/db');

const projectModel = {
  getAll: async () => {
    const result = await db.query('SELECT * FROM projects ORDER BY id DESC');
    return result.rows;
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