import React from 'react';
import '../styles/ServiceCard.css';

const ServiceCard = ({ service, isAdmin = false, onEdit, onDelete }) => {
  return (
    <div className="service-card">
      <div className="service-header">
        <h3>{service.title}</h3>
        {isAdmin && (
          <div className="admin-actions">
            <button className="edit-btn" onClick={() => onEdit(service)}>Edit</button>
            <button className="delete-btn" onClick={() => onDelete(service._id)}>Delete</button>
          </div>
        )}
      </div>

      {service.serviceType && <p className="service-type">{service.serviceType}</p>}
      
      {service.description && (
        <p className="service-description">{service.description}</p>
      )}

      {service.url && (
        <p className="service-url">
          <a href={service.url} target="_blank" rel="noopener noreferrer">
            View Service →
          </a>
        </p>
      )}
    </div>
  );
};

export default ServiceCard;
