import React, { useState, useEffect } from 'react';
import '../styles/ExperienceForm.css';

const ExperienceForm = ({ experience, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
  });

  useEffect(() => {
    if (experience) {
      setFormData({
        ...experience,
        startDate: experience.startDate?.split('T')[0] || '',
        endDate: experience.endDate?.split('T')[0] || '',
      });
    }
  }, [experience]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="experience-form" onSubmit={handleSubmit}>
      <h2>{experience ? 'Edit Experience' : 'Add New Experience'}</h2>

      <div className="form-group">
        <label htmlFor="title">Job Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="e.g., Junior Developer"
        />
      </div>

      <div className="form-group">
        <label htmlFor="company">Company *</label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
          placeholder="Company Name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="What did you do in this role?"
          rows="4"
        ></textarea>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="startDate">Start Date *</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            disabled={formData.isCurrent}
          />
        </div>
      </div>

      <div className="form-group checkbox">
        <input
          type="checkbox"
          id="isCurrent"
          name="isCurrent"
          checked={formData.isCurrent}
          onChange={handleChange}
        />
        <label htmlFor="isCurrent">Currently working here</label>
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">
          {experience ? 'Update Experience' : 'Add Experience'}
        </button>
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ExperienceForm;
