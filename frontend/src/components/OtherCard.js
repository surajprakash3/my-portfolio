import React from 'react';
import '../styles/OtherCard.css';

const OtherCard = ({ item, onEdit, onDelete, isAdmin = false }) => {
  const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : null);
  return (
    <div className="other-card">
      <div className="other-header">
        <h3 className="other-title">{item.title}</h3>
        <span className="other-type">{item.type.replace('_', ' ')}</span>
      </div>
      {item.subtitle && <h4 className="other-subtitle">{item.subtitle}</h4>}
      {(item.date || item.endDate) && (
        <div className="other-dates">
          {formatDate(item.date)}{item.endDate ? ` - ${formatDate(item.endDate)}` : ''}
        </div>
      )}
      {item.description && <p className="other-description">{item.description}</p>}
      <div className="other-links">
        {item.url && (
          <a href={item.url} target="_blank" rel="noopener noreferrer">View</a>
        )}
      </div>
      {isAdmin && (
        <div className="admin-actions">
          <button className="edit-btn" onClick={() => onEdit(item)}>Edit</button>
          <button className="delete-btn" onClick={() => onDelete(item._id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default OtherCard;
