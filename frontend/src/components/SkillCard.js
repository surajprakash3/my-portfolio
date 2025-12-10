import React from 'react';
import { getProficiencyLabel } from '../utils/helpers';
import '../styles/SkillCard.css';

const SkillCard = ({ skill, onEdit, onDelete, isAdmin = false }) => {
  return (
    <div className="skill-card">
      <div className="skill-header">
        <h4 className="skill-name">{skill.name}</h4>
        <span className="skill-category">{skill.category}</span>
      </div>
      <div className="skill-proficiency">
        <div className="proficiency-bar">
          <div
            className="proficiency-fill"
            style={{ width: `${(skill.proficiency / 5) * 100}%` }}
          ></div>
        </div>
        <span className="proficiency-label">
          {getProficiencyLabel(skill.proficiency)}
        </span>
      </div>
      {isAdmin && (
        <div className="admin-actions">
          <button className="edit-btn" onClick={() => onEdit(skill)}>
            Edit
          </button>
          <button className="delete-btn" onClick={() => onDelete(skill._id)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default SkillCard;
