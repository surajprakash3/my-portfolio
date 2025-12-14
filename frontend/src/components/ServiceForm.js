import React, { useState } from 'react';
import '../styles/ServiceForm.css';

const ServiceForm = ({ service, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: service?.title || '',
    description: service?.description || '',
    serviceType: service?.serviceType || '',
    url: service?.url || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="service-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Service Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="e.g., Web Development, Consulting"
        />
      </div>

      <div className="form-group">
        <label htmlFor="serviceType">Service Type</label>
        <input
          type="text"
          id="serviceType"
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          placeholder="e.g., Freelance, Consulting"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your service"
          rows="4"
        />
      </div>

      <div className="form-group">
        <label htmlFor="url">URL</label>
        <input
          type="url"
          id="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          placeholder="https://example.com"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">
          {service ? 'Update Service' : 'Add Service'}
        </button>
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;
