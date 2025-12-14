import React from 'react';
import '../styles/InternshipCard.css';

const InternshipCard = ({ internship, onEdit, onDelete, isAdmin = false }) => {
  return (
    <div className="internship-card">
      <div className="internship-header">
        <h3 className="internship-title">{internship.title}</h3>
        {internship.isCurrent && <span className="current-badge">Current</span>}
      </div>
      <h4 className="internship-company">{internship.company}</h4>
      {internship.location && (
        <div className="internship-location">{internship.location}</div>
      )}
      <div className="internship-dates">
        {internship.startDate && new Date(internship.startDate).toLocaleDateString()} -{' '}
        {internship.isCurrent ? 'Present' : (internship.endDate ? new Date(internship.endDate).toLocaleDateString() : '')}
      </div>
      {internship.description && (
        <p className="internship-description">{internship.description}</p>
      )}
      {isAdmin && (
        <div className="admin-actions">
          <button className="edit-btn" onClick={() => onEdit(internship)}>Edit</button>
          <button className="delete-btn" onClick={() => onDelete(internship._id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default InternshipCard;
