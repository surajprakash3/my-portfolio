import React, { useState, useEffect } from 'react';
import '../styles/EventForm.css';

const EventForm = ({ onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    eventName: '',
    eventType: 'Workshop',
    shortDescription: '',
    domain: '',
    eventImage: null,
    eventImagePreview: '',
    eventDate: '',
    startTime: '',
    endTime: '',
    duration: '',
    timeZone: '',
    mode: 'Offline',
    venue: '',
    platform: '',
    speakers: [],
    eligibility: '',
    prerequisites: '',
    agenda: [],
    registrationFee: 'Free',
    lastRegistrationDate: '',
    registerUrl: '',
    benefits: [],
    contactEmail: '',
    contactPhone: '',
    faqs: [],
    learningOutcomes: [],
  });

  const [currentSpeaker, setCurrentSpeaker] = useState({
    name: '',
    designation: '',
    organization: '',
    linkedinUrl: '',
    githubUrl: '',
    photoUrl: '',
  });

  const [currentBenefit, setCurrentBenefit] = useState('');
  const [currentLearningOutcome, setCurrentLearningOutcome] = useState('');
  const [currentAgendaItem, setCurrentAgendaItem] = useState({
    session: '',
    startTime: '',
    endTime: '',
    topic: '',
    speaker: '',
  });
  const [currentFaq, setCurrentFaq] = useState({
    question: '',
    answer: '',
  });

  const eventTypes = [
    'Hackathon',
    'Coding Competition',
    'Web Development Challenge',
    'App Development Contest',
    'AI / ML Workshop',
    'Cloud Computing Workshop',
    'Cybersecurity Bootcamp',
    'DevOps Hands-on Lab',
    'Blockchain Session',
    'Tech Seminar',
    'Guest Lecture',
    'Tech Talk',
    'Webinar',
    'Panel Discussion',
    'Fireside Chat',
    'Workshop',
    'Bootcamp',
    'Lab Session',
    'Code-along Session',
    'Project Build Session',
    'Startup Pitch',
    'Ideathon',
    'Product Launch',
    'Innovation Challenge',
    'Entrepreneurship Meet',
    'Developer Meetup',
    'Tech Community Meetup',
    'Networking Session',
    'Open Source Contribution Drive',
    'Capture The Flag (CTF)',
    'Quiz Competition',
    'Debugging Contest',
    'Speed Coding',
    'Tech Fest',
    'Orientation Program',
    'Symposium',
    'Research Paper Presentation',
    'Poster Presentation',
    'Virtual Hackathon',
    'Online Webinar',
    'Live Coding Session',
    'Virtual Conference',
    'Tech Conference',
    'Developer Conference',
    'Product Demo',
    'Training Program',
    'Certification Workshop',
  ];

  useEffect(() => {
    if (initialData) {
      setFormData({
        eventName: initialData.eventName || '',
        eventType: initialData.eventType || 'Workshop',
        shortDescription: initialData.shortDescription || '',
        domain: initialData.domain || '',
        eventDate: initialData.eventDate ? initialData.eventDate.split('T')[0] : '',
        startTime: initialData.startTime || '',
        endTime: initialData.endTime || '',
        duration: initialData.duration || '',
        timeZone: initialData.timeZone || '',
        mode: initialData.mode || 'Offline',
        venue: initialData.venue || '',
        platform: initialData.platform || '',
        speakers: initialData.speakers || [],
        eligibility: initialData.eligibility || '',
        prerequisites: initialData.prerequisites || '',
        agenda: initialData.agenda || [],
        registrationFee: initialData.registrationFee || 'Free',
        lastRegistrationDate: initialData.lastRegistrationDate ? initialData.lastRegistrationDate.split('T')[0] : '',
        registerUrl: initialData.registerUrl || '',
        benefits: initialData.benefits || [],
        contactEmail: initialData.contactEmail || '',
        contactPhone: initialData.contactPhone || '',
        faqs: initialData.faqs || [],
        learningOutcomes: initialData.learningOutcomes || [],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          eventImage: file,
          eventImagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSpeakerPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentSpeaker(prev => ({ ...prev, photoUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addSpeaker = () => {
    if (currentSpeaker.name) {
      setFormData(prev => ({
        ...prev,
        speakers: [...prev.speakers, { ...currentSpeaker }]
      }));
      setCurrentSpeaker({ name: '', designation: '', organization: '', linkedinUrl: '', githubUrl: '', photoUrl: '' });
    }
  };

  const removeSpeaker = (index) => {
    setFormData(prev => ({
      ...prev,
      speakers: prev.speakers.filter((_, i) => i !== index)
    }));
  };

  const addBenefit = () => {
    if (currentBenefit.trim()) {
      setFormData(prev => ({
        ...prev,
        benefits: [...prev.benefits, { benefit: currentBenefit }]
      }));
      setCurrentBenefit('');
    }
  };

  const removeBenefit = (index) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  const addLearningOutcome = () => {
    if (currentLearningOutcome.trim()) {
      setFormData(prev => ({
        ...prev,
        learningOutcomes: [...prev.learningOutcomes, currentLearningOutcome]
      }));
      setCurrentLearningOutcome('');
    }
  };

  const removeLearningOutcome = (index) => {
    setFormData(prev => ({
      ...prev,
      learningOutcomes: prev.learningOutcomes.filter((_, i) => i !== index)
    }));
  };

  const addAgendaItem = () => {
    if (currentAgendaItem.session && currentAgendaItem.topic) {
      setFormData(prev => ({
        ...prev,
        agenda: [...prev.agenda, { ...currentAgendaItem }]
      }));
      setCurrentAgendaItem({ session: '', startTime: '', endTime: '', topic: '', speaker: '' });
    }
  };

  const removeAgendaItem = (index) => {
    setFormData(prev => ({
      ...prev,
      agenda: prev.agenda.filter((_, i) => i !== index)
    }));
  };

  const addFaq = () => {
    if (currentFaq.question && currentFaq.answer) {
      setFormData(prev => ({
        ...prev,
        faqs: [...prev.faqs, { ...currentFaq }]
      }));
      setCurrentFaq({ question: '', answer: '' });
    }
  };

  const removeFaq = (index) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      eventDate: new Date(formData.eventDate).toISOString(),
      lastRegistrationDate: formData.lastRegistrationDate ? new Date(formData.lastRegistrationDate).toISOString() : null,
    };
    
    // Remove preview from submission
    delete dataToSubmit.eventImagePreview;
    
    onSubmit(dataToSubmit);
    setFormData({
      eventName: '',
      eventType: 'Workshop',
      shortDescription: '',
      domain: '',
      eventImage: null,
      eventImagePreview: '',
      eventDate: '',
      startTime: '',
      endTime: '',
      duration: '',
      timeZone: '',
      mode: 'Offline',
      venue: '',
      platform: '',
      speakers: [],
      eligibility: '',
      prerequisites: '',
      agenda: [],
      registrationFee: 'Free',
      lastRegistrationDate: '',
      registerUrl: '',
      benefits: [],
      contactEmail: '',
      contactPhone: '',
      faqs: [],
      learningOutcomes: [],
    });
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      {/* Basic Information */}
      <div className="form-section">
        <h3>📌 Event Information</h3>
        <div className="form-group">
          <label>Event Name *</label>
          <input
            type="text"
            name="eventName"
            placeholder="e.g., React Workshop 2024"
            value={formData.eventName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Event Type *</label>
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              required
            >
              {eventTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Domain / Topic</label>
            <input
              type="text"
              name="domain"
              placeholder="e.g., Web Development, AI/ML"
              value={formData.domain}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Short Description</label>
          <textarea
            name="shortDescription"
            placeholder="Brief description of the event..."
            value={formData.shortDescription}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>

        <div className="form-group">
          <label>Event Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {formData.eventImagePreview && (
            <div className="image-preview">
              <img src={formData.eventImagePreview} alt="Event Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />
            </div>
          )}
        </div>
      </div>

      {/* Date & Time */}
      <div className="form-section">
        <h3>🗓 Date & Time</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Event Date *</label>
            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Start Time</label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>End Time</label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Duration</label>
            <input
              type="text"
              name="duration"
              placeholder="e.g., 4 hours, 2 days"
              value={formData.duration}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Time Zone (if online)</label>
            <input
              type="text"
              name="timeZone"
              placeholder="e.g., IST, PST"
              value={formData.timeZone}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="form-section">
        <h3>📍 Location</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Mode *</label>
            <select
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              required
            >
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className="form-group">
            <label>Venue / Campus Hall</label>
            <input
              type="text"
              name="venue"
              placeholder="e.g., Main Auditorium"
              value={formData.venue}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Platform (Zoom, Google Meet, etc.)</label>
            <input
              type="text"
              name="platform"
              placeholder="e.g., Zoom, Google Meet"
              value={formData.platform}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Speakers */}
      <div className="form-section">
        <h3>🎤 Speakers / Mentors</h3>
        <div className="subsection">
          <div className="form-group">
            <label>Speaker Name</label>
            <input
              type="text"
              placeholder="Full name"
              value={currentSpeaker.name}
              onChange={(e) => setCurrentSpeaker({...currentSpeaker, name: e.target.value})}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Designation</label>
              <input
                type="text"
                placeholder="e.g., Senior Developer"
                value={currentSpeaker.designation}
                onChange={(e) => setCurrentSpeaker({...currentSpeaker, designation: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Organization</label>
              <input
                type="text"
                placeholder="e.g., Google, Microsoft"
                value={currentSpeaker.organization}
                onChange={(e) => setCurrentSpeaker({...currentSpeaker, organization: e.target.value})}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>LinkedIn URL</label>
              <input
                type="url"
                placeholder="https://linkedin.com/in/username"
                value={currentSpeaker.linkedinUrl}
                onChange={(e) => setCurrentSpeaker({...currentSpeaker, linkedinUrl: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>GitHub URL</label>
              <input
                type="url"
                placeholder="https://github.com/username"
                value={currentSpeaker.githubUrl}
                onChange={(e) => setCurrentSpeaker({...currentSpeaker, githubUrl: e.target.value})}
              />
            </div>
          </div>
            <div className="form-group">
              <label>Speaker Photo</label>
              <input type="file" accept="image/*" onChange={handleSpeakerPhotoChange} />
              {currentSpeaker.photoUrl && (
                <div className="image-preview" style={{ marginTop: '8px' }}>
                  <img src={currentSpeaker.photoUrl} alt="Speaker" style={{ maxWidth: '140px', borderRadius: '8px' }} />
                </div>
              )}
            </div>
          <button type="button" className="add-item-btn" onClick={addSpeaker}>Add Speaker</button>

          {formData.speakers.length > 0 && (
            <div className="added-items">
              {formData.speakers.map((speaker, idx) => (
                <div key={idx} className="item-chip">
                  <span>{speaker.name} - {speaker.designation}</span>
                  <button type="button" onClick={() => removeSpeaker(idx)}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Eligibility */}
      <div className="form-section">
        <h3>🎯 Eligibility & Audience</h3>
        <div className="form-group">
          <label>Who can participate (Students / Professionals / Beginners)</label>
          <textarea
            name="eligibility"
            placeholder="e.g., Open to all students and professionals interested in web development"
            value={formData.eligibility}
            onChange={handleChange}
            rows="2"
          ></textarea>
        </div>

        <div className="form-group">
          <label>Prerequisites (if any)</label>
          <textarea
            name="prerequisites"
            placeholder="e.g., Basic knowledge of HTML and CSS required"
            value={formData.prerequisites}
            onChange={handleChange}
            rows="2"
          ></textarea>
        </div>
      </div>

      {/* Agenda */}
      <div className="form-section">
        <h3>🧠 Event Agenda</h3>
        <div className="subsection">
          <div className="form-group">
            <label>Session Name</label>
            <input
              type="text"
              placeholder="e.g., Introduction to React"
              value={currentAgendaItem.session}
              onChange={(e) => setCurrentAgendaItem({...currentAgendaItem, session: e.target.value})}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Start Time</label>
              <input
                type="time"
                value={currentAgendaItem.startTime}
                onChange={(e) => setCurrentAgendaItem({...currentAgendaItem, startTime: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>End Time</label>
              <input
                type="time"
                value={currentAgendaItem.endTime}
                onChange={(e) => setCurrentAgendaItem({...currentAgendaItem, endTime: e.target.value})}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Topic</label>
            <input
              type="text"
              placeholder="Topic covered in this session"
              value={currentAgendaItem.topic}
              onChange={(e) => setCurrentAgendaItem({...currentAgendaItem, topic: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Speaker (optional)</label>
            <input
              type="text"
              placeholder="Speaker name for this session"
              value={currentAgendaItem.speaker}
              onChange={(e) => setCurrentAgendaItem({...currentAgendaItem, speaker: e.target.value})}
            />
          </div>
          <button type="button" className="add-item-btn" onClick={addAgendaItem}>Add to Agenda</button>

          {formData.agenda.length > 0 && (
            <div className="added-items">
              {formData.agenda.map((item, idx) => (
                <div key={idx} className="item-chip">
                  <span>{item.session}: {item.topic}</span>
                  <button type="button" onClick={() => removeAgendaItem(idx)}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Registration */}
      <div className="form-section">
        <h3>💰 Registration</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Registration Fee</label>
            <select
              name="registrationFee"
              value={formData.registrationFee}
              onChange={handleChange}
            >
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
          <div className="form-group">
            <label>Last Date to Register</label>
            <input
              type="date"
              name="lastRegistrationDate"
              value={formData.lastRegistrationDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Registration URL / Register Button Link</label>
          <input
            type="url"
            name="registerUrl"
            placeholder="https://example.com/register"
            value={formData.registerUrl}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Benefits */}
      <div className="form-section">
        <h3>🏆 Benefits</h3>
        <div className="subsection">
          <div className="form-group">
            <label>Benefit / Outcome</label>
            <input
              type="text"
              placeholder="e.g., Certificate of Participation"
              value={currentBenefit}
              onChange={(e) => setCurrentBenefit(e.target.value)}
            />
          </div>
          <button type="button" className="add-item-btn" onClick={addBenefit}>Add Benefit</button>

          {formData.benefits.length > 0 && (
            <div className="added-items">
              {formData.benefits.map((b, idx) => (
                <div key={idx} className="item-chip">
                  <span>{b.benefit}</span>
                  <button type="button" onClick={() => removeBenefit(idx)}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="subsection">
          <h4>Learning Outcomes</h4>
          <div className="form-group">
            <label>What will attendees learn?</label>
            <input
              type="text"
              placeholder="e.g., Master React Hooks"
              value={currentLearningOutcome}
              onChange={(e) => setCurrentLearningOutcome(e.target.value)}
            />
          </div>
          <button type="button" className="add-item-btn" onClick={addLearningOutcome}>Add Learning Outcome</button>

          {formData.learningOutcomes.length > 0 && (
            <div className="added-items">
              {formData.learningOutcomes.map((outcome, idx) => (
                <div key={idx} className="item-chip">
                  <span>{outcome}</span>
                  <button type="button" onClick={() => removeLearningOutcome(idx)}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Support */}
      <div className="form-section">
        <h3>📞 Support & FAQs</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Contact Email</label>
            <input
              type="email"
              name="contactEmail"
              placeholder="support@event.com"
              value={formData.contactEmail}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Contact Phone</label>
            <input
              type="tel"
              name="contactPhone"
              placeholder="+1-234-567-8900"
              value={formData.contactPhone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="subsection">
          <h4>FAQs</h4>
          <div className="form-group">
            <label>Question</label>
            <input
              type="text"
              placeholder="e.g., Will the event be recorded?"
              value={currentFaq.question}
              onChange={(e) => setCurrentFaq({...currentFaq, question: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Answer</label>
            <textarea
              placeholder="Answer to the question..."
              value={currentFaq.answer}
              onChange={(e) => setCurrentFaq({...currentFaq, answer: e.target.value})}
              rows="2"
            ></textarea>
          </div>
          <button type="button" className="add-item-btn" onClick={addFaq}>Add FAQ</button>

          {formData.faqs.length > 0 && (
            <div className="added-items">
              {formData.faqs.map((faq, idx) => (
                <div key={idx} className="item-chip">
                  <span>{faq.question}</span>
                  <button type="button" onClick={() => removeFaq(idx)}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <button type="submit" className="submit-btn">
        {initialData ? 'Update Event' : 'Create Event'}
      </button>
    </form>
  );
};

export default EventForm;
