const express = require('express');
const checkAuth = require('../middleware/checkAuth');
const Project = require('../models/Project');

const router = express.Router();

// Get all projects for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.params.userId });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
});

// Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project', error: error.message });
  }
});

// Create project
router.post('/', checkAuth, async (req, res) => {
  try {
    const userId = req.body.userId || req.userId;
    const project = new Project({
      userId,
      ...req.body,
    });
    await project.save();
    res.status(201).json({
      message: 'Project created successfully',
      project,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
});

// Update project
router.put('/:id', checkAuth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Allow if admin or owner
    if (!req.isAdmin && project.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({
      message: 'Project updated successfully',
      project: updatedProject,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error: error.message });
  }
});

// Delete project
router.delete('/:id', checkAuth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Allow if admin or owner
    if (!req.isAdmin && project.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
});

module.exports = router;
