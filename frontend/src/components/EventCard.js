import React, { useState } from 'react';
import '../styles/EventCard.css';

const EventCard = ({ event, onEdit, onDelete }) => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const formattedDate = event.eventDate ? new Date(event.eventDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';

  const lastRegDate = event.lastRegistrationDate ? new Date(event.lastRegistrationDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }) : '';

  return (
    <div className="event-card">
      {/* Header */}
      <div className="event-header">
        {event.eventImageUrl && (
          <div className="event-image">
            <img src={event.eventImageUrl} alt={event.eventName} />
          </div>
        )}
        <div>
          <h3>{event.eventName}</h3>
          <div className="event-type-domain">
            <span className="event-type">{event.eventType}</span>
            {event.domain && <span className="event-domain">{event.domain}</span>}
          </div>
        </div>
      </div>

      {/* Short Description */}
      {event.shortDescription && (
        <p className="short-description">{event.shortDescription}</p>
      )}

      {/* Date & Time */}
      <div className="event-section">
        <h4>🗓 Date & Time</h4>
        <div className="event-details">
          <p><strong>Date:</strong> {formattedDate}</p>
          {event.startTime && <p><strong>Time:</strong> {event.startTime} - {event.endTime || 'TBD'}</p>}
          {event.duration && <p><strong>Duration:</strong> {event.duration}</p>}
          {event.timeZone && <p><strong>Timezone:</strong> {event.timeZone}</p>}
        </div>
      </div>

      {/* Location */}
      <div className="event-section">
        <h4>📍 Location</h4>
        <div className="event-details">
          <p><strong>Mode:</strong> {event.mode}</p>
          {event.venue && <p><strong>Venue:</strong> {event.venue}</p>}
          {event.platform && <p><strong>Platform:</strong> {event.platform}</p>}
        </div>
      </div>

      {/* Speakers */}
      {event.speakers && event.speakers.length > 0 && (
        <div className="event-section">
          <h4>🎤 Speakers / Mentors</h4>
          <div className="speakers-list">
            {event.speakers.map((speaker, idx) => (
              <div key={idx} className="speaker-card">
                <div>
                  {speaker.photoUrl && (
                    <div className="speaker-photo">
                      <img src={speaker.photoUrl} alt={speaker.name} />
                    </div>
                  )}
                  <p className="speaker-name">{speaker.name}</p>
                  {speaker.designation && <p className="speaker-info">{speaker.designation}</p>}
                  {speaker.organization && <p className="speaker-info">{speaker.organization}</p>}
                </div>
                {(speaker.linkedinUrl || speaker.githubUrl) && (
                  <div className="speaker-links">
                    {speaker.linkedinUrl && (
                      <a href={speaker.linkedinUrl} target="_blank" rel="noopener noreferrer" title="LinkedIn">in</a>
                    )}
                    {speaker.githubUrl && (
                      <a href={speaker.githubUrl} target="_blank" rel="noopener noreferrer" title="GitHub">gh</a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Eligibility */}
      {event.eligibility && (
        <div className="event-section">
          <h4>🎯 Eligibility & Audience</h4>
          <p>{event.eligibility}</p>
          {event.prerequisites && (
            <p><strong>Prerequisites:</strong> {event.prerequisites}</p>
          )}
        </div>
      )}

      {/* Agenda */}
      {event.agenda && event.agenda.length > 0 && (
        <div className="event-section">
          <h4>🧠 Event Agenda</h4>
          <div className="agenda-list">
            {event.agenda.map((item, idx) => (
              <div key={idx} className="agenda-item">
                <div className="agenda-time">
                  {item.startTime && <span>{item.startTime}</span>}
                  {item.endTime && <span>- {item.endTime}</span>}
                </div>
                <div className="agenda-content">
                  <p className="agenda-session">{item.session}</p>
                  <p className="agenda-topic">{item.topic}</p>
                  {item.speaker && <p className="agenda-speaker">Speaker: {item.speaker}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Registration */}
      <div className="event-section">
        <h4>💰 Registration</h4>
        <div className="event-details">
          <p><strong>Fee:</strong> {event.registrationFee}</p>
          {lastRegDate && <p><strong>Last Date to Register:</strong> {lastRegDate}</p>}
        </div>
        {event.registerUrl && (
          <a href={event.registerUrl} target="_blank" rel="noopener noreferrer" className="register-btn">
            Register Now
          </a>
        )}
      </div>

      {/* Benefits */}
      {(event.benefits?.length > 0 || event.learningOutcomes?.length > 0) && (
        <div className="event-section">
          <h4>🏆 Benefits & Learning</h4>
          {event.benefits && event.benefits.length > 0 && (
            <div>
              <p className="section-subtitle">Benefits:</p>
              <ul className="benefits-list">
                {event.benefits.map((b, idx) => (
                  <li key={idx}>{b.benefit}</li>
                ))}
              </ul>
            </div>
          )}
          {event.learningOutcomes && event.learningOutcomes.length > 0 && (
            <div>
              <p className="section-subtitle">Learning Outcomes:</p>
              <ul className="learning-list">
                {event.learningOutcomes.map((outcome, idx) => (
                  <li key={idx}>{outcome}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Support & FAQs */}
      <div className="event-section">
        <h4>📞 Support</h4>
        <div className="event-details">
          {event.contactEmail && <p><strong>Email:</strong> <a href={`mailto:${event.contactEmail}`}>{event.contactEmail}</a></p>}
          {event.contactPhone && <p><strong>Phone:</strong> <a href={`tel:${event.contactPhone}`}>{event.contactPhone}</a></p>}
        </div>

        {event.faqs && event.faqs.length > 0 && (
          <div className="faqs-section">
            <p className="section-subtitle">FAQs</p>
            <div className="faqs-list">
              {event.faqs.map((faq, idx) => (
                <div key={idx} className="faq-item">
                  <button
                    className="faq-question"
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  >
                    {faq.question}
                    <span className={`faq-toggle ${expandedFaq === idx ? 'open' : ''}`}>▼</span>
                  </button>
                  {expandedFaq === idx && (
                    <div className="faq-answer">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      {(onEdit || onDelete) && (
        <div className="event-actions">
          {onEdit && (
            <button className="edit-btn" onClick={() => onEdit(event)}>Edit</button>
          )}
          {onDelete && (
            <button className="delete-btn" onClick={() => onDelete(event._id)}>Delete</button>
          )}
        </div>
      )}
    </div>
  );
};

export default EventCard;
