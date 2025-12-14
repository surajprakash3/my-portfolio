import React, { useState, useEffect } from 'react';
import '../styles/CertificateForm.css';

const CertificateForm = ({ certificate, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    issueDate: '',
    expiryDate: '',
    credentialId: '',
    credentialUrl: '',
    description: '',
    file: null,
  });

  useEffect(() => {
    if (certificate) {
      setFormData({
        ...certificate,
        issueDate: certificate.issueDate?.split('T')[0] || '',
        expiryDate: certificate.expiryDate?.split('T')[0] || '',
      });
    }
  }, [certificate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData({ ...formData, file: files && files[0] ? files[0] : null });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="certificate-form" onSubmit={handleSubmit}>
      <h2>{certificate ? 'Edit Certificate' : 'Add New Certificate'}</h2>

      <div className="form-group">
        <label htmlFor="title">Certificate Title *</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g., AWS Cloud Practitioner" />
      </div>

      <div className="form-group">
        <label htmlFor="issuer">Issuer *</label>
        <input type="text" id="issuer" name="issuer" value={formData.issuer} onChange={handleChange} required placeholder="e.g., Amazon Web Services" />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="issueDate">Issue Date *</label>
          <input type="date" id="issueDate" name="issueDate" value={formData.issueDate} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="expiryDate">Expiry Date</label>
          <input type="date" id="expiryDate" name="expiryDate" value={formData.expiryDate} onChange={handleChange} />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="credentialId">Credential ID</label>
          <input type="text" id="credentialId" name="credentialId" value={formData.credentialId} onChange={handleChange} placeholder="ID from issuer" />
        </div>
        <div className="form-group">
          <label htmlFor="credentialUrl">Verification URL</label>
          <input type="url" id="credentialUrl" name="credentialUrl" value={formData.credentialUrl} onChange={handleChange} placeholder="https://verify.example.com" />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Details or specialization"></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="file">Certificate File (PDF/Image)</label>
        <input type="file" id="file" name="file" accept="application/pdf,image/*" onChange={handleChange} />
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">{certificate ? 'Update Certificate' : 'Add Certificate'}</button>
        <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default CertificateForm;
