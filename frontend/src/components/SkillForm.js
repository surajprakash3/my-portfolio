import React, { useState, useEffect } from 'react';
import '../styles/SkillForm.css';

const SkillForm = ({ skill, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend',
    proficiency: 3,
  });

  useEffect(() => {
    if (skill) {
      setFormData(skill);
    }
  }, [skill]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'proficiency' ? parseInt(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="skill-form" onSubmit={handleSubmit}>
      <h2>{skill ? 'Edit Skill' : 'Add New Skill'}</h2>

      <div className="form-group">
        <label htmlFor="name">Skill Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="e.g., React, Python, etc."
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category *</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Tools">Tools</option>
          <option value="Database">Database</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="proficiency">Proficiency Level (1-5) *</label>
        <div className="proficiency-input">
          <input
            type="range"
            id="proficiency"
            name="proficiency"
            min="1"
            max="5"
            value={formData.proficiency}
            onChange={handleChange}
          />
          <span className="proficiency-value">{formData.proficiency}</span>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">
          {skill ? 'Update Skill' : 'Add Skill'}
        </button>
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default SkillForm;
