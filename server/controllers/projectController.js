const projectModel = require('../models/projectModel');

const projectController = {
  getProjects: async (req, res) => {
    try {
      const projects = await projectModel.getAll();
      res.json(projects);
    } catch (err) {
      res.status(500).json({ message: '서버 에러' });
    }
  },
  createProject: async (req, res) => {
    try {
      const newProject = await projectModel.create(req.body);
      res.status(201).json(newProject);
    } catch (err) {
      res.status(500).json({ message: '작성 실패' });
    }
  },
  deleteProject: async (req, res) => {
    try {
      await projectModel.delete(req.params.id);
      res.json({ message: '삭제 성공' });
    } catch (err) {
      res.status(500).json({ message: '삭제 실패' });
    }
  }
};

module.exports = projectController;