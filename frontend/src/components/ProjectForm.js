import React, { useState, useEffect } from 'react';
import '../styles/ProjectForm.css';

const ProjectForm = ({ project, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    image: '',
    technologies: '',
    github: '',
    liveLink: '',
    startDate: '',
    endDate: '',
    featured: false,
  });

  useEffect(() => {
    if (project) {
      setFormData({
        ...project,
        technologies: project.technologies?.join(', ') || '',
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      technologies: formData.technologies
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t),
    };
    onSubmit(submitData);
  };

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <h2>{project ? 'Edit Project' : 'Add New Project'}</h2>

      <div className="form-group">
        <label htmlFor="title">Project Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="My Awesome Project"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Short Description *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Brief description of the project"
          rows="3"
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="longDescription">Long Description</label>
        <textarea
          id="longDescription"
          name="longDescription"
          value={formData.longDescription}
          onChange={handleChange}
          placeholder="Detailed description of the project"
          rows="5"
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="image">Project Image URL</label>
        <input
          type="url"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="form-group">
        <label htmlFor="technologies">Technologies (comma-separated)</label>
        <input
          type="text"
          id="technologies"
          name="technologies"
          value={formData.technologies}
          onChange={handleChange}
          placeholder="React, Node.js, MongoDB"
        />
      </div>

      <div className="form-group">
        <label htmlFor="github">GitHub URL</label>
        <input
          type="url"
          id="github"
          name="github"
          value={formData.github}
          onChange={handleChange}
          placeholder="https://github.com/username/repo"
        />
      </div>

      <div className="form-group">
        <label htmlFor="liveLink">Live Demo URL</label>
        <input
          type="url"
          id="liveLink"
          name="liveLink"
          value={formData.liveLink}
          onChange={handleChange}
          placeholder="https://project-demo.com"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate?.split('T')[0] || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate?.split('T')[0] || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group checkbox">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          checked={formData.featured}
          onChange={handleChange}
        />
        <label htmlFor="featured">Featured Project</label>
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">
          {project ? 'Update Project' : 'Add Project'}
        </button>
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
