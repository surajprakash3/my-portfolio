import React from 'react';
import '../styles/CertificateCard.css';

const CertificateCard = ({ certificate, onEdit, onDelete, isAdmin = false }) => {
  return (
    <div className="certificate-card">
      <h3 className="certificate-title">{certificate.title}</h3>
      <h4 className="certificate-issuer">{certificate.issuer}</h4>
      <div className="certificate-dates">
        {certificate.issueDate && new Date(certificate.issueDate).toLocaleDateString()} {certificate.expiryDate ? `- ${new Date(certificate.expiryDate).toLocaleDateString()}` : ''}
      </div>
      {certificate.description && (
        <p className="certificate-description">{certificate.description}</p>
      )}
      <div className="certificate-links">
        {certificate.credentialId && <span className="credential-id">ID: {certificate.credentialId}</span>}
        {certificate.credentialUrl && (
          <a href={certificate.credentialUrl} target="_blank" rel="noopener noreferrer">Verify</a>
        )}
        {certificate.fileUrl && (
          <a href={certificate.fileUrl} target="_blank" rel="noopener noreferrer">View File</a>
        )}
      </div>
      {isAdmin && (
        <div className="admin-actions">
          <button className="edit-btn" onClick={() => onEdit(certificate)}>Edit</button>
          <button className="delete-btn" onClick={() => onDelete(certificate._id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default CertificateCard;
