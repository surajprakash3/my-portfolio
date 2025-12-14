import React, { useState, useEffect } from 'react';
import '../styles/OtherForm.css';

const OtherForm = ({ item, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    type: 'volunteer',
    title: '',
    subtitle: '',
    date: '',
    endDate: '',
    url: '',
    description: '',
  });

  useEffect(() => {
    if (item) {
      setFormData({
        ...item,
        date: item.date ? item.date.split('T')[0] : '',
        endDate: item.endDate ? item.endDate.split('T')[0] : '',
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="other-form" onSubmit={handleSubmit}>
      <h2>{item ? 'Edit Item' : 'Add New Item'}</h2>

      <div className="form-group">
        <label htmlFor="type">Type *</label>
        <select id="type" name="type" value={formData.type} onChange={handleChange} required>
          <option value="volunteer">Volunteer</option>
          <option value="publication">Publication</option>
          <option value="patent">Patent</option>
          <option value="honor">Honors & Awards</option>
          <option value="test_score">Test Score</option>
          <option value="language">Language</option>
          <option value="organization">Organization</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="subtitle">Subtitle</label>
        <input type="text" id="subtitle" name="subtitle" value={formData.subtitle} onChange={handleChange} placeholder="Org, publisher, level or score" />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="url">URL</label>
        <input type="url" id="url" name="url" value={formData.url} onChange={handleChange} placeholder="Link to publication/verification" />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4"></textarea>
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">{item ? 'Update Item' : 'Add Item'}</button>
        <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default OtherForm;
