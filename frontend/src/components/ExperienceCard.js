import React from 'react';
import { formatDate } from '../utils/helpers';
import '../styles/ExperienceCard.css';

const ExperienceCard = ({ experience, onEdit, onDelete, isAdmin = false }) => {
  return (
    <div className="experience-card">
      <div className="experience-header">
        <h3 className="experience-title">{experience.title}</h3>
        {experience.isCurrent && <span className="current-badge">Current</span>}
      </div>
      <h4 className="experience-company">{experience.company}</h4>
      <div className="experience-dates">
        {formatDate(experience.startDate)} -{' '}
        {experience.isCurrent ? 'Present' : formatDate(experience.endDate)}
      </div>
      {experience.description && (
        <p className="experience-description">{experience.description}</p>
      )}
      {isAdmin && (
        <div className="admin-actions">
          <button className="edit-btn" onClick={() => onEdit(experience)}>
            Edit
          </button>
          <button className="delete-btn" onClick={() => onDelete(experience._id)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ExperienceCard;
