import React, { useState, useEffect } from 'react';
import '../styles/RecommendationForm.css';

const RecommendationForm = ({ recommendation, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    recommenderName: '',
    recommenderTitle: '',
    recommenderCompany: '',
    relationship: 'Colleague',
    recommendation: '',
    rating: 5,
    linkedinUrl: '',
  });

  useEffect(() => {
    if (recommendation) {
      setFormData(recommendation);
    }
  }, [recommendation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="recommendation-form" onSubmit={handleSubmit}>
      <h2>{recommendation ? 'Edit Recommendation' : 'Add New Recommendation'}</h2>

      <div className="form-group">
        <label htmlFor="recommenderName">Recommender Name *</label>
        <input type="text" id="recommenderName" name="recommenderName" value={formData.recommenderName} onChange={handleChange} required />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="recommenderTitle">Title</label>
          <input type="text" id="recommenderTitle" name="recommenderTitle" value={formData.recommenderTitle} onChange={handleChange} placeholder="e.g., Senior Developer" />
        </div>
        <div className="form-group">
          <label htmlFor="relationship">Relationship</label>
          <select id="relationship" name="relationship" value={formData.relationship} onChange={handleChange}>
            <option value="Manager">Manager</option>
            <option value="Colleague">Colleague</option>
            <option value="Report">Report</option>
            <option value="Mentor">Mentor</option>
            <option value="Client">Client</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="recommenderCompany">Company</label>
        <input type="text" id="recommenderCompany" name="recommenderCompany" value={formData.recommenderCompany} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="recommendation">Recommendation Text *</label>
        <textarea id="recommendation" name="recommendation" value={formData.recommendation} onChange={handleChange} required rows="5" placeholder="Share the recommendation message..."></textarea>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <select id="rating" name="rating" value={formData.rating} onChange={handleChange}>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="linkedinUrl">LinkedIn URL</label>
          <input type="url" id="linkedinUrl" name="linkedinUrl" value={formData.linkedinUrl} onChange={handleChange} />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">{recommendation ? 'Update Recommendation' : 'Add Recommendation'}</button>
        <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default RecommendationForm;
