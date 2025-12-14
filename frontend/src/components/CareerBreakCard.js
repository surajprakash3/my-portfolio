import React from 'react';
import '../styles/CareerBreakCard.css';

const CareerBreakCard = ({ careerBreak, isAdmin = false, onEdit, onDelete }) => {
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="career-break-card">
      <div className="break-header">
        <h3>{careerBreak.title}</h3>
        {isAdmin && (
          <div className="admin-actions">
            <button className="edit-btn" onClick={() => onEdit(careerBreak)}>Edit</button>
            <button className="delete-btn" onClick={() => onDelete(careerBreak._id)}>Delete</button>
          </div>
        )}
      </div>

      <div className="break-dates">
        {careerBreak.startDate && (
          <span>{formatDate(careerBreak.startDate)}</span>
        )}
        {careerBreak.endDate && (
          <>
            <span> - </span>
            <span>{formatDate(careerBreak.endDate)}</span>
          </>
        )}
      </div>

      {careerBreak.reason && <p className="break-reason">{careerBreak.reason}</p>}
      
      {careerBreak.description && (
        <p className="break-description">{careerBreak.description}</p>
      )}
    </div>
  );
};

export default CareerBreakCard;
