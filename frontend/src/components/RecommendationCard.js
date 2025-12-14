import React from 'react';
import '../styles/RecommendationCard.css';

const RecommendationCard = ({ recommendation, onEdit, onDelete, isAdmin = false }) => {
  const stars = Array(recommendation.rating || 5).fill('⭐').join('');
  return (
    <div className="recommendation-card">
      <div className="rec-header">
        <h3 className="rec-text">"{recommendation.recommendation}"</h3>
      </div>
      <div className="rec-by">
        <strong>{recommendation.recommenderName}</strong>
        {recommendation.recommenderTitle && <span className="rec-title">{recommendation.recommenderTitle}</span>}
        {recommendation.recommenderCompany && <span className="rec-company">{recommendation.recommenderCompany}</span>}
      </div>
      {recommendation.relationship && (
        <div className="rec-relationship">{recommendation.relationship}</div>
      )}
      {recommendation.rating && (
        <div className="rec-rating">{stars}</div>
      )}
      <div className="rec-links">
        {recommendation.linkedinUrl && (
          <a href={recommendation.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
        )}
      </div>
      {isAdmin && (
        <div className="admin-actions">
          <button className="edit-btn" onClick={() => onEdit(recommendation)}>Edit</button>
          <button className="delete-btn" onClick={() => onDelete(recommendation._id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default RecommendationCard;
