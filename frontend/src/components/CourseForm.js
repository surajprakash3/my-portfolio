import React, { useState, useEffect } from 'react';
import '../styles/CourseForm.css';

const CourseForm = ({ course, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    provider: '',
    startDate: '',
    completionDate: '',
    certificateUrl: '',
    credentialId: '',
    credentialUrl: '',
    duration: '',
    description: '',
  });

  useEffect(() => {
    if (course) {
      setFormData({
        ...course,
        startDate: course.startDate ? course.startDate.split('T')[0] : '',
        completionDate: course.completionDate ? course.completionDate.split('T')[0] : '',
      });
    }
  }, [course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="course-form" onSubmit={handleSubmit}>
      <h2>{course ? 'Edit Course' : 'Add New Course'}</h2>

      <div className="form-group">
        <label htmlFor="title">Course Title *</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g., Full Stack Web Development" />
      </div>

      <div className="form-group">
        <label htmlFor="provider">Provider *</label>
        <input type="text" id="provider" name="provider" value={formData.provider} onChange={handleChange} required placeholder="e.g., Coursera, Udemy, LinkedIn Learning" />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="completionDate">Completion Date</label>
          <input type="date" id="completionDate" name="completionDate" value={formData.completionDate} onChange={handleChange} />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="duration">Duration</label>
        <input type="text" id="duration" name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g., 8 weeks" />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="credentialId">Credential ID</label>
          <input type="text" id="credentialId" name="credentialId" value={formData.credentialId} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="credentialUrl">Credential URL</label>
          <input type="url" id="credentialUrl" name="credentialUrl" value={formData.credentialUrl} onChange={handleChange} />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="certificateUrl">Certificate URL</label>
        <input type="url" id="certificateUrl" name="certificateUrl" value={formData.certificateUrl} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4"></textarea>
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">{course ? 'Update Course' : 'Add Course'}</button>
        <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default CourseForm;
