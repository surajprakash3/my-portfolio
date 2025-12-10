import React from 'react';
import '../styles/ProjectCard.css';

const ProjectCard = ({ project, onEdit, onDelete, isAdmin = false }) => {
  return (
    <div className="project-card">
      {project.image && (
        <img src={project.image} alt={project.title} className="project-image" />
      )}
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        {project.technologies && project.technologies.length > 0 && (
          <div className="tech-stack">
            {project.technologies.map((tech) => (
              <span key={tech} className="tech-badge">
                {tech}
              </span>
            ))}
          </div>
        )}
        <div className="project-links">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          )}
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
              Live Demo
            </a>
          )}
        </div>
        {isAdmin && (
          <div className="admin-actions">
            <button className="edit-btn" onClick={() => onEdit(project)}>
              Edit
            </button>
            <button className="delete-btn" onClick={() => onDelete(project._id)}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
