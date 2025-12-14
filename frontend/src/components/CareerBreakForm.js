import React, { useState } from 'react';
import '../styles/CareerBreakForm.css';

const CareerBreakForm = ({ careerBreak, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: careerBreak?.title || '',
    reason: careerBreak?.reason || '',
    startDate: careerBreak?.startDate ? careerBreak.startDate.split('T')[0] : '',
    endDate: careerBreak?.endDate ? careerBreak.endDate.split('T')[0] : '',
    description: careerBreak?.description || '',
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
    <form className="career-break-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Break Type *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="e.g., Sabbatical, Parental Leave"
        />
      </div>

      <div className="form-group">
        <label htmlFor="reason">Reason</label>
        <input
          type="text"
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          placeholder="Why you took a break"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
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
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Details about your career break"
          rows="4"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">
          {careerBreak ? 'Update Break' : 'Add Break'}
        </button>
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CareerBreakForm;
