import React from 'react';
import '../styles/CourseCard.css';

const CourseCard = ({ course, onEdit, onDelete, isAdmin = false }) => {
  const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : null);
  return (
    <div className="course-card">
      <h3 className="course-title">{course.title}</h3>
      <h4 className="course-provider">{course.provider}</h4>
      {(course.startDate || course.completionDate) && (
        <div className="course-dates">
          {formatDate(course.startDate)}{course.completionDate ? ` - ${formatDate(course.completionDate)}` : ''}
        </div>
      )}
      {course.duration && <div className="course-duration">{course.duration}</div>}
      {course.description && <p className="course-description">{course.description}</p>}
      <div className="course-links">
        {course.credentialUrl && (
          <a href={course.credentialUrl} target="_blank" rel="noopener noreferrer">Credential</a>
        )}
        {course.certificateUrl && (
          <a href={course.certificateUrl} target="_blank" rel="noopener noreferrer">Certificate</a>
        )}
      </div>
      {isAdmin && (
        <div className="admin-actions">
          <button className="edit-btn" onClick={() => onEdit(course)}>Edit</button>
          <button className="delete-btn" onClick={() => onDelete(course._id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
